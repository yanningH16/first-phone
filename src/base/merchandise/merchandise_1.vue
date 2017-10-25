<template>
  <div class="app">
    <div class="wrap">
      <div class="img">
        <img v-lazy="obj.imgSrc" alt="">
      </div>
      <h4>
        <span v-if="hot===1" class="hot iconfont icon-hot" alt=""></span>{{obj.info}}</h4>
      <div class="progress border-1px">
        <p class="size">{{obj.progress}}%</p>
        <p class="red" :style='{width:obj.progress+"%"}'></p>
      </div>
      <div class="btn">
        <p class="pric">¥{{obj.msg.pric}}</p>
        <p class="baina" v-if="obj.msg.state === 0">{{obj.msg.baina}}</p>
        <p class="zhuan" v-if="obj.msg.state === 1">白拿还赚
          <span>{{obj.msg.zhuan}}</span>金币</p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    obj: {
      type: Object,
      default: {}
    }
  },
  name: "",
  data() {
    return {
      hot: 0
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
@import '../../assets/stylus/mixin'
.app
  display flex
  justify-content space-between
  /* width 100% */
  flex-wrap wrap
.wrap
  width 100%
  padding 10px
  box-sizing border-box
  background white
.img
  height 14.5rem
  img
    width 100%
    height 100%
    border-radius 5px
.btn
  display flex
  justify-content space-between
  align-items center
  margin-top 1.65rem
  line-height 2rem
  .baina
    border 1px solid $color-error
    color $color-error
    width 3.6rem
    height 1.8rem
    border-radius 2px
    font-size 1rem
    line-height 1.8rem
    text-align center
  .zhuan
    color $color-error
    font-size 1rem
    span
      font-size 1rem
  .pric
    text-decoration line-through
    color $color-text-l
    font-size 1rem
h4
  height 1.4rem
  margin-top 0.8rem
  font-size 1.4rem
  font-weight 300
  color #08090a
  white-space nowrap
  overflow hidden
  text-overflow ellipsis
  .hot
    display inline-block
    vertical-align middle
    margin-right 0.55rem
    border-radius 50%
    width 1.5rem
    height 1.7rem
.progress
  height 1rem
  margin-top 0.8rem
  border-1px($color-theme-active, 1rem)
  .red
    width 80%
    height 1rem
    border-radius 5px
    background $color-theme-active
    opacity 0.2
    margin-top -1rem
  .size
    text-align center
    font-size 1rem
    color #cc3d46
.line
  margin-top 12px
  font-size 1.8rem
  color #b7b9bf
  text-decoration line-through
.first
  margin-top 12px
  font-size 1.2rem
  color #e6a545
  font-weight 300
  span
    font-size 1.8rem
.two
  margin-top 12px
  font-size 1.2rem
  color #ff3340
  font-weight 500
  span
    font-size 1.8rem
</style>

