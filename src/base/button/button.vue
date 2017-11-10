<template>
  <button class="btn" @click="myClick">
    <slot></slot>
  </button>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'button',
  methods: {
    myClick () {
      this.$emit('my-click')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
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
  &:active:not('.btn-disabled')
    background $color-theme-active
</style>