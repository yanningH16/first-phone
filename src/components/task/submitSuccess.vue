<template>
  <div class="submit_box">
    <scroll ref="scroll" style="height: 100%" :click="false">
      <div>
        <div class="success_box">
          <div class="successImg">
            <!--<img src="./img/successImg.png" alt="">-->
            <span class="iconfont icon-succeed"></span>
          </div>
          <div class="state">
            <h3 v-if="$route.query.type=='task'">你的申请已成功提交，待平台开奖</h3>
            <h3 v-if="$route.query.type=='price'">你已完成全部任务，等待卖价发货</h3>
          </div>
          <div class="flag" v-if="$route.query.type=='task'">
            <span>预计
              <strong>{{ openTime }}</strong> 开奖</span>
            <p>若未中奖，继续提交第二天申请，将再获取1次抽奖机会</p>
          </div>
          <div class="flag" v-if="$route.query.type=='price'">
            <span>商家将在72小时内操作发货，请耐心等待</span>
            <p>在收到商品后，先在平台提交好评等待商家审核，切勿擅自提前到淘宝评价</p>
          </div>
          <div class="flag" v-if="$route.query.type=='last'">
            <span>预计
              <strong>{{ openTime }}</strong> 开奖</span>
            <p>若未中奖，将不能再申请该商品</p>
          </div>
          <div class="flag" v-if="$route.query.type=='task5'">
            <span>你已成功提交任务</span>
            <p>商家审核通过后就会发放奖励，请耐心等待</p>
          </div>
          <div class="flag" v-if="$route.query.type=='evaluate1'">
            <span>你已成功提交预评价</span>
            <p>商家将在48小时之内审核完毕，请耐心等待</p>
            <p>请在快递签收后，前去淘宝评价</p>
          </div>
          <div class="flag" v-if="$route.query.type=='evaluate2'">
            <span>你已成功提交预评价</span>
            <p>商家将在48小时之内审核完毕，请耐心等待</p>
          </div>
          <div class="flag" v-if="$route.query.type=='evaluate3'">
            <span>你已成功提交评价</span>
            <p>商家将在48小时之内审核完毕，之后返款，请耐心等待</p>
          </div>
          <div class="flag" v-if="$route.query.type=='evaluate4'">
            <span>你已成功提交任务</span>
            <p>商家将在48小时之内审核完毕</p>
            <p>审核通过后再追评到淘宝，请耐心等待</p>
          </div>
          <div class="toIndex">
            <router-link :to="{ name: 'index' }">
              <button>返回首页</button>
            </router-link>
          </div>
        </div>
        <!-- <div class="commend">
            <h2 @click="toNoPay">推荐商品 &gt;</h2>
            <div class="goods_item" @click="goDetail(item)">
              <merchandise :obj="list1"></merchandise>
            </div>
            <div class="goods_item">
              <merchandise :obj="list1"></merchandise>
            </div>
          </div> -->
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import Merchandise from '../../base/merchandise/merchandise_1'
import Scroll from '../../base/scroll/scroll.vue'

export default {
  name: 'SubmitSuccess',
  components: {
    Merchandise,
    Scroll
  },
  data () {
    return {
      list1:
      {
        imgSrc: 'https://static.vux.li/demo/1.jpg',
        hot: 0,
        vip: 0,
        info: 'm.productName',
        progress: '10',
        sellerTaskId: 'm.sellerTaskId',
        msg: {
          pric: '30',
          state: 1,
          zhuan: '3',
          baina: '白拿'
        }
      },
      openTime: ''
    }
  },
  methods: {
    toNoPay () {
      this.$router.push({ name: 'nopay' })
    },
    goDetail (item) {

    },
    filterTime () {
      if (this.$route.query.openTime) {
        let date = this.$route.query.openTime.substr(0, 10)
        let hour = this.$route.query.openTime.substr(-8, 2)
        let minue = this.$route.query.openTime.substr(-5, 2)
        if (hour === 13) {
          hour += (minue / 60)
        }
        if (hour < 10) {
          this.openTime = date + ' 10:00:00'
        } else if (hour >= 10 && hour < 13.5) {
          this.openTime = date + ' 13:30:00'
        } else if (hour >= 13.5 && hour < 16) {
          this.openTime = date + ' 16:00:00'
        } else if (hour >= 16 && hour < 20) {
          this.openTime = date + ' 20:00:00'
        }
      }
    }
  },
  created () {
    this.filterTime()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.submit_box
  background #EFF0F2
  width 100%
  height 100%
  position fixed
  top 0
  left 0
  z-index 999
.success_box
  background #fff
  padding 1.6rem 2rem
  .successImg
    text-align center
    padding-top 4rem
    padding-bottom 1rem
    img
      width 6rem
      height 6rem
    span
      font-size 6rem
      color #51cc68
  .state
    h3
      font-size 1.4rem
      line-height 3.4rem
      color #08090a
      text-align center
  .flag
    text-align center
    p
      font-size 1.2rem
      line-height 2.4rem
      color #75787f
    span
      font-size 1.4rem
      line-height 2.4rem
      color #08090a
    strong
      color #08090a
  .toIndex
    text-align center
    margin-top 2rem
    button
      font-size 1.4rem
      color #08090a
      background #fff
      border solid 0.5px #383a3f
      line-height 3.4rem
      border-radius 0.2rem
      outline none
      padding-left 2rem
      padding-right 2rem
.commend
  background #fff
  margin-top 2rem
  overflow hidden
  h2
    font-size 1.6rem
    color #08090a
    line-height 3.6rem
    text-align center
    padding-top 1rem
  .goods_item
    width 50%
    float left
</style>
