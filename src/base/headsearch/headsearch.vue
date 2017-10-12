<template>
  <div class="head_search">
      <span class="menu" v-show="!hisShow">
        <img v-show="menuShow" @click="openMenu" src="./img/menu.png" alt="菜单">
        <!--<img  src="./img/dele.png" alt="关闭">-->
        <!--<i class="iconfont icon-order" v-show="menuShow" @click="openMenu"></i>-->
        <i class="iconfont icon-close" v-show="!menuShow" @click="closeMenu"></i>
      </span>
    <div class="search-wrap">
      <span class="iconfont icon-search"><!--<img src="./img/search.png" alt="">--></span>
      <input type="text" @focus="search" placeholder="搜索你想要的好物" v-model="inpKey">
    </div>
    <span class="history" @click="openHis">
      <span v-show="!hisShow" class="iconfont icon-message"></span>
      <i v-show="hisShow">取消</i>
    </span>
    <div class="all-class" v-show="!menuShow">
      <ul>
        <li v-for="item in allClass" :id="item.id">{{ item.className }}</li>
      </ul>
    </div>
    <div class="history-cont" v-show="hisShow">
      <dl>
        <dt>历史记录</dt>
        <dd>音响</dd>
        <dd>酱油瓶</dd>
      </dl>
      <dl>
        <dt>热门推荐</dt>
        <dd v-for="item in hotArr" :hotId="item.id">{{ item.keyword }}</dd>
      </dl>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Icon} from "vux"
  export default {
    name: "Headsearch",
    components: {
      Icon
    },
    data() {
      return {
        menuShow: true,
        hisShow: false,
        allClass: [],
        hotArr: [],
        inpKey: ''
      }
    },
    methods: {
      openMenu() {
        this.menuShow = false;
        this.hisShow = false;
        let that = this;
        this.$axios.get('api/productClass/getProductClassInfo').then(function (data) {
          console.log(data);
          if(data.data.code === '200') {
            that.allClass = data.data.data;
          }
        }).catch(function (err) {
          console.log(err);
        })
      },
      closeMenu() {
        this.menuShow = true;
        this.hisShow = false;
      },
      openHis() {
        this.getHisData()
        if (this.hisShow) {
          this.hisShow = false;
          this.inpKey = '';
        } else {
          this.hisShow = true;
        }
        this.menuShow = true;
      },
      search() {
        this.getHisData();
        this.hisShow = true;
        this.getScrollFontHeight();
      },
      getHisData() {
        let that = this;
        this.$axios.get('api/homePage/getRecommendSearch').then(function (data) {
          console.log(data);
          if(data.data.code === '200') {
            that.hotArr = data.data.data;
          }
        }).catch(function (err) {
          console.log(err);
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .head_search
    height: 4.6rem
    width: 100%
    background black
    display: flex
    justify-content space-around
    align-items center
    position relative
    z-index 100
    i
     font-size 2rem
    img
      width: 100%
    span
      color #fff
      width: 2rem
      height: 2rem
    .search-wrap
      width: 21.4rem
      height: 3rem
      line-height: 3rem
      background #fff
      border-radius 1.5rem
      font-size 1.4rem
      .icon-search
        margin-left: 1.5rem
        //display inline-block
        vertical-align middle
        width: 1.4rem
        height 1.4rem
        font-size 1.4rem
        color #b7b9bf
        //background url("./img/search.png") no-repeat 100% 100%
        img
          width 100%
          height 100%
      input
        line-height: 2rem
        outline none
        width 80%
        box-sizing border-box
    .all-class
      width: 100%
      height 100%
      position fixed
      top: 4.6rem
      left: 0
      background rgba(0, 0, 0, .4)
      ul
        background #fff
        overflow hidden
        padding: 1rem
        display flex
        justify-content space-around
        flex-wrap wrap
        li
          width: 25%
          font-size 1.2rem
          text-align center
          line-height: 3.2rem
    .history-cont
      width: 100%
      height 100%
      position fixed
      top: 4.6rem
      left: 0
      background #EFF0F2
      dl
        background #fff
        overflow hidden
        margin-bottom: 1.2rem
        padding: 2rem 1.6rem
        dt
          font-size 1.4rem
          color #75787f
          //padding 2rem 1.6rem 1.6rem
        dd
          float left
          font-size 1.2rem
          color: #08090a
          //margin-left: 1.6rem
          //margin-bottom: 1.6rem
          margin-top: 1.6rem
          margin-right: 1.6rem
          border 0.5px solid #08090a
          border-radius 2px
          padding 0.8rem 1.2rem
    .history
      i
        font-size 1.4rem
        line-height: 2rem
        font-style normal
        white-space nowrap
      span
        font-size 2rem
</style>
