<template>
  <scroll class="scroll-content" ref="scrollBox" :pullup="pullup" @scrollToEnd="scrollLoad">
    <div class="orderBox">
      <!--未抽奖-->
      <div class="stateBox border-bottom-1px" :class="{'isNoBottom':showLotteryIndex===1}">
        <cell title="未抽奖" is-link :arrow-direction="!(showLotteryIndex===1)? 'up' : 'down'" @click.native="changeLotteryIndex(1,valueLength)">
          <span style="font-size:1.2rem;margin-right:0.5rem;vertical-align: text-bottom;">{{valueLength}}</span>
        </cell>
      </div>
      <div class="orderBoxList" v-for="(item,index) in goodsLottery" :key="index" v-show="showLotteryIndex===1">
        <appendCommon :goodsObj="item">
          <span slot="state" class="reject">{{item.stateText}}</span>
          <span slot="info" class="infoRed" v-if="item.coinType===0">多返
            <span class="num">{{item.coinInfo}}</span>金币</span>
          <span slot="info" class="infoOrange" v-if="item.coinType===1">
            <span class="num">{{item.coinInfo}}</span>金币兑换</span>
          <div class="bottom" slot="bottom">
            <span class="details">{{item.lotteryInfo}}</span>
            <span class="btn" @click="giveUpLottery(item)" v-if="item.isLotteryState!==1">放弃白拿</span>
            <span class="btn details" v-if="item.isLotteryState===0" @click="getLottery(item)">继续申请</span>
            <span class="btn details" v-if="item.isLotteryState===1" @click="doTask">去做任务</span>
          </div>
        </appendCommon>
      </div>
      <!--再一次抽奖-->
      <div class="stateBox border-bottom-1px" :class="{'isNoBottom':showLotteryIndex===2}">
        <cell title="再一次抽奖" is-link :arrow-direction="!(showLotteryIndex===2)? 'up' : 'down'" @click.native="changeLotteryIndex(2,valueLength)">
          <span style="font-size:1.2rem;margin-right:0.5rem;vertical-align: text-bottom;">{{valueLengthNext}}</span>
        </cell>
      </div>
      <div class="orderBoxList" v-for="(item,index) in goodsLotteryNext" :key="index" v-show="showLotteryIndex===2">
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
          <!-- <span slot="info" class="infoRed" v-if="item.coinType===2">白拿还赚
                      <span class="num">{{item.coinInfo}}</span>
                      金币
                    </span> -->
          <div class="bottom" slot="bottom">
            <span class=" details">{{item.lotteryInfo}}</span>
            <span class="btn" v-if="item.isLotteryState!==1" @click="giveUpLottery(item)">放弃白拿</span>
            <span class="btn details" v-if="item.isLotteryState===0" @click="getLottery(item)">继续申请</span>
            <span class="btn details" v-if="item.isLotteryState===1" @click="doTask(item)">去做任务</span>
          </div>
        </appendCommon>
      </div>
    </div>
  </scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import AppendCommon from '../../../base/appendCommon/appendCommon'
import { award } from '../../../assets/data/task'
import { scrollPages, orderOperate, sweepstakeOrderOperate } from '../../../assets/js/mixin'
import { Cell } from 'vux'
export default {
  name: 'rejectOrder',
  mixins: [scrollPages, orderOperate, sweepstakeOrderOperate],
  components: {
    Scroll,
    AppendCommon,
    Cell
  },
  data () {
    return {
      pullup: true,
      axiosResult: [], // 获得的数据
      maxPageSize: 0,
      pageSize: 5,
      pageNo: 1,
      canLoading: true,
      goodsEvaluate: [],
      apiUrl: '/api/orderOperate/getBuyerTaskListByStatusAndTaskFlag',
      showAwardIndex: 0,
      isNoLoad: true,
      showLotteryIndex: 0,
      goodsLottery: [],
      goodsLotteryNext: [],
      valueLength: 0,
      valueLengthNext: 0
    }
  },
  computed: {
    params: {
      get () {
        if (this.showLotteryIndex === 1) { // 未抽奖
          return {
            buyerUserId: this.userInfo.buyerUserId,
            buyerTaskStatuss: [
              '0', '4'
            ],
            taskFlags: award,
            pageSize: this.pageSize,
            pageNo: this.pageNo
          }
        } else if (this.showLotteryIndex === 2) { // 再一次
          return {
            buyerUserId: this.userInfo.buyerUserId,
            buyerTaskStatuss: [
              '5'
            ],
            taskFlags: [award[1], award[2]],
            pageSize: this.pageSize,
            pageNo: this.pageNo
          }
        }
      },
      set (val) {
        return val
      }
    }
  },
  mounted () {
    this.getColums()
  },
  methods: {
    // 存数据
    setGoodsList (data) {
      let goodsDramArr = []
      for (let item of data) {
        let goodsState = this.setGoodsState(item)
        let obj = {
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
          isBottom: goodsState.isBottom,
          buyerTaskRecordId: item.buyerTaskRecordId,
          isEvaluateState: goodsState.isEvaluateState,
          taskFlag: item.taskFlag,
          taskType: item.taskType,
          sellerTaskId: item.sellerTaskId,
          buyerTaskStatus: item.buyerTaskStatus,
          isLotteryState: goodsState.isLotteryState
        }
        goodsDramArr.push(obj)
      }
      if (this.showLotteryIndex === 1) {
        this.goodsLottery = [...goodsDramArr]
      } else if (this.showLotteryIndex === 2) {
        this.goodsLotteryNext = [...goodsDramArr]
      }
      this.$nextTick(() => {
        this.$refs.scrollBox.refresh()
        this.canLoading = true
      })
    },
    // 设置内容状态
    setGoodsState (item) {
      let goodsState = {}
      if (item.buyerTaskStatus === '0') {
        goodsState.stateText = '待开奖'
        goodsState.isLotteryState = 3
      } else if (item.buyerTaskStatus === '4') {
        goodsState.stateText = '待提交申请'
        goodsState.isLotteryState = 0
        goodsState.info = `请在今天${this.setTime(item.gmtModify)}前提交，否则取消中奖资格`
      } else if (item.buyerTaskStatus === '5') {
        goodsState.stateText = '未中奖'
        goodsState.isLotteryState = 0
        goodsState.info = `请在今天${this.setTime(item.gmtModify)}前提交，否则取消中奖资格`
      }
      return goodsState
    },
    // 更改获得数据
    changeLotteryIndex (index, account) {
      if (!account) {
        this.$vux.toast.text('我还没有数据呢', 'middle')
        return false
      }
      if (this.showLotteryIndex === index) {
        this.showLotteryIndex = 0
        return false
      }
      this.axiosResult = []
      this.showLotteryIndex = index
      this.getApi()
    },
    // (特殊tarbar)获得条数
    getColums () {
      this.$axios.post('/api/orderOperate/getSweepstakesCountDetail', {
        buyerUserId: this.userInfo.buyerUserId
      }).then((response) => {
        let data = response.data
        if (data.code !== '200') {
          this.$vux.alert.show({
            title: '错误提示',
            content: data.message
          })
        } else {
          var myData = data.data
          this.valueLength = myData.notWinCount
          this.valueLengthNext = myData.tryAgainCount
        }
      }).catch((error) => {
        console.log(error)
      })
    }

  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/variable'
@import '../../../assets/stylus/mixin'
.scroll-content
  height 100%
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
