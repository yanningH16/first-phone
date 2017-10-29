<template>
  <scroll class="scroll-content" ref="scrollBox" :pullup="pullup" @scrollToEnd="scrollLoad">
    <div class="orderBox" v-if="goodsAll.length>0">
      <div class="orderBoxList" v-for="(item,index) in goodsAll" :key="index">
        <appendCommon :goodsObj="item">
          <span slot="state" class="reject">{{item.stateText}}</span>
          <span slot="info" class="infoRed" v-if="item.coinType===0">多返
            <span class="num">{{item.coinInfo}}</span>金币
          </span>
          <span slot="info" class="infoOrange" v-if="item.coinType===1">
            <span class="num">{{item.coinInfo}}</span>金币兑换
          </span>
          <!--全部-->
          <div class="bottom" slot="bottom" v-if="item.orderType === 0"></div>
          <!--抽奖-->
          <div class="bottom" slot="bottom" v-if="item.orderType === 1">
            <span class="details">{{item.lotteryInfo}}</span>
            <span class="btn" @click="giveUpLottery(item)" v-if="item.isLotteryState!==1">放弃白拿</span>
            <span class="btn details" v-if="item.isLotteryState===0" @click="getLottery(item)">继续申请{{item.isLotteryState}}</span>
            <span class="btn details" v-if="item.isLotteryState===1" @click="doTask(item)">去做任务</span>
          </div>
          <!--中奖了-->
          <span slot="info" class="infoRed" v-if="item.coinType===2 && item.orderType === 2">白拿还赚
            <span class="num">{{item.coinInfo||0}}</span>
            金币
          </span>
          <div class="bottom" slot="bottom" v-if="item.orderType === 2">
            <span class=" details">{{item.lotteryInfo}}</span>
            <!-- <span class="btn" @click="giveUpLottery(item)" v-if="item.isLotteryState!==1">放弃白拿</span> -->
            <span class="btn details" v-if="item.isLotteryState===0" @click="getAward(item)">前去领奖</span>
            <!-- <span class="btn" v-if="item.isLotteryState===1" @click="deleteOrder(item)">删除订单</span> -->
          </div>
          <!--评价-->
          <div class="bottom" slot="bottom" v-if="item.orderType === 3">
            <span class="details">{{item.evaluateInfo}}</span>
            <span class="btn details" v-if="item.isEvaluateState===0" @click="goEvaluate(item)">去预评价</span>
            <span class="btn details" v-else-if="item.isEvaluateState===1" @click="goEvaluate(item)">评价到淘宝</span>
            <span class="btn details" v-else-if="item.isEvaluateState===2" @click="goEvaluate(item)">去预追评</span>
            <span class="btn details" v-else-if="item.isEvaluateState===3" @click="goEvaluate(item)">追评到淘宝</span>
            <!-- <span class="btn" v-else-if="item.isEvaluateState===4" @click="applyCustomer(item)">申请售后</span> -->
          </div>
          <!--驳回-->
          <div class="bottom" slot="bottom" v-if="item.orderType === 4">
            <span class="btn details" @click="rejectOperate(item,item.taskFlag)">{{item.btnText}}</span>
          </div>
        </appendCommon>
      </div>
    </div>
    <div class="noArray" v-else>还没有相关订单呢</div>
  </scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import AppendCommon from '../../../base/appendCommon/appendCommon'
