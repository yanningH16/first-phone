<template>
  <div class="tab border-top-1px">
    <router-link tag="div" class="tab-item" to="/index">
      <i class="iconfont icon-icon-home"></i>
      <span class="tab-link">首页</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/nopay">
      <i class="iconfont icon-icon-baina"></i>
      <span class="tab-link">白拿</span>
    </router-link>
    <router-link tag="div" class="tab-item" style="opacity: 0.3;" to="/rushou">
      <i class="iconfont icon-icon-rushou"></i>
      <span class="tab-link">入手</span>
    </router-link>
    <router-link tag="div" class="tab-item" style="opacity: 0.3;" to="/youpin">
      <i class="iconfont icon-icon-youpin"></i>
      <span class="tab-link">有品</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/user">
      <i class="iconfont icon-icon-user"></i>
      <span class="tab-link">我的</span>
    </router-link>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'app',
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../assets/stylus/variable"
@import "../../assets/stylus/mixin"
  .tab
    display flex
    flex 0 0 5rem
    height 5rem
    line-height 5rem
    width 100%
    border-top-1px(rgba(7,17,27,0.1))
    font-size 0
    background #fff
    z-index 99
    position fixed
    bottom 0
    .tab-item
      flex: 1
      text-align center
      display flex
      flex-direction column
      justify-content center
      color $color-text
      &:nth-child(2)
        .iconfont
          font-size $font-size-large-x
          line-height $font-size-large-x
      .iconfont
        font-size $font-size-large-x
        line-height $font-size-large-x
      .tab-link
        margin-top $margin-top-5
        color $color-text
        line-height $font-size-small
        font-size $font-size-small
      &.router-link-active
        .iconfont,.tab-link
          color $color-theme
</style>