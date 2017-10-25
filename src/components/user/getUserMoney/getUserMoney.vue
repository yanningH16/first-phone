<template>
  <transition name="move">
    <div class="userMoney">
      <div class="userMoneyBox">
        <div class="listBox">
          <scroll class="scroll-content">
            <div class="containerBox">
              <div class="groupBox">
                <!-- <div class="checkList border-bottom-1px" @click="chooseCheck=1">
                        <div class="left">提现到银行卡</div>
                        <div class="right">
                          <span class="info">中心银行 吴** 6218****0508</span>
                          <checkbtn :isChecked="chooseCheck===1"></checkbtn>
                        </div>
                      </div> -->
                <div class="checkList">
                  <div class="left">提现到微信</div>
                  <div class="right">
                    <span class="info">{{userInfo.wechatNum}}</span>
                    <checkbtn :isChecked="chooseCheck===1"></checkbtn>
                  </div>
                </div>
              </div>
              <div class="groupBox">
                <group>
                  <x-input placeholder="请输入提现金额" type="number" class="inputBox" v-model="money" :show-clear="false">
                    <div slot="right" class="text">可提现金额:{{availableDeposit}}</div>
                  </x-input>
                </group>
              </div>
              <div class="line" v-if="userInfo.isVip===1">
                您为Plus会员，任意金额都可提现，手续费10%
              </div>
              <div class="line" v-else>
                您为普通会员，提现金额为100元的整数倍且不少于200元，手续费10%
              </div>
              <div class="groupBox">
                <group>
                  <x-input placeholder="输入提现密码" :show-clear="false" v-model="pwd" type="password"></x-input>
                  <x-input placeholder="请输入手机验证码" type="number" class="inputBox" v-model="msg" ref="msg" :show-clear="false">
                    <button slot="right" class="btn" @click="getCode" :class="{'btn-disabled':!btnCodeState}">{{codeText}}</button>
                  </x-input>
                </group>
              </div>
              <div class="btnBox">
                <m-Button @my-click="getUserMoney" :class="{'btn-disabled':!btnSaveState}">确定</m-Button>
              </div>
            </div>
          </scroll>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import Checkbtn from '../../../base/checkbtn/checkbtn'
import MButton from '../../../base/button/button'
import Vue from 'vue'
import { XInput, Group, md5 } from 'vux'
import { mapGetters } from 'vuex'
export default {
  name: "userMoney",
  components: {
    Scroll,
    Checkbtn,
    XInput,
    Group,
    MButton
  },
  computed: {
    btnSaveState: {
      get() {
        let isSave = false
        if (this.money >= 200 && this.money <= this.availableDeposit && this.pwd && this.msg && this.msg.length === 6) {
          return true
        }
        return false
      },
      set(val) {
        return val
      }
    },
    availableDeposit: {
      get() {
        let deposit = 400
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
      btnCodeState: true,
      msg: null,
      pwd: null,
      codeText: '获取',
      time: 60,
      timer: null,
      chooseCheck: 1,
      money: null
    }
  },
  methods: {
    //获得验证码
    getCode() {
      if (this.btnCodeState) {
        this.btnCodeState = false
        this.$axios.post('/api/sms/send', {
          telephone: this.userInfo.telephone,
          type: 0
        }).then((response) => {
          if (response.data.code === '200') {
            this.$vux.toast.text('短信已发送', 'middle')
            this.timer = setInterval(this.timeGo, 1000)
          } else {
            this.btnCodeState = true
            this.$vux.alert.show({
              title: '错误提示',
              content: response.data.message,
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
    },
    //倒计时
    timeGo() {
      if (this.time >= 0) {
        this.codeText = `已发送(${this.time}`
        this.time--
      } else {
        this.codeText = '重新获取'
        this.time = 60
        clearInterval(this.timer)
        this.timer = null
        this.btnCodeState = true
      }
    },
    getUserMoney() {
      var _this = this
      this.$vux.confirm.show({
        title: '核对金额',
        content: `<p>本次提现金额:${parseFloat(_this.money).toFixed(2)}</p><p>实际到账金额:${parseFloat(_this.money * 0.9).toFixed(2)}</p>`,
        onConfirm() {
          _this.doDeposit()
        }
      })
    },
    doDeposit() {
      this.$axios.post('/api/withdrawApply/buyer/insertWithdrawApply', {
        buyerUserId: this.userInfo.buyerUserId,
        deposit: this.money,
        telephone: this.userInfo.telephone
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
    }
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
    .containerBox
      .line
        font-size $font-size-normal
        color $color-text-d
        padding 1.2rem 1.2rem 0 1.2rem
        box-sizing border-box
        width 100%
        line-height 2rem
      .groupBox
        margin-top 1.2rem
        background $color-theme-white
        .checkList
          background $color-theme-white
          box-sizing border-box
          padding 1.8rem 1.2rem 1.8rem 0
          margin-left 1.8rem
          display flex
          justify-content center
          border-bottom-1px(#d4d5d8)
          .left
            flex 0 0 1
            text-align left
            font-size $font-size-medium
            color $color-text
            line-height 2.1rem
          .right
            flex 1
            text-align right
            line-height 2.1rem
            font-size $font-size-normal
            color $color-text-d
        .inputBox
          .btn
            border-small($color-text, $border-radius)
            outline 0
            -webkit-appearance none
            position relative
            height 3.4rem
            padding 0 1rem
            font-size $font-size-medium
            text-align center
            text-decoration none
            color $color-text
            -webkit-tap-highlight-color rgba(0, 0, 0, 0)
            font-weight $font-weight
            background $color-theme-white
            position relative
            right -0.5rem
            &.btn-disabled
              opacity 0.3
      .btnBox
        width 100%
        padding 0.5rem 1.8rem
        box-sizing border-box
        margin-top 1.2rem
</style>
