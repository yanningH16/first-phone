<template>
  <transition name="move">
    <div class="userMoney">
      <div class="userMoneyBox">
        <div class="listBox">
          <scroll class="scroll-content" ref="listArr" @scrollToEnd="scrollLoad" :pullup="pullup">
            <div class="moneyList" v-show="list.length>=1">
              <div class="listContainer " :class="{'listContainer-noPad':list.length===0}">
                <div class="list border-bottom-1px" v-for="(item,index) in list" :key="index" v-show="list">
                  <div class="listInfo">
                    <p class="title">{{item.title}}</p>
                    <p class="time">{{item.time}}</p>
                  </div>
                  <div class="listMoney">
                    <div class="infoBox" v-if="item.info" :class="{'success':item.status===1,'error':item.status===0,'loading':item.status===2}">
                      {{item.info}}
                    </div>
                    <div class="moneyBox">
                      <span class="money">{{item.money}}</span>
                      <span class="unit">{{item.unit}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text" v-show="list.length==0">
              暂无数据
            </div>
          </scroll>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import List from '../../../base/list/list'
import Vue from 'vue'
import { ConfirmPlugin } from 'vux'
import { scrollPages } from '../../../assets/js/mixin'
Vue.use(ConfirmPlugin)
export default {
  name: 'desPostList',
  mixins: [scrollPages],
  components: {
    Scroll,
    List
  },
  data () {
    return {
      showToast: false,
      list: [],
      apiUrl: '/api/withdrawApply/buyer/getBuyerApplyRecord'
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
    // 设置信息
    setInfo (data) {
      let mylist = []
      this.maxPageSize = data.totalCount
      for (let item of data.datas) {
        let status = 0
        let info = '提现失败'
        if (parseInt(item.status) === 0) {
          status = 2
          info = '处理中'
        } else if (parseInt(item.status) === 1) {
          status = 1
          info = '到账失败'
        }
        let obj = {
          title: item.productName,
          time: item.applyTime,
          money: item.cash,
          unit: '元',
          status: status,
          info: info
        }
        mylist.push(obj)
      }
      this.list = [...this.list, ...mylist]
      this.$nextTick(() => {
        this.$refs.listArr.refresh()
        this.canLoading = true
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/variable'
@import '../../../assets/stylus/mixin'
.userMoney
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
  .userMoneyBox
    background #eff0f2
    display flex
    flex-direction column
    height 100%
    .tabContainer
      flex 0 0 4.1rem
    .listBox
      flex 1
      overflow hidden
      .scroll-content
        height 100%
        .text
          background $color-background
          font-size $font-size-normal
          color $color-text-d
          text-align center
          padding-top 8rem
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
                margin-bottom $margin-top-5
                flex 0 0 1
                color $color-text-d
                font-size $font-size-small
                &.error
                  color $color-text-d
                &.success
                  color $color-use
                &.loading
                  color $color-theme-orange
</style>
