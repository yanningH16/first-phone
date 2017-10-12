<template>
  <transition name="move">
    <div class="userMoney">
      <div class="userMoneyBox">
        <div class="tabContainer">
          <tab active-color="#08090a" bar-active-color="#08090a" custom-bar-width="6rem">
            <tab-item :selected="(index===checkIndex)" :line-width="1" v-for="(item,index) in tabArr" :key="index" @on-item-click="choose">{{item}}</tab-item>
          </tab>
        </div>
        <div class="listBox">
          <scroll class="scroll-content" v-show="checkIndex===0" ref="listArr">
            <div class="moneyList">
              <list :list="listArr">
                <p class="text" v-show="listArr.length===0">暂无垫付本金</p>
              </list>
            </div>
          </scroll>
          <scroll class="scroll-content" v-show="checkIndex===1" ref="listDone">
            <div class="moneyList">
              <list :list="listDone">
                <slot>
                  <p class="text" v-show="listDone.length===0">暂无冻结金额</p>
                </slot>
              </list>
            </div>
          </scroll>
          <scroll class="scroll-content" v-show="checkIndex===2" ref="listCan">
            <div class="moneyList">
              <list :list="listCan">
                <slot>
                  <p class="text" v-show="listCan.length===0">暂无提现金额</p>
                </slot>
              </list>
            </div>
          </scroll>
        </div>
        <div class="payMoney border-top-1px">
          <div class="payBox" v-show="checkIndex===0">
            <div class="account">
              合计：
              <span class="num">{{accountBen}}</span>
              元
            </div>
          </div>
          <div class="payBox" v-show="checkIndex===1">
            <div class="account">
              合计：
              <span class="num">{{accountDone}}</span>
              元
            </div>
          </div>
          <div class="payBox" v-show="checkIndex===2">
            <div class="deposit" @click="deposit" :class="{'depositDisabled':!(listCan.length>0)}">提现</div>
            <div class="account">
              合计：
              <span class="num">{{accountCan}}</span>
              元
            </div>
          </div>
        </div>
      </div>
      <coinSetting :showToast="showToast" :checkListBox="checkListBox"></coinSetting>
      <picker 
        @select="handleSelect(0,arguments)" 
        :selected-index="selectedIndex[1]" 
        :data="[pickerData]" 
        ref="picker" 
        title="" 
        cancelTxt="取消" 
        confirmTxt="确定">
      </picker>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import List from '../../../base/list/list'
