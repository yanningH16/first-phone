<template>
  <div class="weui-cells_checkbox">
    <div class="weui-cell__hd">
      <input type="checkbox" name="vux-checkbox-o98un" class="weui-check">
      <i :class="{'weui-icon-checked-Active':isChecked}" class="weui-icon-checked"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { Checklist } from 'vux'
export default {
  name: 'component_name',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Checklist
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable.styl'
.weui-cells_checkbox
  display inline-block
  vertical-align bottom
  .weui-check
    display none
  .weui-icon-checked
    &:before
      font-size 1.8rem
  .weui-icon-checked-Active
    &:before
      font-size 1.8rem
      content '\EA06'
      color $color-text
</style>