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
          <div class="orderBoxShow">
            <div class="bottom" slot="bottom">
              <span class="btn details" @click="rejectOperate(item,item.taskFlag)">{{item.btnText}}</span>
            </div>
          </div>
          <!--抽奖-->
          <div class="orderBoxShow">
            <div class="bottom" slot="bottom">
              <span class="details">{{item.lotteryInfo}}</span>
              <span class="btn" @click="giveUpLottery" v-if="item.isLotteryState!==1">放弃白拿</span>
              <span class="btn details" v-if="item.isLotteryState===0" @click="getLottery(item)">继续申请{{item.isLotteryState}}</span>
              <span class="btn details" v-if="item.isLotteryState===1" @click="doTask">去做任务</span>
            </div>
          </div>
          <!--中奖了-->
          <div class="orderBoxShow">
            <span slot="info" class="infoRed" v-if="item.coinType===2">白拿还赚
              <span class="num">{{item.coinInfo}}</span>
              金币
            </span>
            <div class="bottom" slot="bottom">
              <span class=" details">{{item.lotteryInfo}}</span>
              <span class="btn" @click="giveUpLottery" v-if="item.isLotteryState!==1">放弃白拿</span>
              <span class="btn details" v-if="item.isLotteryState===0" @click="getAward(item.buyerTaskRecordId)">前去领奖</span>
              <span class="btn" v-if="item.isLotteryState===1" @click="deleteOrder(item)">删除订单</span>
            </div>
          </div>
          <!--评价-->
          <div class="orderBoxShow">
            <div class="bottom" slot="bottom">
              <span class="details">{{item.evaluateInfo}}</span>
              <span class="btn details" v-if="item.isEvaluateState===0" @click="goEvaluate(item)">去预评价</span>
              <span class="btn details" v-else-if="item.isEvaluateState===1" @click="goEvaluate(item)">评价到淘宝</span>
              <span class="btn details" v-else-if="item.isEvaluateState===2" @click="goEvaluate(item)">去预追评</span>
              <span class="btn details" v-else-if="item.isEvaluateState===3" @click="goEvaluate(item)">追评到淘宝</span>
              <span class="btn" v-else-if="item.isEvaluateState===4" @click="applyCustomer(item)">申请售后</span>
            </div>
          </div>
          <!--驳回-->
          <div class="orderBoxShow">
            <div class="bottom" slot="bottom">
              <span class="btn details" @click="rejectOperate(item,item.taskFlag)">{{item.btnText}}</span>
            </div>
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
import { notify, orderRouter } from '../../../assets/data/task'
import { mapGetters } from 'vuex'
import { scrollPages, orderOperate } from '../../../assets/js/mixin'
export default {
  name: "rejectOrder",
  mixins: [scrollPages, orderOperate],
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
      apiUrl: '/api/orderOperate/getBuyerTaskListByStatusAndTaskFlag'
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
      let goodsDramArr = []
      for (let item of data) {
        let goodsState = this.setGoodsState(item.taskFlag, item.buyerTaskStatus)
        let timeInfo = this.setTime(item.gmtModify)
        let obj = {
          platformId: item.platformId,
          goodsImg: item.platformPicId,
          shopName: item.shopName,
          stateText: goodsState.stateText || '',
          btnText: goodsState.btnText,
          goodsName: item.productName,
          temp: this.typeArr[(parseInt(item.taskType) - 1)] || '无',
          coinType: 2,
          num: `${item.numPerOrder}件`,
          price: item.price,
          orderNum: item.buyerTaskRecordId,
          info: `请在今天${timeInfo}前提交，否则取消中奖资格`,
          isBottom: goodsState.isBottom,
          buyerTaskRecordId: item.buyerTaskRecordId,
          errInfo: item.remarks ? `未通过原因 ${item.remarks}` : '评价有问题，待平台与您联系',
          taskFlag: item.taskFlag,
          taskType: item.taskType,
          sellerTaskId: item.sellerTaskId,
          buyerTaskStatus: item.buyerTaskStatus,
          taskFourId: item.taskFourId,
          taskFiveId: item.taskFiveId,
          taskSixId: item.taskSixId,
          taskEightId: item.taskEightId,
          taskNineId: item.taskNineId,
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
    setGoodsState(taskFlag, buyerTaskStatus) {
      let myIndex = notify.indexOf(taskFlag)
      let goodsState = {}
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
