<template>
  <div class="app">
    <div class="wrap" v-for="(item,index) in goods" :key="index" @click="doRouter(index,item.sellerTaskId)">
      <div class="img">
        <img v-lazy="item.imgSrc" alt="">
        <p class="vip" v-if="item.vip===1">Plus专享</p>
      </div>
      <h4>
        <span v-if="hot===1" class="hot iconfont icon-hot" alt=""></span>{{item.info}}</h4>
      <div class="progress border-1px">
        <p class="size">{{item.progress}}%</p>
        <p class="red" :style='{width:item.progress+"%"}'></p>
      </div>
      <div class="btn">
        <p class="pric">¥{{item.msg.pric}}</p>
        <p class="baina" v-if="item.msg.state === 0">{{item.msg.baina}}</p>
        <p class="zhuan" v-if="item.msg.state === 1">白拿还赚
          <span>{{item.msg.zhuan}}</span>金币</p>
        <p class="hua" v-if="item.msg.state === 2">花
          <span>{{item.msg.hua}}</span>金币白拿</p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    goods: {
      type: Array,
      default: [],
    }
  },
  name: "",
  data() {
    return {
      hot: 0
    }
  },
  methods: {
    doRouter(index, sellerTaskId) {
      this.$emit('myrouter', index, sellerTaskId)
    }
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
  width 50%
  padding 10px
  box-sizing border-box
  background white
.img
  height 14.5rem
  position relative
  img
    width 100%
    height 100%
    border-radius 5px
  .vip
    background red
    width 5rem
    height 2rem 
    color white
    position absolute
    top 2rem
    left 0
    line-height 2rem
    text-align center
    font-size 0.9rem
.btn
  display flex
  justify-content space-between
  margin-top 1.65rem
  .baina
    border 1px solid $color-error
    color $color-error
    width 3.6rem
    height 1.8rem
    border-radius 2px
    font-size 1rem
    line-height 1.8rem
    text-align center
    margin-top -0.4rem
  .zhuan
    color $color-error
    font-size 0.8rem
    margin-top -0.4rem
    span
      font-size 1.5rem
  .hua
    color $color-theme-orange
    font-size 0.8rem
    margin-top -0.4rem
    span
      font-size 1.5rem
  .pric
    text-decoration line-through
    color $color-text-l
    font-size 1.4rem
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
    font-size 1.5rem
    color $color-error
.progress
  height 1rem
  margin-top 0.8rem
  border-1px($color-theme-active, 1rem)
  .red
    // width 30%
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
