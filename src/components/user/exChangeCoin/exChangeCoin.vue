<template>
  <transition name="move">
    <div class="userContainer">
      <div class="userContainerBox">
        <div class="addressInputBox">
          <group>
            <cell title="剩余金币数" :value="maxValue">
              <div class="iconBox" slot="icon">
                <i class="icon iconfont icon-gold"></i>
              </div>
            </cell>
            <x-input placeholder="输入需要兑换的金币数" required v-model="coinNum" type="number"></x-input>
          </group>
        </div>
        <div class="btnBox">
          <m-Button :class="{'btn-disabled':isDisabled}" @click="sureExChange">确认转出</m-Button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import MButton from '../../../base/button/button'
import { XInput, Group, Cell } from 'vux'
export default {
  name: "exChangeCoin",
  components: {
    MButton,
    XInput,
    Group,
    Cell
  },
  data() {
    return {
      isDisabled: true,
      coinNum: null,
      maxValue: 32
    }
  },
  watch: {
    coinNum(val) {
      if (val.length > 0 && val <= this.maxValue) {
        this.isDisabled = false
        return false
      }
      this.isDisabled = true
    }
  },
  methods: {
    sureExChange() {
      console.log('确认转出')
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
      margin-top 1.2rem
      box-sizing border-box
      .iconBox
        position relative
        width 1.6rem
        height 1.6rem
        margin-right 1.5rem
        .icon
          position absolute
          font-size 2.1rem
          vertical-align middle
          top -0.4rem
      .btnBox
        box-sizing border-box
        width 100%
        padding 2rem 1.6rem
</style>
