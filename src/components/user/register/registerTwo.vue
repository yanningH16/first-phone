<template>
  <transition name="move">
    <div class="userContainer">
      <div class="userContainerBox">
        <div class="register">
          <div class="groupBox" @click="doWeixin">
            <div class="left">
              <img src="./weixin.png" alt="" class="img">
              <span class="text">绑定微信</span>
            </div>
            <div class="right">
              <span class="stateText">{{stateText}}</span>
              <i class="iconfont icon-arrow-right"></i>
            </div>
          </div>
          <div class="btnBox">
            <m-Button @my-click="doNext" :class="{'btn-disabled':!btnSaveState}">下一步</m-Button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import MButton from '../../../base/button/button'
import { mapGetters } from 'vuex'
export default {
  name: "buyCoin",
  components: {
    MButton
  },
  data() {
    return {
      btnSaveState: false,
      stateText: '未绑定',
      wechatNum: 'ghstar',
      phone: '',
    }
  },
  computed: {
    ...mapGetters([
      'userPhone',
      'userInfo'
    ])
  },
  mounted() {
    console.log(this.userPhone)
  },
  methods: {
    //绑定微信
    doWeixin() {
      this.$axios.post('/api/user/register2', {
        telephone: this.userPhone,
        wechatNum: this.wechatNum
      }).then((response) => {
        let data = response.data
        if (data.code !== "200") {
          this.$vux.alert.show({
            title: '错误提示',
            content: data.message,
          })
        } else {
          //登录成功
          this.btnSaveState = true
        }
      }).catch((error) => {
        this.$vux.alert.show({
          title: '错误提示',
          content: 服务器错误,
        })
      })
    },
    doNext() {
      if (this.btnSaveState) {
        this.$router.push({ name: 'registerThree' })
      }
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
      .register
        .groupBox
          background $color-theme-white
          width 100%
          box-sizing border-box
          padding 1.2rem 1.6rem
          margin-top 0.8rem
          margin-bottom 2rem
          display flex
          .left
            flex 1
            font-size 0
            .img
              width 2.5rem
              height 2.5rem
              vertical-align middle
              margin-right 0.8rem
            .text
              font-size $font-size-medium
              color $color-text
              position relative
              top 0.55rem
          .right
            flex 1
            text-align right
            .stateText
              font-size $font-size-normal
              color $color-text-d
              height 100%
              display inline-block
              line-height 2.5rem
        .btnBox
          width 100%
          padding 0.5rem 1.8rem
          box-sizing border-box
</style>
