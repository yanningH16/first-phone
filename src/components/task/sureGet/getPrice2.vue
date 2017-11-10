<template>
  <div class="getprice_box">
    <scroll ref="scroll" class="scroll" :click="false">
      <div class="stepOne_box">
        <step v-if="type==1 || type==2 || type==3" :stepArray='["搜索核对加购物车", "收藏关注", "客服聊天", "填写订单信息"]' :stepIndex="1"></step>
        <step v-if="type==4 || type==5 || type==6" :stepArray='["搜索核对加购物车", "收藏关注", "填写订单信息"]' :stepIndex="1"></step>
        <div class="step8">
          <h2>五、浏览商品详情至少1-3分钟</h2>
        </div>
        <div class="step8">
          <h2>六、上传收藏商品截图</h2>
          <div>
            <upload :max="1" :isShow="false" :myimgs="favImg"></upload>
          </div>
        </div>
        <div class="step8">
          <h2>七、上传关注店铺截图</h2>
          <div>
            <upload :max="1" :isShow="false" :myimgs="focusImg"></upload>
          </div>
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
    Scroll,
    Upload
  },
  data () {
    return {
      stepArr: ['搜索核对加入购物车', '收藏关注', '客服聊天', '填写订单信息'],
      stepIndex: 1,
      isOk: true, // 按钮可点击
      favImg: [],
      focusImg: [],
      type: this.$route.query.type
    }
  },
  created () {
    console.log(this.$route)
    if (this.$route.query.rbObj) {
      this.favImg = JSON.parse(sessionStorage.getItem('__rbObjG1__')).storeProductPicId
      this.focusImg = JSON.parse(sessionStorage.getItem('__rbObjG1__')).concernShopPicId
    }
  },
  methods: {
    doNext () {
      if (this.favImg.length === 0 || this.focusImg.length === 0) {
        this.$vux.alert.show({
          title: '提示',
          content: '请上传完整截图'
        })
        return false
      }
      if (parseInt(this.$route.query.type) === 1 || parseInt(this.$route.query.type) === 2 || parseInt(this.$route.query.type) === 3) {
        this.$router.push({ name: 'sureGetStep3', query: { buyerTaskRecordId: this.$route.query.buyerTaskRecordId, type: this.$route.query.type, allow: this.$route.query.allow, obj: { favImg: this.favImg, focusImg: this.focusImg }, rbObj: this.$route.query.rbObj } })
      } else {
        this.$router.push({ name: 'sureGetStep4', query: { buyerTaskRecordId: this.$route.query.buyerTaskRecordId, type: this.$route.query.type, allow: this.$route.query.allow, obj: { favImg: this.favImg, focusImg: this.focusImg }, rbObj: this.$route.query.rbObj } })
      }
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
  .step8
    padding 2rem 1.6rem 0
    margin-top 1.2rem
    background #fff
    h2
      font-size 1.6rem
      color #08090a
      margin-bottom 1rem
      padding-bottom 2rem
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
  .stepFour
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
</style>
