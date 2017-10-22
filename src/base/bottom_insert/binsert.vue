<template>
  <div class="binsert">
    <ul>
      <li v-if="leastNum!==0">
        <b><img src="./img/share.png" alt="share"></b>
        <strong>分享</strong>
      </li>
      <li v-else>
        <b><img src="./img/fav.png" alt="fav"></b>
        <strong>关注</strong>
      </li>
      <li class="line"></li>
      <li>
        <span>剩余份数&nbsp;</span>
        <i>{{ leastNum }}</i>
      </li>
      <li class="line" v-if="tType==='time' || tType==='btn' || tType==='notDo'"></li>
      <li>
        <button v-if="tType==='notDo'" class="time notDo">不可兑换</button>
        <button v-else-if="tType==='time'" class="time notDo">{{ leftTime }}</button>
        <button v-else-if="tType==='btn'" class="time" @click="wantGet">我要必中</button>
        <!--<input v-if="type===1" type="button" class="time" disabled v-model="leftTime">
        <input v-if="type===2" type="button" class="time" value='我要必中'>
        <input v-if="type===3" type="button" class="time" value='不可兑换'>-->
        <!--<input type="button" class="time" :class="{'notDo': !canDo}" @click="goToGet" :disabled="!canDo" v-model="timeLimit">-->
      </li>
    </ul>
    <span v-if="type===0" class="btn graybg">已领完</span>
    <span v-else-if="type===1" class="btn" @click="bottomBtn">申请白拿</span>
    <span v-else-if="type===2" class="btn graybg">申请已满</span>
    <span v-else-if="type===3" class="btn" @click="bottomBtn">申请就中奖</span>
    <span v-else-if="type===4" class="btn" @click="bottomBtn">Plus白拿</span>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: "Binsert",
    data() {
      return {}
    },
    methods: {
      bottomBtn() {// 申请白拿等按钮
        this.$emit('btn-click')
      },
      wantGet() {// 我要必中按钮
        this.$emit('wantGet')
      }
    },
    props: {
      leastNum: {
        type: Number,
        default: 1
      },
      type: {
        type: Number,
        default: 0
      },
      tType: {
        type: String,
        default: 'time'
      },
      /*timeShow: {
        type: Boolean,
        default: true
      },*/
     /* canDo: {
        type: Boolean,
        default: true
      },*/
      leftTime: {
        type: String,
        default: "14:00开始"
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .binsert
    width 100%
    height 5rem
    background #ffffff
    box-shadow 0 -1px 2px 0 rgba(183, 185, 191, 0.3)
    overflow hidden
    .btn
      float right
      width: 9.6rem
      height 5rem
      background-color #ff3340
      color: #fff
      line-height: 5rem
      text-align center
      font-size 1.6rem
    ul
      height 5rem
      float left
      width calc(100% - 9.6rem)
      display flex
      justify-content space-around
      align-items center
      .line
        height 2.6rem
        border solid 0.5px #d4d5d8
      li
        .time
          min-width 6rem
          font-size 1.6rem
          font-weight 300
          line-height 1.6rem
          color #08090a
          background none
          border none
          outline none
        .notDo
          color: #d4d5d8
        .graybg
          background #eff0f2
        span
          font-size 1rem
          font-weight 300
          line-height 2.4rem
          color #08090a
          vertical-align middle
        b
          display block
          width 1.6rem
          height 1.6rem
          margin 0 auto
          text-align center
            img
              width: 100%
              height 100%
        strong
          font-size 1rem
          line-height 2rem
          font-weight 300
          color #08090a
          font-style normal
        i
          font-size 2.4rem
          line-height: 2.4rem
          font-weight 600
          color #ff2d3b
          font-style normal
          vertical-align middle
    .graybg
      background #eff0f2
      color #d4d5d8
</style>
