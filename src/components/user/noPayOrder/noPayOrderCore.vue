<template>
  <transition name="move">
    <div class="userContainer">
      <div class="scrollBox">
        <div class="tabContainer" ref="tabContainer">
          <tab active-color="#08090a" bar-active-color="#08090a" custom-bar-width="6rem">
            <tab-item :selected="(index===checkIndex)" :line-width="1" v-for="(item,index) in tabArr" :key="index" @on-item-click="choose">{{item}}</tab-item>
          </tab>
        </div>
        <div class="listBox">
          <scroll class="scroll-content" ref="scrollBox">
            <div class="orderBox" v-if="goodsAll.length>0">
              <div class="orderBoxList" v-for="(item,index) in goodsAll" :key="index">
                <appendCommon :goodsObj="item">
                  <span slot="state">{{item.stateText}}</span>
                  <span slot="info" class="infoRed" v-if="item.coinType===0">{{item.coinText}}
                    <span class="num">{{item.coinInfo}}</span>金币</span>
                  <div class="bottom" slot="bottom">
                    <span class="btn confirm">取消关注</span>
                    <span class="btn details" v-show="item.isDetail">查看详情</span>
                  </div>
                </appendCommon>
              </div>
            </div>
            <div class="noArray" v-else>还没有相关订单呢</div>
          </scroll>
        </div>
      </div>
    </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import AppendCommon from '../../../base/appendCommon/appendCommon'
import { Tab, TabItem, Cell } from 'vux'
import Vue from 'vue'
import { __taskState__, allTask, award, awarded, comment, notify } from '../../../assets/data/task'
const typeArr = ['综合排序', '信用', '价格从高到低', '价格从低到高', '销量优先']
import { mapGetters } from 'vuex'
export default {
  name: "userMoney",
  components: {
    Tab,
    TabItem,
    Scroll,
    AppendCommon,
    Cell
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    console.log(__taskState__)
  },
  data() {
    return {
      pullup: true,
      axiosResult: [],//获得的数据
      maxPageSize: 0,
      pageSize: 5,
      pageNo: 1,
      canLoading: true,
      tabArr: ['全部', '抽奖', '中奖了', '评价', '驳回'],
      checkIndex: 0,
      goodsAll:[
        {//任务刚领取，待提交申请
          buyerTaskStatus:4,
          goodsImg: '',
          shopName: '日系设计师服饰品牌',
          stateText: '待提交申请',
          goodsName: '水洗毛边短裤前端后场白带多撒好借口',
          temp: '任意规格',
          num: '1件',
          price: 108.00,
          coinInfo: '10',
          coinText: '白拿还赚',
          orderNum: '97489745648915648',
          info: '',
          errInfo: '未通过原因 订单号填写错误',
          isApplyState: 2
        },
      ]
    }
  },
  methods: {
    choose(index) {
      this.checkIndex = index
      this.$nextTick(() => {
        this.$refs.scrollBox.refresh()
      })
      this.pageNo = 1
    },
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

  .scrollBox {
    background: #eff0f2;
    display: flex;
    flex-direction: column;
    height: 100%;

    .stateBox {
      background: #ffffff;
      border-bottom-1px($color-text-ll);
      margin-bottom: 1.2rem;

      &.isNoBottom {
        margin-bottom: 0;
      }
    }

    .tabContainer {
      flex: 0 0 4.1rem;
      position: relative;
      z-index: 99;
    }

    .listBox {
      flex: 1;
      overflow: hidden;

      .scroll-content {
        height: 100%;
      }

      .infoRed {
        color: $color-theme;

        .num {
          color: $color-theme;
          font-size: $font-size-large;
          margin-left: 0;
        }
      }

      .infoOrange {
        color: $color-theme-orange;

        .num {
          color: $color-theme-orange;
          font-size: $font-size-large;
          margin-left: 0;
        }
      }

      .bottom {
        padding: 1.2rem 0;

        .btn {
          font-size: $font-size-medium;
          padding: 0.8rem 1.2rem;
          // border 1px solid $color-text
          color: $color-text;
          margin-left: 1.2rem;
          // border-radius $border-radius
          border-small($color-text, $border-radius);

          &.details {
            color: $color-theme;
            // border 1px solid
            border-small($color-theme, $border-radius);
          }
        }

        .details {
          color: $color-theme;
          font-size: $font-size-medium;
        }
      }

      .reject {
        color: $color-theme;
      }
    }

    .noArray {
      padding: 10rem 0;
      font-size: 1.2rem;
      text-align: center;
      color: $color-text-d;
    }
  }
}
</style>
