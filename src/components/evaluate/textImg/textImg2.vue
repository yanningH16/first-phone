<template>
  <div class="step_box">
    <scroll ref="scroll" :click="false" style="height: 100%">
      <div class="box">
        <step :stepArray='["上传评价截图","客观评价"]' :stepIndex="1"></step>
        <div class="stepTwo">
          <h2>四、请客观地给商品打分，匿名提交</h2>
          <div class="stars" style="padding-bottom: 1.5rem;margin-bottom: 1.5rem;border-bottom: 0.5px solid #d4d5d8">
            <div class="title">商品质量</div>
            <div class="check">
              <rater :value="goods1" v-model="goods1" :star="starStyle" :activeColor="red" :fontSize="20"></rater>
            </div>
            <div class="res" v-if="goods1==1">非常差</div>
            <div class="res" v-if="goods1==2">差</div>
            <div class="res" v-if="goods1==3">一般</div>
            <div class="res" v-if="goods1==4">好</div>
            <div class="res" v-if="goods1==5">非常好</div>
          </div>
          <div class="stars">
            <div class="title">物有所值</div>
            <div class="check">
              <rater :value="goods2" v-model="goods2" :star="starStyle" :activeColor="red" :fontSize="20"></rater>
            </div>
            <div class="res" v-if="goods2==1">非常差</div>
            <div class="res" v-if="goods2==2">差</div>
            <div class="res" v-if="goods2==3">一般</div>
            <div class="res" v-if="goods2==4">好</div>
            <div class="res" v-if="goods2==5">非常好</div>
          </div>
        </div>
        <div class="stepTwo">
          <h2>四、是否推荐该商品给更多买家</h2>
          <div class="tuijian" v-show="active==true">
            <div @click="active=true">
              <img class="red" src="../img/ttw.png" alt="">
              <p>推荐</p>
            </div>
            <div @click="active=false">
              <img class="no" :class="{ red: !active }" src="../img/ttb.png" alt="">
              <p>不推荐</p>
            </div>
          </div>
          <div class="tuijian" v-show="active==false">
            <div @click="active=true">
              <img src="../img/ttb.png" alt="">
              <p>推荐</p>
            </div>
            <div @click="active=false">
              <img class="no red" src="../img/ttw.png" alt="">
              <p>不推荐</p>
            </div>
          </div>
        </div>
        <div class="stepTwo">
          <h2 style="line-height: 2.8rem;">五、恭喜您获得追评任务！审核通过并完成追评任务可获得
            <span style="color: red">{{ this.$route.query.additionalTaskCost ? this.$route.query.additionalTaskCost : '' }}金币</span>奖励</h2>
        </div>
        <div class="sureBtn">
          <button :disabled="!isOk" :class="{ook: !isOk}" @click="doNext">提交</button>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import Step from "../../../base/step/step.vue"
import Scroll from '../../../base/scroll/scroll.vue'
import { Rater } from 'vux'
export default {
  name: "component_name",
  components: {
    Step,
    Scroll,
    Rater
  },
  data() {
    return {
      isOk: true,
      starStyle: '★', //星星形状
      red: 'red', //星星颜色
      active: true, //推荐 or 不推荐
      priceNum: 5, //奖励金币数量
      goods1: 5,
      goods2: 5,
    }
  },
  methods: {
    doNext() {
      let that = this;
      this.$axios.post('/api/orderOperate/backOrderSubmit', {
        buyerTaskRecordId: that.$route.query.buyerTaskRecordId,
        favorText: this.$route.query.commonMsg,
        favorPicId: this.$route.query.commonImg,
        evaluationRealityScore: this.goods1,
        evaluationRichScore: this.goods2,
        isRecommendOtherBuyer: this.active ? 1 : 0
      }).then((data) => {
        console.log(data)
        if (data.data.code === '200') {
          this.$router.push({ name: 'submitSuccess', query: { type: 'evaluate3' } })
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
  .stars
    overflow hidden
    font-size 1.4rem
    width 100%
    >div
      float left
      line-height 2rem
    .title
      margin-right 2rem
    .check
      width 15rem
    .res
      font-size 1.2rem
      color #75787f
  .tuijian
    width 100%
    display flex
    justify-content center
    >div
      margin-right 2rem
      margin-left 2rem
      text-align center
      img
        padding 1.5rem
        margin-bottom 0.8rem
        width 2.5rem
        height 2.5rem
        border-radius 2px
        border 0.5px solid #d4d5d8
      .red
        background red
      .no
        transform rotate(180deg)
</style>
