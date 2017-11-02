<template>
  <div class="step_box">
    <scroll ref="scroll" style="height: 100%" :click="false">
      <div class="task_one_step2">
        <div class="top_step" v-if="type==1">
          <step :stepArray='["搜索核对商品","加入购物车"]' :stepIndex="1"></step>
        </div>
        <div class="top_step" v-if="type==2">
          <step :stepArray='["搜索核对店铺","加入购物车"]' :stepIndex="1"></step>
        </div>
        <div class="top_step" v-if="type==3">
          <step :stepArray='["复制淘口令核对店铺","加入购物车"]' :stepIndex="1"></step>
        </div>
        <div class="stepFour">
          <h2>四、请将商品加入购物车</h2>
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
          <ol class="joinCar">
            <li>
              <img src="../img/screenshot_cart.png" alt="">
            </li>
          </ol>
        </div>
        <div class="warn">
          <p>加入购物车便于日后领奖</p>
        </div>
        <div class="sunmitBtn sureBtn">
          <button @click="doSubmit">我已加入购物车，提交申请</button>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import Step from "../../../base/step/step.vue"
import Scroll from '../../../base/scroll/scroll.vue'
import { formateDate } from '../../../assets/js/utils'
export default {
  name: "taskOneStep2",
  components: {
    Step,
    Scroll,
    formateDate
  },
  data() {
    return {
      type: 3,
      goodsObj: {}
    }
  },
  methods: {
    doSubmit() {
      //提交申请
      let that = this;
      this.$axios.post('/api/orderOperate/frontOrderSubmit', {
        'buyerTaskRecordId': that.$route.query.buyerTaskRecordId
      }).then((data) => {
        console.log(data)
        let time = formateDate('yyyy-MM-dd hh:mm:ss')
        this.$router.push({ name: 'submitSuccess', query: { openTime: time, type: 'task' } })
      }).catch(function (err) {
        console.log(err)
      })
    },

  },
  mounted() {
    //获取商品详情
    let that = this;
    this.$axios.post('/api/orderOperate/getAdditionalInfo', {
      'buyerTaskRecordId': that.$route.query.buyerTaskRecordId
    }).then((data) => {
      console.log(data)
      this.goodsObj = data.data.data
    }).catch(function (err) {
      console.log(err)
    })
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
  .stepOne
    padding 2rem 1.6rem
    margin-top 1.2rem
    background #fff
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
  .stepTwo, .stepFour
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
  .stepThree
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
  .warn
    padding 1rem 1.6rem
    p
      font-size 1.2rem
      line-height 2rem
      color #75787f
  .sureBtn
    margin-left 1.6rem
    margin-right 1.6rem
    margin-bottom 2rem
    padding-bottom 2rem
    button
      background #cc3d46
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
</style>
