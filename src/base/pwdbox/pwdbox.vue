<template>
  <div class="pwdBox">
    <h1 class="title">{{title}}</h1>
    <div class="inputBox">
      <input ref="pwd" type="password" :maxlength="length" v-model="currentValue" class="inputContent"/>
      <ul class="inputLine" @click="focus">
        <li v-for="item in length" :key="item">
          <i v-if="msgLength+1 > item"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "component_name",
  props:{
    title:{
      type:String,
      default:'密码框'
    },
    length:{
      type:Number,
      default:6
    },
    value:{
      type:String,
      default:''
    }
  },
  created () {
    this.currentValue = this.value
  },
  data() {
    return {
      currentValue:'',
      msgLength:0
    }
  },
  watch: {
    value (curVal) {
      this.currentValue = curVal
    },
    currentValue (curVal) {
      if (/[^\d]/g.test(curVal)) {
        this.currentValue = this.currentValue.replace(/[^\d]/g, '');
      } else {
        this.msgLength = curVal.length;
        this.$emit("input",curVal)
      }
    }
  },
  methods: {
    focus() {
      this.$refs.pwd.focus()
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable.styl'
  .pwdBox
    width 100%
    height 116px
    background-color #ffffff
    box-sizing border-box
    padding 20px 16px
    .title
      width 100%
      text-align center
      font-size 1.4rem
      color $color-text
      line-height 1.4rem
      margin-bottom 12px
    .inputBox
      .inputContent
        position absolute
        z-index -1
        left -100%
        opacity 0
      .inputLine
        width 100%
        height 44px
        padding-bottom 1px
        margin 0 auto
        background: #fff
        border 1px solid #ddd
        display flex
        cursor: pointer
        li
          list-style-type none
          text-align center
          line-height: 34px
          flex 1
          border-right 1px solid #d4d5d8
          height 32px
          margin 6px 0
          &:last-child
            border-right 0
          i
            height 10px
            width 10px
            border-radius 50% 
            background #000
            display inline-block
</style>