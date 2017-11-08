<template>
  <transition name="move">
    <div class="userContainer">
      <div class="scrollBox">
        <div class="tabContainer" ref="tabContainer">
          <tab active-color="#08090a" bar-active-color="#08090a" custom-bar-width="6rem">
            <tab-item :selected="(index===checkIndex)" :line-width="1" v-for="(item,index) in tabArr" :key="index" @on-item-click="choose">{{item}}</tab-item>
          </tab>
        </div>
        <div class="listBox">
          <!--全部-->
          <orderAll v-if="checkIndex===0"></orderAll>
          <!-- 抽奖 -->
          <sweepstakeOrder v-else-if="checkIndex===1" :checkIndex="checkIndex"></sweepstakeOrder>
          <!-- 中奖了 -->
          <winningOrder v-else-if="checkIndex===2" :checkIndex="checkIndex"></winningOrder>
          <!-- 评价 -->
          <evaluateOrder v-else-if="checkIndex===3" :checkIndex="checkIndex"></evaluateOrder>
          <!-- 驳回 -->
          <rejectOrder v-else-if="checkIndex===4" :checkIndex="checkIndex"></rejectOrder>
        </div>
      </div>
    </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import RejectOrder from './rejectOrder'
import EvaluateOrder from './evaluateOrder'
import WinningOrder from './winningOrder'
import SweepstakeOrder from './sweepstakeOrder'
import OrderAll from './orderAll'
import { Tab, TabItem } from 'vux'
export default {
  name: "userMoney",
  components: {
    Tab,
    TabItem,
    RejectOrder,
    EvaluateOrder,
    WinningOrder,
    SweepstakeOrder,
    OrderAll
  },
  created() {
    if (this.$route.params.checkIndex) {
      this.checkIndex = this.$route.params.checkIndex
    }
  },
  data() {
    return {
      tabArr: ['全部', '抽奖', '中奖了', '评价', '驳回'],
      checkIndex: 0,
    }
  },
  methods: {
    // 切换
    choose(index) {
      this.checkIndex = index
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
      position relative
      .scroll-content
        height 100%
        position absolute
        width 100%
        top 0
        right 0
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
        color $color-theme
        font-size $font-size-normal
    .noArray
      padding 10rem 0
      font-size 1.2rem
      text-align center
      color $color-text-d
</style>
