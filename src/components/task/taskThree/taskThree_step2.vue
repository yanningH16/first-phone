<template>
  <div class="getprice_box">
    <scroll ref="scroll" class="scroll" :click="false">
      <div class="stepOne_box">
        <step :stepArray="['找到商品', '浏览店铺商品']" :stepIndex="1"></step>
        <div class="step7">
          <h2>三、随机浏览店铺内1-3个商品，并粘贴淘口令</h2>
          <textarea name="goodsOneKey" id="goodsOneKey" v-model="goodsOneKey" placeholder="复制第1个商品淘口令粘贴到此处"></textarea>
          <textarea name="goodsTwoKey" id="goodsTwoKey" v-model="goodsTwoKey" placeholder="复制第2个商品淘口令粘贴到此处"></textarea>
          <textarea name="goodsThreeKey" id="goodsThreeKey" v-model="goodsThreeKey" placeholder="复制第3个商品淘口令粘贴到此处"></textarea>
        </div>
        <div class="warn">
          <p>提示：如果店铺商品不足3个，可复制其他店铺同类商品淘口令提交</p>
        </div>
        <div class="next">
          <button :disabled="!isOk" :class="{ook: !isOk}" @click="send">提交申请</button>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import Scroll from "../../../base/scroll/scroll.vue"
import Step from "../../../base/step/step.vue"
import Upload from "../../../base/upload/upload.vue"
import { formateDate } from '../../../assets/js/utils'
export default {
  name: "getPrice1",
  components: {
    Step,
    Upload,
    Scroll
  },
  data() {
    return {
      isOk: true, //按钮可点击
      goodsOneKey: '',
      goodsTwoKey: '',
      goodsThreeKey: ''
    }
  },
  methods: {
    //提交
    send() {
      if (this.goodsOneKey.length === 0 || this.goodsTwoKey.length === 0 || this.goodsThreeKey.length === 0) {
        this.$vux.alert.show({
          title: '提示',
          content: '请复制完整淘口令！',
        });
        return false;
      }
      let that = this;
      this.$axios.post('/api/orderOperate/frontOrderSubmit', {
        buyerTaskRecordId: that.$route.query.buyerTaskRecordId
      }).then((res) => {
        console.log(res)
        let data = res.data
        console.log(data)
        if (data.code === '200') {
          let time = formateDate('yyyy-MM-dd hh:mm:ss')
          this.$router.push({ name: 'submitSuccess', query: { openTime: time, type: 'last' } })
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: data.message,
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
      background #cc3d46
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
