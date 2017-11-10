<template>
  <transition name="move">
    <div class="userContainer">
      <div class="userContainerBox">
        <scroll class="scrollContent" style="height:100%" :pullup="pullup" @scrollToEnd="scrollLoad" ref="scrollContent">
          <div class="messageBox">
            <div class="noMessage" v-if="messageList.length===0">暂无消息</div>
            <div class="messageList" v-else>
              <div class="list" v-for="(item,index) in messageList" :key="index" @click="readInfo(item)">
                <div class="top">
                  <span class="title">{{item.title}}</span>
                  <span class="time">{{item.time}}</span>
                </div>
                <div class="info">{{item.info}}</div>
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
import Coupons from '../../../base/coupons/coupons'
import { scrollPages } from '../../../assets/js/mixin'
export default {
  name: 'userCoupons',
  mixins: [scrollPages],
  components: {
    Scroll,
    Coupons
  },
  data () {
    return {
      messageList: [],
      apiUrl: '/api/buyer/message/getMessageListPageByBuyerId'
    }
  },
  computed: {
    params: {
      get () {
        return {
          buyerUserId: this.userInfo.buyerUserId,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      },
      set (val) {
        return val
      }
    }
  },
  methods: {
    readInfo (item) {
      this.$router.push({ name: 'userMessageInfo', params: { message: item } })
    },
    setInfo (data) {
      let myList = []
      for (let item of data.datas) {
        myList.push({
          time: item.gmtCreate,
          title: item.title,
          info: item.content,
          isRead: item.isRead
        })
      }
      this.pageNos = data.pageNos
      this.messageList = [...this.messageList, ...myList]
      this.$nextTick(() => {
        this.$refs.scrollContent.refresh()
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
    .messageBox
      .noMessage
        text-align center
        font-size $font-size-medium
        color $color-text-d
        padding 20rem 0
      .messageList
        overflow hidden
        .list
          margin-top 1.2rem
          background $color-theme-white
          box-sizing border-box
          padding 1.6rem
          .top
            display flex
            .title
              flex 1
              font-size $font-size-medium
              color $color-text
              display block
              white-space nowrap
              overflow hidden
              text-overflow ellipsis
            .time
              flex 1
              text-align right
              font-size $font-size-medium
              color $color-text-d
          .info
            margin-top 1.2rem
            font-size $font-size-medium
            color $color-text-d
            line-height 2rem
            display block
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
</style>
