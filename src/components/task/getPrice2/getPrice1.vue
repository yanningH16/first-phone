<template>
  <div class="getprice_box">
    <scroll ref="scroll" class="scroll" :click="false">
      <div class="stepOne_box">
        <h2>请在21:30前完成领奖，否则将取消本次中奖资格！</h2>
        <step :stepArray='stepArr' :stepIndex="stepIndex"></step>
        <div class="step1">
          <h2 :class="{ gray: openIt }">一、通过购物车找到商品</h2>
          <div class="guidOne" v-show="openIt">
            <ul class="itCont">
              <li>
                <h2>通过关键词找到商品</h2>
              </li>
              <li>
                <strong>搜索关键词</strong>
                <span style="display: inline-block; width: 15.4rem; vertical-align: top">{{showMsg.keyName}}</span>
                <b><img src="../img/refresh.png" alt=""></b>
              </li>
              <li>
                <span style="margin-left: 1rem">筛选条件：</span>
              </li>
              <li>
                <strong>排序方式</strong>
                <span>{{showMsg.sortType}}</span>
              </li>
              <li>
                <strong>折扣和服务</strong>
                <span>{{showMsg.discountsKeyword}}</span>
              </li>
              <li>
                <strong>价格区间</strong>
                <span>{{showMsg.price}}</span>
              </li>
              <li>
                <strong>发货地</strong>
                <span>{{showMsg.sendPlace}}</span>
              </li>
            </ul>
            <div class="shopName">
              <h2>验证店铺</h2>
              <div class="inputCompet">
                <input @input="showIsPass" placeholder="输入店铺全称..." type="text">
                <button v-show="isPass" @click="onInput">验证</button>
                <button v-show="isRight" style="border-color: #51cc68"><img src="../img/ok.png" alt=""></button>
                <button v-show="isWrong" style="border-color: #ff3340"><img src="../img/wrong.png" alt=""></button>
              </div>
            </div>
          </div>
          <div class="stepOneBtn">
            <button v-show="!openIt" @click="open">找不到商品？</button>
            <button style="padding-left: 4rem;padding-right: 4rem;" v-show="openIt" @click="open">收起</button>
          </div>
        </div>
        <div class="step2">
          <h2>二、核对商品参数</h2>
          <div>
            <img :src='twoInfo.platformPicId' alt="">
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
        <div class="step3">
          <h2>三、复制淘口令核对商品</h2>
          <h3>请将手机淘宝升级到最新版本</h3>
          <textarea name="checkGoods" id="checkGoods" @focus="msg= ''" v-model="msg"></textarea>
        </div>
        <div class="step7">
          <h2>四、随机浏览店铺内1-3个商品，并粘贴淘口令</h2>
          <textarea name="goodsOneKey" id="goodsOneKey" v-model="goodsOneKey" placeholder="复制第1个商品淘口令粘贴到此处"></textarea>
          <textarea name="goodsTwoKey" id="goodsTwoKey" v-model="goodsTwoKey" placeholder="复制第2个商品淘口令粘贴到此处"></textarea>
          <textarea name="goodsThreeKey" id="goodsThreeKey" v-model="goodsThreeKey" placeholder="复制第3个商品淘口令粘贴到此处"></textarea>
        </div>
        <div class="warn">
          <p>提示：如果店铺商品不足3个，可复制其他店铺同类商品淘口令提交</p>
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
const typeArr = ['综合排序', '信用', '价格从高到低', '价格从低到高', '销量优先']
export default {
  name: "getPrice1",
  components: {
    Step,
    Upload,
    Scroll
  },
  data() {
    return {
      stepArr: ["核对商品浏览店铺", "客服聊天", "填写订单信息"],
      stepIndex: 0,
      msg: "1.点击输入框\r2.长按\r3.粘贴",
      isOk: true, //按钮可点击
      openIt: false, //打开找不到商品按钮
      isPass: true, //验证店铺按钮
      isRight: false, //验证通过
      isWrong: false, //验证错误
      goodsOneKey: '',
      goodsTwoKey: '',
      goodsThreeKey: '',
      shopName: "",
      twoInfo: {},
      task: [],
      taskIndex: 0,
      showMsg: {},
      seller: '',
      taoKey: ''
    }
  },
  //接口请求部分开始
  created() {
    let that = this;
    //第二步的核对商品的接口
    this.$axios.post('/api/orderOperate/getAdditionalInfo', {
      buyerTaskRecordId: that.$route.query.buyerTaskRecordId
    }).then((res) => {
      let data = res.data
      if (data.code === "200") {
        this.twoInfo = data.data
        this.taoKey = data.data.taokouling
      }
    }).catch((error) => {
      this.$vux.alert.show({
        title: '错误提示',
        content: '服务器错误',
      })
    })
    //展开收索的接口
    this.$axios.post('/api/orderOperate/listSellerTaskKeyword', {
      sellerTaskId: that.$route.query.sellerTaskId
    }).then((response) => {
      let data = response.data
      if (data.code == 200) {
        let arr = data.data
        this.task = arr
        this.taskIndex = this.mathRandom()
        this.changeMsg()
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  //接口请求部分结束
  methods: {
    open() {
      this.openIt = !this.openIt;
      //获取关键词
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    //设置taskindex
    //生成数随机数
    mathRandom() {
      let length = this.task.length
      return Math.floor((Math.random() * length))
    },
    //将数据改变成自己的数据
    changeMsg() {
      let nowMsg = this.task[this.taskIndex]
      console.log(nowMsg)
      this.showMsg.discountsKeyword = JSON.parse(nowMsg.discountsKeyword).join(' ');
      this.showMsg.sendPlace = nowMsg.sendPlace
      //遍历排序方式
      this.showMsg.sortType = typeArr[(parseInt(nowMsg.sortType) - 1)]
      //      保留两位小数的值
      this.showMsg.price = (nowMsg.priceLower) + "-" + (nowMsg.priceLower) + '元'
      this.showMsg.sellerTaskId = nowMsg.sellerTaskId
      var keyWordObj = JSON.parse(nowMsg.keyword)
      let keyName = ''
      for (let m in keyWordObj) {
        keyName += `${m} `
      }
      this.showMsg.keyName = keyName
      console.log(this.showMsg)
    },
    doNext() {
      //检查输入域淘口令是否正确
      if (this.msg !== this.taoKey) {
        this.$vux.alert.show({
          title: '核对商品失败',
          content: '复制的淘口令有误',
          buttonText: "重新输入",
          onShow() {
            return false
          },
        })
      } else if (this.goodsOneKey === "" || this.goodsTwoKey === "" || this.goodsThreeKey === "") {
        this.$vux.alert.show({
          title: '错误提示',
          content: '淘口令内容不能为空',
        })
      } else {
        let obj = {
          taoKey: [this.goodsOneKey, this.goodsTwoKey, this.goodsThreeKey]
        }
        this.$router.push({ name: 'getPriceTwoStep2', query: { buyerTaskRecordId: this.$route.query.buyerTaskRecordId, obj: obj } })
      }

    },
    onInput() {
      //如果通过显示通过按钮
      if (this.seller === this.twoInfo.shopName) {
        this.isPass = false
        this.isRight = true
        this.isWrong = false
      } else {
        this.isPass = false
        this.isRight = false
        this.isWrong = true
      }
    },
    showIsPass() {
      this.isPass = true
      this.isRight = false
      this.isWrong = false
    },
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
