<template>
  <div class="nopay">
    <div class="bg-nav" ref="bgNav">
      <Headsearch></Headsearch>
      <div class="nav">
        <tab :line-width=2 active-color="white" v-model="index" bar-active-color="white">
          <tab-item class="vux-center" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}
          </tab-item>
        </tab>
      </div>
    </div>
    <div class="nav-sec" ref="navSec">
      <span v-for="(item,index) in list1" @click="tap(index)" :class="{'checked':index === checkedIndex,'top':index===2&&istop,'foot':index===2&&!istop}" :key="index" >{{item}}</span>
    </div>
    <div class="line"></div>
    <div class="scrollContainer" ref="scrollContainer">
      <scroll ref="scroll" class="scroll-content" @scroll="boxScroll" :probeType="probeType">
        <Merchandise :goods="goods" @myrouter="show">
        </Merchandise>
      </scroll>
    </div>
    <div class="cover" v-show="cover">
      <div class="conten">
        <router-link to="/nopay/details">
          <h2>活动和服务</h2>
        </router-link>
        <div class="box">
          <span @click="isCked1=!isCked1" :class="{'chooses':isCked1}">包邮</span>
          <span @click="isCked2 =!isCked2" :class="{'chooses':isCked2}">不限规格</span>
          <span @click="isCked3 =!isCked3" :class="{'chooses':isCked3}">中奖率高</span>
        </div>
        <div class="line_1"></div>
        <h2>价格区间 (元)</h2>
        <div class="box">
          <span v-for="(price,indexs) in list3" @click="pri(indexs)" :class="{'chooses':indexs===chooseIndex}" :key="indexs">{{price}}</span>
        </div>
        <div class="choose">
          <span @click="clear">清空</span>
          <span style="border-right: none;" @click="sure">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
