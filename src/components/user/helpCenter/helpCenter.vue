<template>
  <transition name="move">
    <div class="userContainer">
      <div class="userContainerBox">
        <scroll class="scrollBox">
          <div class="helpCenter">
            <div class="infoBox">
              <p class="info">常见问题</p>
            </div>
            <div class="questionContainer">
              <div class="questionBox" v-for="(item,index) in questions" :key="index">
                <div class="left  border-right-1px" @click="goInfo(index)">
                  <span class="icon iconfont"></span>
                  <span class="text">{{item.text}}</span>
                </div>
                <div class="right">
                  <div class="rightLine border-bottom-1px" v-for="(itemLine,indexLine) in item.list" :key="indexLine" @click="goInfo(index,indexLine)">
                    {{itemLine.name}}
                  </div>
                </div>
              </div>
            </div>
            <div class="infoBox">
              <p class="info">客服QQ：1098237458</p>
              <!-- <p class="info">客服电话：400-888-888</p> -->
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
export default {
  name: "buyCoin",
  components: {
    Scroll
  },
  data(){
    return {
      questions:[
        {
          icon:'',
          text:'新手问题',
          list:[
            {
              name:'申请需要什么条件?',
            },
            {
              name:'申请需要交钱吗？',
            }
          ]
        },
        {
          icon:'',
          text:'试用申请',
          list:[
            {
              name:'如何申请商品？',
            },
            {
              name:'每天最多可以得到几个商品呢？',
            }
          ]
        },
        {
          icon:'',
          text:'下单领取',
          list:[
            {
              name:'中奖商品有下单时间限制要求吗？',
              link:''
            },
            {
              name:'下单时可以使用信用卡付款吗？',
              link:''
            }
          ]
        },
        {
          icon:'',
          text:'收货评价',
          list:[
            {
              name:'商品对评价有什么要求吗？',
              link:''
            },
            {
              name:'图文好评任务评价时需要注意些什么呢？',
              link:''
            }
          ]
        },
        {
          icon:'',
          text:'返款/提现',
          list:[
            {
              name:'银行卡不小心绑定错误了怎么办？',
              link:''
            },
            {
              name:'任务完成后什么时候返款？',
              link:''
            }
          ]
        }
      ]
    }
  },
  methods:{
    goInfo(index,chooseIndex){
      this.$router.push({ name: 'helpInfo' ,query:{index:index,chooseIndex:chooseIndex}})
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
      .infoBox
        width 100%
        box-sizing border-box
        padding 1.2rem 1.6rem
        .info
          font-size $font-size-normal
          color $color-text-d
          line-height $font-size-normal
          padding-bottom 0.8rem
          &:last-child
            padding-bottom 0
      .questionContainer
        .questionBox
          background $color-theme-white
          margin-bottom 1.2rem
          display flex
          &:last-child
            margin-bottom 0
          .left
            flex 0 0 10rem
            font-size 0
            text-align center
            display flex
            flex-direction column
            height 10rem
            justify-content center
            border-right-1px($color-text-l)
            .icon
              color $color-text
              font-size $font-size-large-x
            .text
              font-size $font-size-medium
              color $color-text
          .right
            flex 1
            overflow hidden
            .rightLine
              height 5rem
              line-height 5rem
              font-size $font-size-medium
              color $color-text-d
              box-sizing border-box
              width 100%
              padding 0 1.2rem
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              &:first-child
                border-bottom-1px($color-text-l)
</style>
