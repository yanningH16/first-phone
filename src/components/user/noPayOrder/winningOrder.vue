<template>
  <transition name="move">
    <scroll class="scroll-content" ref="scrollBox" :pullup="pullup" @scrollToEnd="scrollLoad">
      <div class="orderBox">
        <!--抽奖订单-->
        <div class="stateBox border-bottom-1px" :class="{'isNoBottom':showAwardIndex===1}">
          <cell title="抽奖订单" is-link :arrow-direction="!(showAwardIndex===1)? 'up' : 'down'" @click.native="changeAwardIndex(1,valueDraw)">
            <span style="font-size:1.2rem;margin-right:0.5rem;vertical-align: text-bottom;">{{valueDraw}}</span>
          </cell>
        </div>
        <div class="orderBoxList" v-for="(item,index) in goodsDraw" :key="index" v-show="showAwardIndex===1">
          <appendCommon :goodsObj="item">
            <span slot="state" class="reject">{{item.stateText}}</span>
            <span slot="info" class="infoRed" v-if="item.coinType===0">多返
              <span class="num">{{item.coinInfo}}</span>金币</span>
            <span slot="info" class="infoOrange" v-if="item.coinType===1">
              <span class="num">{{item.coinInfo}}</span>金币兑换</span>
            <div class="bottom" slot="bottom">
              <span class="details">{{item.lotteryInfo}}</span>
              <span class="btn" @click="giveUpLottery" v-if="item.isLotteryState!==1">放弃白拿</span>
              <span class="btn details" v-if="item.isLotteryState===0" @click="getAward(item)">前去领奖</span>
              <span class="btn" v-if="item.isLotteryState===1" @click="deleteOrder(item)">删除订单</span>
            </div>
          </appendCommon>
        </div>
        <!--金币拿订单-->
        <div class="stateBox" :class="{'isNoBottom':showAwardIndex===2}">
          <cell title="金币拿订单" is-link :arrow-direction="!(showAwardIndex==2)? 'up' : 'down'" @click.native="changeAwardIndex(2,valueCoin)">
            <span style="font-size:1.2rem;margin-right:0.5rem;vertical-align: text-bottom;">{{valueCoin}}</span>
          </cell>
        </div>
        <div class="orderBoxList" v-for="(item,index) in goodsCoin" :key="index" v-show="showAwardIndex===2">
          <appendCommon :goodsObj="item">
            <span slot="state" class="reject">{{item.stateText}}</span>
            <span slot="info" class="infoRed" v-if="item.coinType===0">多返
              <span class="num">{{item.coinInfo}}</span>
              金币
            </span>
            <span slot="info" class="infoOrange" v-if="item.coinType===1">
              <span class="num">{{item.coinInfo}}</span>
              金币兑换
            </span>
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
          </appendCommon>
        </div>
        <!--必中券订单-->
        <div class="stateBox" :class="{'isNoBottom':showAwardIndex===3}">
          <cell title="必中券订单" is-link :arrow-direction="!(showAwardIndex===3)? 'up' : 'down'" @click.native="changeAwardIndex(3,valueMust)">
            <span style="font-size:1.2rem;margin-right:0.5rem;vertical-align: text-bottom;">{{valueMust}}</span>
          </cell>
        </div>
        <div class="orderBoxList" v-for="(item,index) in goodsMust" :key="index" v-show="showAwardIndex===3">
          <appendCommon :goodsObj="item">
            <span slot="state" class="reject">{{item.stateText}}</span>
            <span slot="info" class="infoRed" v-if="item.coinType===0">多返
              <span class="num">{{item.coinInfo}}</span>
              金币
            </span>
            <span slot="info" class="infoOrange" v-if="item.coinType===1">
              <span class="num">{{item.coinInfo}}</span>
              金币兑换
            </span>
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
          </appendCommon>
        </div>
        <!--Plus会员订单-->
        <div class="stateBox" :class="{'isNoBottom':showAwardIndex===4}">
          <cell title="Plus会员订单" is-link :arrow-direction="!(showAwardIndex===4)? 'up' : 'down'" @click.native="changeAwardIndex(4,valuePlus)">
            <span style="font-size:1.2rem;margin-right:0.5rem;vertical-align: text-bottom;">{{valuePlus}}</span>
          </cell>
        </div>
        <div class="orderBoxList" v-for="(item,index) in goodsPlus" :key="index" v-show="showAwardIndex===4">
          <appendCommon :goodsObj="item">
            <span slot="state" class="reject">{{item.stateText}}</span>
            <span slot="info" class="infoRed" v-if="item.coinType===0">多返
              <span class="num">{{item.coinInfo}}</span>
              金币
            </span>
            <span slot="info" class="infoOrange" v-if="item.coinType===1">
              <span class="num">{{item.coinInfo}}</span>
              金币兑换
            </span>
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
          </appendCommon>
        </div>
      </div>
    </scroll>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import AppendCommon from '../../../base/appendCommon/appendCommon'
