<template>
  <div class="step_box">
    <scroll ref="scroll" style="height: 100%" :click="false">
      <div class="task_one_step1">
        <div class="top_step">
          <step :stepArray='["浏览商品详情","收藏商品关注店铺"]' :stepIndex="0"></step>
        </div>
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
                <!-- <b><img src="../img/refresh.png" alt=""></b> -->
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
                <span>{{ showMsg.discountsKeyword }}</span>
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
                <input @input="showIsPass" placeholder="输入店铺全称..." type="text" v-model="seller">
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
        <div class="stepTwo">
          <h2>二、核对商品参数</h2>
          <div>
            <img :src='twoInfo.platformPicId' alt="" style="width:14rem;height:14rem;display:inline-block">
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
        <div class="stepThree">
          <h2>三、浏览商品详情至少1-3分钟</h2>
        </div>
        <div class="sureBtn">
          <button :disabled="!isOk" :class="{ook: !isOk}" @click="doNext">我已浏览完毕，下一步</button>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import Step from '../../../base/step/step.vue'
import Scroll from '../../../base/scroll/scroll.vue'
import { mapGetters } from 'vuex'

const typeArr = ['综合排序', '信用', '价格从高到低', '价格从低到高', '销量优先']
export default {
  name: 'taskOne_step1',
  components: {
    Step,
    Scroll
  },
  data () {
    return {
      isOk: true,
      openIt: false,
      isPass: true, // 验证店铺按钮
      isRight: false, // 验证通过
      isWrong: false, // 验证错误
      stepIndex: 0, // 当前任务步骤下标
      shopName: '',
      twoInfo: {},
      task: [],
      taskIndex: 0,
      showMsg: {},
      seller: '',
      sellerTaskId: ''
    }
  },
  computed: {
    ...mapGetters([
      'userNopay',
      'userInfo'
    ])
  },
  created () {
    // 第二步的核对商品
    this.$axios.post('/api/orderOperate/getAdditionalInfo', {
      buyerTaskRecordId: this.$route.query.buyerTaskRecordId
    }).then((res) => {
      let data = res.data
      if (data.code === '200') {
        this.twoInfo = data.data
      }
    }).catch(() => {
      this.$vux.alert.show({
        title: '错误提示',
        content: '服务器错误'
      })
    })
    this.$axios.post('/api/orderOperate/listSellerTaskKeyword', {
      sellerTaskId: this.$route.query.sellerTaskId
    }).then((response) => {
      let data = response.data
      if (data.code === '200') {
        console.log(data)
        let arr = data.data
        this.task = arr
        this.taskIndex = this.mathRandom()
        this.changeMsg()
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    open () {
      this.openIt = !this.openIt
      // 获取关键词
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    // 设置taskindex
    // 生成数随机数
    mathRandom () {
      let length = this.task.length
      return Math.floor((Math.random() * length))
    },
    // 将数据改变成自己的数据
    changeMsg () {
      let nowMsg = this.task[this.taskIndex]
      this.showMsg.discountsKeyword = JSON.parse(nowMsg.discountsKeyword).join(' ')
      this.showMsg.sendPlace = nowMsg.sendPlace
      this.showMsg.sortType = typeArr[(parseInt(nowMsg.sortType) - 1)]
      this.showMsg.price = (nowMsg.priceLower) + '-' + (nowMsg.priceLower) + '元'
      this.showMsg.sellerTaskId = nowMsg.sellerTaskId
      var keyWordObj = JSON.parse(nowMsg.keyword)
      let keyName = ''
      for (let m in keyWordObj) {
        keyName += `${m} `
      }
      this.showMsg.keyName = keyName
      console.log(this.showMsg)
    },
    onInput () {
      // 如果通过显示通过按钮
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
    showIsPass () {
      this.isPass = true
      this.isRight = false
      this.isWrong = false
    },
    doNext () {
      this.$router.push({ name: 'taskTwoStep2', query: { buyerTaskRecordId: this.$route.query.buyerTaskRecordId } })
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
  .stepThree
    padding 2rem 1.6rem
    margin-top 1.2rem
    background #fff
    h2
      font-size 1.6rem
      color #08090a
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
<style lang="stylus" rel="stylesheet/stylus">
.step_box
  background #EFF0F2
  width 100%
  height 100%
  position fixed
  top 0
  left 0
  z-index 999
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
  .stepThree
    padding 2rem 1.6rem
    margin-top 1.2rem
    background #fff
    h2
      font-size 1.6rem
      color #08090a
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
