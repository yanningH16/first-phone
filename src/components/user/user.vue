<template>
  <div class="user">
    <scroll ref="scroll" class="scroll-content">
      <div class="userBox">
        <userHeader :userInfo="userSetInfo" @arrow-click="arrowClick" @buy-plus="buyPlus"></userHeader>
        <div class="boxContainer">
          <group>
            <cell :link="item.link" :is-link="item.isLink" :title="item.title" v-for="(item,index) in boxOne" :key="index"></cell>
            <div class="otherCellBox">
              <div class="otherCell" v-for="(item,index) in boxMoney" :key="index">
                <span class="num">
                  {{item.price}}
                  <i class="unit">{{item.unit}}</i>
                </span>
                <span class="text">{{item.text}}</span>
              </div>
            </div>
          </group>
        </div>
        <div class="boxContainer">
          <group>
            <cell :link="item.link" :is-link="item.isLink" :title="item.title" v-for="(item,index) in boxTwo" :key="index"></cell>
            <div class="otherCellBox">
              <div class="otherCell" v-for="(item,index) in boxOthter" :key="index" @click="orderRouter(item.type)">
                <span class="iconfont icon" :class="item.icon">
                  <badge :text="item.badge" class="icon-badge" v-if="item.badge"></badge>
                </span>
                <span class="text">{{item.text}}</span>
              </div>
            </div>
          </group>
        </div>
        <div class="boxContainer">
          <group>
            <cell :link="item.link" :is-link="item.isLink" :title="item.title" v-for="(item,index) in boxThree" :key="index"></cell>
          </group>
        </div>
        <div class="boxContainer">
          <group>
            <cell :link="item.link" :is-link="item.isLink" :title="item.title" v-for="(item,index) in boxFour" :key="index">
              <span v-if="item.isDot" class="idDot"></span>
            </cell>
          </group>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import { Cell, Group, Badge } from 'vux'
