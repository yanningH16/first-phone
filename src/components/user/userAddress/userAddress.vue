<template>
  <transition name="move">
    <div class="settings">
      <scroll ref="scroll" class="scroll-content">
        <div class="userAddressBox">
          <div class="boxOne" v-show="!isShowAdd">
            <div class="addressBox" v-if="addressItem">
              <div class="addressItem">
                <div class="itemLeft">
                  <p class="name">{{addressItem.name}}</p>
                  <span class="target" v-if="addressItem.isDefault">默认</span>
                </div>
                <div class="itemRight">
                  <p class="phone">{{addressItem.phone}}</p>
                  <p class="addressInfo">{{addressItem.addressInfo}}</p>
                </div>
              </div>
            </div>
            <div class="infoBox">
              <p v-for="(item,index) in infos" :key="index" class="info">{{index + 1}}.{{item}}</p>
            </div>
            <div class="btnBox">
              <button class="btn" @click="showAddAddress" v-if="!addressItem">添加新地址</button>
              <button class="btn" @click="updateAddress" v-else>修改地址</button>
            </div>
          </div>
          <transition name="showAddress">
            <div class="boxTwo" v-show="isShowAdd">
              <div class="addressInputBox">
                <group>
                  <x-input placeholder="省区、城市、区县" v-model="addressOneName" @on-focus="chooseAddress"></x-input>
                  <x-input placeholder="详细地址，如街道、楼牌号等" required v-model="addressTwo" ref="validAdd"></x-input>
                  <x-input is-type="china-name" placeholder="姓名" required v-model="addressName" ref="validName"></x-input>
                  <x-input is-type="china-mobile" placeholder="手机号" required v-model="addressPhone" ref="validPhone"></x-input>
                </group>
              </div>
              <div class="defaultAddress">
                <checkbtn :isChecked="isChecked"></checkbtn>
                <span class="text">设为默认地址</span>
              </div>
              <div class="btnBox">
                <button class="btn" :class="{'btn-disabled':!btnSaveState}" @click="saveAddress">保存</button>
              </div>
              <div class="showAddress">
                <x-address style="display:none;" :title="title" v-model="addressOne" :list="addressData" :show.sync="isShowAddress"></x-address>
              </div>
            </div>
          </transition>
        </div>
      </scroll>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import Checkbtn from '../../../base/checkbtn/checkbtn'
import { XInput, Group, XAddress, ChinaAddressV2Data, Value2nameFilter as value2name } from 'vux'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'userAddress',
  components: {
    Scroll,
    XInput,
    Group,
    Checkbtn,
    XAddress
  },
  data () {
    return {
      infos: [
        '请填写淘宝常用收货地址，中奖下单必须与改地址一致！平台会定期检查，如发现不一致，将封号处理！',
        '该地址将作为后期活动寄送的收货地址'
      ],
      isShowAdd: false,
      addressOne: [],
      addressOneName: '',
      addressTwo: '',
      addressName: '',
      addressPhone: '',
      isChecked: true,
      btnSaveState: false,
      addressData: ChinaAddressV2Data,
      isShowAddress: false,
      title: '默认'
    }
  },
  computed: {
    addressItem: {
      get () {
        return {
          name: this.userInfo.username,
          isDefault: true,
          phone: this.userInfo.telephone,
          addressInfo: this.userInfo.postAddress
        }
      },
      set (val) {
        return val
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    addressOne (newval) {
      this.addressOneName = this.getName(newval)
      this.regExpClicked()
    },
    addressTwo () {
      this.regExpClicked()
    },
    addressName () {
      this.regExpClicked()
    },
    addressPhone () {
      this.regExpClicked()
    }
  },
  methods: {
    showAddAddress () {
      this.isShowAdd = true
    },
    // 显示下拉地址
    chooseAddress () {
      this.isShowAddress = true
    },
    // 获得地址
    getName (value) {
      return value2name(value, ChinaAddressV2Data)
    },
    // 校验是否可点击
    regExpClicked () {
      // let hasAddressOne
      let hasCore = (this.addressOneName.length > 1)
      let hasAdd = this.$refs.validAdd.valid
      let hasName = this.$refs.validName.valid
      let hasPhone = this.$refs.validPhone.valid
      if (hasCore && hasAdd && hasName && hasPhone) {
        this.btnSaveState = true
        return false
      }
      this.btnSaveState = false
    },
    // 保存地址
    saveAddress () {
      // ajax请求
      if (this.btnSaveState) {
        console.log('保存')
        this.$axios.post('/api/user/update', {
          telephone: this.userInfo.telephone,
          postAddress: this.addressOneName,
          phone: this.addressPhone,
          name: this.addressName
        }).then((response) => {
          // console.log(response);
          let that = this
          let obj = this.$store.state.userInfo
          obj.addressInfo = this.addressOneName
          obj.phone = this.addressPhone
          obj.name = this.addressName
          this.setUserInfo(obj)
          this.$vux.toast.show({
            text: '保存成功',
            onHide () {
              that.$router.push({ name: 'settings' })
            }
          })
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    // 更新地址
    updateAddress () {
      this.isShowAdd = true
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
    .userAddressBox
      .btnBox
        width 100%
        padding 2rem 1.8rem
        box-sizing border-box
        .btn
          width 100%
          border-width 0
          outline 0
          -webkit-appearance none
          position relative
          height 4rem
          line-height 4rem
          font-size $font-size-medium-x
          text-align center
          text-decoration none
          color $color-theme-white
          border-radius $border-radius
          -webkit-tap-highlight-color rgba(0, 0, 0, 0)
          background-color $color-theme
          font-weight $font-weight
        .btn-disabled
          background-color $color-theme-disabled
          color rgba(255, 255, 255, 0.3)
          &:active
            background $color-theme-active
      .boxOne
        .infoBox
          width 100%
          padding 2rem 1.8rem 0 1.8rem
          box-sizing border-box
          .info
            font-size $font-size-normal
            color $color-text-d
            line-height 1.8rem
        .addressBox
          width 100%
          background $color-theme-white
          box-sizing border-box
          padding 1.6rem 2rem
          height 8.6rem
          .addressItem
            display flex
            .itemLeft
              flex 0 0 4.2rem
              overflow hidden
              .name
                font-size $font-size-medium
                color $color-text
                margin-bottom 0.8rem
              .target
                color $color-theme-white
                font-size $font-size-normal
                background $color-text
                border-radius $border-radius
                padding 0.2rem 0.4rem
                text-align center
                display inline-block
            .itemRight
              flex 1
              margin-left 2rem
              .phone
                font-size $font-size-medium
                color $color-text
                margin-bottom 0.8rem
              .addressInfo
                font-size $font-size-normal
                color $color-text-d
                line-height 2rem
      .boxTwo
        display block
        .defaultAddress
          text-align center
          font-size 1.4rem
          margin 1.6rem 0 0.4rem 0
          .text
            vertical-align text-top
</style>

