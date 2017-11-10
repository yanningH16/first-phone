<template>
  <transition name="move">
    <div class="userContainer">
      <div class="userContainerBox">
        <scroll class="scrollContent" style="height:100%" :pullup="pullup" @scrollToEnd="scrollLoad" ref="scrollContent">
          <div class="suggest">
            <div class="tabContainer" ref="tabContainer">
              <tab active-color="#08090a" bar-active-color="#08090a" custom-bar-width="6rem">
                <tab-item :selected="(index===checkIndex)" :line-width="1" v-for="(item,index) in tabArr" :key="index" @on-item-click="choose">{{item}}</tab-item>
              </tab>
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import { Tab, TabItem } from 'vux'
export default {
  name: 'userCoupons',
  components: {
    Scroll,
    Tab,
    TabItem
  },
  data () {
    return {
      tabArr: ['我要反馈', '我的反馈'],
      checkIndex: 0,
      pullup: true
    }
  },
  methods: {
    scrollLoad () {

    },
    choose () {

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
</style>
