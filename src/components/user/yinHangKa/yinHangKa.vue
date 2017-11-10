<template>
  <transition name="move">
    <div class="settings">
      <scroll ref="scroll" class="scroll-content">
        <div class="yinhangka">
          <group class="groupBox">
            <x-input placeholder="输入姓名，必须与银行卡姓名一致" required v-model="userName" is-type="china-name" ref="userName"></x-input>
          </group>
          <group class="groupBox">
            <x-input placeholder="输入银行卡卡号" required v-model="userAccount" :is-type="userAccountType" type="number" ref="userAccount"></x-input>
            <x-address v-model="addressValue" :list="addressData" placeholder="选择开户行城市" value-text-align="left" :title="title"></x-address>
            <x-input placeholder="输入开户行名称" required v-model="userBsName"></x-input>
          </group>
          <info :infoArr="infos"></info>
          <div class="btnBox">
            <m-Button @my-click="apply" :class="{'btn-disabled':!btnSaveState}">保存</m-Button>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import Info from '../../../base/info/info'
import Upload from '../../../base/upload/upload'
import MButton from '../../../base/button/button'
import { XInput, Group, XAddress, ChinaAddressV2Data, Value2nameFilter as value2name } from 'vux'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'yinHangKa',
  components: {
    Scroll,
    XInput,
    Group,
    Info,
    MButton,
    Upload,
    XAddress
  },
  data () {
    return {
      infos: [
        '只支持提现到借记卡（普通存储卡）。不支持提现到信用卡到农村信用社',
        '如果你填写的银行卡账号信息不正确，可能将无法成功退款，平台不承担由此产生的一切费用',
        '为确保您的资金安全，绑定后支付宝信息、银行卡开户名不可修改，及时账号被盗，您账号里的资金也不会转移到他人的账户'
      ],
      btnSaveState: false,
      title: '',
      addressValue: [],
      addressValueString: '',
      addressData: ChinaAddressV2Data,
      userName: '',
      userAccount: null,
      userBsName: '',
      userAccountType: (val) => {
        if (val.length >= 15 && val.length <= 17) {
          return {
            valid: true
          }
        }
        return {
          valid: false,
          msg: '请输入正确的银行卡账号'
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'preurl'
    ])
  },
  watch: {
    addressValue (value) {
      this.addressValueString = value2name(value, ChinaAddressV2Data)
      this.checkState()
    },
    userName () {
      this.checkState()
    },
    userBsName () {
      this.checkState()
    },
    userAccount () {
      this.checkState()
    }
  },
  methods: {
    checkState () {
      let isUserName = this.$refs.userName.valid
      let isAccount = this.$refs.userAccount.valid
      let isAddressValueString = this.addressValueString.length > 0
      let isUserBsName = this.userBsName.length > 0
      if (isUserName && isAccount && isAddressValueString && isUserBsName) {
        this.btnSaveState = true
        return false
      }
      this.btnSaveState = false
    },
    // 保存地址
    apply () {
      // ajax请求
      if (this.btnSaveState) {
        this.$axios.post('/api/user/update', {
          telephone: this.userInfo.telephone,
          bankCardUserName: this.userName,
          bankCardNo: this.userAccount,
          bankLocationCity: this.addressValueString,
          bankName: this.userBsName
        }).then((response) => {
          if (response.data.code === '200') {
            let _this = this
            let obj = Object.assign({}, this.userInfo, {
              bankCardUserName: this.userName,
              bankCardNo: this.userAccount,
              bankLocationCity: this.addressValueString,
              bankName: this.userBsName
            })
            this.setUserInfo(obj)
            this.$vux.toast.show({
              text: '保存成功',
              onHide () {
                if (_this.preurl) {
                  _this.$router.push({ name: _this.preurl })
                } else {
                  _this.$router.push({ name: 'user' })
                }
              }
            })
          } else {
            this.$vux.toast.show({
              text: '设置失败，请重试',
              type: 'warn'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    ...mapActions([
      'setUserInfo'
    ])
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/variable'
@import '../../../assets/stylus/mixin'
.settings
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
  .scroll-content
    height 100%
    .groupBox
      margin-top 1.2rem
    .btnBox
      box-sizing border-box
      padding 0 1.6rem
</style>