<template>
  <transition name="move">
    <div class="userContainer">
      <div class="userContainerBox">
        <scroll class="scrollBox" ref="scrollBox">
          <div class="helpCenter">
            <div class="helpInfoBox" v-for="(item,index) in mydata" :key="index" @click="showToggle(index)" ref="helpBox">
              <div class="title">
                <span class="text">{{index+1}}.{{item.ques}}</span>
                <span class="icon iconfont icon-arrow-down" v-if="chooseIndex!==index"></span>
                <span class="icon iconfont icon-arrow-up" v-else></span>
              </div>
              <div class="infoMsg border-top-1px" v-show="chooseIndex===index">
                <div class="infoLine" v-for="(line,lineIndex) in item.ans" :key="lineIndex">
                  {{line}}
                </div>
              </div>
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import { myQuestions } from '../../../assets/data/question'
export default {
  name: "buyCoin",
  components: {
    Scroll
  },
  mounted() {
    if (parseInt(this.$route.query.chooseIndex) === 0 || this.$route.query.chooseIndex) {
      this.chooseIndex = parseInt(this.$route.query.chooseIndex)
    }
    let questions = myQuestions[parseInt(this.$route.query.index)]
    this.mydata = questions.body
    document.title = questions.name
  },
  data() {
    return {
      mydata: null,
      chooseIndex: null
    }
  },
  methods: {
    showToggle(index) {
      if (this.chooseIndex !== index) {
        this.chooseIndex = index
      } else {
        this.chooseIndex = null
      }
      this.$nextTick(() => {
        this.$refs.scrollBox.refresh()
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/variable'
@import '../../../assets/stylus/mixin'
.userContainer
  height 100%
  position fixed
  width 100%
  height 100%
  left 0
  top 0
  bottom 0
  z-index 9999
  background $color-background
  &.move-enter-active, .move-leave-active
    transition all 0.2s linear
    transform translate3d(0, 0, 0)
  &.move-enter, .move-leave
    transform translate3d(100%, 0, 0)
  .userContainerBox
    background #eff0f2
    display flex
    flex-direction column
    height 100%
    .scrollBox
      height 100%
    .helpCenter
      .helpInfoBox
        width 100%
        background $color-theme-white
        box-sizing border-box
        margin-top 1.2rem
        &:first-child
          margin-top 0
        .title
          padding 1.8rem 1.6rem
          box-sizing border-box
          line-height 2.2rem
          display flex
          .text
            font-size $font-size-medium
            display inline-block
            flex 1
          .icon
            flex 0 0 2rem
            font-size $font-size-large-x
            float right
        .infoMsg
          box-sizing border-box
          border-top-1px($color-text-ll)
          font-size $font-size-medium
          line-height 2.2rem
          padding 2rem 1.6rem
          color $color-text-d
</style>
