<template>
  <div class="userHeader">
    <div class="avator">
      <img src="./avator.png" alt="" class="avatorImg">
    </div>
    <div class="info">
      <h1 class="name">{{userInfo.userName}}</h1>
      <div class="introduce">
        <span class="textName">{{userInfo.typeName}}</span>
        <button class="btnClass" @click="buyPlus">{{userInfo.btnName}}</button>
      </div>
    </div>
    <div class="btn">
      <img src="./arrow_down.png" alt="" class="arrow_down" @click="arrowClick">
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
export default {
  name: "userHeader",
  props:{
    userInfo:{
      type:Object,
      default:{}
    }
  },
  data () {
    return {
    }
  },
  methods:{
    arrowClick(){
      this.$emit('arrow-click')
    },
    buyPlus(){
       this.$emit('buy-plus')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .userHeader
    font-family PingFangSC
    width 100%
    height 12.6rem
    box-sizing border-box
    background-image url('./profile_bg.svg')
    background-size 100% 
    padding 2.8rem 2rem
    display flex
    .avator
      height 7rem
      flex 0 0 7rem
      .avatorImg
        width 100%
        height 100%
    .info
      margin-left 1.2rem
      flex 1 
      font-size 0
      display flex
      flex-direction column
      justify-content center
      .name
        height 1.6rem
        line-height 1.6rem
        font-size 1.6rem
        color #ffffff
        font-weight 300
        margin-bottom 0.8rem
      .introduce
        .textName
          height 1.4rem
          line-height 1.4rem
          font-size 1.4rem
          color #75787f
          font-weight 300
        .btnClass
          display inline-block
          height 1.8rem
          line-height 1.8rem
          font-size 1rem
          display: inline-block
          border-radius 0
          color #fff
          outline 0
          margin-left 1rem
          background transparent
          border 1px solid #fff
    .btn
      flex 0 0 2.5rem
      line-height 7rem
      .arrow_down
        width 2.5rem
        height 2.5rem
        vertical-align middle
</style>