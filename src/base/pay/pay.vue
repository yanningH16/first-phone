<template>
  <div class="payBox">
    <div class="payMoney">
      <h1 class="title">{{title}}</h1>
      <div class="payMoneyBox">
        <checker v-model="myMoneyIndex" :max="1" type="radio" :radio-required="radioRequired" default-item-class="pay-item" selected-item-class="pay-item-selected">
          <checker-item :value="index" v-for="(item, index) in moneyBox" :key="index">
            <div class="typeOne" v-show="type === 0">
              <p class="price">{{item.price}}</p>
              <p class="oldPrice">原价{{item.oldPrice}}</p>
              <p class="type">{{item.type}}</p>
              <p class="info infoErr">{{item.info}}</p>
            </div>
            <div class="typeTwo" v-show="type === 1">
              <p class="price">{{item.price}}</p>
              <p class="oldPrice">售价{{item.oldPrice}}</p>
              <p class="info">{{item.info}}</p>
            </div>
            <div class="typeTree" v-show="type === 2">
              <p class="price" :style="{'opacity':doOpacity(item.price)}">{{item.price}}</p>
              <p class="oldPrice" :style="{'opacity':doOpacity(item.oldPrice)}">原价{{item.oldPrice}}</p>
              <p class="type" :style="{'opacity':doOpacity(item.type)}">{{item.type}}</p>
              <p class="info" :style="{'opacity':doOpacity(item.info)}">{{item.info}}</p>
            </div>
          </checker-item>
        </checker>
      </div>
    </div>
    <!--解耦有缺陷-->
    <div class="payType">
      <h1 class="title">支付方式</h1>
      <div class="payTypeBox">
        <div class="payTypeBoxContent" @click="isMyChecked=0" v-if="paytype === 0 ">
          <img src="./weixinpay.png" alt="" class="icon">
          <span class="text">微信支付</span>
          <checkbtn :isChecked="isMyChecked===0"></checkbtn>
        </div>
        <div class="payTypeBoxContent" @click="isMyChecked=1" v-else-if="paytype === 1">
          <img src="./zhifubaopay.png" alt="" class="icon">
          <span class="text">支付宝支付</span>
          <div class="btnContainer">
            <checkbtn :isChecked="isMyChecked!==0"></checkbtn>
          </div>
        </div>
        <div class="payTypeBoxContent" v-else>
          <img src="./rmb.png" alt="" class="icon">
          <span class="text">余额支付</span>
          <div class="letter">
            <p v-show="hasmoney" class="pLine">
              <span class="text">￥{{hasmoney}}</span>
              <input type="checkbox" class="weui-switch" v-model="isMyChosed">
            </p>
            <p v-show="!hasmoney" class="pLine">
              <span class="text">余额不足</span>
              <!-- <x-button type="warn" :mini="true" style="vertical-align:middle">充值</x-button> -->
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { Checker, CheckerItem, XButton, XSwitch } from 'vux'
import { mapGetters } from 'vuex'
import Checkbtn from '../checkbtn/checkbtn'
export default {
  name: 'pay',
  props: {
    title: {
      type: String,
      default: ''
    },
    hasmoney: {
      type: Number,
      default: 0
    },
    isChecked: {
      type: Number,
      default: 0
    },
    isChosed: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 0
    },
    paytype: {
      type: Number,
      default: 0
    },
    moneyBox: {
      type: Array,
      default: []
    },
    moneyIndex: {
      type: Number,
      default: null
    }
  },
  components: {
    Checker,
    CheckerItem,
    Checkbtn,
    XButton,
    XSwitch
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this.myMoneyIndex = this.moneyIndex
    this.isMyChecked = this.isChecked
    this.isMyChosed = this.isChosed
  },
  watch: {
    myMoneyIndex (newval) {
      console.log(newval)
      this.$emit('index-change', newval)
    },
    moneyIndex (newval) {
      this.myMoneyIndex = newval
    },
    isMyChecked (newval) {
      this.$emit('checked-change', newval)
    },
    isChecked (newval) {
      this.isMyChecked = newval
    },
    isMyChosed (newval) {
      this.$emit('isChosed-change', newval)
    },
    isChosed (newval) {
      this.isMyChosed = newval
    }
  },
  data () {
    return {
      myMoneyIndex: null,
      isMyChecked: null,
      isMyChosed: null,
      radioRequired: true
    }
  },
  methods: {
    doOpacity (val) {
      if (val) {
        return 1
      }
      return 0
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable.styl'
.payBox
  width 100%
  background #fff
  box-sizing border-box
  padding 16px
  .title
    height 1.4rem
    font-size 1.4rem
    font-weight 300
    line-height 1
    color $color-text-d
    margin-bottom 20px
  .vux-checker-box
    display flex
    // justify-content space-around
    flex-wrap wrap
    // align-content center
    .pay-item
      display inline-block
      flex 0 0 30%
      padding 1.5rem 0
      box-sizing border-box
      border 1px solid #d4d5d8
      text-align center
      margin-bottom 5%
      margin-right 5%
      &:nth-child(3n+3)
        margin-right 0
      .price
        font-size 1.6rem
        color $color-text
      .oldPrice, .type, .info
        font-size 1rem
        margin-bottom 0.5rem
      .oldPrice
        margin-top 1.2rem
        color $color-text-d
      // text-decoration line-through
      .type, .info
        color $color-text-d
        white-space nowrap
      .typeOne
        .price
          margin-bottom 1rem
      .typeTwo
        .price
          margin-bottom 0.5rem
        .info
          color $color-error
    .pay-item-selected
      border 1px solid $color-text
      position relative
      &:after
        content ''
        display inline-block
        width 3rem
        height 3rem
        position absolute
        top 0
        right 0
        background url('checked.png')
        background-repeat no-repeat
        background-size 3rem 3rem
  .payTypeBox
    .payTypeBoxContent
      font-size 0
      display flex
      padding 1.5rem 0
      position relative
      &:after
        content ''
        display inline-block
        width 110%
        position absolute
        bottom 0
        border-bottom 1px solid #d4d5d8
      &:first-child
        padding-top 0
      &:last-child
        padding-bottom 0
      &:last-child:after
        border-bottom none
      .icon
        width 2.1rem
        height 2.1rem
        flex 0 0 2.1rem
        margin 0.45rem 0
      .text
        flex 1
        margin-left 1.5rem
        display inline-block
        font-size 1.4rem
        color $color-text
        height 3rem
        line-height 3rem
        vertical-align bottom
      .btnContainer
        flex 0 0 2.1rem
        height 3rem
        line-height 3rem
      .letter
        height 3rem
        line-height 3rem
        text-align right
        .pLine
          display flex
        .text
          font-size $font-size-small
          color $color-text-d
          margin-right 1rem
  .payMoney
    margin-bottom 10px
</style>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/variable.styl'
.payBox
  width 100%
  background #fff
  box-sizing border-box
  padding 16px
  .title
    height 1.4rem
    font-size 1.4rem
    font-weight 300
    line-height 1
    color $color-text-d
    margin-bottom 20px
  .vux-checker-box
    display flex
    // justify-content space-around
    flex-wrap wrap
    // align-content center
    .pay-item
      display inline-block
      flex 0 0 30%
      padding 1.5rem 0
      box-sizing border-box
      border 1px solid #d4d5d8
      text-align center
      margin-bottom 5%
      margin-right 5%
      &:nth-child(3n+3)
        margin-right 0
      .price
        font-size 1.6rem
        color $color-text
      .oldPrice, .type, .info
        font-size 1rem
        margin-bottom 0.5rem
      .oldPrice
        margin-top 1.2rem
        color $color-text-d
      // text-decoration line-through
      .type, .info
        color $color-text-d
        white-space nowrap
      .typeOne
        .price
          margin-bottom 1rem
      .typeTwo
        .price
          margin-bottom 0.5rem
        .info
          color $color-error
    .pay-item-selected
      border 1px solid $color-text
      position relative
      &:after
        content ''
        display inline-block
        width 3rem
        height 3rem
        position absolute
        top 0
        right 0
        background url('checked.png')
        background-repeat no-repeat
        background-size 3rem 3rem
  .payTypeBox
    .payTypeBoxContent
      font-size 0
      display flex
      padding 1.5rem 0
      position relative
      &:after
        content ''
        display inline-block
        width 110%
        position absolute
        bottom 0
        border-bottom 1px solid #d4d5d8
      &:first-child
        padding-top 0
      &:last-child
        padding-bottom 0
      &:last-child:after
        border-bottom none
      .icon
        width 2.1rem
        height 2.1rem
        flex 0 0 2.1rem
        margin 0.45rem 0
      .text
        flex 1
        margin-left 1.5rem
        display inline-block
        font-size 1.4rem
        color $color-text
        height 3rem
        line-height 3rem
        vertical-align bottom
      .btnContainer
        flex 0 0 2.1rem
        height 3rem
        line-height 3rem
      .letter
        height 3rem
        line-height 3rem
        text-align right
        .pLine
          display flex
        .text
          font-size $font-size-small
          color $color-text-d
          margin-right 1rem
  .payMoney
    margin-bottom 10px
</style>
