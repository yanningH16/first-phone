<template>
  <div class="getprice_box">
    <scroll ref="scroll" class="scroll" :click="false" :preventDefaultException="preventDefaultException">
      <div class="stepOne_box">
        <step :stepArray='stepArr' :stepIndex="stepIndex"></step>
        <div class="step9">
          <h2>五、付款</h2>
          <div class="warn onlyAllow">
            <p :class="{'allow' : (allow==5 || allow==6 || allow==7 || allow ==8)}">
              <span v-if="allow==1 || allow==2 || allow==3 || allow==4">不</span>允许使用花呗付款</p>
            <p :class="{'allow' : (allow==3 || allow==4 || allow==7 || allow ==8)}">
              <span v-if="allow==1 || allow==2 || allow==5 || allow==6">不</span>允许使用信用卡付款</p>
            <p :class="{'allow' : (allow==2 || allow==4 || allow==6 || allow ==8)}">
              <span v-if="allow==1 || allow==3 || allow==5 || allow==7">不</span>允许使用优惠卷付款</p>
          </div>
        </div>
        <div class="step10">
          <h2>六、填写付款订单信息</h2>
          <div class="warn onlyAllow">
            <p>
              1. 若平台包邮店铺不包邮，填写实付金额，会一起退还<br> 2. 若淘宝价格与任务价格不符，核对商品正确请直接下单，提交实际付款价格，无需联系客服<br> 3. 下单后严禁擅自淘宝退货/退款，一经发现将永久封号处理！<br> 4. 白拿商品不接受指定快递
            </p>
          </div>
          <div class="bLine">
            <input type="text" placeholder="填写订单号" v-model="orderNum">
          </div>
          <div>
            <input type="text" placeholder="填写实际付款金额" v-model="realPay">
          </div>
        </div>
        <div class="step11">
          <h2>七、上传订单详情截图</h2>
          <div>
            <upload :max="1" :showNum="false" :myimgs="orderImgs"></upload>
          </div>
        </div>
        <div class="warn">
          <p>
            提示：<br> 1. 严禁转售中奖白拿商品，一经发现，直接封号<br> 2. 商品没有质量问题，一律不予退换货<br> 3. 商品存在质量问题，请联系在线客服<br> 4. 商家将在72小时内操作发货，请耐心等待，不要到旺旺上催商家
          </p>
        </div>
        <div class="next">
          <button :disabled="!isOk" :class="{ook: !isOk}" @click="next">提交付款订单信息</button>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll.vue'
import Step from '../../../base/step/step.vue'
import Upload from '../../../base/upload/upload.vue'

