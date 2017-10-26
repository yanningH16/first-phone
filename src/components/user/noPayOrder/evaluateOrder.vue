<template>
  <scroll class="scroll-content" ref="scrollBox" :pullup="pullup" @scrollToEnd="scrollLoad">
    <div class="orderBox" v-if="goodsEvaluate.length>0">
      <div class="orderBoxList" v-for="(item,index) in goodsEvaluate" :key="index">
        <appendCommon :goodsObj="item">
          <span slot="state" class="reject">{{item.stateText}}</span>
          <span slot="info" class="infoRed" v-if="item.coinType===0">多返
            <span class="num">{{item.coinInfo}}</span>金币</span>
          <span slot="info" class="infoOrange" v-if="item.coinType===1">
            <span class="num">{{item.coinInfo}}</span>金币兑换</span>
          <div class="bottom" slot="bottom">
            <span class="details">{{item.evaluateInfo}}</span>
            <span class="btn details" v-if="item.isEvaluateState===0" @click="goEvaluate(item)">去预评价</span>
            <span class="btn details" v-else-if="item.isEvaluateState===1" @click="goEvaluate(item)">评价到淘宝</span>
            <span class="btn details" v-else-if="item.isEvaluateState===2" @click="goEvaluate(item)">去预追评</span>
            <span class="btn details" v-else-if="item.isEvaluateState===3" @click="goEvaluate(item)">追评到淘宝</span>
            <!-- <span class="btn" v-else-if="item.isEvaluateState===4" @click="applyCustomer(item)">申请售后</span> -->
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
import { comment, orderRouter } from '../../../assets/data/task'
import { mapGetters } from 'vuex'
import { scrollPages, orderOperate, evaluateOrderOperate } from '../../../assets/js/mixin'
export default {
  name: "rejectOrder",
  mixins: [scrollPages, orderOperate, evaluateOrderOperate],
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
      goodsEvaluate: [],
      apiUrl: '/api/orderOperate/getBuyerTaskListByStatusAndTaskFlag'
    }
  },
  computed: {
    params: {
      get() {
        return {
          buyerUserId: this.userInfo.buyerUserId,
          buyerTaskStatuss: [
            '4', '9'
          ],
          taskFlags: comment,
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
          goodsImg: item.platformPicId,
          shopName: item.shopName,
          stateText: goodsState.stateText,
          btnText: goodsState.btnText,
          goodsName: item.productName,
          temp: typeArr[(parseInt(item.taskType) - 1)] || '无',
          coinType: 2,
          num: `${item.numPerOrder}件`,
          price: item.price,
          orderNum: item.buyerTaskRecordId,
          info: `请在今天${timeInfo}前提交，否则取消中奖资格`,
          isBottom: goodsState.isBottom,
          buyerTaskRecordId: item.buyerTaskRecordId,
          isEvaluateState: goodsState.isEvaluateState,
          errInfo: `未通过原因 ${item.remarks}` || '未通过原因 错误原因',
          taskFlag: item.taskFlag,
          taskType: item.taskType,
          sellerTaskId: item.sellerTaskId,
          buyerTaskStatus: item.buyerTaskStatus,
          taskFiveId: item.taskFiveId,
          taskSixId: item.taskSixId,
          taskEightId: item.taskEightId,
          taskNineId: item.taskNineId,
        }
        goodsDramArr.push(obj)
      }
      this.goodsEvaluate = [...goodsDramArr]
      this.$nextTick(() => {
        this.$refs.scrollBox.refresh()
        this.canLoading = true
      })
    },
    //设置内容状态
    setGoodsState(taskFlag, buyerTaskStatus) {
      let goodsState = {}
      let myIndex = comment.indexOf(taskFlag)
      if (buyerTaskStatus === '4') {
        if (myIndex >= 0 && myIndex < 3) {
          goodsState.stateText = '待预评价'
          goodsState.isEvaluateState = 0
        } else if (myIndex > 3 && myIndex < 7) {
          goodsState.stateText = '待评价到淘宝'
          goodsState.isEvaluateState = 1
        } else if (myIndex > 7 && myIndex < 11) {
          goodsState.stateText = '待预追评'
          goodsState.isEvaluateState = 2
        } else if (myIndex > 11 && myIndex < 15) {
          goodsState.stateText = '待追评到淘宝'
          goodsState.isEvaluateState = 3
        }
      } else if (buyerTaskStatus === '9') {
        if (myIndex >= 0 && myIndex < 3) {
          goodsState.stateText = '预评价审核中'
          // goodsState.isEvaluateState = 4
          goodsState.info  = '如有问题，请联系客服'
        } else if (myIndex > 3 && myIndex < 7) {
          goodsState.stateText = '淘宝评价审核中'
        } else if (myIndex > 7 && myIndex < 11) {
          goodsState.stateText = '预追评审核中'
        } else if (myIndex > 11 && myIndex < 15) {
          goodsState.stateText = '淘宝追评审核中'
        }
      }
      return goodsState
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/variable'
@import '../../../assets/stylus/mixin'
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
    color $color-theme !important
    font-size $font-size-normal !important
  .noArray
    padding 10rem 0
    font-size 1.2rem
    text-align center
    color $color-text-d
</style>