import Vue from 'vue'
import { award, awarded, comment, notify, orderRouter } from '../../../assets/data/task'
import { mapGetters } from 'vuex'
import { scrollPages, orderOperate, sweepstakeOrderOperate, evaluateOrderOperate, rejectOrderOperate, winningOrderOperate } from '../../../assets/js/mixin'
export default {
  name: "rejectOrder",
  mixins: [scrollPages, orderOperate, sweepstakeOrderOperate, evaluateOrderOperate, rejectOrderOperate, winningOrderOperate],
  components: {
    Scroll,
    AppendCommon
  },
  data() {
    return {
      pullup: true,
      axiosResult: [],//获得的数据
      maxPageSize: 0,
      pageSize: 5,
      pageNo: 1,
      canLoading: true,
      goodsAll: [],
      apiUrl: '/api/orderOperate/getAllBuyerTaskList'
    }
  },
  computed: {
    params: {
      get() {
        return {
          buyerUserId: this.userInfo.buyerUserId,
          pageSize: this.pageSize,
          pageNo: this.pageNo
        }
      },
      set(val) {
        return val
      }
    }
  },
  methods: {
    //存数据
    setGoodsList(data) {
      // console.log(data)
      let goodsDramArr = []
      for (let item of data) {
        let goodsState = this.setGoodsState(item)
        let obj = {
          orderType: goodsState.orderType,
          platformId: item.platformId,
          goodsImg: item.platformPicId,
          shopName: item.shopName,
          stateText: goodsState.stateText,
          btnText: goodsState.btnText,
          goodsName: item.productName,
          temp: this.typeArr[(parseInt(item.taskType) - 1)] || '无',
          coinType: 2,
          num: `${item.numPerOrder}件`,
          price: item.price,
          orderNum: item.buyerTaskRecordId,
          info: goodsState.info,
          isLotteryState: goodsState.isLotteryState,
          isBottom: goodsState.isBottom,
          buyerTaskRecordId: item.buyerTaskRecordId,
          isEvaluateState: goodsState.isEvaluateState,
          errInfo: goodsState.errInfo,
          taskFlag: item.taskFlag,
          taskType: item.taskType,
          sellerTaskId: item.sellerTaskId,
          buyerTaskStatus: item.buyerTaskStatus,
          taskOneId: item.taskOneId,
          taskTwoId: item.taskTwoId,
          taskThreeId: item.taskThreeId,
          taskFourId: item.taskFourId,
          taskFiveId: item.taskFiveId,
          taskSixId: item.taskSixId,
          taskSevenId: item.taskSevenId,
          taskEightId: item.taskEightId,
          taskNineId: item.taskNineId,
          listNoState: goodsState.listNoState,
        }
        //无错误信息判断
        if (goodsState.orderType === 2 || item.buyerTaskStatus === '6' || item.buyerTaskStatus === '7') {
          obj.errInfo = ''
          obj.info = ''
        }
        goodsDramArr.push(obj)
      }
      this.goodsAll = [...goodsDramArr]
      this.$nextTick(() => {
        this.$refs.scrollBox.refresh()
        this.canLoading = true
      })
    },
    //设置内容状态
    setGoodsState(item) {
      let goodsState = {}
      if (notify.indexOf(item.taskFlag) !== -1 && item.buyerTaskStatus === '12') {
        let myIndex = notify.indexOf(item.taskFlag)
        goodsState.orderType = 4
        if (item.buyerTaskStatus === '12') {
          if (myIndex >= 0 && myIndex <= 4) {
            goodsState.stateText = '订单审核未通过'
            goodsState.btnText = '修改申请'
            goodsState.isBottom = false
            goodsState.errInfo = item.remarks ? `未通过原因 ${item.remarks}` : '评价有问题，待平台与您联系'
          } else if (myIndex > 4 && myIndex <= 9) {
            goodsState.stateText = '预评价审核未通过'
            goodsState.btnText = '修改预评价'
            goodsState.isBottom = false
            goodsState.errInfo = item.remarks ? `未通过原因 ${item.remarks}` : '评价有问题，待平台与您联系'
          } else if (myIndex > 9 && myIndex <= 14) {
            goodsState.stateText = '评价审核未通过'
            goodsState.btnText = ''
            goodsState.isBottom = true
            goodsState.errInfo = '评价有问题，待平台与您联系'
          } else if (myIndex > 14 && myIndex <= 19) {
            goodsState.stateText = '预追评审核未通过'
            goodsState.btnText = '修改预追评'
            goodsState.isBottom = false
          } else if (myIndex > 19 && myIndex <= 24) {
            goodsState.stateText = '追评审核未通过'
            goodsState.btnText = ''
            goodsState.isBottom = true
            goodsState.errInfo = '评价有问题，待平台与您联系'
          }
        }
      }
      //评价的状态
      else if (comment.indexOf(item.taskFlag) !== -1 && (item.buyerTaskStatus === '4' || item.buyerTaskStatus === '9')) {
        let myIndex = comment.indexOf(item.taskFlag)
        goodsState.orderType = 3
        if (item.buyerTaskStatus === '4') {
          if (myIndex >= 0 && myIndex <= 3) {
            goodsState.stateText = '待预评价'
            goodsState.isEvaluateState = 0
          } else if (myIndex > 3 && myIndex <= 7) {
            goodsState.stateText = '待评价到淘宝'
            goodsState.isEvaluateState = 1
          } else if (myIndex > 7 && myIndex <= 11) {
            goodsState.stateText = '待预追评'
            goodsState.isEvaluateState = 2
          } else if (myIndex > 11 && myIndex <= 15) {
            goodsState.stateText = '待追评到淘宝'
            goodsState.isEvaluateState = 3
          }
        } else if (item.buyerTaskStatus === '9') {
          if (myIndex >= 0 && myIndex <= 3) {
            goodsState.stateText = '预评价审核中'
            goodsState.isEvaluateState = 4
            goodsState.isBottom = 4
          } else if (myIndex > 3 && myIndex <= 7) {
            goodsState.stateText = '淘宝评价审核中'
            goodsState.isBottom = 4
          } else if (myIndex > 7 && myIndex <= 11) {
            goodsState.stateText = '预追评审核中'
            goodsState.isBottom = 4
          } else if (myIndex > 11 && myIndex <= 15) {
            goodsState.stateText = '淘宝追评审核中'
            goodsState.isBottom = 4
          }
        }
      }
      //中奖了的状态
      else if (awarded.indexOf(item.taskFlag) !== -1 && (item.buyerTaskStatus === '4' || item.buyerTaskStatus === '5' || item.buyerTaskStatus === '9')) {
        goodsState.orderType = 2
        if (item.buyerTaskStatus === '4') {
          goodsState.stateText = '待领奖'
          goodsState.isLotteryState = 0
        } else if (item.buyerTaskStatus === '9') {
          goodsState.stateText = '订单审核中'
          goodsState.isBottom = 1
        } else if (item.buyerTaskStatus === '6') {
          goodsState.stateText = '超时领奖'
          goodsState.isLotteryState = 2
          goodsState.isBottom = 1
          goodsState.listNoState = true
        }
      }
      //抽奖
      else if (award.indexOf(item.taskFlag) !== -1 && (item.buyerTaskStatus === '0' || item.buyerTaskStatus === '2' || item.buyerTaskStatus === '5' || item.buyerTaskStatus === '4')) {
        let myIndex = notify.indexOf(item.taskFlag)
        goodsState.orderType = 1
        if (item.buyerTaskStatus === '0') {
          goodsState.stateText = '待开奖'
          goodsState.isLotteryState = 3
        } else if (item.buyerTaskStatus === '2') {
          goodsState.stateText = '未中奖'
          goodsState.isLotteryState = 0
        } else if (item.buyerTaskStatus === '5') {
          goodsState.stateText = '超时领奖'
          goodsState.isLotteryState = 2
          goodsState.info = `请在今天${this.setTime(item.gmtModify)}前提交，否则取消中奖资格`
        } else if (item.buyerTaskStatus === '4') {
          goodsState.stateText = '待提交审核'
          goodsState.isLotteryState = 2
          goodsState.info = `请在今天${this.setTime(item.gmtModify)}前提交，否则取消中奖资格`
        }
      }
      else if (item.buyerTaskStatus === '2') {
        goodsState.orderType = 0
        goodsState.stateText = '未中奖'
        goodsState.isBottom = 1
        goodsState.listNoState = true
      }
      else if (item.buyerTaskStatus === '6') {
        goodsState.orderType = 0
        goodsState.stateText = '已放弃白拿'
        goodsState.isBottom = 1
        goodsState.listNoState = true
      }
      else if (item.buyerTaskStatus === '7') {
        goodsState.orderType = 0
        goodsState.stateText = '交易成功'
        goodsState.isBottom = 1
      }
      return goodsState
    },
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/variable'
@import '../../../assets/stylus/mixin'
.userContainer
  height 100%
  position fixed
  width 100%
  height 100%
  left 0
  top 0
  bottom 0
  z-index 9999
  background $color-background
  &.move-enter-active, .move-leave-active
    transition all 0.2s linear
    transform translate3d(0, 0, 0)
  &.move-enter, .move-leave
    transform translate3d(100%, 0, 0)
  .scrollBox
    background #eff0f2
    display flex
    flex-direction column
    height 100%
    .stateBox
      background #ffffff
      border-bottom-1px($color-text-ll)
      margin-bottom 1.2rem
      &.isNoBottom
        margin-bottom 0
    .tabContainer
      flex 0 0 4.1rem
      position relative
      z-index 99
    .listBox
      flex 1
      overflow hidden
      .scroll-content
        height 100%
      .infoRed
        color $color-theme
        .num
          color $color-theme
          font-size $font-size-large
          margin-left 0
      .infoOrange
        color $color-theme-orange
        .num
          color $color-theme-orange
          font-size $font-size-large
          margin-left 0
      .bottom
        padding 1.2rem 0
        .btn
          font-size $font-size-medium
          padding 0.8rem 1.2rem
          display inline-block
          color $color-text
          margin-left 1.2rem
          border-small($color-text, $border-radius)
          &.details
            color $color-theme
            border-small($color-theme, $border-radius)
        .details
          color $color-theme
          font-size $font-size-medium
      .reject
        color $color-theme
        font-size $font-size-normal
    .noArray
      padding 10rem 0
      font-size 1.2rem
      text-align center
      color $color-text-d
</style>