export default {
  name: 'getPrice3',
  components: {
    Step,
    Upload,
    Scroll
  },
  data () {
    return {
      stepArr: ['核对商品', '客服聊天', '填写订单信息'],
      stepIndex: 2,
      isOk: true, // 按钮可点击
      orderNum: '',
      realPay: '',
      orderImgs: [], // 订单详情截图
      allow: this.$route.query.allow,
      buyerTaskStatus: 4,
      preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|SPAN|IMG)$/ }
    }
  },
  created () {
    if (this.$route.query.rbObj) {
      this.orderNum = JSON.parse(sessionStorage.getItem('__rbObjG1__')).productOrderNo
      this.orderImgs = JSON.parse(sessionStorage.getItem('__rbObjG1__')).taobaoOrderPicId
      this.realPay = JSON.parse(sessionStorage.getItem('__rbObjG1__')).productOrderPrice
      this.buyerTaskStatus = JSON.parse(sessionStorage.getItem('__rbObjG1__')).buyerTaskStatus
    }
  },
  methods: {
    next () {
      if (this.orderImgs.length === 0 || this.orderNum.length === 0 || this.realPay.length === 0) {
        this.$vux.alert.show({
          title: '提示',
          content: '请完善任务信息'
        })
        return false
      }
      this.$axios.post('/api/orderOperate/fourthOrderSubmit', {
        buyerTaskRecordId: this.$route.query.buyerTaskRecordId,
        customerServiceChartPicId: this.$route.query.obj.chatImg,
        taobaoOrderPicId: this.orderImgs,
        productOrderNo: this.orderNum,
        productOrderPrice: this.realPay,
        buyerTaskStatus: this.buyerTaskStatus
      }).then((data) => {
        console.log(data)
        if (data.data.code === '200') {
          this.$router.push({ name: 'submitSuccess', query: { type: 'price' } })
        } else {
          this.$vux.alert.show({
            title: '提交失败',
            content: data.data.message
          })
        }
      }).catch(() => {
        this.$vux.alert.show({
          title: '错误提示',
          content: '服务器错误'
        })
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/variable'
.getprice_box
  width 100%
  height 100%
  position fixed
  top 0
  left 0
  z-index 999
  background #EFF0F2
  margin-bottom 2rem
  .scroll
    height 100%
  .stepOne_box
    > h2
      font-size 1.2rem
      line-height 3.6rem
      background #000000
      color #fff
      padding-left 1rem
      padding-right 1rem
  .step1
    padding 1rem 1.6rem
    margin-top 1.2rem
    background #fff
    h2
      font-size 1.6rem
      line-height 3.2rem
      color #08090a
    .gray
      color #75787f
    .stepOneBtn
      text-align center
      margin-top 1rem
      margin-bottom 1rem
    .itCont
      padding 1.2rem 0
      margin-top 0.8rem
      background #fff
      border-top 0.5px solid #d4d5d8
      border-bottom 0.5px solid #d4d5d8
      li
        overflow hidden
        h2
          font-size 1.6rem
          color #08090a
          margin-bottom 1rem
        strong
          display inline-block
          width 7rem
          font-size 1.4rem
          color #75787f
          line-height 3rem
          margin-left 1rem
        span
          font-size 1.4rem
          color #08090a
          line-height 3rem
          margin-left 1.6rem
        b
          float right
          width 1.6rem
          height 1.6rem
          margin-top 0.8rem
          img
            width 100%
            height 100%
        p
          border solid 0.5px #b7b9bf
          border-radius 0.2rem
          padding 1rem 1.6rem
          font-size 1.4rem
          line-height 2.4rem
          color #08090a
          margin-top 1rem
          margin-bottom 1.6rem
        button
          background #fff
          border solid 0.5px #08090a
          font-size 1.4rem
          line-height 3rem
          padding-left 1.2rem
          padding-right 1.2rem
          margin-right 1.2rem
          border-radius 0.2rem
          outline none
        .copy
          color #ff3340
          border 0.5px solid #ff3340
  .step2
    padding 2rem 1.6rem
    margin-top 1.2rem
    background #fff
    overflow hidden
    .joinCar
      float left
      margin-top 2rem
      li
        height 6.15rem
        img
          width 100%
          height 100%
    h2
      font-size 1.6rem
      color #08090a
      margin-bottom 2rem
    div
      float left
      img
        width 14rem
        height 14rem
    ul
      float left
      margin-left 1.2rem
      width 12.6rem
      li
        font-size 1.4rem
        color #08090a
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        line-height 2.6rem
        strong
          display inline-block
          width 5.6rem
          color #75787f
          margin-right 1rem
        span
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
  .step3
    padding 2rem 1.6rem
    margin-top 1.2rem
    background #fff
    h2
      font-size 1.6rem
      color #08090a
      margin-bottom 1rem
    h3
      font-size 1.2rem
      color #75787f
      line-height 2.4rem
      margin-bottom 1.2rem
    textarea
      height 14rem
      padding 1.6rem
      width 100%
      box-sizing border-box
      resize none
      border solid 0.5px #b7b9bf
      border-radius 0.2rem
      outline none
      line-height 2.6rem
      font-size 1.4rem
      color #b7b9bf
    input
      width 100%
      font-size 1.4rem
      line-height 3.2rem
      outline none
      margin-top 2rem
  .step4, .step5, .step6, .step7
    padding 2rem 1.6rem
    margin-top 1.2rem
    background #fff
    h2
      font-size 1.6rem
      color #08090a
  .step5, .step6
    padding-bottom 0
    > div
      margin-top 1rem
  .next
    margin 2rem 1.6rem
    padding-bottom 2rem
    button
      background $color-theme
      font-size 1.6rem
      line-height 4rem
      width 100%
      box-sizing border-box
      border none
      outline none
      border-radius 0.2rem
      color #ffffff
    .ook
      color #D86E75
  .step7
    h2
      line-height 2.8rem
    textarea
      margin-top 1.2rem
      padding 1.6rem
      border solid 0.5px #b7b9bf
      outline none
      height 14rem
      resize none
      width 100%
      box-sizing border-box
      font-size 1.4rem
  .warn
    padding 1rem 1.6rem
    .allow
      color #51cc68
    p
      font-size 1.2rem
      line-height 2rem
      color #75787f
  .step8, .step11
    padding 2rem 1.6rem 0
    margin-top 1.2rem
    background #fff
    h2
      font-size 1.6rem
      color #08090a
      margin-bottom 1rem
    p
      font-size 1.2rem
      line-height 2rem
      color #75787f
    > div
      margin-top 1rem
  .step9, .step10
    padding 2rem 1.6rem
    margin-top 1.2rem
    background #fff
    h2
      font-size 1.6rem
      color #08090a
      margin-bottom 1.5rem
    .onlyAllow
      padding 0
    .bLine
      border-bottom 0.5px solid #d4d5d8
    input
      outline none
      border none
      line-height 5rem
      font-size 1.4rem
  .step10
    padding-bottom 0
  button
    border solid 0.5px #08090a
    border-radius 0.2rem
    outline none
    font-size 1.4rem
    line-height 3rem
    padding-left 1rem
    padding-right 1rem
    background #fff
  .shopName
    padding-top 1.2rem
    padding-bottom 1.2rem
    border-bottom 0.5px solid #d4d5d8
    .inputCompet
      overflow hidden
      padding-top 1rem
      padding-bottom 1rem
      input
        float left
        width 60%
        font-size 1.4rem
        line-height 3rem
        outline none
      button
        float right
</style>
