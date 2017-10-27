<template>
  <div class="step_box">
    <scroll ref="scroll" :click="false" style="height: 100%">
      <div class="box">
        <div class="stepTwo">
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
              <span>任意规格</span>
            </li>
            <li>
              <strong>价格</strong>
              <span>{{ goodsObj.price }}</span>
            </li>
          </ul>
        </div>
        <div class="stepTwo">
          <h2>二、五星文字好评</h2>
          <textarea v-model="goodCommon" placeholder="撰写商品的评价，评价内容要求至少15个字以上，优质评价将提升你以后的中奖率"></textarea>
        </div>
        <div class="stepTwo">
          <h2>三、上传商品图片(至少3张)</h2>
          <div>
            <upload :myimgs="goodsImg" :max="5" :showNum="true"></upload>
          </div>
        </div>
        <div class="warn">
          <p>
            提示：<br> 1. 请按照好评要求进行评价，请勿直接去淘宝评价，好评须商家审核通过后才可以评价到淘宝/天猫，否则降低中奖率<br> 2. 不得给商家低于5星好评，否则平台将会冻结账户，账户金额不予提现<br> 3. 若淘宝/天猫快递未签收，就提前在平台或淘宝店铺确认好评，平台将扣除当此任务本金作为处罚<br> 4. 严禁到旺旺上催促商家审核评价，或提及"平台"，"免费白拿"等关键词，否则封号
          </p>
        </div>
        <div class="sureBtn">
          <button :disabled="!isOk" :class="{ook: !isOk}" @click="doNext">提交</button>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import Step from "../../base/step/step.vue"
import Scroll from '../../base/scroll/scroll.vue'
import Upload from '../../base/upload/upload.vue'
export default {
  name: "textImg",
  components: {
    Step,
    Scroll,
    Upload
  },
  data() {
    return {
      isOk: true,
      goodsImg: [],
      goodCommon: '',
      goodsObj: {},
      shopName: ''
    }
  },
  created() {
    //获取商品详情
    let that = this;
    this.$axios.post('/api/orderOperate/getAdditionalInfo', {
      'buyerTaskRecordId': that.$route.query.buyerTaskRecordId
    }).then((data) => {
      console.log(data)
      if (data.data.code === '200') {
        this.goodsObj = data.data.data
        this.shopName = this.goodsObj.shopName
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      } else {
        this.$vux.alert.show({
          title: '获取信息失败',
          content: data.data.message,
        })
      }
    }).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    doNext() {
      let that = this;
      if (this.goodsImg.length < 3) {
        this.$vux.alert.show({
          title: '提示',
          content: '请至少上传3张图片',
        })
        return false
      }
      this.$axios.post('/api/orderOperate/backOrderSubmit', {
        buyerTaskRecordId: that.$route.query.buyerTaskRecordId,
        favorText: this.goodCommon,
        favorPicId: this.goodsImg
      }).then((data) => {
        console.log(data)
        if (data.data.code === '200') {
          this.$router.push({ name: 'submitSuccess', query: { type: 'evaluate1' } })
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
.step_box
  background #EFF0F2
  width 100%
  height 100%
  position fixed
  top 0
  left 0
  z-index 999
  .stepTwo
    padding 2rem 1.6rem
    margin-top 1.2rem
    background #fff
    overflow hidden
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
    p
      font-size 1.2rem
      line-height 2rem
      color #75787f
    textarea
      padding 1.6rem
      border solid 0.5px #b7b9bf
      outline none
      height 14rem
      line-height 2.2rem
      resize none
      width 100%
      box-sizing border-box
      font-size 1.4rem
  .sureBtn
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
  .sunmitBtn
    margin-top 1rem
    button
      background #ff3340
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
  .warn
    padding 1rem 1.6rem
    p
      font-size 1.2rem
      line-height 2rem
      color #75787f
</style>