import Scroll from '../../base/scroll/scroll'
import Headsearch from '../../base/headsearch/headsearch.vue'
import Merchandise from '../../base/merchandise/merchandise.vue'
import { mapActions } from 'vuex'
import index from "../../router/index/index";
const list = () => ['全部', '全额返', '超额返', '金币拿', 'Plus专享']
const list1 = () => ['综合', '最新', '价值', '数量', '人气', '筛选']
const list3 = () => ["0-49", "50-99", "100-149", "150-200", "200以上"]
export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Merchandise,
    Headsearch,
    Scroll
  },
  name: "component_name",
  data() {
    return {
      probeType: 3,
      list2: list(),
      list1: list1(),
      list3: list3(),
      index: 0,
      isCked2: false,
      isCked1:false,
      isCked3:false,
      checkedIndex: 0,
      cover: false,
      navShow: true,
      chooseIndex: 0,
      istop:true,
      getBarWidth: function(index) {
        return (index + 1) * 22 + 'px'
      },
      goods: [],
    }
  },
  methods: {
    onItemClick(index) {
      console.log('on item click:', index)
    },
    //设置本地存储
    ...mapActions([
      'setUserNopay'
    ]),
    tap(index) {
      console.log(index)
      if(index==0){
      this.sortType= 'desc',
      this.sortClass= 'integrated',
      this.priceHigh= 0,
      this.priceLow= 0,
      this.productClassId= 0,
      this.postage= 0,
      this.format= 0,
      this.highLottery= 0
      this.getDesc()
      }
      if(index==1){
      this.sortType= 'desc',
      this.sortClass= 'newest',
      this.priceHigh= 0,
      this.priceLow= 0,
      this.productClassId= 0,
      this.postage= 0,
      this.format= 0,
      this.highLottery= 0
      this.getDesc()
      }
      if(index==2){
        if(this.istop){
            this.sortType= 'asc',
            this.priceHigh= 10000,
            this.priceLow= 0,
          this.getDesc()
        }else {
          this.sortType= 'desc',
            this.sortClass= 'price',
            this.priceHigh= 0,
            this.priceLow= 10000,
            this.productClassId= 0,
            this.postage= 0,
            this.format= 0,
            this.highLottery= 0
          this.getDesc()
        }
        this.istop=!this.istop
      }
      if(index==3){
      this.sortType= 'desc',
      this.sortClass= 'sum',
      this.priceHigh= 0,
      this.priceLow= 0,
      this.productClassId= 0,
      this.postage= 0,
      this.format= 0,
      this.highLottery= 0
      this.getDesc()
      }
      if(index==4){
      this.sortType= 'desc',
      this.sortClass= 'popularity',
      this.priceHigh= 0,
      this.priceLow= 0,
      this.productClassId= 0,
      this.postage= 0,
      this.format= 0,
      this.highLottery= 0
      this.getDesc()
      }
      this.checkedIndex = index;
      if (index == 5) {
        this.cover = true
      }
    },
    sure() {
      this.cover = false
      this.sortType= 'desc',
      this.sortClass= 'integrated',
      this.priceHigh= 0,
      this.priceLow= 0,
      this.productClassId= 0;
      if (this.isCked1==true) {
        this.postage= 1
      }else{
        this.postage= 0
      };
      if (this.isCked2==true) {
        this.format= 1
      }else{
        this.format= 0
      };
       if (this.isCked3==true) {
        this.highLottery= 1
      }else{
        this.highLottery= 0
      };
      this.getDesc()
    },
    pri(indexs) {
      this.chooseIndex = indexs
    },
    clear() {
      this.isCked1 = false
       this.isCked2 = false
        this.isCked3 = false
      this.chooseIndex = ""
    },
    show(index,sellerTaskId) {
      console.log(sellerTaskId)
      this.$router.push({ name: 'details', query: {sellerTaskId:sellerTaskId}})
    },
    boxScroll(pos) {
      if (pos.y < 0) {
        let maxScroll = this.$refs.bgNav.getBoundingClientRect().height
        if (Math.abs(pos.y) <= maxScroll) {
          this.$refs.bgNav.style.top = `${pos.y}px`
          this.$refs.navSec.style.top = `${pos.y}px`
          this.$refs.scrollContainer.style.top = `${pos.y}px`
        }
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      }
    },
    getDesc(){
      this.$axios.post('/api/homePage/getListFreeByCondition', {
      sortType: this.sortType,
      sortClass: this.sortClass,
      priceHigh: this.priceHigh,
      priceLow: this.priceLow,
      productClassId:  this.productClassId,
      postage: this.postage,
      format: this.format,
      highLottery:  this.highLottery
    }).then((res) => {
      let data = res.data
      if (data.code === "200") {
        let arrList = [];
        for (let m of data.data) {
          console.log(m)
          let goods = {
            imgSrc: m.picUrl,
            hot: m.isRecommend,
            info: m.productName,
            progress: m.percent,
            sellerTaskId:m.sellerTaskId,
            msg: {
              pric: m.price,
              state: m.isMore,
              zhuan: m.extraGold,
              hua:m.goldNum,
              baina:'白拿'
            }
          }
          arrList.push(goods)
        }
        this.goods = arrList
        var abc = this.setUserNopay(data.data)
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      }
    }).catch((error) => {
      this.$vux.alert.show({
        title: '错误提示',
        content: '服务器错误',
      })
    })
    }
  },
  created(){
      this.sortType= 'desc',
      this.sortClass= 'integrated',
      this.priceHigh= 0,
      this.priceLow= 0,
      this.productClassId= 0,
      this.postage= 0,
      this.format= 0,
      this.highLottery= 0
      this.getDesc()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.nopay
  height 100%
  position relative
  box-sizing border-box
  padding-bottom 5rem
  .bg-nav
    background #08090a
    height 8.2rem
    position relative
  .nav
    margin-top 1.8rem
    width 100%
    background black
  .vux-tab
    background none
    margin-top -20px
    .vux-tab-item
      color #eff0f2
      font-size 1.4rem
  .nav-sec
    display flex
    position relative
    justify-content space-around
    margin-top 14px
    font-size 1.4rem
    color #b7b9bf
    margin-bottom 0.8rem
    .checked
      color #000
    .top:after
      content '↑'
      padding-left 0.5rem
    .foot:after
      content '↓'
      padding-left 0.5rem
  .scrollContainer
    height 100%
    padding-bottom 12.6rem
    position relative
    box-sizing border-box
    .scroll-content
      height 100%
      overflow: hidden;
  .cover
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background rgba(0,0,0,0.5)
    z-index 101
    box-sizing border-box
    .conten
      position fixed
      right 0
      height 100%
      width 85%
      background white
      h2
        font-family PingFangSC
        font-size 1.4rem
        font-weight 500
        color #7587f
        margin-left 1.2rem
        margin-top 20px
      .box
        margin-left 1.2rem
        margin-top 27px
        .chooses
          border 1px solid black
        span
          display inline-block
          width  7rem
          height 36px
          font-size 1.4rem
          font-weight 500
          color #08090a
          text-align center
          line-height 36px
          margin 0 0.7rem 0.7rem 0
          background #eff0f2
          border-radius 3px
          padding 1px
          box-sizing border-box
      .line_1
        width 100%
        height 2px
        margin-top 2rem
        margin-left -0.3px
        background #d4d5d8
      .choose
        position absolute
        bottom 0
        left  0
        width 100%
        border-top 2px solid #d4d5d8
        span
          display inline-block
          border-right 1px solid #d4d5d8
          font-size 1.4rem
          padding 1.7rem 5.1rem




</style>
