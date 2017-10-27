<template>
  <transition name="move">
    <div class="settings">
      <scroll ref="scroll" class="scroll-content">
        <div class="settingsBox">
          <div class="boxContainer">
            <group>
              <!--头像-->
              <cell :link="avatorBox.link" :is-link="avatorBox.isLink" :title="avatorBox.title" @click.native="avatorChange">
                <div v-if="avatorBox.avator">
                  <img :src="avatorBox.avator" alt="" style="width:4.8rem;height:4.8rem">
                </div>
              </cell>
              <!--用户名-->
              <cell :link="userName.link" :is-link="userName.isLink" :title="userName.title" :value="userName.value">
              </cell>
              <!--旺旺等级-->
              <cell @click.native="showPopupPicker=true" :link="userTaobao.link" :is-link="userTaobao.isLink" :title="userTaobao.title" :inline-desc='userTaobao.info' :value="userTaobao.value">
              </cell>
              <!--性别-->
              <cell :link="userSex.link" :is-link="userSex.isLink" :title="userSex.title" :value="isNull(userSex.value)">
              </cell>
              <!--出生日期-->
              <cell :link="userAge.link" :is-link="userAge.isLink" :title="userAge.title" :value="isNull(userAge.value)" @click.native="ageChange">
              </cell>
              <!--收货地址-->
              <!-- <cell :link="userAddress.link" :is-link="userAddress.isLink" :title="userAddress.title" :value="isNull(userAddress.value)">
                                                          </cell> -->
            </group>
          </div>
          <div class="boxContainer">
            <group>
              <cell :link="item.link" :is-link="item.isLink" :title="item.title" :value="isNull(item.value)" :inline-desc='item.info' v-for="(item,index) in boxTwo" :key="index"></cell>
            </group>
          </div>
          <div class="btnBox">
            <button class="btn" @click="logout">退出登录</button>
          </div>
          <div class="iconfont">
          </div>
          <div class="actionBox" v-show="visibility||show">
            <popup-picker :data="list" @on-change="onChange" :show.sync="showPopupPicker" style="position:absolute"></popup-picker>
            <actionsheet v-model="show" :menus="menus2" show-cancel></actionsheet>
            <datetime v-model="age" title="" @on-change="saveAge" :show.sync="visibility" :min-year="1900" :max-year="2017"></datetime>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import avatarSrc from '../userHeader/avator.png'
import Scroll from '../../../base/scroll/scroll'
import { Cell, Group, Actionsheet, Datetime, PopupPicker } from 'vux'
import { mapActions, mapGetters } from 'vuex'
import { userInfoMixin } from '../../../assets/js/mixin'
export default {
  name: "settings",
  mixins: [userInfoMixin],
  filters: {
    isNull: function (value) {
      if (value) {
        return value
      }
      return '未填写'
    }
  },
  components: {
    Group,
    Cell,
    Scroll,
    Actionsheet,
    Datetime,
    PopupPicker
  },
  computed: {
    avatorBox: {
      get() {
        return {
          title: '头像',
          link: '',
          isLink: true,
          avator: this.userInfo.headPicId || avatarSrc
        }
      },
      set(val) {
        return val
      }
    },
    userName: {
      get() {
        return {
          title: '用户名',
          link: '',
          isLink: false,
          value: this.userInfo.username || this.userInfo.telephone || '暂无数据'
        }
      },
      set(val) {
        return val
      }
    },
    userTaobao: {
      get() {
        return {
          title: '旺旺等级',
          link: '',
          isLink: true,
          value: this.list[0][parseInt(this.userInfo.taobaoLevel)] || '暂无数据',
          info: '请及时更新真是的旺旺等级'
        }
      },
      set(val) {
        return val
      }
    },
    userSex: {
      get() {
        return {
          title: '性别',
          link: 'settings/usersex',
          isLink: true,
          value: (this.userInfo.gender === 0 ? '女' : '男')
        }
      },
      set(val) {
        return val
      }
    },
    userAge: {
      get() {
        return {
          title: '出生日期',
          link: '',
          isLink: true,
          value: this.userInfo.birthday
        }
      },
      set(val) {
        return val
      }
    },
    userAddress: {
      get() {
        return {
          title: '收货地址',
          link: 'settings/userAddress',
          isLink: true,
          value: this.userInfo.postAddress
        }
      },
      set(val) {
        return val
      }
    },
    boxTwo: {
      get() {
        return [
          {
            title: '联系QQ',
            link: 'settings/userQq',
            isLink: true,
            value: this.userInfo.qqNum,
            info: '填写有助于提高中奖率'
          },
          {
            title: '更改手机号',
            link: 'settings/userPhone',
            isLink: true,
            value: this.userInfo.telephone
          }
        ]
      },
      set(val) {
        return val
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  data() {
    return {
      show: false,
      menus2: {
        menu1: '从相册选择',
        menu2: '拍照'
      },
      visibility: false,
      age: '',
      list: [['1星', '2星', '3星', '4星', '5星', '1冠', '2冠', '3冠', '4冠', '5冠']],
      value: [],
      taobaoLevel: null,
      userTaobaoState: null,
      showPopupPicker: false
    }
  },
  methods: {
    //判断是否有值
    isNull(value) {
      if (value) {
        return value
      }
      return '未填写'
    },
    //更改头像
    avatorChange() {
      this.show = true
    },
    //显示日期
    ageChange() {
      this.visibility = true
    },
    //更改年龄
    saveAge() {
      this.$axios.post('/api/user/update', {
        telephone: this.userInfo.telephone,
        birthday: this.age
      }).then((response) => {
        if (response.data.code === '200') {
          let _this = this
          let obj = Object.assign({}, this.userInfo, {
            birthday: this.age
          })
          this.userAge.value = this.age
          this.setUserInfo(obj)
          this.$vux.toast.show({ text: '设置成功' })
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
    //退出登录
    logout() {
      const _this = this
      this.$vux.confirm.show({
        title: '确认退出登录吗',
        content: '退出登录将不能查看个人信息',
        onConfirm() {
          _this.$axios.post('/api/user/loginOut', {}).then((response) => {
            if (response.data.code === '200') {
              _this.$vux.toast.text('退出成功', 'middle')
              _this.setUserInfo('')
              _this.$router.push({ name: 'login' })
            } else {
              _this.$vux.toast.show({
                text: '退出成功',
                type: 'warn',
                position: middle
              })
            }
          }).catch((error) => {
            console.log(error)
          })
        }
      })
    },
    onChange(val) {
      this.$axios.post('/api/user/update', {
        telephone: this.userInfo.telephone,
        taobaoLevel: this.list[0].indexOf(val[0])
      }).then((response) => {
        if (response.data.code === '200') {
          let _this = this
          let obj = Object.assign({}, this.userInfo, {
            taobaoLevel: this.list[0].indexOf(val[0])
          })
          this.userTaobao.value = {
            title: '旺旺等级',
            link: '',
            isLink: true,
            value: this.list[0][parseInt(this.list[0].indexOf(val[0]))] || '暂无数据',
            info: '请及时更新真是的旺旺等级'
          }
          console.log(this.userTaobao.value)
          this.setUserInfo(obj)
          this.$vux.toast.show({ text: '设置成功' })
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
      'setUserInfo'
    ])
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
    .settingsBox
      background #eff0f2
      .boxContainer
        margin-top 0.8rem
        &:first-child
          margin-top 0
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
        &:active
          background $color-theme-active
</style>
