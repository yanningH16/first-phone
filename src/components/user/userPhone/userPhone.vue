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
                <button slot="right" class="btn" @click="getCode(userInfo.telephone,1)" :class="{'btn-disabled':!btnCodeState}">{{codeText}}</button>
              </x-input>
            </group>
            <group v-else>
              <x-input required v-model="userNewPhone" placeholder="输入手机号" is-type="china-mobile" required ref="userNewPhone"></x-input>
              <x-input placeholder="请输入验证码" required v-model="userNewMsg" type="number">
                <button slot="right" class="btn" @click="getCode(userNewPhone,2)" :class="{'btn-disabled':!btnNewCodeState}">{{codeText}}</button>
              </x-input>
            </group>
          </div>
          <h1 class="info">1.为保障你的账号安全，变更重要信息需要身份验证</h1>
          <h1 class="info">2.有疑问请联系在线客服</h1>
          <div class="btnBox">
            <button class="btn" :class="{'btn-disabled':!btnSaveState}" v-if="stepIndex===0" @click="checkCode(userMsg,userPhone,1)">下一步</button>
            <button class="btn" :class="{'btn-disabled':!btnSureState}" v-else @click="checkCode(userNewMsg,userNewPhone,2)">确定</button>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import Step from '../../../base/step/step'
import { XInput, Group } from 'vux'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "userQq",
  components: {
    Scroll,
    XInput,
    Group,
    Step
  },
  watch: {
    userMsg(val) {
      if (val.length == 6) {
        this.btnSaveState = true
        return false
      }
      this.btnSaveState = false
    },
    userNewPhone(val) {
      if (this.$refs.userNewPhone.valid) {
        this.btnNewCodeState = true
      }
    },
    userNewMsg(val) {
      if (val.length == 6 && this.$refs.userNewPhone.valid) {
        this.btnSureState = true
        return false
      }
      this.btnSureState = false
    },
  },
  computed: {
    userPwdPhone: {
      get: function () {
        let reg = /^(\d{3})\d{4}(\d{4})$/;
        let tel = this.userInfo.telephone.replace(reg, "$1^-^$2");
        return tel
      },
      set: function (v) {
      }
    },
    //获取已经存储手机号
    ...mapGetters([
      'userPhone',
      'userInfo'
    ])
  },
  data() {
    return {
      stepArray: ['验证身份', '绑定新手机'],
      stepIndex: 0,
      btnSaveState: false,
      btnCodeState: true,
      btnSureState: false,
      btnNewCodeState: false,
      userMsg: '',
      userNewPhone: '',
      userNewMsg: '',
      disabled: '',
      time: 60,
      codeText: '获取',
      timer: null,
      chooseState: 1
    }
  },
  methods: {
    //获取短信验证码
    getCode(phone, state) {
      this.$axios.post('/api/sms/send', {
        telephone: phone,
        type: 0
      }).then((response) => {
        if (response.data.code === '200') {
          this.chooseState = state
          if (state === 1) {
            this.btnCodeState = false
          } else {
            this.btnNewCodeState = false
          }
          this.timer = setInterval(this.timeGo, 1000)
        } else {
          this.$vux.alert.show({
            title: '错误提示',
            content: response.data.message,
          })
        }
      }).catch((error) => {
        console.log(error)
        this.btnCodeState = true
        this.$vux.alert.show({
          title: '错误提示',
          content: '服务器错误',
        })
      })
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
        if (this.chooseState === 1) {
          this.btnCodeState = true
        } else {
          this.btnNewCodeState = true
        }
      }
    },
    //验证验证码
    checkCode(newMsg, phone, state) {
      if (state === 1 && this.btnSaveState || state === 2 && this.btnSureState) {
        this.$axios.post('/api/sms/verify', {
          telephone: phone,
          code: newMsg,
          type: 0
        }).then((response) => {
          let _this = this
          if (response.data.code !== '200') {
            this.$vux.alert.show({
              title: '错误提示',
              content: response.data.message,
            })
          } else {
            if (state === 1) {
              this.stepIndex = 1
              this.codeText = '获取'
              this.time = 60
              clearInterval(this.timer)
              this.timer = null
            } else {
              this.updatePhone()
            }
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    updatePhone() {
      //做请求
      // let obj = Object.assign({}, this.userInfo, {
      //   telephone: this.userNewPhone
      // })
      // this.setUserInfo(obj)
      // this.$vux.toast.show({
      //   text: '修改成功',
      //   type: 'success',
      //   time: 1000,
      //   onHide() {
      //     _this.$router.push({ name: 'user' })
      //   }
      // })
    },
    ...mapActions([
      'setUserInfo'
    ])
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
          border-small($color-text, $border-radius)
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
        .btn-disabled
          opacity 0.3
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
        .btn-disabled
          background-color $color-theme-disabled
          color rgba(255, 255, 255, 0.3)
          &:active
            background $color-theme-active
</style>
