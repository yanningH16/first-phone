<template>
  <div id="app">
    <div class="wrap" v-for="(item,index) in arr" :key="index">
      <div class="one">
        <p :src="item.imgSrc"></p>
        <span>
            <strong>{{item.title}}</strong><br>
            <em>{{item.ins}}</em>
          </span>
        <h4>{{item.info}}</h4>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      arr: {
        type: Array
      }
    },
    name: "",
    data() {
      return {}
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .one
    height 7rem
    border-bottom 2px solid #f2f2f2
    margin-left 1.6rem
    p
      width 3rem
      height 3rem
      border-radius 50%
      border 1px solid green
      float left
      margin-top 2rem
    span
      float left
      margin-left 1rem
      margin-top 2rem
      strong
        display inline-block
        font-size 1.6rem
        line-height 1rem
      em
        display inline-block
        width 13rem
        font-size 1.2rem
        margin-top 0.8rem
        color #75787f
        font-style normal
    h4
      float right
      width 4.8rem
      height 3.4rem
      border-radius 4px
      border 1px solid black
      line-height 3.4rem
      text-align center
      font-size 1.4rem
      color black
      font-weight 300
      margin-right 1.6rem
      margin-top 1.8rem


</style>
