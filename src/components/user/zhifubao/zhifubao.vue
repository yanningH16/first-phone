<template>
  <transition name="move">
    <div class="settings">
      <scroll ref="scroll" class="scroll-content">
        <div class="zhifubao">
          <group>
            <x-input placeholder="输入姓名，必须与银行卡姓名一致" required></x-input>
            <x-input placeholder="输入支付宝账号" required></x-input>
            <x-input placeholder="输入身份证号码" required></x-input>
          </group>
          <div class="containerBox">
            <h1 class="title">上传支付宝账号与安全截图</h1>
            <div class="uploadBox">
              <upload :myimgs="imgs" :max="max"></upload>
            </div>
          </div>
          <info :infoArr="infos"></info>
          <div class="btnBox">
            <m-Button @my-click="apply" :class="{'btn-disabled':!btnSaveState}">提交审核</m-Button>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import Info from '../../../base/info/info'
import Upload from '../../../base/upload/upload'
import MButton from '../../../base/button/button'
import { XInput, Group } from 'vux'
export default {
  name: "zhifubao",
  components: {
    Scroll,
    XInput,
    Group,
    Info,
    MButton,
    Upload
  },
  data() {
    return {
      infos: [
        '为确保你的账号及退款账号为同一人，请上传支付宝基本信息截图，如账号信息和截图信息不一致，将不能通过平台审核',
        '当天提交的支付宝审核预计在1小时左右完成审核，21.00之后提交的将于次日审核'
      ],
      btnSaveState: false,
      imgs:[],
      max:1
    }
  },
  methods: {
    //保存地址
    apply() {
      console.log(123)
      //ajax请求
      if (this.btnSaveState) {
        console.log('保存')
      }
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
      .containerBox
        margin-top 0.8rem
        background $color-theme-white
        width 100%
        box-sizing border-box
        padding 1.2rem 1.6rem
        .title
          color $color-text
          font-size $font-size-medium
        .uploadBox
          height 9rem
          .finish_room
            position relative
            top 1rem
      .btnBox
        box-sizing border-box
        padding 0 1.6rem
</style>
