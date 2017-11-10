<template>
  <div class="submit_box">
    <scroll ref="scroll" style="height: 100%" :click="false">
      <div>
        <div class="success_box">
          <div class="successImg">
            <!--<img src="./img/successImg.png" alt="">-->
            <span class="iconfont icon-succeed"></span>
          </div>
          <div class="state">
            <div class="title">{{content.title}}</div>
            <div class="info">{{content.info}}</div>
          </div>
          <div class="toIndex">
            <router-link :to="{ name: 'index' }" class="btnBox">
              <m-Button>返回首页</m-Button>
            </router-link>
            <router-link :to="{ name: content.router }" class="btnBox">
              <m-Button>{{content.routerText}}</m-Button>
            </router-link>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll.vue'
import MButton from '../../base/button/button'
export default {
  name: 'state',
  components: {
    Scroll,
    MButton
  },
  mounted () {
    // this.content = this.$route.params.content
  },
  data () {
    return {
      content: {
        title: '提交成功，请耐心等待',
        info: '当天提交的支付宝审核预计在1小时左右完成审核,21:00之后提交的将于次日审核',
        router: 'login',
        routerText: '立即登陆'
      }
    }
  },
  methods: {
    toNoPay () {
      this.$router.push({ name: 'nopay' })
    },
    goDetail (item) {

    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.submit_box
  background #EFF0F2
  width 100%
  height 100%
  position fixed
  top 0
  left 0
  z-index 999
.success_box
  background #fff
  padding 1.6rem 2rem
  .successImg
    text-align center
    padding-top 4rem
    padding-bottom 1rem
    span
      font-size 6rem
      color #51cc68
  .state
    .title
      font-size 1.4rem
      text-align center
      margin-bottom 1.2rem
    .info
      font-size 1.2rem
      text-align center
      margin-bottom 1.2rem
      line-height 2rem
      color #75787f
  .toIndex
    display flex
    justify-content center
    .btnBox
      margin-right 1rem
      display inline-block
      &:first-child
        .btn
          background-color #fff
          color #08090a
          border 1px solid #383a3f
      &:last-child
        margin-left 1rem
        margin-right 1rem
      .btn
        padding 0 1rem
</style>
