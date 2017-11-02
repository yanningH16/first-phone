<template>
  <div class="getprice_box">
    <scroll ref="scroll" class="scroll" :click="false">
      <div class="stepOne_box">
        <h2>请在两小时内完成领奖，否则将取消本次中奖资格！</h2>
        <step v-if="type==1 || type==2 || type==3" :stepArray='["搜索核对加入购物车", "收藏关注", "客服聊天", "填写订单信息"]' :stepIndex="0"></step>
        <step v-if="type==4 || type==5 || type==6" :stepArray='["搜索核对加入购物车", "收藏关注", "填写订单信息"]' :stepIndex="0"></step>
        <ul class="stepOne" v-if="type==1 || type==2 || type==4 || type ==5">
          <li>
            <h2>一、打开手机淘宝，查找商品</h2>
          </li>
          <li>
            <strong>搜索关键词</strong>
            <span style="display: inline-block; width: 15.4rem; vertical-align: top">{{ keyName }}</span>
            <b><img src="../img/refresh.png" alt=""></b>
          </li>
          <li>
            <span style="margin-left: 1rem">筛选条件：</span>
          </li>
          <li>
            <strong>排序方式</strong>
            <span>{{ typeArr[sortType - 1] }}</span>
          </li>
          <li>
            <strong>折扣和服务</strong>
            <span>{{ discountsKeyword }}</span>
          </li>
          <li>
            <strong>价格区间</strong>
            <span>{{ keyWord.priceLower }}-{{ keyWord.priceUpper }}元</span>
          </li>
          <li>
            <strong>发货地</strong>
            <span>{{ keyWord.sendPlace }}</span>
          </li>
        </ul>
        <ul class="stepOne" v-if="type==3 || type==6">
          <li>
            <h2>一、复制淘口令，打开手机淘宝</h2>
          </li>
          <li>
            <p class="taoArea">{{ taoKey }}</p>
          </li>
          <li>
            <button>刷新淘口令</button>
            <button class="copy" :data-clipboard-text='taoKey' @click="doCopy">复制淘口令</button>
          </li>
        </ul>
        <div class="step2">
          <h2>二、核对商品参数</h2>
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
              <span>{{ goodsObj.productFormat?goodsObj.productFormat : '任意规格' }}</span>
            </li>
            <li>
              <strong>价格</strong>
              <span>{{ goodsObj.price }}</span>
            </li>
          </ul>
        </div>
        <div class="step3">
          <h2 v-if="type==1 || type==4">三、复制淘口令核对商品</h2>
          <h2 v-if="type==2 || type==3 || type==5 || type==6">三、输入店铺全称，验证店铺</h2>
          <h3 v-if="type==1 || type==4">请将手机淘宝升级到最新版本</h3>
          <textarea v-if="type==1 || type==4" name="checkGoods" id="checkGoods" @focus="msg= ''" v-model="msg"></textarea>
          <input placeholder="输入店铺全称..." v-if="type==2 || type==3 || type==5 || type==6" type="text" v-model="inputShopName">
        </div>
        <div class="stepFour">
          <h2>四、请将商品加入购物车</h2>
          <ol class="joinCar">
            <li>
              <img src="../img/screenshot_cart.png" alt="">
            </li>
          </ol>
        </div>
        <div class="warn">
          <p>警告：严禁直接输入商品价格和店铺全程搜索商品，一经发现，平台将永久取消中奖</p>
        </div>
        <div class="next">
          <button :disabled="!isOk" :class="{ook: !isOk}" @click="doNext">我已加入购物车，下一步</button>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from "vue"
import Scroll from "../../../base/scroll/scroll.vue"
import Step from "../../../base/step/step.vue"
import Clipboard from 'clipboard'
import { Toast } from 'vux'
import { ToastPlugin } from 'vux'

Vue.use(ToastPlugin)
export default {
  name: "getPrice1",
  components: {
    Step,
    Scroll,
    Toast,
    ToastPlugin
  },
  data() {
    return {
      type: 1,
      goodsObj: {},
      keyWord: {},
      keyIndex: 0,
      keyWordArr: [],
      discountsKeyword: '',
      keyName: '',
      sortType: '',//排序类型
      typeArr: ['综合排序', '信用', '价格从高到低', '价格从低到高', '销量优先'], //类型数组
      buyerTaskRecordId: '',
      taoKey: "",
      inputShopName: '',
      msg: "1.点击输入框\r2.长按\r3.粘贴",
      isOk: true, //按钮可点击
    }
  },
  created() {
    let that = this;
    that.type = that.$route.query.type;
    this.$axios.post('/api/orderOperate/getAdditionalInfo', {
      'buyerTaskRecordId': that.$route.query.buyerTaskRecordId
    }).then((data) => {
      console.log(data)
      this.goodsObj = data.data.data
      this.shopName = this.goodsObj.shopName
      this.taoKey = this.goodsObj.taokouling
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }).catch(function (err) {
      console.log(err)
    })

    //获取关键词
    this.$axios.post('/api/orderOperate/listSellerTaskKeyword', {
      sellerTaskId: that.$route.query.sellerTaskId
    }).then((data) => {
      console.log(data)
      this.keyWordArr = data.data.data
      this.keyIndex = this.mathRandom();
      this.keyWord = data.data.data[this.keyIndex]
      this.sortType = this.keyWord.sortType
      this.discountsKeyword = JSON.parse(this.keyWord.discountsKeyword).join(' ');
      let keyWordObj = JSON.parse(this.keyWord.keyword)
      for (let m in keyWordObj) {
        //console.log(m);
        this.keyName = m;
        //console.log(keyWordObj[m])
      }
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }).catch((error) => {
      this.$vux.alert.show({
        title: '错误提示',
        content: '服务器错误',
      })
    })
  },
  methods: {
    doCopy() {
      let clipboard = new Clipboard('.copy');
      let that = this;
      clipboard.on('success', function (e) {
        that.$vux.toast.text('复制成功!', 'middle')
      });
    },
    mathRandom() {
      let length = this.keyWordArr.length
      return Math.floor((Math.random() * length))
    },
    doNext() {
      if (this.type == 1 || this.type == 4) {
        //检查输入域淘口令是否正确
        if (this.msg === this.taoKey) {
          this.$router.push({ name: 'sureGetStep2', query: { buyerTaskRecordId: this.$route.query.buyerTaskRecordId, type: this.type } })
        } else {
          this.$vux.alert.show({
            title: '核对商品失败',
            content: '复制的淘口令有误',
            buttonText: "重新输入",
            onShow() {
              return false
            },
            onHide() {
              //console.log('Plugin: I\'m hiding')
            }
          })
        }
      } else {
        if (this.inputShopName === this.shopName) {
          this.$router.push({ name: 'sureGetStep2', query: { buyerTaskRecordId: this.$route.query.buyerTaskRecordId, type: this.type } })
        } else {
          this.$vux.alert.show({
            title: '核对店铺失败',
            content: '输入的店铺有误',
            buttonText: "重新输入",
            onShow() {
              return false
            },
            onHide() {
              //console.log('Plugin: I\'m hiding')
            }
          })
        }
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
        height 14rem
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
    padding-bottom 4rem
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
