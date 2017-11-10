<template>
  <transition name="move">
    <div class="userContainer">
      <div class="userContainerBox">
        <pay :title="title" :moneyBox="moneyBox" :moneyIndex="moneyIndex" :type="type" :paytype="paytype" :hasmoney="hasmoney" :isChecked="isChecked" :isChosed="chosed" @index-change="choosePay" @isChosed-change="isChosed"></pay>
        <p class="info">充值到账可能会有延时，若30分钟内未到账请联系在线客服</p>
        <div class="btnBottomBox">
          <div class="info">
            微信支付：
            <span class="text">
              <i class="icon">￥</i>{{ataloCount}}</span>
          </div>
          <span class="btn" @click="btn" :class="{'disabled':hasmoney===0}">立即充值</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import Pay from '../../../base/pay/pay'
import { mapGetters } from 'vuex'
export default {
  name: 'buyCoin',
  components: {
    Scroll,
    Pay
  },
  data () {
    return {
      paytype: 2,
      isChecked: 0,
      title: '选择面额',
      moneyBox: [
        {
          price: '50金币',
          oldPrice: '50元'
        },
        {
          price: '100金币',
          oldPrice: '10元',
          info: '送5金币'
        },
        {
          price: '200金币',
          oldPrice: '200元',
          info: '送16金币'
        },
        {
          price: '300金币',
          oldPrice: '300元',
          info: '送30金币'
        },
        {
          price: '500金币',
          oldPrice: '500元',
          info: '送75金币'
        }
      ],
      moneyIndex: 0,
      type: 1,
      chosed: true
    }
  },
  computed: {
    ataloCount: {
      get () {
        let ataloCount = 0
        let choosePrice = parseFloat(this.moneyBox[this.moneyIndex].price)
        ataloCount = choosePrice - (this.chosed ? this.hasmoney : 0)
        return ataloCount.toFixed(2)
      },
      set (val) {
        return val
      }
    },
    hasmoney: {
      get () {
        let has = 0
        if (this.userCoin.availableDeposit) {
          has = parseFloat(this.userCoin.availableDeposit).toFixed(2)
        }
        return has
      },
      set (val) {
        return val
      }
    },
    ...mapGetters([
      'userInfo',
      'userCoin'
    ])
  },
  methods: {
    btn () {
      if (this.hasmoney === 0) {
        return false
      }
      this.$vux.alert.show({
        title: '提示',
        content: '正在开发'
      })
    },
    choosePay (index) {
      this.moneyIndex = index
    },
    isChosed (val) {
      this.chosed = val
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
  .userContainerBox
    background #eff0f2
    display flex
    flex-direction column
    height 100%
    .info
      font-size $font-size-normal
      color $color-text-d
      width 100%
      box-sizing border-box
      padding 1.2rem 1.6rem
      line-height 2rem
    .btnBottomBox
      height 5rem
      line-height 5rem
      font-size 0
      background #fff
      position fixed
      width 100%
      bottom 0
      right 0
      display flex
      .info
        flex 1
        text-align right
        .text
          color $color-theme
          font-size $font-size-large-x
          position relative
          top 0.2rem
          .icon
            font-style normal
            font-size $font-size-normal
            vertical-align top
      .btn
        flex 0 0 12.8rem
        color $color-theme-white
        background $color-theme
        font-size $font-size-medium-x
        text-align center
        &.disabled
          opacity 0.2
          background #000
</style>
