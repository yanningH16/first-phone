<template>
  <x-dialog v-model="showToast" class="dialog-demo">
    <div class="checkBox">
      <h1 class="title">{{checkListBox.title}}</h1>
      <div class="listBox">
        <div class="list border-bottom-1px" v-for="(item,index) in checkListBox.list" :key="index">
          <div class="text">{{showCheckText(item)}}</div>
          <div class="icon iconfont" :class="{'icon-pass':item.status===1,'icon-no-pass':item.status===0}"></div>
        </div>
      </div>
      <div class="btn border-top-1px">{{checkListBox.btnText}}</div>
    </div>
  </x-dialog>
</template>
<script type="text/ecmascript-6">
import { XDialog } from 'vux'
export default {
  name: "component_name",
  components: {
    XDialog
  },
  props: {
    showToast: {
      type: Boolean,
      default: false
    },
    checkListBox: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    //检验状态
    showCheckText(item) {
      return item.status === 1 ? item.textSuc : item.textErr
    },
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '../../assets/stylus/variable'
@import '../../assets/stylus/mixin'
.checkBox
  background #fff
  .title
    color $color-text
    font-size $font-size-large-x
    width 100%
    text-align center
    padding 2.8rem 0 0.9rem 0
    font-weight 300
  .listBox
    box-sizing border-box
    width 100%
    padding 0 2.8rem
    .list
      width 100%
      padding 1.9rem 0 1.5rem 0
      border-bottom-1px($color-text-ll)
      display flex
      .text
        flex 1
        color $color-text-d
        font-size $font-size-medium
        text-align left
      .icon
        flex 0 0 2rem
        font-size 2rem
        &.icon-pass
          color $color-use
        &.icon-no-pass
          color $color-error
  .btn
    margin-top 2rem
    border-top-1px($color-text-ll)
    text-align center
    font-size $font-size-medium-x
    color $color-error
    padding 1.7rem 0
</style>
