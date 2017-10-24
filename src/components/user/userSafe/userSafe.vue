<template>
  <transition name="move">
    <div class="settings">
      <scroll ref="scroll" class="scroll-content">
        <div class="settingsBox">
          <div class="boxContainer">
            <group>
              <cell 
                :link="item.link" 
                :is-link="item.isLink" 
                :title="item.title" 
                :value="isNull(item.value)" 
                :inline-desc='item.info' 
                v-for="(item,index) in boxOne" 
                :key="index" :class="stateClass[item.state]">
              </cell>
            </group>
          </div>
          <div class="boxContainer">
            <group>
              <cell :link="item.link" :is-link="item.isLink" :title="item.title" :value="isNull(item.value)" :inline-desc='item.info' v-for="(item,index) in boxTwo" :key="index"></cell>
            </group>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import avatarSrc from '../userHeader/avator.png'
import Scroll from '../../../base/scroll/scroll'
import { Cell, Group, Actionsheet, Datetime } from 'vux'
import { userInfoMixin } from '../../../assets/js/mixin'
export default {
  name: "settings",
  mixins:[userInfoMixin],
  components: {
    Group,
    Cell,
    Scroll,
    Actionsheet,
    Datetime
  },
  created(){
    console.log(this.userInfo)
    //淘宝账号状态判断
    if(this.userInfo.alipayUserName){
      this.boxOne[0].title = `绑定淘宝买号:${this.userInfo.alipayUserName}`
      if(this.userInfo.checkStatus===1){
         this.boxOne[0].state = 2
         this.boxOne[0].isLink = false
         this.boxOne[0].value = '已通过审核'
      }else if(this.userInfo.checkStatus===0){
         this.boxOne[0].state = 0
         this.boxOne[0].isLink = true
         this.boxOne[0].value = '未通过审核'
      }else{
        this.boxOne[0].state = 1
        this.boxOne[0].isLink = true
        this.boxOne[0].value = '审核中'
      }
    }
    //银行卡状态判断
    if(this.userInfo.bank_card_no){
      if(this.userInfo.bankCheckStatus===1){
         this.boxOne[1].state = 2
         this.boxOne[1].isLink = false
         this.boxOne[1].value = '已通过审核'
      }else if(this.userInfo.bankCheckStatus===0){
         this.boxOne[1].state = 0
         this.boxOne[1].isLink = true
         this.boxOne[1].value = '未通过审核'
      }else{
        this.boxOne[1].state = 1
        this.boxOne[1].isLink = true
        this.boxOne[1].value = '审核中'
      }
    }
    // 提现密码设置
    if(this.userInfo.depositPassword){
      this.boxTwo[0].state = 1
      this.boxTwo[0].isLink = false
      this.boxTwo[0].value = '已设置'
    }
    console.log(this.boxOne)
  },
  computed: {
    boxOne: {
      get() {
        let arr = []
        //淘宝账号状态判断
        if (this.userInfo.alipayUserName) {
          let obj = {
            title: `绑定淘宝买号:${this.userInfo.alipayUserName}`
          }
          if (this.userInfo.checkStatus === 1) {
            obj.state = 2
            obj.isLink = false
            obj.value = '已通过审核'
          } else if (this.userInfo.checkStatus === 0) {
            obj.state = 0
            obj.isLink = true
            obj.value = '未通过审核'
          } else {
            obj.state = 1
            obj.isLink = true
            obj.value = '审核中'
          }
          arr.push(obj)
        } else {
          let obj = {
            title: '绑定淘宝买号',
            link: '../registerThree',
            isLink: true,
            value: '',
            info: '',
            state: 1
          }
          arr.push(obj)
        }
        //银行卡状态判断
        if (this.userInfo.bank_card_no) {
          let obj = {}
          if (this.userInfo.bankCheckStatus === 1) {
            obj.state = 2
            obj.isLink = false
            obj.value = '已通过审核'
          } else if (this.userInfo.bankCheckStatus === 0) {
            obj.state = 0
            obj.isLink = true
            obj.value = '未通过审核'
          } else {
            obj.state = 1
            obj.isLink = true
            obj.value = '审核中'
          }
          arr.push(obj)
        } else {
          let obj = {
            title: '绑定银行卡',
            link: 'userSafe/yinHangKa',
            isLink: true,
            value: '',
            info: '支付宝通过审核后方可绑定',
            state: 1
          }
          arr.push(obj)
        }
        console.log(arr)
        return arr
      },
      set(val) {
        return val
      }
    }
  },
  data() {
    return {
      stateClass:['classError','classProgress','classSuccess'],
      boxOne: [
        {
          title: '绑定淘宝买号',
          link: '../registerThree',
          isLink: true,
          value: '',
          info: '',
          state:1
        },
        {
          title: '绑定银行卡',
          link: 'userSafe/yinHangKa',
          isLink: true,
          value: '',
          info: '支付宝通过审核后方可绑定',
          state:1
        }
      ],
      boxTwo: [
        {
          title: '设置提现密码',
          link: 'userSafe/setPayPwd',
          isLink: true,
          value: '未设置',
          info: ''
        },
        {
          title: '更改登录密码',
          link: 'userSafe/updateUserPwd',
          isLink: true,
          value: '@',
          info: ''
        }
      ]
    }
  },
  methods: {
    //判断是否有值
    isNull(value) {
      if (value === '@') {
        return ''
      }else if(value){
        return value
      }
      return '未绑定'
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/variable'
  .settings
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
    .scroll-content
      height 100%
      .settingsBox
        background #eff0f2
        .boxContainer
          margin-top 0.8rem
</style>
