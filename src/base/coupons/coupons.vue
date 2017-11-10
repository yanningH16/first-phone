<template>
  <div class="coupons" :class="{'disabled':item.state!==1}">
    <div class="couponHeader">
      <span class="price">{{item.maxPrice}}元</span>
      <span class="text">{{item.text}}</span>
    </div>
    <div class="couponBottom">
      <p>标价为:{{item.maxPrice}}元以内的商品可以使用</p>
      <p>有效期至：{{item.time}}</p>
    </div>
    <div class="otherState" v-if="item.state!==1" :class="{'oldYear':item.state!==3}">
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'component_name',
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
.coupons
  width 100%
  height 12rem
  display flex
  flex-direction column
  padding 2rem 2rem
  box-sizing border-box
  background-image url('./bizhong_bg_nor.svg')
  background-size 100%
  position relative
  &.disabled
    background-image url('./bizhong_bg_dis.svg')
    background-size 100%
  .couponHeader
    flex 1
    font-size 0
    margin-bottom 2rem
    .price
      font-size $font-size-coupons
      color $color-theme-white
      font-weight 300
    .text
      color $color-theme-white
      font-size $font-size-medium
      font-weight 300
  .couponBottom
    flex 1
    font-size 0
    p
      color $color-theme-white
      margin-bottom 0.5rem
      font-size $font-size-normal
      font-weight 300
  .otherState
    position absolute
    background-image url('./bizhong_state_done.svg')
    background-size 100%
    height 8rem
    width 10rem
    position absolute
    right 1rem
    bottom 1.5rem
    &.oldYear
      background-image url('./bizhong_state_overdue.svg')
</style>
