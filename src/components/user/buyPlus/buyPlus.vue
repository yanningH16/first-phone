<template>
  <transition name="move">
    <div class="userContainer">
      <div class="userContainerBox">
        <scroll class="scrollBox" :click="!isClick" :preventDefaultException="preventDefaultException">
          <div>
            <div class="userHeader">
              <div class="avator">
                <img src="../userHeader/avator.png" alt="" class="avatorImg">
              </div>
              <div class="info" v-if="!userSetInfo.userState" style="line-height:7.8rem">
                <div class="top">
                  <span class="name">{{userSetInfo.userName}}</span>
                  <span class="tag">{{userSetInfo.userState | tag }}</span>
                </div>
              </div>
              <div class="info" v-else>
                <div class="top">
                  <span class="name">{{userSetInfo.userName}}</span>
                  <span class="tag"></span>
                </div>
                <div class="bottom">会员到期：{{userSetInfo.userTime }}</div>
              </div>
            </div>
            <pay :title="title" :moneyBox="moneyBox" :moneyIndex="moneyIndex" :type="type" :paytype="paytype" :hasmoney="hasmoney" :isChecked="isChecked" :isChosed="chosed" @index-change="choosePay" @isChosed-change="isChosed"></pay>
            <div class="plusInfo">
              <img src="./time.png" alt="">
            </div>
          </div>
        </scroll>
        <div class="btnBottomBox">
          <div class="info">
            <span class="name">微信支付：</span>
            <span class="text">￥{{ataloCount}}</span>
          </div>
          <span class="btn" v-if="userInfo.userState" @click="buyPlus">立即充值</span>
          <span class="btn" v-else @click="buyPlus">立即续费</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import Pay from '../../../base/pay/pay'
import { userInfoMixin } from '../../../assets/js/mixin'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "buyCoin",
  mixins: [userInfoMixin],
  components: {
    Scroll,
    Pay
  },
  filters: {
    tag(val) {
      if (!val) {
        return '普通会员'
      }
    }
  },
  data() {
    return {
      preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },
      isClick: true,
      paytype: 2,
      type: 2,
      isChecked: 0,
      hasmoney: 2.68,
      title: '选择套餐',
      moneyBox: [
        {
          price: '50',
          type: '一个月套餐',
          info: '每天仅需0.6元',
          month: 1
        },
        {
          price: '96',
          oldPrice: '120',
          type: '两个月套餐',
          info: '每天仅需0.6元',
          month: 2
        },
        {
          price: '120',
          oldPrice: '200',
          type: '三个月套餐',
          info: '每天仅需0.6元',
          month: 3
        }
      ],
      moneyIndex: 0,
      chosed: true
    }
  },
  computed: {
    ataloCount: {
      get() {
        let ataloCount = 0
        let choosePrice = parseFloat(this.moneyBox[this.moneyIndex].price)
        ataloCount = choosePrice - (this.chosed ? this.hasmoney : 0)
        return ataloCount
      },
      set(val) {
        return val
      }
    },
    userSetInfo(){
      let userTime
      if (this.userInfo.vipEndtime) {
        userTime = this.userInfo.vipEndtime.slice(0, 10)
      }
      return {
        avatorUrl:this.userInfo.headPicId,
        userName:this.userInfo.username || this.userInfo.telephone,
        userState:(this.userInfo.isVip ? 1 : 0),
        userTime:userTime
      }
    }
    
  },
  methods: {
    choosePay(index) {
      this.moneyIndex = index
    },
    isChosed(val) {
      this.chosed = val
    },
    buyPlus() {
      this.$axios.post('/api/user/vipShipRenewal', {
        telephone: this.userInfo.telephone,
        months: this.moneyBox[this.moneyIndex].month,
      }).then((response) => {
        let data = response.data
        console.log(data)
        if (data.code !== "200") {
          this.$vux.alert.show({
            title: '错误提示',
            content: data.message,
          })
        } else {
          let _this = this
          this.$vux.toast.show({
            text: '修改成功',
            type: 'success',
            time: 1000,
            onHide() {
              _this.refreshUserInfo()
              _this.$router.push({ name: 'user' })
            }
          })
        }
      }).catch((error) => {
        this.$vux.alert.show({
          title: '错误提示',
          content: '服务器错误',
        })
      })
    },
    refreshUserInfo() {
      this.$axios.post('/api/user/refresh', {
        buyerUserId: this.userInfo.buyerUserId,
      }).then((response) => {
        if (response.data.code === '200') {
          this.setUserInfo(response.data.data)
        } else {
          this.$vux.alert.show({
            title: '错误提示',
            content: '网络错误，信息更新未完成',
          })
        }
      }).catch((error) => {
        this.$vux.alert.show({
          title: '错误提示',
          content: '服务器错误',
        })
      })
    },
    ...mapActions([
      'setUserInfo'
    ])
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
    left: 0
    top 0
    bottom 0
    z-index 9999
    background $color-background
    &.move-enter-active,.move-leave-active 
      transition all 0.2s linear
      transform translate3d(0, 0, 0)
    &.move-enter,.move-leave
      transform translate3d(100%, 0, 0)
    .userContainerBox
      background #eff0f2
      display flex
      flex-direction column
      height 100%
      .scrollBox
        flex 1
        overflow hidden
        margin-bottom 5rem
        .userHeader
          font-family PingFangSC
          width 100%
          height 13.4rem
          box-sizing border-box
          background-size 100% 
          padding 2.8rem 2rem
          background-image url('../userHeader/profile_bg.svg')
          display flex
          .avator
            height 7rem
            flex 0 0 7rem
            .avatorImg
              width 100%
              height 100%
          .info
            flex 1
            display flex
            flex-direction column
            margin-left 1rem
            .top
              flex 1
              .name
                margin-left 0.5rem
                font-size $font-size-medium-x
                color $color-theme-white
                margin-right 0.5rem
                // vertical-align text-top
              .tag
                font-size $font-size-medium
                color $color-text-d
            .bottom
              flex 1
              font-size $font-size-medium
              color $color-text-d
      .plusInfo
        width 100%
        box-sizing border-box
        padding 1.2rem 0
        line-height 2rem
        img
          width 100%
      .btnBottomBox
        flex 0 0 5rem
        height 5rem
        line-height 5rem
        font-size 0
        background #fff
        position fixed
        width 100%
        bottom 0
        right 0
        display flex
        .info
          flex 1
          text-align right
          padding-right 1.2rem
          .name
            font-size 1.2rem
          .text
            color $color-theme
            font-size $font-size-large-x
            position relative
            top 0.2rem
        .btn
          flex 0 0 12.8rem
          color $color-theme-white
          background $color-theme
          font-size $font-size-medium-x 
          text-align center
</style>
