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
              <span>{{ goodsObj.productFormat ? goodsObj.productFormat : '任意规格' }}</span>
            </li>
            <li>
              <strong>价格</strong>
              <span>{{ goodsObj.price }}</span>
            </li>
          </ul>
        </div>
        <div class="stepTwo">
          <h2>二、五星好评</h2>
          <p>
            1. 此订单为5星好评订单，只给商家5星好评，不用写字，严禁不勾选好评红花<br> 2. 不得给商家低于5星好评，否则平台将会冻结账户，账户金额不予体现<br> 3. 若淘宝/天猫快递未签收，就提前在平台或淘宝店铺确认好评，平台将扣除当次任务本金作为处罚
          </p>
        </div>
        <div class="sureBtn">
          <button :disabled="!isOk" :class="{ook: !isOk}" @click="doNext">我已确认</button>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import Step from '../../base/step/step.vue'
import Scroll from '../../base/scroll/scroll.vue'
export default {
  name: 'onlyFiveStar',
  components: {
    Step,
    Scroll
  },
  data () {
    return {
      isOk: true,
      goodsObj: {},
      shopName: '',
      rbObj: {}
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
        this.shopName = this.goodsObj.shopName
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
  },
  methods: {
    doNext () {
      this.$axios.post('/api/orderOperate/backOrderSubmit', {
        buyerTaskRecordId: this.$route.query.buyerTaskRecordId
      }).then((data) => {
        console.log(data)
        if (data.data.code === '200') {
          this.$router.push({ name: 'submitSuccess', query: { type: 'evaluate1' } })
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
</style>
