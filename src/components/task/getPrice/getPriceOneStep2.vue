<template>
  <div class="getprice_box">
    <scroll ref="scroll" class="scroll" :click="false">
      <div class="stepTwo_box">
        <step :stepArray='stepArr' :stepIndex="stepIndex"></step>
        <div class="step7">
          <h2>七、随机浏览店铺内1-3个商品，并粘贴淘口令</h2>
          <textarea name="goodsOneKey" id="goodsOneKey" v-model="goodsOneKey" placeholder="复制第1个商品淘口令粘贴到此处"></textarea>
          <textarea name="goodsTwoKey" id="goodsTwoKey" v-model="goodsTwoKey" placeholder="复制第2个商品淘口令粘贴到此处"></textarea>
          <textarea name="goodsThreeKey" id="goodsThreeKey" v-model="goodsThreeKey" placeholder="复制第3个商品淘口令粘贴到此处"></textarea>
        </div>
        <div class="warn">
          <p>提示：如果店铺商品不足3个，可复制其他店铺同类商品淘口令提交</p>
        </div>
        <div class="next">
          <button :disabled="!isOk" :class="{ook: !isOk}" @click="next">下一步</button>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import Scroll from "../../../base/scroll/scroll.vue"
import Step from "../../../base/step/step.vue"
export default {
  name: "getPriceOneStep2",
  components: {
    Scroll,
    Step
  },
  data() {
    return {
      stepArr: ["核对商品收藏关注", "浏览店铺", "客服聊天", "填写订单信息"],
      stepIndex: 1,
      goodsOneKey: "",
      goodsTwoKey: "",
      goodsThreeKey: "",
      isOk: true, //按钮可点击
      goodsOneKey: '',
      goodsTwoKey: '',
      goodsThreeKey: '',
    }
  },
  methods: {
    next() {
      if (this.goodsOneKey === "" || this.goodsTwoKey === "" || this.goodsThreeKey === "") {
        this.$vux.alert.show({
          title: '错误提示',
          content: '淘口令内容不能为空',
        });
        return false
      } else {
        let obj = {
          favImg: this.$route.query.obj.favImg,
          focusImg: this.$route.query.obj.focusImg,
          taoKeyArr: [this.goodsOneKey,this.goodsTwoKey,this.goodsThreeKey]
        }
        this.$router.push({name:'getPriceOneStep3',query: { buyerTaskRecordId: this.$route.query.buyerTaskRecordId, obj: obj }})
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../../assets/stylus/variable'
  .getprice_box
    width: 100%
    height 100%
    position fixed
    top: 0
    left: 0
    z-index 999
    background #EFF0F2
    margin-bottom: 2rem
    .scroll
      height 100%
    .stepOne_box
      > h2
        font-size 1.2rem
        line-height: 3.6rem
        background #000000
        color #fff
        padding-left: 1rem
        padding-right: 1rem
    .step1
      padding: 1rem 1.6rem
      margin-top: 1.2rem
      background #fff
      h2
        font-size 1.6rem
        line-height: 3.2rem
        color #08090a
      .stepOneBtn
        text-align center
        margin-top: 1rem
        margin-bottom: 1rem
    .step2
      padding: 2rem 1.6rem
      margin-top: 1.2rem
      background #fff
      overflow hidden
      .joinCar
        float left
        margin-top: 2rem
        li
          height: 6.15rem
          img
            width 100%
            height 100%
      h2
        font-size 1.6rem
        color: #08090a
        margin-bottom: 2rem
      div
        float left
        img
          width: 14rem
          height 14rem
      ul
        float left
        margin-left: 1.2rem
        width: 12.6rem
        li
          font-size 1.4rem
          color #08090a
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          line-height: 2.6rem
          strong
            display inline-block
            width 5.6rem
            color #75787f
            margin-right: 1rem
          span
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
    .step3
      padding: 2rem 1.6rem
      margin-top: 1.2rem
      background #fff
      h2
        font-size 1.6rem
        color: #08090a
        margin-bottom: 1rem
      h3
        font-size 1.2rem
        color #75787f
        line-height: 2.4rem
        margin-bottom: 1.2rem
      textarea
        height 14rem
        padding: 1.6rem
        width 100%
        box-sizing border-box
        resize none
        border solid 0.5px #b7b9bf
        border-radius 0.2rem
        outline none
        line-height: 2.6rem
        font-size 1.4rem
        color #b7b9bf
      input
        width 100%
        font-size 1.4rem
        line-height: 3.2rem
        outline none
        margin-top: 2rem
    .step4, .step5, .step6, .step7
      padding: 2rem 1.6rem
      margin-top: 1.2rem
      background #fff
      h2
        font-size 1.6rem
        color #08090a
    .step5, .step6
      padding-bottom: 0
      > div
        margin-top: 1rem
    .next
      margin: 2rem 1.6rem
      padding-bottom: 2rem
      button
        background $color-theme
        font-size 1.6rem
        line-height: 4rem
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
        line-height: 2.8rem
      textarea
        margin-top: 1.2rem
        padding: 1.6rem
        border solid 0.5px #b7b9bf
        outline none
        height 14rem
        resize none
        width 100%
        box-sizing border-box
        font-size 1.4rem
    .warn
      padding: 1rem 1.6rem
      p
        font-size 1.2rem
        line-height: 2rem
        color #75787f
    .step8, .step11
      padding: 2rem 1.6rem 0
      margin-top: 1.2rem
      background #fff
      h2
        font-size 1.6rem
        color: #08090a
        margin-bottom: 1rem
      p
        font-size 1.2rem
        line-height: 2rem
        color #75787f
      > div
        margin-top: 1rem
    .step9, .step10
      padding: 2rem 1.6rem
      margin-top: 1.2rem
      background #fff
      h2
        font-size 1.6rem
        color: #08090a
        margin-bottom: 1.5rem
      .onlyAllow
        padding: 0
      .bLine
        border-bottom 0.5px solid #d4d5d8
      input
        outline none
        border none
        line-height: 5rem
        font-size 1.4rem
    .step10
      padding-bottom: 0
    button
      border: solid 0.5px #08090a
      border-radius 0.2rem
      outline none
      font-size 1.4rem
      line-height: 3rem
      padding-left: 1rem
      padding-right: 1rem
      background #fff
</style>
