<template>
  <div class="getPriceBox">
    <scroll ref="scroll" :click="false" class="scroll">
      <div class="stepOne_box">
        <h2>请在48小时内完成预追评！</h2>
        <div class="step2">
          <h2>一、核对商品参数</h2>
          <div>
            <img :src='twoInfo.platformPicId' alt="" style="width:14rem;height:14rem;display:inline-block">
          </div>
          <ul>
            <li>{{twoInfo.productName}}</li>
            <li>
              <strong>店铺名称</strong>
              <span>{{twoInfo.shopName}}</span>
            </li>
            <li>
              <strong>下单数量</strong>
              <span>{{twoInfo.numPerOrder}}件</span>
            </li>
            <li>
              <strong>规格</strong>
              <span>{{ twoInfo.productFormat ? twoInfo.productFormat : '任意规格' }}</span>
            </li>
            <li>
              <strong>价格</strong>
              <span>{{twoInfo.price}}</span>
            </li>
          </ul>
        </div>
        <div class="step2">
          <h2>二、五星文字好评</h2>
          <p>请围绕以下关键词撰写评论: {{ twoInfo.additionalFavorKeyword ? twoInfo.additionalFavorKeyword.join(',') : '' }}</p>
          <textarea name="" id="" placeholder="撰写商品的评价，评价内容要求至少15个字以上，优质评价将提升你以后的中奖率" v-model="text"></textarea>
        </div>
        <div class="warn">
          <p>
            提示：<br> 1. 请按照好评要求进行评价，请勿直接去淘宝评价，好评须商家审核通过后才可以评价到淘宝/天猫，否则降低中奖率<br> 2. 不得给商家低于5星好评，否则平台将会冻结账户，账户金额不予提现<br> 3. 若淘宝/天猫快递未签收，就提前在平台或淘宝店铺确认好评，平台将扣除当此任务本金作为处罚<br> 4. 严禁到旺旺上催促商家审核评价，或提及"平台"，"免费白拿"等关键词，否则封号
          </p>
        </div>
        <div class="next">
          <button :disabled="!isOk" :class="{ook: !isOk}" @click="next">提交</button>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll.vue'
import Step from '../../base/step/step.vue'
import Upload from '../../base/upload/upload.vue'

export default {
  name: 'getPrice1',
  components: {
    Step,
    Upload,
    Scroll
  },
  data () {
    return {
      stepArr: ['文字好评', '收藏商品'],
      stepIndex: 0,
      isOk: true, // 按钮可点击
      twoInfo: {},
      text: '',
      keyWord: '',
      rbObj: {}
    }
  },
  // 接口请求部分开始
  created () {
    // 核对商品的接口
    this.$axios.post('/api/orderOperate/getAdditionalInfo', {
      buyerTaskRecordId: this.$route.query.buyerTaskRecordId
    }).then((res) => {
      let data = res.data
      if (data.code === '200') {
        this.twoInfo = data.data
      }
    }).catch(() => {
      this.$vux.alert.show({
        title: '错误提示',
        content: '服务器错误'
      })
    })
    if (this.$route.query.rb) {
      // 获取与评价的内容
      this.$axios.post('/api/orderOperate/getTaskRecordByOrderId', {
        'orderId': this.$route.query.buyerTaskRecordId
      }).then((data) => {
        if (data.data.code === '200') {
          this.rbObj = data.data.data
          this.text = this.rbObj.additionalFavorText
          this.$nextTick(() => {
            this.$refs.scroll.refresh()
          })
        } else {
          this.$vux.alert.show({
            title: '获取信息失败',
            content: data.data.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  // 接口请求部分结束
  methods: {
    next () {
      if (this.text !== '' && this.text.length >= 15) {
        this.$axios.post('/api/orderOperate/backOrderSubmit', {
          buyerTaskRecordId: this.$route.query.buyerTaskRecordId,
          additionalFavorText: this.text
        }).then((res) => {
          if (res.data.code === 200) {
            this.$router.push({ name: 'submitSuccess', query: { type: 'evaluate6' } })
          }
        })
      } else {
        this.$vux.alert.show({
          title: '错误提示',
          content: '请填写不小于15字的评价内容！'
        })
      }
    }

  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
.getPriceBox
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
      margin-bottom 1rem
    div
      float left
      img
        width 14rem
        height 14rem
    ul
      float left
      margin-left 1.2rem
      width 13.6rem
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
    p
      font-size 1.2rem
      line-height 2rem
      color #75787f
    textarea
      margin-top 1rem
      padding 1.6rem
      border solid 0.5px #b7b9bf
      outline none
      height 14rem
      line-height 2.2rem
      resize none
      width 100%
      box-sizing border-box
      font-size 1.4rem
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
