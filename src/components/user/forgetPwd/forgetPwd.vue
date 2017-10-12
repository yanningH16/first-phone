<template>
  <transition name="move">
    <div class="userContainer">
      <div class="userContainerBox">
        <div class="register">
          <div class="groupBox">
            <group>
              <x-input required placeholder="输入手机号" is-type="china-mobile" v-model="phone" ref="phone"></x-input>
              <x-input placeholder="请输入验证码" required type="number" :is-type="msgType" class="inputBox" v-model="msg" ref="msg">
                <button slot="right" class="btn" @click="getCode" :class="{'btn-disabled':!btnCodeState}">{{codeText}}</button>
              </x-input>
              <x-input required placeholder="设定登录密码(不少于6位)" :is-type="pwdType" type="password" v-model="pwd" ref="pwd"></x-input>
            </group>
          </div>
          <div class="btnBox">
            <m-Button @my-click="uploadPwd" :class="{'btn-disabled':!btnSaveState}">确定</m-Button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { XInput, Group, md5 } from 'vux'
import Scroll from '../../../base/scroll/scroll'
import MButton from '../../../base/button/button'
import { mapActions } from 'vuex'
export default {
  name: "registerOne",
  components: {
    XInput,
    Group,
    MButton,
    Scroll
  },
  watch: {
    phone(val) {
      if (this.$refs.phone.valid) {
        this.btnCodeState = true
        return false
      }
      this.btnCodeState = false
      this.checkState()
    },
    msg() {
      this.checkState()
    },
    pwd() {
      this.checkState()
    }
  },
  data() {
    return {
      btnCodeState: false,
      btnSaveState: false,
      phone: null,
      msg: null,
      msgType: (val) => {
        if (val.length === 6) {
          return {
            valid: true,
          }
        } else {
          return {
            valid: false,
            msg: '验证码为6位'
          }
        }
      },
      pwd: null,
      pwdType: (val) => {
        let str = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{6,16}$/
        if (str.test(val)) {
          return {
            valid: true,
          }
        } else {
          return {
            valid: false,
            msg: '密码码为6位'
          }
        }
      },
      qq: null,
      codeText: '获取',
      time: 60,
      timer: null
    }
  },
  methods: {
    checkState() {
      let isPhone = this.$refs.phone.valid
      let isMsg = this.$refs.msg.valid
      let isPwd = this.$refs.pwd.valid
      if (isPhone && isMsg && isPwd) {
        this.btnSaveState = true
      } else {
        this.btnSaveState = false
      }
    },
    getCode() {
      if (this.btnCodeState) {
        this.btnCodeState = false
        this.$axios.post('/api/sms/send', {
          telephone: this.phone,
          type: 0
        }).then((response) => {
          if (response.data.code === '200') {
            this.timer = setInterval(this.timeGo, 1000)
          }else{
            this.btnCodeState = true
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
        this.codeText = `已发送(${this.time}`
        this.time--
      } else {
        this.codeText = '重新获取'
        this.time = 60
        clearInterval(this.timer)
        this.timer = null
        this.btnCodeState = true
      }
    },
    uploadPwd() {
      if(!this.btnSaveState) return false
      this.$vux.loading.show({
        text: '请稍后'
      })
      this.$axios.post('/api/sms/verify', {
        telephone: this.phone,
        code: this.msg,
        type: 0
      }).then((response) => {
        this.$vux.loading.hide()
        if (response.data.code !== '200') {
          this.$vux.alert.show({
            title: '错误提示',
            content: response.data.message,
          })
        }else{
          this.savePwd()
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    savePwd(){
      this.$axios.post('/api/user/resetPassword', {
        telephone: this.phone,
        password: md5(this.pwd),
      }).then((response) => {
        this.$vux.loading.hide()
        let data = response.data
        if (data.code !== "200") {
          this.$vux.alert.show({
            title: '错误提示',
            content: data.message,
          })
        } else {
          //登录成功
          this.setUserPhoneHistory(this.phone)
          this.$router.push({ name: 'login' })
        }
      }).catch((error) => {
        this.$vux.loading.hide()
        this.$vux.alert.show({
          title: '错误提示',
          content: '服务器错误',
        })
      })
    },
    ...mapActions([
      'setUserPhoneHistory'
    ])
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
  background: $color-background
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
    .register 
      .groupBox 
        margin-top 1.2rem
        .inputBox 
          .btn 
            border-small($color-text, $border-radius)
            outline 0
            -webkit-appearance: none
            position relative
            height 3.4rem
            padding 0 1rem
            font-size $font-size-medium
            text-align center
            text-decoration none
            color $color-text
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
            font-weight $font-weight
            background $color-theme-white
            position relative
            right -1.5rem
            &.btn-disabled 
              opacity 0.3
      .btnBox 
        width 100%
        padding 0.5rem 1.8rem
        box-sizing border-box
        margin-top 1.2rem
</style>
