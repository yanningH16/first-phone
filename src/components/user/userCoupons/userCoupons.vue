<template>
  <transition name="move">
    <div class="userContainer">
      <div class="userContainerBox">
        <scroll class="scrollContent" style="height:100%" :pullup="pullup" @scrollToEnd="loadMore" ref="scrollContent">
          <div class="couponsBox">
            <div class="couponsList" v-for="(item,index) in couponsList" :key="index">
              <coupons :item="item"></coupons>
            </div>
            <div class="delete">
              <span class="deleteBtn" @click="deleteCoupons">清空失效必中券</span>
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import Coupons from '../../../base/coupons/coupons'
import { mapGetters } from 'vuex'
export default {
  name: "userCoupons",
  components: {
    Scroll,
    Coupons
  },
  data() {
    return {
      pageSize: 5,
      pageNo: 1,
      pullup: true,
      couponsList: [
      ],
      maxTotalCount:0
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.getCoupons()
  },
  methods: {
    //获取优惠券
    getCoupons() {
      this.$axios.post('/api/buyerTicket/getBuyerTicketsByBuyerUserId', {
        buyerUserId: this.userInfo.buyerUserId,
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }).then((response) => {
        if (response.data.code === '200') {
          this.maxTotalCount = response.data.data.totalCount
          let arr = []
          for (let item of response.data.data.buyerTickets) {
            arr.push({
              minPrice: 0,
              maxPrice: item.maxPriceValue,
              text: '全场通用',
              time: item.validendtime,
              state: item.status,
              buyerTicketId:item.buyerTicketId,
              ticketId:item.ticketId
            })
          }
          this.couponsList = [...this.couponsList,...arr]
          this.$nextTick(() => {
            this.$refs.scrollContent.refresh()
          })
        }
      }).catch((error) => {
        this.btnCodeState = true
        this.$vux.alert.show({
          title: '错误提示',
          content: '服务器错误',
        })
      })
    },
    // 加载更多
    loadMore(pos) {
      if(this.maxTotalCount>this.pageSize*this.pageNo){
        this.pageNo++
        this.getCoupons()
      }else{
        this.$vux.toast.text('没有更多了', 'bottom')
      }
    },
    //删除优惠券
    deleteCoupons(){
      this.$axios.post('/api/buyerTicket/deleteDisabledBuyerTicketsByBuyerUserId', {
        buyerUserId: this.userInfo.buyerUserId,
      }).then((response) => {
        if (response.data.code === '200') {
          let newList  = []
          this.couponsList.map((item,index)=>{
            if(item.state === 1){
              newList.push(item)
            }
          })
          this.couponsList = newList
          this.$nextTick(() => {
            this.$refs.scrollContent.refresh()
          })
        }
      }).catch((error) => {
        this.btnCodeState = true
        this.$vux.alert.show({
          title: '错误提示',
          content: '服务器错误',
        })
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/variable';
@import '../../../assets/stylus/mixin';

.userContainer {
  height: 100%;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  background: $color-background;

  &.move-enter-active, .move-leave-active {
    transition: all 0.2s linear;
    transform: translate3d(0, 0, 0);
  }

  &.move-enter, .move-leave {
    transform: translate3d(100%, 0, 0);
  }

  .userContainerBox {
    background: #eff0f2;
    display: flex;
    flex-direction: column;
    height: 100%;

    .couponsBox {
      padding: 1.5rem 0;
      background: #fff;

      .couponsList {
        width: 100%;
        box-sizing: border-box;
        padding: 0.5rem 3.2rem;
      }

      .delete {
        text-align: center;
        height: 3.2rem;
        line-height: 3.2rem;
        margin-top: 1.5rem;

        .deleteBtn {
          font-size: $font-size-normal;
          color: $color-text;
          padding: 0.8rem 1.6rem;
          border: 1px solid $color-text-l;
          border-radius: $border-radius;
        }
      }
    }
  }
}
</style>
