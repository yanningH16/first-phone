<template>
  <scroll class="scroll-content" ref="scrollBox" :pullup="pullup" @scrollToEnd="scrollLoad">
    <div class="orderBox" v-if="goodsReject.length>0">
      <div class="orderBoxList" v-for="(item,index) in goodsReject" :key="index">
        <appendCommon :goodsObj="item">
          <span slot="state" class="reject">{{item.stateText}}</span>
          <span slot="info" class="infoRed" v-if="item.coinType===0">多返
            <span class="num">{{item.coinInfo}}</span>金币</span>
          <span slot="info" class="infoOrange" v-if="item.coinType===1">
            <span class="num">{{item.coinInfo}}</span>金币兑换</span>
          <div class="bottom" slot="bottom">
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
import { notify, orderRouter } from '../../../assets/data/task'
import { mapGetters } from 'vuex'
import { scrollPages, orderOperate, rejectOrderOperate} from '../../../assets/js/mixin'
export default {
  name: "rejectOrder",
  mixins: [scrollPages, orderOperate, rejectOrderOperate],
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
      goodsReject: [],
      apiUrl: '/api/orderOperate/getBuyerTaskListByStatusAndTaskFlag'
    }
  },
  computed: {
    params: {
      get() {
        return {
          buyerUserId: this.userInfo.buyerUserId,
          buyerTaskStatuss: [
            "12"
          ],
          taskFlags: notify,
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
        let goodsState = this.setGoodsState(item)
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
          errInfo: goodsState.errInfo,
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
      this.goodsReject = [...goodsDramArr]
      this.$nextTick(() => {
        this.$refs.scrollBox.refresh()
        this.canLoading = true
      })
    },
    //设置内容状态
    setGoodsState(item) {
      let myIndex = notify.indexOf(item.taskFlag)
      let goodsState = {}
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
          goodsState.errInfo =  '评价有问题，待平台与您联系'
        } else if (myIndex > 14 && myIndex <= 19) {
          goodsState.stateText = '预追评审核未通过'
          goodsState.btnText = '修改预追评'
          goodsState.isBottom = false
          goodsState.errInfo = item.remarks ? `未通过原因 ${item.remarks}` : '评价有问题，待平台与您联系'
        } else if (myIndex > 19 && myIndex <= 24) {
          goodsState.stateText = '追评审核未通过'
          goodsState.btnText = ''
          goodsState.isBottom = true
          goodsState.errInfo =  '评价有问题，待平台与您联系'
        }
      }
      return goodsState
    },

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
    display inline-flex
    .btn
      font-size $font-size-medium
      padding 0.8rem 1.2rem
      color $color-text
      margin-left 1.2rem
      border-1px($color-text, $border-radius)
      &.details
        color $color-theme
        border-1px($color-theme, $border-radius)
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
