<template>
  <div class="info">
    <p class="text">
      <slot></slot>
    </p>
    <p v-for="(item,index) in infoArr" :key="index" class="text" v-if="isIndex">{{index+1}}.{{item}}</p>
    <p v-for="(item,index) in infoArr" :key="index" class="text" v-if="!isIndex">{{item}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'info',
  props: {
    infoArr: {
      type: Array,
      default: []
    },
    isIndex: {
      type: Boolean,
      default: true
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
.info
  width 100%
  padding 1.2rem 1.6rem
  box-sizing border-box
  .text
    color $color-text-d
    font-size $font-size-normal
    line-height $line-height
</style>