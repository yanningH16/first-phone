<template>
  <transition name="move">
    <div class="userMoney">
      <div class="userMoneyBox">
        <div class="headerBox" ref="headerBox">
          <p class="info">
            <span class="text">可提现金额（单位：元）</span>
            <router-link tag="span" class="btn" :to="{name:'desPostList'}">提现明细</router-link>
          </p>
          <p class="coin">
            <span class="text">{{availableDeposit}}</span>
            <span class="btn right" @click="deposit" :class="{'disabled':availableDeposit===0}">提现</span>
          </p>
        </div>
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
          <div class="payBoxMoney" v-show="checkIndex===0">
            <div class="account">
              合计：
              <span class="num">{{accountBen}}</span>
              元
            </div>
          </div>
          <div class="payBoxMoney" v-show="checkIndex===1">
            <div class="account">
              合计：
              <span class="num">{{accountDone}}</span>
              元
            </div>
          </div>
          <div class="payBoxMoney" v-show="checkIndex===2">
            <div class="account">
              合计：
              <span class="num">{{accountCan}}</span>
              元
            </div>
          </div>
        </div>
      </div>
      <coinSetting :showToast="showToast" :checkListBox="checkListBox" v-if="isCoinSetting"></coinSetting>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import List from '../../../base/list/list'
