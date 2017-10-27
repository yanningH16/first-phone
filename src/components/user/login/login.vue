<template>
  <transition name="move">
    <div class="userContainer">
      <div class="userContainerBox">
        <div class="login">
          <p class="info" @click="goRegister">去注册</p>
          <div class="header">
            <p class="text">手机号密码登录</p>
          </div>
          <div class="inputBox">
            <div class="inputBoxCell border-bottom-1px">
              <input type="number" placeholder="输入手机号" class="input" v-model="phone">
            </div>
            <div class="inputBoxCell border-bottom-1px">
              <input type="password" placeholder="输入密码" class="input" v-model="pwd">
            </div>
          </div>
          <div class="btnBox">
            <m-Button @my-click="doLogin" :class="{'btn-disabled':!btnSaveState}">登录</m-Button>
            <p class="btnOther" @click="forgetPwd">忘记密码</p>
          </div>
          <div class="bottom">
            <divider class="divider">其他方式登录</divider>
            <div class="otherLogin">
              <div class="otherLoginBox" @click="otherClick">
                <div class="img">
                  <img src="./weixin.png" alt="">
                </div>
                <span>微信登录</span>
              </div>
              <div class="otherLoginBox" @click="otherClick">
                <div class="img">
                  <img src="./QQ.png" alt="">
                </div>
                <span>QQ登录</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Pay from '../../../base/pay/pay'
import MButton from '../../../base/button/button'
import { Divider, md5 } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
export default {
  name: "login",
  components: {
    MButton,
    Divider
  },
  mounted() {
    this.phone = this.userPhone
  },
  watch: {
    phone() {
      this.checked()
    },
    pwd() {
      this.checked()
    }
  },
  data() {
    return {
      btnSaveState: true,
      phone: this.userPhone,
      pwd: ''
    }
  },
  computed: {
    ...mapGetters([
      'userPhone'
    ])
  },
  methods: {
    checked() {
      if ((/^1[34578]\d{9}$/.test(this.phone) && this.pwd.length >= 6)) {
        this.btnSaveState = true
        return false
      }
      this.btnSaveState = false
    },
    goRegister() {
      this.$router.push({ name: 'registerOne' })
    },
    doLogin() {
      if (this.btnSaveState) {
        this.$vux.loading.show({
        })
        this.$axios.post('/api/user/login', {
          telephone: this.phone,
          password: md5(this.pwd)
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
            this.setUserInfo(data.data)
            this.setUserPhoneHistory(this.phone)
            this.$router.push({ name: 'index' })
          }
        }).catch((error) => {
          this.$vux.loading.hide()
          this.$vux.alert.show({
            title: '错误提示',
            content: '网络故障',
          })
        })
      }
    },
    forgetPwd() {
      this.setUserPhoneHistory(this.phone)
      this.$router.push({ name: 'forgetPwd' })
    },
    otherClick() {
      this.$vux.alert.show({
        title: '温馨提示',
        content: '功能开发中',
        buttonText: '我知道了'
      })
    },
    ...mapActions([
      'setUserInfo',
      'setUserState',
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
  background $color-background
  &.move-enter-active, .move-leave-active
    transition all 0.2s linear
    transform translate3d(0, 0, 0)
  &.move-enter, .move-leave
    transform translate3d(100%, 0, 0)
  .userContainerBox
    background #fff
    width 100%
    height 100%
    .login
      height 100%
      position relative
      min-height 568px
      .info
        text-align right
        padding-right 1.6rem
        padding-top 1.6rem
        font-size $font-size-medium
        color $color-text-d
      .header
        width 100%
        text-align center
        padding 3rem 0
        .text
          font-size $font-size-large-x
          color $color-text
      .inputBox
        box-sizing border-box
        padding 0 1.6rem
        width 100%
        margin-bottom 2rem
        .inputBoxCell
          border-bottom-1px($color-text-ll)
          .input
            width 100%
            height 5rem
            line-height 5rem
            font-size $font-size-medium
            border 0
            outline 0
            -webkit-appearance none
            background-color transparent
      .btnBox
        box-sizing border-box
        padding 0 1.6rem
        width 100%
        .btnOther
          text-align center
          font-size $font-size-medium
          color $color-text
          margin-top 1.6rem
      .bottom
        box-sizing border-box
        padding 0 1.6rem
        width 100%
        position absolute
        bottom 0
        padding-bottom 3.2rem
        .divider
          font-size $font-size-normal
          color $color-text-d
        .otherLogin
          text-align center
          display flex
          box-sizing border-box
          padding 1rem 6rem 0 6rem
          .otherLoginBox
            flex 1
            font-size 0
            display flex
            flex-direction column
            .img
              flex 1
              margin-bottom 0.8rem
              img
                width 3rem
                height 3rem
            span
              flex 1
              font-size $font-size-normal
              color $color-text-d
</style>
