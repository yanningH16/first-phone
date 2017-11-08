<template>
  <div class="common_box" :class="{'forbidden':goodsObj.listNoState}">
    <div class="title border-bottom-1px">
      <strong>
        <img :src="Taobao" alt="" v-if="goodsObj.platformId===1">
        <img :src="Tianmao" alt="" v-else-if="goodsObj.platformId===2">
        <img :src="Taobao" alt="" v-else>
      </strong>
      <span>{{goodsObj.shopName}}</span>
      <div class="i">
        <slot name="state"></slot>
      </div>
    </div>
    <div class="good_intro border-bottom-1px">
      <img :src="goodsObj.goodsImg" alt="goodImg">
      <div class="imgForbidden" v-if="goodsObj.listNoState">失效</div>
      <div>
        <h2>{{goodsObj.goodsName}}</h2>
        <div>
          <strong>规格</strong>
          <span>{{goodsObj.temp}}</span>
        </div>
        <div>
          <strong>数量</strong>
          <span>{{goodsObj.num}}</span>
        </div>
        <div>
          <strong>价格</strong>
          <span>{{goodsObj.price}}</span>
        </div>
        <div class="info">
          <slot name="info"></slot>
        </div>
      </div>
    </div>
    <div class="good_num border-bottom-1px" v-if="goodsObj.orderNum">
      <div>
        <strong>订单编号</strong>
        <span>{{goodsObj.orderNum}}</span>
        <button class="btn border-1px" :data-clipboard-text='goodsObj.orderNum' @click="doCopy">复制</button>
      </div>
      <div>
        <p>
          <strong>{{goodsObj.info}}</strong>
        </p>
        <p>
          <strong class="err">{{goodsObj.errInfo}}</strong>
        </p>
      </div>
    </div>
    <div class="subBtn" v-if="!goodsObj.isBottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
import Clipboard from 'clipboard'
import Tianmao from './tianmao.svg'
import Taobao from './taobao.svg'
import { Toast } from 'vux'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
export default {
  name: "appendCommon",
  components: {
    Toast,
    ToastPlugin
  },
  data() {
    return {
      Taobao: Taobao,
      Tianmao: Tianmao
    }
  },
  methods: {
    doCopy() {
      var clipboard = new Clipboard('.btn');
      var that = this;
      clipboard.on('success', function (e) {
        that.$vux.toast.text('复制成功!', 'middle')
      });
    }
  },
  props: {
    goodsObj: {
      type: Object,
      default: {}
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
@import '../../assets/stylus/mixin'
.common_box
  background #ffffff
  margin-bottom 1.2rem
  padding-left 1.6rem
  .title
    line-height 4rem
    overflow hidden
    border-bottom-1px(#d4d5d8)
    strong
      display inline-block
      width 2rem
      height 2rem
      vertical-align middle
      img
        width 100%
        height 100%
        float left
    span
      margin-left 0.8rem
      font-size 1.4rem
      color #08090a
      vertical-align middle
    .i
      float right
      font-size 1.2rem
      font-style normal
      margin-right 1.6rem
      vertical-align middle
      span
        color $color-text-d
  .good_intro
    padding-top 1.2rem
    padding-bottom 1.2rem
    display flex
    border-bottom-1px(#d4d5d8)
    overflow hidden
    img
      flex 0 0 8.3rem
      width 8.3rem
      height 8.3rem
      border-radius 2px
    .imgForbidden
      position absolute
      width 8.3rem
      height 8.3rem
      border-radius 2px
      background rgba(0, 0, 0, 0.5)
      left -1.2rem
      font-size 2rem
      text-align center
      line-height 8.3rem
      color #b7b9bf
    > div
      flex 1
      margin-left 1.2rem
      margin-right 1.6rem
      position relative
      h2
        font-size $font-size-medium
        font-weight 300
        line-height 2.2rem
        color $color-text
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      strong, span
        font-size 1.2rem
        color #75787f
        font-weight 300
        line-height 2rem
      span
        margin-left 0.8rem
      .info
        position absolute
        right 0
        bottom 0.5rem
  .good_num
    padding-top 1.2rem
    padding-bottom 1.2rem
    padding-right 1.6rem
    overflow hidden
    border-bottom-1px(#d4d5d8)
    strong, span
      font-size 1.2rem
      color #75787f
      font-weight 300
      line-height 2rem
    .err
      color $color-theme
    span
      margin-left 0.8rem
    .btn
      font-size 1rem
      float right
      font-weight 300
      color $color-text
      outline none
      border-radius $border-radius
      line-height 1.5rem
      padding-left 0.8rem
      padding-right 0.8rem
      background #fff
      border none
      border-1px(#383a3f,4px)
      extend-click()
  .subBtn
    text-align right
    overflow hidden
    padding-top 1.2rem
    padding-bottom 1.2rem
    padding-right 1.6rem
    input
      float right
      padding-left 1.2rem
      padding-right 1.2rem
      outline none
      line-height 3rem
      background #fff
      color #08090a
      border 0.5px solid #383a3f
      font-size 1.4rem
      border-radius 2px
    .red
      color red
      border 0.5px solid red
  &.forbidden
    .i
      .reject
        color #75787f !important
</style>
