<template>
  <div class="step_box">
    <scroll ref="scroll" style="height: 100%" :click="false">
      <div class="task_one_step1">
        <div class="top_step" v-if="type==1">
          <step :stepArray='["搜索核对商品","加入购物车"]' :stepIndex="stepIndex"></step>
        </div>
        <div class="top_step" v-if="type==2">
          <step :stepArray='["搜索核对店铺","加入购物车"]' :stepIndex="stepIndex"></step>
        </div>
        <div class="top_step" v-if="type==3">
          <step :stepArray='["复制淘口令核对店铺","加入购物车"]' :stepIndex="stepIndex"></step>
        </div>
        <ul class="stepOne" v-if="type==1 || type==2">
          <li>
            <h2>一、打开手机淘宝，查找商品</h2>
          </li>
          <li>
            <strong>搜索关键词</strong>
            <span style="display: inline-block; width: 15.4rem; vertical-align: top">{{ keyName }}</span>
            <!-- <b><img src="../img/refresh.png" alt=""></b> -->
          </li>
          <li>
            <span style="margin-left: 1rem">筛选条件：</span>
          </li>
          <li>
            <strong>排序方式</strong>
            <span>{{ typeArr[sortType-1] }}</span>
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
        <ul class="stepOne" v-if="type==3">
          <li>
            <h2>一、复制淘口令，打开手机淘宝</h2>
          </li>
          <li>
            <p class="taoArea">{{taoKey}}</p>
          </li>
          <li>
            <button>刷新淘口令</button>
            <button class="copy" :data-clipboard-text='taoKey' @click="doCopy">复制淘口令</button>
          </li>
        </ul>
        <div class="stepTwo">
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
              <span>{{ goodsObj.productFormat ? goodsObj.productFormat : '任意规格' }}</span>
            </li>
            <li>
              <strong>价格</strong>
              <span>{{ goodsObj.price }}</span>
            </li>
          </ul>
        </div>
        <div class="stepThree">
          <h2 v-if="type==1">三、复制淘口令核对商品</h2>
          <h2 v-if="type==2 || type==3">三、输入店铺全称，验证店铺</h2>
          <h3 v-if="type==1">请将手机淘宝升级到最新版本</h3>
          <textarea v-if="type==1" name="checkGoods" id="checkGoods" @focus="msg= ''" v-model="msg"></textarea>
          <input placeholder="输入店铺全称..." v-if="type==2 || type==3" type="text" v-model="inputShopName">
        </div>
        <div class="warn">
          <p>警告：严禁直接输入商品价格和商铺全程搜索商品，一经发现，平台将永久取消中奖！</p>
        </div>
        <div class="sureBtn">
          <button :disabled="!isOk" :class="{ook: !isOk}" @click="doNext">下一步</button>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import Step from '../../../base/step/step.vue'
import Clipboard from 'clipboard'
import { Alert, Toast } from 'vux'
import Scroll from '../../../base/scroll/scroll.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'taskOne_step1',
  components: {
    Step,
    Toast,
    Alert,
    Scroll
  },
  data () {
    return {
      isOk: true, // 按钮可提交
      type: 1, // 任务类型
      goodsObj: {},
      keyWord: {},
      keyIndex: 0,
      keyWordArr: [],
      discountsKeyword: '',
      keyName: '',
      sortType: '', // 排序类型
      typeArr: ['综合排序', '信用', '价格从高到低', '价格从低到高', '销量优先'], // 类型数组
      buyerTaskRecordId: '',
      stepIndex: 0, // 当前任务步骤下标
      msg: '1.点击输入框\r2.长按\r3.粘贴', // 输入域placeholder,
      shopName: '',
      taoKey: '',
      inputShopName: ''
    }
  },
  computed: {
    ...mapGetters([
      'userNopay',
      'userInfo'
    ])
  },
  created () {
    this.type = this.$route.query.type
    this.$axios.post('/api/orderOperate/getAdditionalInfo', {
      buyerTaskRecordId: this.$route.query.buyerTaskRecordId
    }).then((data) => {
      this.goodsObj = data.data.data
      this.shopName = this.goodsObj.shopName
      this.taoKey = this.goodsObj.taokouling
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }).catch((err) => {
      console.log(err)
      this.$vux.alert.show({
        title: '获取失败',
        content: '网络错误'
      })
    })
    // 获取关键词
    this.$axios.post('/api/orderOperate/listSellerTaskKeyword', {
      sellerTaskId: this.$route.query.sellerTaskId
    }).then((data) => {
      console.log(data)
      this.keyWordArr = data.data.data
      this.keyIndex = this.mathRandom()
      this.keyWord = data.data.data[this.keyIndex]
      this.sortType = this.keyWord.sortType
      this.discountsKeyword = JSON.parse(this.keyWord.discountsKeyword).join(' ')
      var keyWordObj = JSON.parse(this.keyWord.keyword)
      for (let m in keyWordObj) {
        // console.log(m);
        this.keyName = m
        // console.log(keyWordObj[m])
      }
      if (data.status !== 200) {
        this.$vux.alert.show({
          title: '错误提示',
          content: data.message
        })
      }
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }).catch(() => {
      this.$vux.alert.show({
        title: '错误提示',
        content: '服务器错误'
      })
    })
  },
  methods: {
    doCopy () {
      var clipboard = new Clipboard('.copy')
      clipboard.on('success', (e) => {
        this.$vux.toast.text('复制成功!', 'middle')
      })
    },
    doNext () {
      if (parseInt(this.type) === 1) {
        // 检查输入域淘口令是否正确
        if (this.msg === this.taoKey) {
          this.$router.push({ name: 'taskOneStep2', query: { buyerTaskRecordId: this.$route.query.buyerTaskRecordId } })
        } else {
          this.$vux.alert.show({
            title: '核对商品失败',
            content: '复制的淘口令有误',
            buttonText: '重新输入',
            onShow () {
              return false
            },
            onHide () {
              // console.log('Plugin: I\'m hiding')
            }
          })
        }
      } else {
        if (this.inputShopName === this.shopName) {
          this.$router.push({ name: 'taskOneStep2', query: { buyerTaskRecordId: this.$route.query.buyerTaskRecordId } })
        } else {
          this.$vux.alert.show({
            title: '核对店铺失败',
            content: '输入的店铺有误',
            buttonText: '重新输入',
            onShow () {
              return false
            },
            onHide () {
              // console.log('Plugin: I\'m hiding')
            }
          })
        }
      }
    },
    failAlert () {  // 弹出框
      this.$vux.alert.show({
        title: '核对店铺失败',
        content: '输入的店铺名有误',
        buttonText: '重新输入',
        onShow () {
          console.log('Plugin: I\'m showing')
        },
        onHide () {
          console.log('Plugin: I\'m hiding')
        }
      })
    },
    mathRandom () {
      let length = this.keyWordArr.length
      return Math.floor((Math.random() * length))
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
        overflow auto
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
    // margin-bottom: 2rem
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
  .sunmitBtn
    margin-top 1rem
    button
      background #ff3340
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
        overflow auto
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
    // margin-bottom: 2rem
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
  .sunmitBtn
    margin-top 1rem
    button
      background #ff3340
</style>
