<template>
  <transition name="move">
    <div class="userContainer">
      <div class="userContainerBox">
        <scroll class="scrollContent" style="height:100%">
          <div class="messageBox">
            <h1 class="title">{{message.title}}</h1>
            <p class="time">{{message.time}}</p>
            <div class="info">{{message.info}}</div>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import Coupons from '../../../base/coupons/coupons'
export default {
  name: 'userMessageInfo',
  components: {
    Scroll,
    Coupons
  },
  created () {
    if (this.$route.params.message) {
      this.message = this.$route.params.message
    } else {
      this.$router.push({ name: 'userMessage' })
    }
  },
  data () {
    return {
      message: ''
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
    .messageBox
      width 100%
      box-sizing border-box
      padding 3.2rem 2rem
      background $color-theme-white
      .title
        font-size $font-size-large-x
        color $color-text
        margin-bottom 1.2rem
        line-height 2.8rem
      .time
        font-size $font-size-medium
        color $color-text-d
      .info
        margin-top 1.2rem
        font-size $font-size-medium
        color $color-text
        line-height 2.2rem
</style>
