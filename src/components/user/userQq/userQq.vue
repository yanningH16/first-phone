<template>
  <transition name="move">
    <div class="settings">
      <scroll ref="scroll" class="scroll-content">
        <div class="userAddressBox">
          <div class="addressInputBox">
            <group>
              <x-input placeholder="请输入你的QQ号" required v-model="addressQQ"></x-input>
            </group>
          </div>
          <h1 class="info">填写QQ号有助于提高中奖率，方便中奖后及时联系你</h1>
          <div class="btnBox">
            <button class="btn" :class="{'btn-disabled':!btnSaveState}" @click="saveQq">保存</button>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import { XInput, Group } from 'vux'
export default {
  name: "userQq",
  components: {
    Scroll,
    XInput,
    Group
  },
  watch:{
    addressQQ(newVal){
      if(newVal.length>0){
        this.btnSaveState = true
        return false
      }
      this.btnSaveState = false
    }
  },
  data() {
    return {
      addressQQ:'',
      btnSaveState:false
    }
  },

  methods: {
    //保存qq
    saveQq(){
      
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/variable'
@import '../../../assets/stylus/mixin'
  .settings
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
    .scroll-content
      height 100%
      .userAddressBox
        margin-top 1.2rem
        .info
          color $color-text-d
          font-size 1.2rem
          text-align center
          margin-top 1.2rem
        .btnBox
            width 100%
            padding 2rem 1.8rem
            box-sizing border-box
            .btn
              width 100%
              border-width 0
              outline 0
              -webkit-appearance none
              position: relative
              height 4rem
              line-height 4rem
              font-size $font-size-medium-x
              text-align center
              text-decoration none
              color $color-theme-white
              border-radius $border-radius
              -webkit-tap-highlight-color rgba(0, 0, 0, 0)
              background-color $color-theme
              font-weight $font-weight
            .btn-disabled
              background-color $color-theme-disabled
              color rgba(255,255,255,0.3)
              &:active
                background $color-theme-active
</style>

