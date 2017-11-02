<template>
  <transition name="move">
    <div class="userContainer">
      <div class="userContainerBox">
        <scroll style="height:100%" :click="isClick" :preventDefaultException="preventDefaultException" ref="scrollConent">
          <div class="register">
            <div class="header">
              <img src="./taobao.png" alt="">
              <span>绑定淘宝</span>
            </div>
            <div class="groupBox">
              <div class="title">一、填写淘宝号</div>
              <div class="inputBox inputBoxCore border-bottom-1px">
                <input type="text" placeholder="请填写日常购物淘宝号，非刷单号" class="input" v-model="taobao">
              </div>
              <p class="info">绑定淘宝账号需要满足：1.注册时间一个月以上、2.支付宝实名认证、3.账号等级2心以上</p>
            </div>
            <div class="groupBox">
              <div class="title">二、选择旺旺等级</div>
              <div class="inputBox">
                <input type="text" disabled v-model="taobaoLevel" placeholder="旺旺等级需要2心以上" class="input" style="border:none;margin-bottom:0;height: 3rem;line-height: 3rem;">
                <i class="idown">
                  <popup-picker :data="list" v-model="value" style="opacity:0" @on-change="onChange"></popup-picker>
                </i>
              </div>
            </div>
            <div class="groupBox">
              <div class="title">三、上传旺旺等级截图</div>
              <div class="inputBox">
                <upload :myimgs="imgWW" :max="1" @upload-change="uploadChangeWW" :isShow="false"></upload>
              </div>
            </div>
            <div class="groupBox">
              <div class="title">四、填写实名信息</div>
              <div class="inputBox border-bottom-1px">
                <input type="text" placeholder="姓名，须和银行卡姓名一致" class="input" v-model="xm">
              </div>
              <div class="inputBox border-bottom-1px">
                <input type="text" placeholder="支付宝账号" class="input" v-model="zfb">
              </div>
              <div class="inputBox">
                <input type="text" placeholder="身份证号码" class="input" v-model="sfz">
              </div>
            </div>
            <div class="groupBox">
              <div class="title">五、上传实名认证图片</div>
              <div class="inputBox" style="margin-top:2.4rem">
                <upload :myimgs="imgSM" :max="1" @upload-change="uploadChangeSM" :isShow="false"></upload>
              </div>
            </div>
            <!-- <div class="groupBox">
              <div class="title">六、上传花呗图片</div>
              <p class="text">花呗未开通也要提交该截图，未开通不影响做</p>
              <div class="inputBox">
                <upload :myimgs="imgHB" :max="5" @upload-change="uploadChangeHB" :isShow="true"></upload>
              </div>
            </div> -->
            <info :infoArr="infos">
              <p>注意事项</p>
            </info>
            <div class="btnBox">
              <m-Button @my-click="doResponse" :class="{'btn-disabled':!btnSaveState}">我的账号符合上诉要求，确认提交</m-Button>
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { XInput, Group, PopupPicker } from 'vux'
import Scroll from '../../../base/scroll/scroll'
import Info from '../../../base/info/info'
import Upload from '../../../base/upload/upload'
import MButton from '../../../base/button/button'
import { mapGetters } from 'vuex'
export default {
  name: "buyCoin",
  components: {
    XInput,
    Group,
    Info,
    MButton,
    Scroll,
    Upload,
    PopupPicker
  },
  data() {
    return {
      taobao: '',
      xm: '',
      zfb: '',
      sfz: '',
      isClick: false,
      isImgUrl: false,
      preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|SPAN|IMG)$/ },
      infos: [
        '请绑定经常购物的淘宝账号，有利于提升通过几率',
        '严禁绑定刷单账号，一经核查将直接封号处理',
        '绑定的淘宝买号必须和您支付宝认证信息为同1人，否则平台不能通过审核'
      ],
      imgWW: [],
      imgSM: [],
      imgHB: [],
      value: [],
      list: [['1星', '2星', '3星', '4星', '5星', '1钻', '2钻', '3钻', '4钻', '5钻','皇冠']],
      taobaoLevel: null
    }
  },
  computed: {
    btnSaveState: {
      get() {
        let isHasTb = (this.taobao.length !== 0)
        let isWWImgUrl = (this.imgWW && this.imgWW.length === 1)
        let isLevel = (this.taobaoLevel !== null && this.taobaoLevel.length !== 0)
        let isXm = (this.xm.length !== 0)
        let isZfb = (this.zfb.length !== 0)
        let isSfz = (this.sfz.length !== 0)
        let isSMImgUrl = (this.imgSM && this.imgSM.length === 1)
        // let isHBImgUrl = (this.imgHB && this.imgHB.length >= 1)
        this.$nextTick(() => {
          this.$refs.scrollConent.refresh()
        })
        // if (isHasTb && isWWImgUrl && isLevel && isXm && isZfb && isSfz && isSMImgUrl && isHBImgUrl) {
        if (isHasTb && isWWImgUrl && isLevel && isXm && isZfb && isSfz && isSMImgUrl) {
          return true
        } else {
          return false
        }
      },
      set(val) {
        return val
      }
    },
    ...mapGetters([
      'userPhone'
    ])
  },
  methods: {
    uploadChangeWW(val) {
      this.imgWW = val
    },
    uploadChangeSM(val) {
      this.imgSM = val
    },
    uploadChangeHB(val) {
      this.imgHB = val
    },
    doResponse() {
      if (this.btnSaveState) {
        let _this = this
        this.$vux.confirm.show({
          title: '提示',
          content: '买号绑定后将不能继续修改买号信息，确认提交？',
          onConfirm() {
            _this.doApi()
          }
        })
      }
    },
    doApi() {
      let content = {
        title: '提交成功，请耐心等待',
        info: '当天提交的支付宝审核预计在1小时左右完成审核,21:00之后提交的将于次日审核'
      }
      this.$axios.post('/api/user/register3', {
        telephone: this.userPhone,
        taobaoId: this.taobao,
        taobaoLevel: parseInt(this.list[0].indexOf(this.taobaoLevel)) + 2,
        taobaoAccountPicId: this.imgWW[0],
        fullName: this.xm,
        alipayAccountNo: this.zfb,
        alipayUserIdcard: this.sfz,
        realNameAuthPicUrl: this.imgSM[0],
        huabeiPicsUrl: this.imgHB
      }).then((response) => {
        let data = response.data
        if (data.code !== "200") {
          this.$vux.alert.show({
            title: '错误提示',
            content: data.message,
          })
        } else {
          //登录成功
          this.$router.push({ name: 'state', params: { content: content } })
        }
      }).catch((error) => {
        this.$vux.alert.show({
          title: '错误提示',
          content: '服务器错误',
        })
      })
    },
    //选择旺旺等级
    onChange(val) {
      this.taobaoLevel = val[0]
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/variable'
@import '../../../assets/stylus/mixin'
.userContainer
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
  .userContainerBox
    background #eff0f2
    display flex
    flex-direction column
    height 100%
    .register
      padding-bottom 2rem
      .header
        width 100%
        padding 2rem 1.6rem
        font-size 0
        margin-top 1rem
        img
          width 2.5rem
          height 2.5rem
          vertical-align top
          margin-right 1rem
        span
          height 2.5rem
          line-height 2.5rem
          font-size $font-size-large-x
          color $color-text
      .groupBox, .groupBoxCore
        margin-top 1.2rem
        padding 1.2rem 1.6rem
        width 100%
        box-sizing border-box
        background $color-theme-white
        .title
          font-size $font-size-medium
          color $color-text
          margin-bottom 1.2rem
        .input
          width 100%
          height 5rem
          line-height 5rem
          font-size $font-size-medium
          border 0
          outline 0
          -webkit-appearance none
          background-color transparent
        .text
          color $color-text-d
          font-size $font-size-normal
          margin-bottom 2.8rem
        .info
          font-size $font-size-normal
          color $color-text-d
          line-height 2rem
        .inputBoxCore
          margin-bottom 1.2rem
        .inputBox
          position relative
          border-bottom-1px($color-text-ll)
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
            right -1.5rem
            &.btn-disabled
              opacity 0.3
        .idown
          content ' '
          display inline-block
          height 6px
          width 6px
          border-width 2px 2px 0 0
          border-color #C8C8CD
          border-style solid
          position relative
          top -2px
          position absolute
          top 50%
          margin-top -6px
          right 15px
          transform matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(90deg)
      .btnBox
        width 100%
        padding 0.5rem 1.8rem
        box-sizing border-box
</style>