import Vue from 'vue'
import { award, awarded, orderRouter } from '../../../assets/data/task'
import { mapGetters } from 'vuex'
import { scrollPages, orderOperate } from '../../../assets/js/mixin'
import { Cell } from 'vux'
export default {
  name: "rejectOrder",
  mixins: [scrollPages, orderOperate],
  components: {
    Scroll,
    AppendCommon,
    Cell
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
      apiUrl: '/api/orderOperate/getBuyerTaskListByStatusAndTaskFlag',
      showAwardIndex: 0,
      isNoLoad: true,
      goodsDraw: [],
      //金币拿订单
      goodsCoin: [],
      //必中券订单
      goodsMust: [],
      //Plus订单
      goodsPlus: [],
      valueDraw: 0,
      valueCoin: 0,
      valueMust: 0,
      valuePlus: 0
    }
  },
  computed: {
    params: {
      get() {
        if (this.showAwardIndex === 1) {//中奖了-抽奖订单
          return {
            buyerUserId: this.userInfo.buyerUserId,
            buyerTaskStatuss: [
              "4", "9"
            ],
            taskType: 1,
            taskFlags: [awarded[0], awarded[1], awarded[2]],
            pageSize: this.pageSize,
            pageNo: this.pageNo
          }
        } else if (this.showAwardIndex === 2) {//中奖了-金币拿订单
          return {
            buyerUserId: this.userInfo.buyerUserId,
            buyerTaskStatuss: [
              "4", "5"
            ],
            taskFlags: [awarded[3], awarded[4], awarded[5]],
            pageSize: this.pageSize,
            pageNo: this.pageNo,
            taskType: 2,
            isFree: 0
          }
        } else if (this.showAwardIndex === 3) { //中奖了-必中券订单
          return {
            buyerUserId: this.userInfo.buyerUserId,
            buyerTaskStatuss: [
              "4", "5"
            ],
            taskType: 1,
            taskFlags: [awarded[5]],
            pageSize: this.pageSize,
            pageNo: this.pageNo
          }
        } else if (this.showAwardIndex === 4) { //中奖了-Plus会员
          return {
            buyerUserId: this.userInfo.buyerUserId,
            buyerTaskStatuss: [
              "4", "5"
            ],
            taskType: 2,
            isFree: 1,
            taskFlags: [awarded[0], awarded[1], awarded[2]],
            pageSize: this.pageSize,
            pageNo: this.pageNo
          }
        }
      },
      set(val) {
        return val
      }
    }
  },
  mounted() {
    this.getColums()
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
          taskFlag: item.taskFlag,
          taskType: item.taskType,
          sellerTaskId: item.sellerTaskId,
          buyerTaskStatus: item.buyerTaskStatus
        }
        goodsDramArr.push(obj)
      }
      if (this.showAwardIndex === 1) {
        this.goodsDraw = [...goodsDramArr]
      } else if (this.showAwardIndex === 2) {
        this.goodsCoin = [...goodsDramArr]
      } else if (this.showAwardIndex === 3) {
        this.goodsMust = [...goodsDramArr]
      } else if (this.showAwardIndex === 4) {
        this.goodsPlus = [...goodsDramArr]
      }
      this.$nextTick(() => {
        this.$refs.scrollBox.refresh()
        this.canLoading = true
      })
    },
    //设置内容状态
    setGoodsState(taskFlag, buyerTaskStatus) {
      let goodsState = {}
      if (buyerTaskStatus === '4') {
        goodsState.stateText = '待领奖'
        goodsState.isLotteryState = 2
      } else if (buyerTaskStatus === '9') {
        goodsState.stateText = '订单审核中'
        goodsState.isBottom = 1
      } else if (buyerTaskStatus === '6') {
        goodsState.stateText = '超时领奖'
        goodsState.isLotteryState = 0
      }
      return goodsState
    },
    //中奖了路由跳转
    getAward(item) {
      const routerLink = [
        'getPriceOneStep1',
        'getPriceTwoStep1',
        'getPriceThreeStep1',
        '',
        '',
        'sureGetStep1'
      ]
      let index = awarded.indexOf(item.taskFlag)
      this.$router.push({ name: routerLink[index], query: { buyerTaskRecordId: item.buyerTaskRecordId, sellerTaskId: item.sellerTaskId, type: item.taskType } })
    },
    //更改获得数据
    changeAwardIndex(index, account) {
      if (!account) {
        this.$vux.toast.text('我还没有数据呢', 'middle')
        return false
      }
      if (this.showAwardIndex === index) {
        this.showAwardIndex = 0
        return false
      }
      this.showAwardIndex = index
      this.doInfo()
    },
    //(特殊tarbar)获得条数
    getColums() {
      this.$axios.post('/api/orderOperate/getWinningCountDetail', {
        buyerUserId: this.userInfo.buyerUserId
      }).then((response) => {
        let data = response.data
        if (data.code !== "200") {
          this.$vux.alert.show({
            title: '错误提示',
            content: data.message,
          })
        } else {
          var myData = data.data
          this.valueDraw = myData.winLotteryCount
          this.valueCoin = myData.goldGetCount
          this.valueMust = myData.winTicketCount
          this.valuePlus = myData.plusCount
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    //删除订单
    deleteOrder(item) { }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/variable'
@import '../../../assets/stylus/mixin'
.scroll-content
  height 100%
  &.move-enter-active, .move-leave-active
    transition all 0.2s linear
    transform translate3d(0, 0, 0)
  &.move-enter, .move-leave
    transform translate3d(100%, 0, 0)
  .stateBox
    background #ffffff
    border-bottom-1px($color-text-ll)
    margin-bottom 1.2rem
    &.isNoBottom
      margin-bottom 0
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
