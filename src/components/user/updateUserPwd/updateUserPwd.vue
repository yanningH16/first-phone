<template>
  <transition name="move">
    <div class="settings">
      <scroll ref="scroll" class="scroll-content">
        <div class="userBox">
          <div class="step">
            <step :stepArray="stepArray" :stepIndex="stepIndex"></step>
          </div>
          <div class="InputBox">
            <group v-if="stepIndex===0">
              <x-input required v-model="userPwdPhone" :disabled="disabled"></x-input>
              <x-input placeholder="请输入验证码" required v-model="userMsg" type="number">
                <button slot="right" class="btn" @click="getCode" :class="{'btn-disabled':!btnCodeState}">{{codeText}}</button>
              </x-input>
            </group>
            <group v-else>
              <x-input required v-model="pwd" type="password" placeholder="输入新登录密码" :is-type="pwdType" ref="pwd"></x-input>
              <x-input required v-model="rePwd" type="password" placeholder="确认新登录密码" :is-type="rePwdType" ref="rePwd"></x-input>
            </group>
          </div>
          <info :infoArr="infos"></info>
          <div class="btnBox">
            <m-Button @my-click="next" :class="{'btn-disabled':!btnNextState}" v-if="stepIndex===0">下一步</m-Button>
            <m-Button @my-click="save" :class="{'btn-disabled':!btnSaveState}" v-else>确认密码</m-Button>
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
import { XInput, Group, md5 } from 'vux'
import { mapGetters } from 'vuex'
export default {
  name: 'updateUserPwd',
  components: {
    Scroll,
    XInput,
    Group,
    Step,
    MButton,
    Info
  },
  watch: {
    userMsg (val) {
      if (val.length === 6) {
        this.btnNextState = true
        return false
      }
      this.btnNextState = false
    },
    pwd (val) {
      this.checkState()
    },
    rePwd (val) {
      this.checkState()
    }
  },
  computed: {
    userPwdPhone: {
      get: function () {
        let reg = /^(\d{3})\d{4}(\d{4})$/
        let tel = this.userInfo.telephone.replace(reg, '$1^-^$2')
        return tel
      },
      set: function (val) {
        return val
      }
    },
    // 获取已经存储手机号
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    if (this.userInfo.telephone.length) {
      this.userMyPhone = this.userInfo.telephone
    } else {
      this.userMyPhone = '15345812564' // 应让其登录
    }
  },
  data () {
    return {
      stepArray: ['验证身份', '设置新密码'],
      infos: [
        '为保障你的账号安全，变更重要信息需要身份验证',
        '有疑问请联系在线客服'
      ],
      userMyPhone: '',
      stepIndex: 0, // 进度
      btnCodeState: true,
      btnNextState: false,
      btnSaveState: false,
      userMsg: '',
      disabled: '',
      time: 60,
      codeText: '获取',
      timer: null,
      pwd: '', // 密码
      rePwd: '',
      pwdType: (val) => {
        let reg = new RegExp(/((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{6,16}$/)
        if (reg.test(val)) {
          return {
            valid: true
          }
        }
        return {
          valid: false,
          msg: '请输入正确的密码'
        }
      },
      rePwdType: (val) => {
        if (val === this.pwd) {
          return {
            valid: true
          }
        }
        return {
          valid: false,
          msg: '两次密码不一致'
        }
      }
    }
  },
  methods: {
    // 发送验证码
    getCode () {
      if (this.btnCodeState) {
        this.btnCodeState = false
        this.$axios.post('/api/sms/send', {
          telephone: this.userMyPhone,
          type: 0
        }).then((response) => {
          if (response.data.code === '200') {
            this.timer = setInterval(this.timeGo, 1000)
          }
        }).catch(() => {
          this.btnCodeState = true
          this.$vux.alert.show({
            title: '错误提示',
            content: '服务器错误'
          })
        })
      }
    },
    // 倒计时
    timeGo () {
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
    // 检查状态
    checkState () {
      if (this.$refs.pwd.valid && this.$refs.rePwd.valid) {
        this.btnSaveState = true
        return false
      }
      this.btnSaveState = false
    },
    // 下一步(验证验证码是否正确)
    next () {
      this.$axios.post('/api/sms/verify', {
        telephone: this.userMyPhone,
        code: this.userMsg,
        type: 0
      }).then((response) => {
        if (response.data.code !== '200') {
          this.$vux.alert.show({
            title: '错误提示',
            content: response.data.message
          })
        } else {
          this.stepIndex = 1
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 修改密码
    save () {
      if (!this.btnSaveState) {
        return false
      }
      this.$axios.post('/api/user/resetPassword', {
        telephone: this.userMyPhone,
        password: md5(this.pwd)
      }).then((response) => {
        let data = response.data
        if (data.code !== '200') {
          this.$vux.alert.show({
            title: '错误提示',
            content: data.message
          })
        } else {
          let _this = this
          this.$vux.toast.show({
            text: '修改成功',
            type: 'success',
            time: 1000,
            onHide () {
              _this.$router.push({ name: 'user' })
            }
          })
        }
      }).catch(() => {
        this.$vux.alert.show({
          title: '错误提示',
          content: '服务器错误'
        })
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
    .userBox
      .InputBox
        margin-top 1.2rem
        .btn
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
          border-1px($color-text, $border-radius)
          border none
        .btn-disabled
          opacity 0.3
      .btnBox
        width 100%
        padding 0.8rem 1.8rem
        box-sizing border-box
</style>