import CoinSetting from '../../../base/coinSetting/coinSetting'
import Picker from '../../../base/picker/picker'
import Vue from 'vue'
import { Tab, TabItem, ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)
export default {
  name: "userMoney",
  components: {
    Scroll,
    Tab,
    TabItem,
    List,
    CoinSetting,
    Picker
  },
  computed: {
    accountBen: {
      get() {
        let account = 0
        for (let item of this.listArr) {
          account = parseFloat(account) + parseFloat(item.money)
        }
        return account.toFixed(2)
      },
      set(val) {
        return val
      }
    },
    accountDone: {
      get() {
        let account = 0
        for (let item of this.listDone) {
          account = parseFloat(account) + parseFloat(item.money)
        }
        return account.toFixed(2)
      },
      set(val) {
        return val
      }
    },
    accountCan: {
      get() {
        let account = 0
        for (let item of this.listCan) {
          account = parseFloat(account) + parseFloat(item.money)
        }
        return account.toFixed(2)
      },
      set(val) {
        return val
      }
    },
  },
  mounted() {
    this.$refs.picker.setSelectedIndex([5])//设置起始位置
  },
  data() {
    return {
      selectedIndex: [
        [0],
        [1, 0],
        [0, 1, 2],
        [0, 0, 0]
      ],
      pickerData: [
        {
          text: '剧毒',
          value: 1
        }, {
          text: '蚂蚁',
          value: 2
        },
        {
          text: '幽鬼',
          value: 3
        },
        {
          text: '主宰',
          value: 4
        },
        {
          text: '卡尔',
          value: 5
        },
        {
          text: '宙斯',
          value: 6
        },
        {
          text: '巫医',
          value: 7
        }, {
          text: '巫妖',
          value: 8
        },
        {
          text: '神谕者',
          value: 9
        },
        {
          text: '撼地神牛',
          value: 10
        },
        {
          text: '蓝胖子',
          value: 11
        },
        {
          text: '水晶室女',
          value: 12
        },
        {
          text: '莉娜',
          value: 13
        },
        {
          text: '斯拉克',
          value: 14
        },
        {
          text: '斯拉达',
          value: 15
        }
      ],
      tabArr: [
        '垫付本金',
        '冻结金额',
        '可提现金额'
      ],
      showToast: false,
      listArr: [
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
      ],
      listDone: [],
      listCan: [
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
        {
          title: '夏季新款男士短袖提升客户框架打',
          time: '2017-08-20 21:30',
          money: '123.40',
          unit: '元'
        },
      ],
      checkIndex: 0,
      checkListBox: {
        title: '未完成提现设置',
        list: [
          {
            textSuc: '淘宝号已绑定',
            textErr: '淘宝号未绑定',
            status: 1
          },
          {
            textSuc: '银行卡已绑定',
            textErr: '银行卡未绑定',
            status: 0
          },
          {
            textSuc: '提现密码已设置',
            textErr: '提现密码未设置',
            status: 0
          }
        ],
        btnText: '立即去绑定'
      }
    }
  },
  methods: {
    handleSelect(index, args) {
      this.selectedText.splice(index, 1, args[2].join('，'))
    },
    // 切换
    choose(index) {
      this.checkIndex = index
      this.$nextTick(() => {
        if (index === 0) {
          this.$refs.listArr.refresh()
        } else if (index === 1) {
          this.$refs.listDone.refresh()
        } else {
          this.$refs.listCan.refresh()
        }
      })
    },
    //提现
    deposit() {
      if (this.listCan.length > 0) {
        let picker = this.$refs.picker
        picker.show()
        // this.showToast = true
        // if (this.accountCan>200){
        //   this.$vux.confirm.show({
        //     title:'没有提现资格',
        //     content:'普通会员200元以上才能提线 Plus会员任意金额都可提现',
        //     confirmText:'充值会员',
        //     cancelText:'取消',
        //     onCancel() {
        //       console.log(this) // 非当前 vm
        //     },
        //     onConfirm() { }
        //   })
        // }
        console.log(`你可以提现的金额为：${this.accountCan}元`)
      }
    },
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/variable'
@import '../../../assets/stylus/mixin'
  .userMoney
    height 100%
    position fixed
    width 100%
    height 100%
    left: 0
    top 0
    bottom 0
    z-index 9999
    background $color-background
    &.move-enter-active,.move-leave-active 
      transition all 0.2s linear
      transform translate3d(0, 0, 0)
    &.move-enter,.move-leave
      transform translate3d(100%, 0, 0)
    .userMoneyBox
      background #eff0f2
      display flex
      flex-direction column
      height 100%
      .tabContainer
        flex 0 0 4.1rem
      .listBox
        flex 1
        overflow hidden
        .scroll-content
          height 100%
          .text
            background $color-background
            font-size $font-size-normal
            color $color-text-d
            text-align center
            padding-top 8rem
      .payMoney
        background $color-theme-white
        border-top-1px($color-text-ll)
        flex 0 0 5rem
        width 100%
        box-sizing border-box
        padding 0 1.6rem
        .payBox
          display flex
          .deposit
            flex 0 0 8rem
            margin 1.7rem 0
            text-align center
            line-height $font-size-medium-x
            font-size $font-size-medium-x
            border-right 1px solid $color-text-ll
            &.depositDisabled
              color #d4d5d8
          .account
            flex 1
            font-size $font-size-normal
            line-height 5rem
            text-align right
            .num
              font-size $font-size-large-x
</style>