import CoinSetting from '../../../base/coinSetting/coinSetting'
import Vue from 'vue'
import { Tab, TabItem, ConfirmPlugin } from 'vux'
import { mapGetters, mapActions } from 'vuex'
Vue.use(ConfirmPlugin)
export default {
  name: "userMoney",
  components: {
    Scroll,
    Tab,
    TabItem,
    List,
    CoinSetting
  },
  computed: {
    // accountBen: {
    //   get() {
    //     let account = 0
    //     for (let item of this.listArr) {
    //       account = parseFloat(account) + parseFloat(item.money)
    //     }
    //     return account.toFixed(2)
    //   },
    //   set(val) {
    //     return val
    //   }
    // },
    isCoinSetting: {
      get() {
        if (this.userInfo.taobaoStatus && parseInt(this.userInfo.taobaoStatus) === 1 && this.userInfo.bankCheckStatus && parseInt(this.userInfo.bankCheckStatus) === 1 && this.userInfo.depositPassword) {
          return false
        }
        return true
      },
      set(val) {
        return val
      }
    },
    checkListBox: {
      get() {
        let obj = {
          title: '未完成提现设置',
          list: [
            {
              textSuc: '淘宝号已绑定',
              textErr: '淘宝号未绑定',
            },
            {
              textSuc: '银行卡已绑定',
              textErr: '银行卡未绑定',
            },
            {
              textSuc: '提现密码已设置',
              textErr: '提现密码未设置',
            }
          ],
          btnText: '立即去绑定'
        }
        if (this.userInfo.taobaoStatus && parseInt(this.userInfo.taobaoStatus) === 1) {
          obj.list[0].status = 1
        } else {
          obj.list[0].status = 0
        }
        if (this.userInfo.bankCheckStatus && parseInt(this.userInfo.bankCheckStatus) === 1) {
          obj.list[1].status = 1
        } else {
          obj.list[1].status = 0
        }
        if (this.userInfo.depositPassword) {
          obj.list[2].status = 1
        } else {
          obj.list[0].status = 0
        }
        return obj
      },
      set(val) {
        return val
      }
    },
    availableDeposit: {
      get() {
        let deposit = 0
        if (this.userCoin.availableDeposit) {
          deposit = parseFloat(this.userCoin.availableDeposit).toFixed(2)
        }
        return deposit
      },
      set(val) {
        return val
      }
    },
    ...mapGetters([
      'userInfo',
      'userCoin'
    ])
  },
  data() {
    return {
      tabArr: [
        '垫付本金',
        '冻结金额',
        '解冻金额'
      ],
      showToast: false,
      listArr: [],
      listDone: [],
      listCan: [],
      checkIndex: 0,
      accountBen: 0,
      accountCan: 0,
      accountDone: 0
    }
  },
  mounted() {
    this.getApi()
  },
  methods: {
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
      this.getApi()
    },
    //提现
    deposit() {
      if (!this.isCoinSetting) {
        this.showToast = true
      } else {
        if (this.availableDeposit) {
          if (this.availableDeposit < 200) {
            if (!this.userInfo.isVip) {
              const _this = this
              this.$vux.confirm.show({
                title: '没有提现资格',
                content: '普通会员200元以上才能提线 Plus会员任意金额都可提现',
                confirmText: '充值会员',
                cancelText: '取消',
                onConfirm() {
                  _this.$router.push({ name: 'buyPlus' })
                }
              })
            } else {
              this.doDeposit()
            }
          } else {
            if (this.userInfo.bankCardNo && this.userInfo.bankCardUserName) {
              this.$router.push({ name: 'getUserMoney' })
            } else {
              const _this = this
              this.$vux.confirm.show({
                title: '未绑定银行卡',
                content: '只有先绑定银行卡，才有提现资格',
                confirmText: '立即绑定',
                cancelText: '暂不绑定',
                onConfirm() {
                  _this.setPreurl('userMoney')
                  _this.$router.push({ name: 'yinHangKa' })
                }
              })

            }

          }
        }
      }
    },
    //获得可提现金额
    getByBuyerUserId() {
      this.$axios.post('/api/buyerFundsAccount/getByBuyerUserId', {
        userId: this.userInfo.buyerUserId
      }).then((response) => {
        console.log(response)
        if (response.data.code === '200') {
          this.setCoinInfo(response.data.data)
        } else {
          this.$vux.alert.show({
            title: '错误提示',
            content: response.data.message,
          })
        }
      }).catch((error) => {
        this.$vux.alert.show({
          title: '错误提示',
          content: '网络错误',
        })
      })
    },
    //获得数据各个数据
    getApi() {
      this.$axios.post('/api/orderOperate/getTaskRecordListByBuyerUserIdAndStatus', {
        status: this.checkIndex + 1,
        buyerUserId: this.userInfo.buyerUserId
      }).then((response) => {
        if (response.data.code === '200') {
          this.setInfo(response.data.data)
        } else {
          this.$vux.alert.show({
            title: '错误提示',
            content: response.data.message,
          })
        }
      }).catch((error) => {
        console.log(error)
        this.$vux.alert.show({
          title: '错误提示',
          content: '网络错误',
        })
      })
    },
    //设置信息
    setInfo(data) {
      let mylist = []
      for (let item of data.taskList) {
        let obj = {
          title: item.productName,
          time: item.time,
          money: item.productOrderPrice ? item.productOrderPrice.toFixed(2) : 0.00,
          unit: '元'
        }
        mylist.push(obj)
      }
      if (this.checkIndex === 0) {
        this.listArr = mylist
        this.accountBen = data.total ? data.total.toFixed(2) : 0.00
      }
      if (this.checkIndex === 1) {
        this.listDone = mylist
        this.accountDone = data.total ? data.total.toFixed(2) : 0.00
      }
      if (this.checkIndex === 2) {
        this.listCan = mylist
        this.accountCan = data.total ? data.total.toFixed(2) : 0.00
      }
    },
    //提现跳转
    doDeposit() {
      this.$axios.post('/api/withdrawApply/buyer/insertWithdrawApply', {
        buyerUserId: this.userInfo.buyerUserId,
        deposit: this.availableDeposit,
        telephone: this.userInfo.telephone,
        withdrawType: 1
      }).then((response) => {
        const _this = this
        if (response.data.code === '200') {
          this.$vux.alert.show({
            title: '提现成功,点击确定返回个人中心',
            onHide() {
              _this.$router.push({ name: 'user' })
            }
          })
        } else {
          this.$vux.alert.show({
            title: '错误提示',
            content: response.data.message,
          })
        }
      }).catch((error) => {
        this.$vux.alert.show({
          title: '错误提示',
          content: '网络错误',
        })
      })
    },
    ...mapActions([
      'setPreurl'
    ])
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
  left 0
  top 0
  bottom 0
  z-index 9999
  background $color-background
  &.move-enter-active, .move-leave-active
    transition all 0.2s linear
    transform translate3d(0, 0, 0)
  &.move-enter, .move-leave
    transform translate3d(100%, 0, 0)
  .userMoneyBox
    background #eff0f2
    display flex
    flex-direction column
    height 100%
    .headerBox
      height 13.85rem
      box-sizing border-box
      padding 1.6rem 2rem 3rem 2rem
      background-image url('../userHeader/profile_bg.svg')
      background-size 100%
      font-size 0
      .info
        color $color-text-d
        font-size $font-size-normal
        .btn
          float right
      .coin
        margin-top 1.8rem
        font-size $font-size-coin
        color $color-theme-white
        .btn
          font-size $font-size-normal
          padding 0.8rem 1.2rem
          border-1px(#fff)
          float right
          top 1.6rem
          &.disabled
            opacity 0.3
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
      .payBoxMoney
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