import UserHeader from './userHeader/userHeader'
import Scroll from '../../base/scroll/scroll'
import { mapGetters, mapActions } from 'vuex'
import { userInfoMixin } from '../../assets/js/mixin'
export default {
  name: "user",
  mixins: [userInfoMixin],
  components: {
    UserHeader,
    Group,
    Cell,
    Badge,
    Scroll
  },
  computed: {
    //使用computed
    userSetInfo() {
      return {
        avatorUrl: this.userInfo.headPicId,
        userName: this.userInfo.telephone || this.userInfo.telephone || '微信名',
        typeName: (this.userInfo.isVip ? 'Plus会员' : '普通会员'),
        btnName: (this.userInfo.isVip ? '续费Plus' : '升级Plus')
      }

    }
  },
  data() {
    return {
      boxOne: [
        {
          title: '我的金币 0',
          link: 'user/userCoin',
          isLink: true
        },
        {
          title: '我的资金 0',
          link: 'user/userMoney',
          isLink: true
        }
      ],
      boxTwo: [
        {
          title: '白拿订单',
          link: 'user/noPayOrder',
          isLink: true
        }
      ],
      boxThree: [
        /*{
          title: '关注商品',
          link: 'user/noPayOrder',
          isLink: true
        },*/
        {
          title: '我的必中券',
          link: 'user/userCoupons',
          isLink: true
        }
      ],
      boxFour: [
        {
          title: '消息中心',
          link: 'user/userMessage',
          isLink: true
        },
        {
          title: '账户安全',
          link: 'user/settings/userSafe',
          isLink: true,
          isDot: true
        },
        {
          title: '帮助与客服',
          link: 'user/helpCenter',
          isLink: true
        },
        /*{
          title: '意见反馈',
          link: 'user/userSuggest',
          isLink: true,
          isDot: true
        }*/
      ],
      boxMoney: [
        {
          price: 0,
          text: '垫付本金',
          unit: '元'
        },
        {
          price: 0,
          text: '冻结金额',
          unit: '元'
        },
        {
          price: 0,
          text: '解冻金额',
          unit: '元'
        }
      ],
      boxOthter: [
        {
          icon: 'icon-gift',
          text: '抽奖',
          type: 1,
          badge: 0
        },
        {
          icon: 'icon-winning',
          text: '中奖了',
          type: 2,
          badge: 0
        },
        {
          icon: 'icon-assessment',
          text: '评价',
          type: 3,
          badge: 0
        },
        {
          icon: 'icon-reject',
          text: '驳回',
          type: 4,
          badge: 0
        }
      ],
    }
  },
  mounted() {
    this.getByBuyerUserId()
    this.getOrderNum()
  },
  methods: {
    arrowClick() {
      this.$router.push({ name: 'settings' })
    },
    buyPlus() {
      this.$router.push({ name: 'buyPlus' })
    },
    orderRouter(type) {
      this.$router.push({ name: 'noPayOrder', params: { checkIndex: type } })
    },
    //获得我的资金
    getByBuyerUserId() {
      this.$axios.post('/api/buyerFundsAccount/getByBuyerUserId', {
        userId: this.userInfo.buyerUserId
      }).then((response) => {
        if (response.data.code === '200') {
          this.setCoinInfo(response.data.data)
          this.setUserCoin(response.data.data)
        } else {
          this.$vux.alert.show({
            title: '错误提示',
            content: response.data.message,
          })
        }
      }).catch((error) => {
        this.$vux.alert.show({
          title: '错误提示',
          content: '网络错误',
        })
      })
    },
    //设置我的资金
    setCoinInfo(data) {
      //垫付本金
      if (data.waitingBackDeposit) {
        this.maxMoney(data.waitingBackDeposit, 0)
      }
      if (data.frozenGold) {
        this.maxMoney(data.frozenGold, 1)
      }
      if (data.frozenGold) {
        this.maxMoney(data.availableGold, 2)
      }
      if (data.availableDeposit) {
        this.boxOne[1].title = `我的资金 ${parseFloat(data.availableDeposit).toFixed(2)}`
      }
      if (data.availableGold) {
        this.boxOne[0].title = `我的金币 ${parseFloat(data.availableGold).toFixed(2)}`
      }
    },
    //资金大于10000
    maxMoney(money, index) {
      let watingPrice = parseFloat(money)
      if (watingPrice >= 10000) {
        watingPrice = watingPrice / 10000
        this.boxMoney[index].unit = '万'
      }
      this.boxMoney[index].price = watingPrice.toFixed(2)
    },
    //获得订单数量
    getOrderNum() {
      this.$axios.post('/api/orderOperate/getAllTaskRecordCountStatistics', {
        userId: this.userInfo.buyerUserId
      }).then((response) => {
        if (response.data.code === '200') {
          this.setOrderNum(response.data.data)
        } else {
          this.$vux.alert.show({
            title: '错误提示',
            content: response.data.message,
          })
        }
      }).catch((error) => {
        this.$vux.alert.show({
          title: '错误提示',
          content: '网络错误',
        })
      })
    },
    //设置订单数量
    setOrderNum(data) {
      if (!data.winningCount) {
        this.maxOrderNum(data.winningCount, 0)
      }
      if (data.sweepstakeCount) {
        this.maxOrderNum(data.sweepstakeCount, 1)
      }
      if (data.evaluateCount) {
        this.maxOrderNum(data.evaluateCount, 2)
      }
      if (data.rejectCount) {
        this.maxOrderNum(data.rejectCount, 3)
      }
    },
    //最大订单数
    maxOrderNum(account, index) {
      let watingPrice = parseInt(account)
      if (watingPrice > 10) {
        watingPrice = '10+'
      }
      this.boxOthter[index].badge = watingPrice
    },
    ...mapActions([
      'setUserCoin'
    ])
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
.user
  height 100%
  padding-bottom 5rem
  box-sizing border-box
  .scroll-content
    height 100%
    .userBox
      background #eff0f2
      .boxContainer
        margin-bottom 0.8rem
        &:last-type-of
          margin-bottom 0
        .idDot
          background red
          width 0.8rem
          height 0.8rem
          display inline-block
          border-radius 50%
      .vux-no-group-title
        &:first-child
          margin-top 0
      .weui-cell
        font-size 1.4rem
      .otherCellBox
        display flex
        position relative
        justify-conten center
        &:before
          content ' '
          position absolute
          left 0
          top 0
          right 0
          height 1px
          border-top 1px solid #D9D9D9
          color #D9D9D9
          -webkit-transform-origin 0 0
          transform-origin 0 0
          -webkit-transform scaleY(0.5)
          transform scaleY(0.5)
          left 15px
        .otherCell
          flex 1
          display flex
          flex-direction column
          text-align center
          padding 1.2rem 0
          .num
            font-size $font-size-medium-x
            line-height 1.6rem
            color #08090a
            margin-bottom 0.8rem
            .unit
              color $color-text-d
              font-style normal
              font-size $font-size-small
          .text
            font-size $font-size-normal
            line-height $font-size-normal
            color $color-text-d
          .icon
            position relative
            font-size 2.1rem
            margin-bottom 0.8rem
            .icon-badge
              position absolute
              right 20px
              top 0
</style>
