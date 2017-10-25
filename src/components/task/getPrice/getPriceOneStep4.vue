<template>
  <div class="getprice_box">
    <scroll ref="scroll" class="scroll" :click="false">
      <div class="stepFour_box">
        <step :stepArray='stepArr' :stepIndex="stepIndex"></step>
        <div class="step9">
          <h2>九、付款</h2>
          <div class="warn onlyAllow">
            <p style="color: #51cc68">允许使用花呗付款</p>
            <p>不允许使用信用卡付款</p>
            <p>不允许使用优惠卷付款</p>
          </div>
        </div>
        <div class="step10">
          <h2>十、填写付款订单信息</h2>
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
          <h2>十一、上传订单详情截图</h2>
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
          <button :disabled="!isOk" :class="{ook: !isOk}" @click="doNext">下一步</button>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import Scroll from "../../../base/scroll/scroll.vue"
import Upload from '../../../base/upload/upload.vue'
import Step from "../../../base/step/step.vue"
export default {
  name: "getPriceOneStep4",
  components: {
    Scroll,
    Upload,
    Step
  },
  data() {
    return {
      stepArr: ["核对商品收藏关注", "浏览店铺", "客服聊天", "填写订单信息"],
      stepIndex: 3,
      isOk: true, //按钮可点击
      orderImgs: [],
      orderNum: '',
      realPay: ''
    }
  },
  methods: {
    doNext() {
      let that = this;
      if (this.orderImgs.length === 0 || this.orderNum.length === 0 || this.realPay.length === 0) {
        this.$vux.alert.show({
          title: '提示',
          content: '请完善任务信息'
        });
        return false
      }
      this.$axios.post('/api/orderOperate/fourthOrderSubmit', {
        buyerTaskRecordId: that.$route.query.buyerTaskRecordId,
        favImg: that.$route.query.obj.favImg,
        focusImg: that.$route.query.obj.focusImg,
        chatImg: that.$route.query.obj.chatImg,
        taoKeyArr: that.$route.query.obj.taoKeyArr,
        orderImgs: this.orderImgs,
        orderNum: this.orderNum,
        realPay: this.realPay
      }).then((data) => {
        console.log(data)
        if (data.data.code === '200') {
          this.$router.push({ name: 'submitSuccess', query: { type: 'price' } })
        } else {
          this.$vux.alert.show({
            title: '提交失败',
            content: data.data.message,
          })
        }
      }).catch((error) => {
        this.$vux.alert.show({
          title: '错误提示',
          content: '服务器错误',
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
    .stepOneBtn
      text-align center
      margin-top 1rem
      margin-bottom 1rem
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
</style>
