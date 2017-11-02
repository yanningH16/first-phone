<template>
  <div class="getprice_box">
    <scroll ref="scroll" class="scroll" :click="false">
      <div class="stepOne_box">
        <step :stepArray='stepArr' :stepIndex="stepIndex"></step>
        <div class="step8">
          <h2>八、上传客服聊天记录截图</h2>
          <p>联系卖家在线客服，至少问5个常见购物问题，如：能否降价，是否包邮，商品什么材质等</p>
          <div>
            <upload :max="1" :showNum="false" :myimgs="chatImg"></upload>
          </div>
        </div>
        <div class="warn">
          <p>
            注意：<br> 1. 不得提起平台、白拿等关键字，否者封禁账号！<br> 2. 聊天记录必须上传和指定商品店铺的聊天记录截图，不得上传虚假信息，否者封禁账号！<br> 3. 商家客服超过5分钟未回复，可直接自助留言下单<br> 4. 买家领取白拿商品一律不得向商家索要赠品和好评返现
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
import Step from "../../../base/step/step.vue"
import Upload from "../../../base/upload/upload.vue"
export default {
  name: "getPrice3",
  components: {
    Step,
    Upload,
    Scroll
  },
  data() {
    return {
      stepArr: ["搜索核对加购物车", "收藏关注", "客服聊天", "填写订单信息"],
      stepIndex: 2,
      isOk: true, //按钮可点击
      chatImg: [], //客服聊天截图
    }
  },
  methods: {
    doNext() {
      //var buyerTaskRecordId = this.$route.query.buyerTaskRecordId || localStorage.getItem("buyerTaskRecordId")bitslapOrderSubmit
      let that = this;
      if (this.chatImg.length === 0) {
        this.$vux.alert.show({
          title: '提示',
          content: '请上传完整截图'
        });
        return false
      }
      /*this.$axios.post('/api/orderOperate/bitslapOrderSubmit', {
        buyerTaskRecordId: that.$route.query.buyerTaskRecordId,
        chatImg: that.chatImg
      }).then((res) => {
        if (res.data.code=== "200") {*/
      let obj = {
        favImg: that.$route.query.obj.favImg,
        focusImg: that.$route.query.obj.focusImg,
        chatImg: that.chatImg
      }
      that.$router.push({ name: 'sureGetStep4', query: { buyerTaskRecordId: that.$route.query.buyerTaskRecordId, allow: that.$route.query.allow, type: that.$route.query.type, obj: obj } })
      /*}
    }).catch((error) => {
      this.$vux.alert.show({
        title:'错误提示',
        content: '服务器错误',
      })
    })*/

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
  .warn
    padding 1rem 1.6rem
    p
      font-size 1.2rem
      line-height 2rem
      color #75787f
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
</style>
