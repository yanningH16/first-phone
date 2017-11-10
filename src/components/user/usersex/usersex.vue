<template>
  <transition name="move">
    <div class="settings">
      <scroll ref="scroll" class="scroll-content">
        <div class="settingsBox">
          <div class="sexBox">
            <h1 class="title">一、选择账号性别</h1>
            <div class="radioBox border-bottom-1px">
              <div class="radioBoxContainer" @click="chooseChecked=1">
                <CheckBox :isChecked="chooseChecked===1"></CheckBox>
                <span class="title">男</span>
              </div>
              <div class="radioBoxContainer border-bottom-1px" @click="chooseChecked=0">
                <CheckBox :isChecked="chooseChecked===0"></CheckBox>
                <span class="title">女</span>
              </div>
            </div>
            <h1 class="info">请与[支付宝账户与安全]截图上显示的性别保持一致，一经绑定不能修改</h1>
          </div>
          <div class="btnBox">
            <button class="btn" @click="setSex">提交</button>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import CheckBox from '../../../base/checkbtn/checkbtn'
import Scroll from '../../../base/scroll/scroll'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'usersex',
  components: {
    Scroll,
    CheckBox
  },
  data () {
    return {
      chooseChecked: true,
      btnState: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    setSex () {
      this.$axios.post('/api/user/update', {
        telephone: this.userInfo.telephone,
        gender: this.chooseChecked
      }).then((response) => {
        if (response.data.code === '200') {
          let _this = this
          let obj = Object.assign({}, this.userInfo, {
            gender: this.chooseChecked
          })
          this.setUserInfo(obj)
          this.$vux.toast.show({
            text: '保存成功',
            onHide () {
              _this.$router.push({ name: 'settings' })
            }
          })
        } else {
          this.$vux.toast.show({
            text: '设置失败，请重试',
            type: 'warn'
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    ...mapActions([
      'setUserInfo'
    ])
  },
  created () {
    if (this.userInfo.gender === 1) {
      this.chooseChecked = 1
    } else {
      this.chooseChecked = 0
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
    .settingsBox
      .sexBox
        margin-top 1.2rem
        background $color-theme-white
        width 100%
        box-sizing border-box
        padding 1.2rem 1.6rem
        .title
          color $color-text
          font-size $font-size-medium
        .info
          margin-top 1.2rem
          font-size 1.2rem
          color $color-text-d
          line-height 2rem
        .radioBox
          margin-top 0.5rem
          height 5rem
          line-height 5rem
          border-bottom-1px($color-text-ll)
          .radioBoxContainer
            font-size 0
            display inline-block
            &:first-child
              margin-right 8rem
            .weui-cells_checkbox
              position relative
              top -0.5rem
            .title
              margin-left 0.5rem
              color $color-text
      .btnBox
        width 100%
        padding 2rem 1.8rem
        box-sizing border-box
        .btn
          width 100%
          border-width 0
          outline 0
          -webkit-appearance none
          position relative
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
          &:active
            background $color-theme-active
</style>
