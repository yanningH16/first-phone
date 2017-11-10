<template>
  <div class="step border-bottom-1px">
    <div class="step-item" :class="{'step-item-disabled':stepIndex!==index}" v-for="(item,index) in stepArray" :key="index">
      <span class="step-num">{{index+1}}</span>
      <span class="step-text">{{item}}</span>
      <span class="step-arrow" v-show="index < stepArray.length - 1">
        <b class="right">
          <i class="right-arrow1"></i>
          <i class="right-arrow2"></i>
        </b>
      </span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'step',
  props: {
    stepArray: {
      type: Array,
      default: []
    },
    stepIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable.styl'
@import '../../assets/stylus/mixin.styl'
.step
  width 100%
  font-size 0
  display flex
  color $color-text
  background-color #ffffff
  border-bottom-1px(#d4d5d8)
  .step-item
    flex 1
    text-align center
    padding 1.6rem 0
    font-size $font-size-normal
    position relative
    .step-num
      margin-right 5px
    .step-arrow
      position absolute
      top 0
      right 1rem
      .right
        width 20px
        height 4.4rem
        position absolute
        left 0
        top 0
      .right-arrow1, .right-arrow2
        width 0
        height 0
        display block
        position absolute
        left 0
        top 0
        border-top 2.2rem transparent dashed
        border-right 10px transparent dashed
        border-bottom 2.2rem transparent dashed
        border-left 10px white solid
        overflow hidden
      .right-arrow1
        left 1px /* 重要 */
        border-left 10px #d4d5d8 solid
      .right-arrow2
        border-left 10px white solid
.step-item-disabled
  color $color-text-l
</style>