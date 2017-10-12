<template>
  <transition name="move">
    <div class="userContainer">
      <div class="userContainerBox">
        <div class="tabFixed" v-if="tabShow">
          <tab active-color="#08090a" bar-active-color="#08090a" custom-bar-width="6rem">
            <tab-item :selected="(index===checkIndex)" :line-width="1" v-for="(item,index) in tabArr" :key="index" @on-item-click="choose">{{item}}</tab-item>
          </tab>
        </div>
        <scroll class="scrollContent" ref="scrollContent" :listenScroll="listenScroll" :probeType="probeType" @scroll="myScroll">
          <div class="scrollBox">
            <div class="headerBox" ref="headerBox">
              <p class="info">我的金币(单位：金币，1金币=1人民币)</p>
              <p class="coin">32.00</p>
            </div>
            <div class="tabContainer" ref="tabContainer">
              <tab active-color="#08090a" bar-active-color="#08090a" custom-bar-width="6rem">
                <tab-item :selected="(index===checkIndex)" :line-width="1" v-for="(item,index) in tabArr" :key="index" @on-item-click="choose">{{item}}</tab-item>
              </tab>
            </div>
            <div class="listBox">
              <div class="moneyList" v-if="checkIndex===0" ref="rechargeArr">
                <list :list="rechargeArr">
                  <p class="text" v-show="rechargeArr.length===0">暂无记录</p>
                </list>
              </div>
              <div class="moneyList" v-else-if="checkIndex===1" ref="coinArr">
                <list :list="coinArr">
                  <p class="text" v-show="coinArr.length===0">暂无记录</p>
                </list>
              </div>
              <div class="moneyList" v-else>
                <list :list="payArr">
                  <slot>
                    <p class="text" v-show="payArr.length===0">暂无记录</p>
                  </slot>
                </list>
              </div>
            </div>
          </div>
        </scroll>
        <div class="payMoney border-top-1px">
          <div class="payBox" @click="exChangeCoin">兑换成可提现金额</div>
          <div class="payBox payBoxCore" @click="buyCoin">充值金币</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import List from '../../../base/list/list'
import { Tab, TabItem } from 'vux'
export default {
  name: "userMoney",
  components: {
    Scroll,
    Tab,
    TabItem,
    List
  },
  data() {
    return {
      tabArr: [
        '充值记录',
        '赏金记录',
        '支付记录',
      ],
      //充值记录
      rechargeArr: [
        {
          title: '支付宝支付',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '金币'
        },
        {
          title: '微信支付',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '金币'
        },
        {
          title: '微信支付',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '金币'
        },
        {
          title: '支付宝支付',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '金币'
        },
        {
          title: '支付宝支付',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '金币'
        },
        {
          title: '支付宝支付',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '金币'
        },
        {
          title: '支付宝支付',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '金币'
        },
        {
          title: '支付宝支付',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '金币'
        },
        {
          title: '支付宝支付',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '金币'
        }
      ],
      //赏金记录
      coinArr: [
         {
          title: '支付宝支付',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '金币',
          info:'超额返'
        },
        {
          title: '微信支付',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '金币',
          info:'评价'
        },
        {
          title: '微信支付',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '金币',
          info:'未中奖补偿'
        },
        {
          title: '支付宝支付',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '金币',
          info:'追评'
        },
        {
          title: '支付宝支付',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '金币',
          info:'追评'
        },
        {
          title: '支付宝支付',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '金币',
          info:'追评'
        }
      ],
      //支出记录
      payArr: [],
      checkIndex: 0,
      listenScroll: true,
      scrollY: 0,
      probeType: 3,
      tabShow: false
    }
  },
  mounted() {
    this.$refs.scrollContent.refresh()
  },
  methods: {
    // 切换
    choose(index) {
      this.checkIndex = index
      this.tabShow = false
      this.$nextTick(() => {
        this.$refs.scrollContent.refresh()
      })
    },
    myScroll(pos) {
      this.scrollY = pos.y
    },
    //购买金币
    buyCoin() {
      this.$router.push({ name: 'buyCoin' })
    },
    exChangeCoin() {
      this.$router.push({ name: 'exChangeCoin' })
    }
  },
  watch: {
    scrollY(newY) {
      let maxHeight = this.$refs.headerBox.getBoundingClientRect().height
      if (Math.abs(newY) >= maxHeight) {
        this.tabShow = true
      } else {
        this.tabShow = false
      }
    }
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
    left: 0
    top 0
    bottom 0
    z-index 9999
    background $color-background
    &.move-enter-active,.move-leave-active 
      transition all 0.2s linear
      transform translate3d(0, 0, 0)
    &.move-enter,.move-leave
      transform translate3d(100%, 0, 0)
    .userContainerBox
      background #eff0f2
      display flex
      flex-direction column
      height 100%
      .tabFixed
        position fixed
        width 100%
        z-index 99
      .scrollContent
        flex 1
        overflow hidden
        position relative
        .headerBox
          height 13.85rem
          box-sizing border-box
          padding 1.6rem 2rem 3rem 2rem
          background-image url('../userHeader/profile_bg.svg')
          background-size 100%
          font-size 0
          .info
            color $color-text-d
            font-size $font-size-normal
          .coin
            margin-top 1.8rem
            font-size $font-size-coin
            color $color-theme-white
        .tabContainer
          height 4.1rem
          position relative
          z-index 99
        .listBox
          .text
            background $color-background
            font-size $font-size-normal
            color $color-text-d
            text-align center
            padding-top 8rem
      .payMoney
        background $color-theme-white
        border-top-1px($color-text-ll)
        flex 0 0 5rem
        width 100%
        box-sizing border-box
        display flex
        .payBox
          flex 1
          text-align center
          margin 1.4rem 0
          line-height $font-size-large-x
          font-size $font-size-medium-x
          border-right 1px solid $color-text-ll
          &:last-of-type
            border-right none
            color $color-theme
</style>
