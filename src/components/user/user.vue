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
                <span class="num">{{item.price}}</span>
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
import { mapGetters } from 'vuex'
import { userInfoMixin } from '../../assets/js/mixin'
export default {
  name: "user",
  mixins:[userInfoMixin],
  components: {
    UserHeader,
    Group,
    Cell,
    Badge,
    Scroll
  },
  created(){
    this.userSetInfo.avatorUrl = this.userInfo.headPicId
    this.userSetInfo.userName = this.userInfo.username
    this.userSetInfo.typeName = (this.userInfo.isVip?'Plus会员':'普通会员')
    this.userSetInfo.btnName = (this.userInfo.isVip?'续费Plus':'升级Plus')
  },
  updated(){
    this.userSetInfo.avatorUrl = this.userInfo.headPicId
    this.userSetInfo.userName = this.userInfo.username
    this.userSetInfo.typeName = (this.userInfo.isVip?'Plus会员':'普通会员')
    this.userSetInfo.btnName = (this.userInfo.isVip?'续费Plus':'升级Plus')
  },
  data() {
    return {
      userSetInfo: {
        avatorUrl: '',
        userName: '二口夭',
        typeName: '普通会员',
        btnName: '升级Plus'
      },
      boxOne: [
        {
          title: '我的金币 32.00',
          link: 'user/userCoin',
          isLink: true
        },
        {
          title: '我的资金',
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
        {
          title: '关注商品',
          link: 'user/noPayOrder',
          isLink: true
        },
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
        {
          title: '意见反馈',
          link: 'user/userSuggest',
          isLink: true,
          isDot: true
        }
      ],
      boxMoney: [
        {
          price: 204.3,
          text: '垫付本金'
        },
        {
          price: 40.00,
          text: '冻结金额'
        },
        {
          price: 421.23,
          text: '可提现金额'
        }
      ],
      boxType: [
        {
          price: 204.3,
          text: '再一次抽奖'
        },
        {
          price: 40.00,
          text: '中奖了'
        },
        {
          price: 421.23,
          text: '评价管理'
        }
      ],
      boxOthter: [
        {
          icon: 'icon-gift',
          badge: 1,
          text: '抽奖',
          type:1
        },
        {
          icon: 'icon-winning',
          text: '中奖了',
          type:2
        },
        {
          icon: 'icon-assessment',
          badge: 1,
          text: '评价',
          type:3
        },
        {
          icon: 'icon-reject',
          badge: 1,
          text: '驳回',
          type:4
        }
      ],
    }
  },
  methods: {
    arrowClick() {
      this.$router.push({ name: 'settings' })
    },
    buyPlus() {
      this.$router.push({ name: 'buyPlus' })
    },
    orderRouter(type){
      this.$router.push({ name: 'noPayOrder',params:{checkIndex:type}})
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
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
            content " "
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
              font-size 1.6rem
              line-height 1.6rem
              color #08090a
              margin-bottom 0.8rem
            .text
              font-size 1.2rem
              line-height 1.2rem
              color #75787f
            .icon
              position relative
              font-size 2.1rem
              margin-bottom 0.8rem
              .icon-badge
                position absolute
                right 20px
                top 0
</style>