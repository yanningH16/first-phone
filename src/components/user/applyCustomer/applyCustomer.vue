<template>
  <transition name="move">
    <div class="settings">
      <scroll ref="scroll" class="scroll-content" :click="isClick" :preventDefaultException="preventDefaultException">
        <div class="zhifubao">
          <group>
            <x-input placeholder="申请原因" v-model="reson" :disabled="true" @click.native="choooseReason">
              <div class="right" slot="right">
                <span v-show="reson.length==0">请选择</span>
                <i class="idown">
                  <popup-picker :data="list" v-model="value" :show.sync="showPopupPicker" style="opacity:0" @on-change="onChange"></popup-picker>
                </i>
              </div>
            </x-input>
            <x-input placeholder="申请原因说明（选填）"></x-input>
          </group>
          <div class="containerBox">
            <h1 class="title">上传凭证</h1>
            <div class="uploadBox">
              <upload :myimgs="imgs" :max="max" @upload-change="uploadChange"></upload>
            </div>
          </div>
          <div class="btnBox">
            <m-Button @my-click="apply" :class="{'btn-disabled':!btnSaveState}">提交</m-Button>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import Upload from '../../../base/upload/upload'
import MButton from '../../../base/button/button'
import { XInput, Group, PopupPicker } from 'vux'
export default {
  name: 'zhifubao',
  components: {
    Scroll,
    XInput,
    Group,
    MButton,
    Upload,
    PopupPicker
  },
  data () {
    return {
      isClick: false,
      preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|SPAN|IMG)$/ },
      showPopupPicker: false,
      btnSaveState: false,
      imgs: [],
      max: 1,
      value: [],
      list: [
        ['商品拍A发B，与实物不符',
          '商家超72小时未发货',
          '商品质量存在严重问题',
          '商品价格虚高',
          '退换货商家收到商品后不补寄',
          '用错买号',
          '拍错规格']],
      reson: ''
    }
  },
  methods: {
    uploadChange (val) {
      this.imgs = val
    },
    // 保存地址
    apply () {
      // ajax请求
      if (this.btnSaveState) {
        console.log('保存')
      }
    },
    // 选择理由
    choooseReason () {
      this.showPopupPicker = true
      console.log(this.showPopupPicker)
    },
    onChange (val) {
      this.reson = val[0]
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
  .scroll-content
    height 100%
    .idown
      content ' '
      display inline-block
      height 6px
      width 6px
      border-width 2px 2px 0 0
      border-color #C8C8CD
      border-style solid
      position relative
      top -2px
      position absolute
      top 50%
      margin-top -6px
      right 15px
      transform matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(90deg)
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
      padding 2rem 1.6rem
</style>

