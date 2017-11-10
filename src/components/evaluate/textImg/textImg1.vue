<template>
  <div class="getprice_box">
    <scroll ref="scroll" :click="false" class="scroll">
      <div class="stepOne_box">
        <h2>请在48小时内完成任务，否则将没收金额！</h2>
        <step :stepArray='stepArr' :stepIndex="stepIndex"></step>
        <div class="step2">
          <h2>一、核对商品参数</h2>
          <div>
            <img :src="goodsObj.platformPicId" alt="goodsPic">
          </div>
          <ul>
            <li>{{ goodsObj.productName }}</li>
            <li>
              <strong>店铺名称</strong>
              <span>{{ goodsObj.shopName }}</span>
            </li>
            <li>
              <strong>下单数量</strong>
              <span>{{ goodsObj.numPerOrder }}件</span>
            </li>
            <li>
              <strong>规格</strong>
              <span>{{ goodsObj.productFormat ? goodsObj.productFormat : '任意规格' }}</span>
            </li>
            <li>
              <strong>价格</strong>
              <span>{{ goodsObj.price }}</span>
            </li>
          </ul>
        </div>
        <div class="step2">
          <h2>二、将评价内容打字到手机淘宝</h2>
          <p>请在快递签收后，前去淘宝输入评价内容</p>
          <textarea readonly name="" id="" :value="commonMsg"></textarea>
        </div>
        <div class="step2">
          <h2>三、将图片上传到手机淘宝</h2>
          <p>完成该步骤可额外获得
            <span style="color: red">{{ goodsObj.normalGraphicCost ? goodsObj.normalGraphicCost : '' }}</span>奖励</p>
          <div class="showImg">
            <img v-for="(item, index) in imgListArr" :key="index" :src="item" alt="">
          </div>
        </div>
        <div class="step2" style="padding-bottom: 0">
          <h2>四、上传评价页面截图</h2>
          <upload :myimgs="commonImg" :max="1" :isShow="false"></upload>
        </div>
        <div class="warn">
          <p>
            若淘宝/天猫快递未签收，就提前在平台或淘宝店铺确认好评，平台将扣除当此任务本金作为处罚
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
import Scroll from '../../../base/scroll/scroll.vue'
import Step from '../../../base/step/step.vue'
import Upload from '../../../base/upload/upload.vue'

export default {
  name: 'getPrice1',
  components: {
    Step,
    Upload,
    Scroll
  },
  data () {
    return {
      stepArr: ['上传评价截图', '客观评价'],
      stepIndex: 0,
      isOk: true, // 按钮可点击
      goodsObj: {},
      commonImg: [],
      imgListArr: [], // 预评价上传的截图
      commonMsg: '衣服很漂亮，穿上很仙噢！喜欢的亲不要犹豫咯'
    }
  },
  created () {
    // 获取商品详情
    this.$axios.post('/api/orderOperate/getAdditionalInfo', {
      'buyerTaskRecordId': this.$route.query.buyerTaskRecordId
    }).then((data) => {
      console.log(data)
      if (data.data.code === '200') {
        this.goodsObj = data.data.data
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      } else {
        this.$vux.alert.show({
          title: '获取信息失败',
          content: data.data.message
        })
      }
    }).catch(function (err) {
      console.log(err)
    })
    // 获取与评价的内容
    this.$axios.post('/api/orderOperate/getTaskRecordByOrderId', {
      'orderId': this.$route.query.buyerTaskRecordId
    }).then((data) => {
      console.log(data)
      if (data.data.code === '200') {
        this.imgListArr = JSON.parse(data.data.data.favorPicId)
        this.commonMsg = data.data.data.favorText
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      } else {
        this.$vux.alert.show({
          title: '获取信息失败',
          content: data.data.message
        })
      }
    }).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    doNext () {
      if (this.commonImg.length === 0) {
        this.$vux.alert.show({
          title: '提示',
          content: '请上传评论截图'
        })
        return false
      }
      this.$router.push({ name: 'textImg2', query: { buyerTaskRecordId: this.$route.query.buyerTaskRecordId, commonMsg: this.commonMsg, commonImg: this.commonImg, additionalTaskCost: this.goodsObj.additionalTaskCost } })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
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
    .showImg
      display flex
      width 100%
      justify-content space-between
      flex-wrap wrap
      margin-top 1rem
      img
        width 5.8rem
        height 5.8rem
        border-radius 0.2rem
        margin-bottom 1rem
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
      background #ff3340
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
