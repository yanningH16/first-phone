<template>
  <div class="listContainer " :class="{'listContainer-noPad':list.length===0}">
    <div class="list border-bottom-1px" v-for="(item,index) in list" :key="index" v-show="list">
      <div class="listInfo">
        <p class="title">{{item.title}}</p>
        <p class="time">{{item.time}}</p>
      </div>
      <div class="listMoney">
        <div class="moneyBox">
          <span class="money">{{item.money}}</span>
          <span class="unit">{{item.unit}}</span>
        </div>
        <div class="infoBox" v-if="item.info">
          {{item.info}}
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "list",
  props: {
    list: {
      type: Array,
      default: []
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
@import '../../assets/stylus/mixin'
  .listContainer
    width 100%
    box-sizing border-box
    padding-left 1.6rem
    background $color-theme-white
    &.listContainer-noPad
      padding-left 0
    .list
      display flex
      box-sizing border-box
      width 100%
      height 7rem
      height 7rem
      padding-right 1.6rem
      border-bottom-1px($color-text-ll)
      &:last-of-type
        border-bottom-1px($color-theme-white)
      .listInfo
        flex 1
        font-size 0
        display flex
        flex-direction column
        justify-content center
        .title
          font-size $font-size-medium
          color $color-text
          width 90%
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
          margin-bottom 0.8rem
        .time
          font-size $font-size-normal
          color $color-text-d
      .listMoney
        flex 1
        font-size 0
        text-align right
        display flex
        flex-direction column
        justify-content center
        .moneyBox
          flex 0 0 1
          .money
            font-size $font-size-large
            color $color-text
            margin-right 0.5rem
          .unit
            font-size $font-size-normal
            color $color-text
        .infoBox
          margin-top $margin-top-8
          flex 0 0 1
          color $color-text-d
          font-size $font-size-small
</style>