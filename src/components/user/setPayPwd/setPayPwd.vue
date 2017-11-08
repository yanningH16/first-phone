<template>
  <transition name="move">
    <div class="settings">
      <scroll ref="scroll" class="scroll-content">
        <div class="userAddressBox">
          <div class="step">
            <step :stepArray="stepArray" :stepIndex="stepIndex"></step>
          </div>
          <div class="addressInputBox">
            <group v-if="stepIndex===0">
              <x-input required v-model="userPwdPhone" :disabled="disabled"></x-input>
              <x-input placeholder="请输入验证码" required v-model="userMsg" type="number">
                <button slot="right" class="btn" @click="getCode" :class="{'btn-disabled':!btnCodeState}">{{codeText}}</button>
              </x-input>
            </group>
            <group v-else-if="stepIndex===1">
              <pwdbox title="请输入6位密码" :length='maxLength' v-model="pwd"></pwdbox>
            </group>
            <group v-else>
              <pwdbox title="确认6位密码" :length='maxLength' v-model="rePwd"></pwdbox>
            </group>
          </div>
          <info :infoArr="infos"></info>
          <div class="btnBox">
            <m-Button @my-click="nextOne" :class="{'btn-disabled':!btnSaveState}" v-if="stepIndex===0">下一步</m-Button>
            <m-Button @my-click="nextTwo" :class="{'btn-disabled':!btnNexteState}" v-else-if="stepIndex===1">下一步</m-Button>
            <m-Button @my-click="sure" :class="{'btn-disabled':!btnSureState}" v-else>确认密码</m-Button>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import Step from '../../../base/step/step'
import MButton from '../../../base/button/button'
import Info from '../../../base/info/info'
import Pwdbox from '../../../base/pwdbox/pwdbox'
import { XInput, Group, md5 } from 'vux'
import { userInfoMixin } from '../../../assets/js/mixin'
export default {
  name: "userQq",
  mixins: [userInfoMixin],
  components: {
    Scroll,
    XInput,
    Group,
    Step,
    MButton,
    Info,
    Pwdbox
  },
  watch: {
    userMsg(val) {
      if (val.length == 6) {
        this.btnSaveState = true
        return false
      }
      this.btnSaveState = false
    },
    pwd(val) {
      if (val.length === this.maxLength) {
        this.btnNexteState = true
        return false
      }
      this.btnNexteState = false
    },
    rePwd(val) {
      if (val === this.pwd) {
        this.btnSureState = true
        return false
      }
      this.btnSureState = false
    }
  },
  computed: {
    userPwdPhone: {
      get: function () {
        let reg = /^(\d{3})\d{4}(\d{4})$/;
        let tel = this.userInfo.telephone.replace(reg, "$1^-^$2")
        return tel
      },
      set: function (v) {
        this.userPhone = v
      }
    }
  },
  data() {
    return {
      stepArray: ['验证身份', '设置密码', '确认密码'],
      infos: [
        '为保障你的账号安全，变更重要信息需要身份验证',
        '有疑问请联系在线客服'
      ],
      stepIndex: 0,//进度
      btnSaveState: false,
      btnCodeState: true,
      btnNexteState: false,
      btnSureState: false,
      userMsg: '',
      disabled: '',
      time: 60,
      codeText: '获取',
      timer: null,
      pwd: '',//密码
      maxLength: 6,
      rePwd: '',
    }
  },
  methods: {
    getCode() {
      if (this.btnCodeState) {
        this.btnCodeState = false
        this.$axios.post('/api/sms/send', {
          telephone: this.userInfo.telephone,
          type: 0
        }).then((response) => {
          if (response.data.code === '200') {
            this.timer = setInterval(this.timeGo, 1000)
          } else {
            this.$vux.alert.show({
              title: '错误提示',
              content: response.data.message,
            })
          }
        }).catch((error) => {
          this.btnCodeState = true
          this.$vux.alert.show({
            title: '错误提示',
            content: '服务器错误',
          })
        })
      }
    },
    timeGo() {
      if (this.time >= 0) {
        this.codeText = `${this.time}(s)`
        this.time--
      } else {
        this.codeText = '获取'
        this.time = 60
        clearInterval(this.timer)
        this.timer = null
        this.btnCodeState = true
      }
    },
    nextOne() {
      this.$axios.post('/api/sms/verify', {
        telephone: this.userPhone,
        code: this.userMsg,
        type: 0
      }).then((response) => {
        if (response.data.code !== '200') {
          this.$vux.alert.show({
            title: '错误提示',
            content: response.data.message,
          })
        } else {
          this.stepIndex = 1
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    nextTwo() {
      this.stepIndex = 2
      this.rePwd = ''
    },
    sure() {
      this.$axios.post('/api/user/resetDepositWord', {
        telephone: this.userPhone,
        depositPassword: md5(this.pwd),
      }).then((response) => {
        if (response.data.code !== '200') {
          this.$vux.alert.show({
            title: '错误提示',
            content: response.data.message,
          })
        } else {
          this.$vux.toast.show({
            text: '修改成功',
            type: 'success',
            time: 1000,
            onHide() {
              _this.$router.push({ name: 'user' })
            }
          })
        }
      }).catch((error) => {
        console.log(error)
      })
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
    .userAddressBox
      .info
        color $color-text-d
        font-size 1.2rem
        text-align left
        margin-top 1.2rem
        width 100%
        box-sizing border-box
        padding 0 1.8rem
      .addressInputBox
        .btn
          border-1px($color-text, $border-radius)
          outline 0
          -webkit-appearance none
          position relative
          height 3.4rem
          padding 0 1rem
          font-size $font-size-medium
          text-align center
          text-decoration none
          color $color-text
          border-radius $border-radius
          -webkit-tap-highlight-color rgba(0, 0, 0, 0)
          font-weight $font-weight
          background $color-theme-white
          position relative
          right -1.5rem
          border none
        .btn-disabled
          opacity 0.3
      .btnBox
        width 100%
        padding 2rem 1.8rem
        box-sizing border-box
</style>