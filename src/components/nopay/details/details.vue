<template>
  <div style="height:100%;background: white;position:relative;z-index:100">
    <div class="scrollContainer">
      <scroll ref="scroll" class="scroll-content">
        <div>
          <div class="img">
            <swiper :list="demo07_list" :show-dots="false" :height="hei"></swiper>
          </div>
          <div class="conten">
            <div class="content_info" style="text-align: left">
              <h1>{{objDeli.productName}}</h1>
              <p class="bn" v-if="bainaNum">白拿总数
                <strong>{{objDeli.totalNum}}</strong>份 / 已申请
                <strong>{{objDeli.applyNum}}</strong>份</p>
              <div class="time">
                <!--1.金币换的界面-->
                <div class="jinbihuan" v-if="objDeli.isGold===1">
                  <span style="font-size: 2rem;">{{objDeli.goldNum | moneyBeautifuly}}</span>金币兑换<span
                  class="prics">¥{{objDeli.price | moneyBeautifuly}}</span>
                </div>
                <!--3.超额返的部分-->
                <div class="jinbihuan" style="color: #ff3340" v-else-if="objDeli.isMore===1">
                  多返<span style="font-size: 2rem;">{{objDeli.extraGold | moneyBeautifuly}}</span>金币<span
                  class="prics">¥{{objDeli.price}}</span>
                </div>
                <!--2.正常的用的最多的页面 也叫全额返-->
                <span class="pric" v-else>¥{{objDeli.price | moneyBeautifuly}}</span>
              </div>
              <cell>
                <clocker :time="objDeli.leftTime" slot="value">
                  剩
                  <span style="font-size: 1.8rem;color: black">%D </span>天
                  <span style="font-size: 1.8rem;color: black">%H </span>小时
                  <span style="font-size: 1.8rem;color: black">%M </span>分

                </clocker>
              </cell>

              <p class="guige" style="text-align:left;margin-left:0.2rem">规格: 暂时没有规格{{objDeli.format}}</p>
              <div class="size">
                <span>包邮</span>
              </div>
            </div>
            <!--会变动的第二部分-->
            <div class="process">
              <div class="process_2" v-if="objDeli.isPlus===1">
                <div>
                  <span style="background: #ff3340">必中</span>
                  <strong style="color: #ff3340">Plus会员申请就中奖</strong>
                </div>
              </div>
              <div class="process_1">
                <div v-if="objDeli.isMore===1">
                  <span>超额</span>
                  <strong>多返
                    <em style="font-style:normal">{{objDeli.extraGold | moneyBeautifuly}}</em>金币</strong>
                </div>
                <div v-else>
                  <span>全额</span>
                  <strong>用户下单全额返</strong>
                </div>
                <div v-if="objDeli.isGold===1" style="margin-top:1rem">
                  <span>金币</span>
                  <strong>支付
                    <em style="font-style:normal">{{objDeli.goldNum | moneyBeautifuly}}</em>金币后直接白拿</strong>
                </div>
              </div>
              <h3>申请流程</h3>
              <div class="seq">
                <div>
                  <strong>①</strong>
                  <p>申请获得白拿商品</p>
                </div>
                <div>
                  <strong>②</strong>
                  <p>垫付购买白拿商品</p>
                </div>
                <div>
                  <strong>③</strong>
                  <p>确认收货并好评</p>
                </div>
                <div style="border-right: none">
                  <strong>④</strong>
                  <p>平台返还垫付资金</p>
                </div>
              </div>
            </div>
            <!-- <h2>上拉查看更多</h2> -->
          </div>
        </div>
      </scroll>
      <!-- 底部的固定 -->
      <div class="bottom">
            <binsert :type="typeFoot" :leastNum="objDeli.leftNumToday-0" :tType="tType" :leftTime="leftTime"
                     @wantGet="wantGet" @btn-click="btnClick"></binsert>
          </div>
      <div>
        <!--使用优惠券券的弹窗-->
        <div v-if="pic" style="position: relative;">
          <confirm v-model="pic" :confirmText="yes" style="height: 300px;padding-top: 10px" :cancel-text="no"
                   @on-confirm='useCou' @on-cancel="useCansel">
            <h2 style="font-size:2rem;padding-top:1rem">你有可使用的必中券</h2>
            <p style="font-size:1.4rem;color:#75787f;padding-top:1.2rem">请选择一张必中券</p>
            <div style="height: 300px;overflow: auto">
              <scroll ref="scroll" style="height: 100%">
                <div>
                  <div @click="chooseIndex(index)" v-for="(item,index) in ticArr" :key='index'
                       style="margin-bottom: 20px;position: relative">
                    <coupons :item="item.ticObj">
                    </coupons>
                    <img v-if="item.ticObj.checked" class="checkedTic" src="./choose.png" alt="">
                  </div>
                </div>
              </scroll>
            </div>
          </confirm>
        </div>
        <!--任务没有做完的弹窗-->
        <div class="wait" v-if="wait">
          <confirm v-model="wait" :confirmText="go">
            <h2 style="font-size:2rem;color:#08090a;padding-top:2rem">你还有未做完的任务</h2>
            <p style="font-size:1.4rem;color:#75787f;margin-top:1.6rem">请先提交未完成的白拿任务之后,再来申请其他商品</p>
          </confirm>
        </div>
        <!--第三种情况,正在提交订单的弹窗-->
        <div class="cover" v-if="quan">
          <div class="quan">
            <spinner :type="ios" style="padding-top: 2rem"></spinner>
            <h3>正在提交订单</h3>
          </div>
        </div>
        <!--订单提交提示-->

        <confirm v-model="pay" :confirm-text="tan" @on-confirm="ceshi">
          <h2 style="font-size:2rem;color:#08090a;padding-top:2rem">订单已提交</h2>
          <p style="font-size:1.4rem;color:#75787f;margin-top:1.6rem">支付完成后,请根据您支付的情况点击下面按钮</p>
        </confirm>
        <!--支付成功和支付失败的弹窗-->
        <alert v-model="cg" @on-hide='paySucess'>
          <h2 style="font-size:2rem;color:#08090a;padding-top:2rem">支付成功</h2>
          <p style="font-size:1.4rem;color:#75787f;margin-top:1.6rem">请继续完成你的申请</p>
        </alert>
        <alert v-model="sb">
          <h2 style="font-size:2rem;color:#08090a;padding-top:2rem">支付失败</h2>
          <p style="font-size:1.4rem;color:#75787f;margin-top:1.6rem">请重新支付</p>
        </alert>


        <!--用户未完成绑定的提示信息-->
        <alert v-model="wran" :button-text="alerts" @on-hide="hideAlert">
          <h2 style="font-size:2rem;color:#08090a;padding-top:2rem">未完成全部绑定</h2>
          <ul class="wran_info">
            <li>
              <p v-if="this.userInfo.telephone !==undefined">
                <span>手机号已绑定</span>
                <span><img :src='Pass' alt="" width="20px" height="20px"></span>
              </p>
              <p v-else>
                <span>手机号未绑定</span>
                <span><img :src="Pass_no" alt="" width="20px" height="20px"></span>
              </p>
            </li>
            <li>
              <p v-if="this.userInfo.wechatNum !== undefined">
                <span>微信号已绑定</span>
                <span><img :src='Pass' alt="" width="20px" height="20px"></span>
              </p>
              <p v-else>
                <span>微信号未绑定</span>
                <span><img :src="Pass_no" alt="" width="20px" height="20px"></span>
              </p>
            </li>
            <li>
              <p v-if="this.userInfo.taobaoId !== undefined">
                <span>淘宝账号已绑定</span>
                <span><img :src='Pass' alt="" width="20px" height="20px"></span>
              </p>
              <p v-else>
                <span>淘宝账号未绑定</span>
                <span><img :src="Pass_no" alt="" width="20px" height="20px"></span>
              </p>
            </li>
          </ul>
        </alert>
        <!-- 新增进行支付的弹窗开始  后面增加使用   on-confirm='payMoney'确定支付触发的   on-cancel='payQuxiao'取消触发的-->
        <confirm v-model="paycode" @on-confirm="payMoney1" >
       <h2 style="font-size:2rem;color:#08090a;padding-top:2rem">提示</h2>
       <p style="font-size:1.4rem;color:#75787f;margin-top:1.6rem">当前账户: <span>{{hasmoney1 | moneyBeautifuly}}</span>金币</p>
       <p style="font-size:1.4rem;color:#75787f;margin-top:1.6rem">确定消费: <span>{{Math.ceil(objDeli.price*0.1) | moneyBeautifuly}}</span>金币</p>
      </confirm>
        <!-- 新增进行支付的弹窗结束 -->
        <!-- 必中的金币拿 -->
        <confirm v-model="paycode_1" @on-confirm="payMoney2"  >
       <h2 style="font-size:2rem;color:#08090a;padding-top:2rem">提示</h2>
       <p style="font-size:1.4rem;color:#75787f;margin-top:1.6rem">当前账户: <span>{{hasmoney1 | moneyBeautifuly}}</span>金币</p>
       <p style="font-size:1.4rem;color:#75787f;margin-top:1.6rem">确定消费: <span>{{objDeli.goldNum | moneyBeautifuly}}</span>金币</p>
      </confirm>

        <!--充值plus会员的操作-->
        <div class="cover" v-if="vip">
          <div class="plus">
            <h2>你还不是Plus会员</h2>
            <p>购买会员享受更多福利</p>
            <transition name="move">
              <div class="userContainerBox">
                <pay :title="title" :moneyBox="moneyBox" :moneyIndex="moneyIndex" :type="type" :paytype="paytype"
                     :hasmoney="hasmoney" :isChecked="isChecked" :isChosed="chosed" @index-change="choosePay"
                     @isChosed-change="isChosed"></pay>
                <div class="btnBottomBox">
                  <div class="info">
                    微信支付：
                    <span class="text">￥{{ataloCount}}</span>
                  </div>
                  <span class="btnJinbi" @click="btnZhiVip" v-if="ataloCount!==0">立即支付</span>
                  <span class="btnJinbi" @click="btnKaiVip" v-else>立即开通</span>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <!--充值金币的操作-->
        <div class="cover" v-if="jinbi">
          <div class="plus">
            <h2>金币不足</h2>
            <p>请充值</p>
            <transition name="move">
              <div class="userContainerBox">
                <pay :title="title1" :moneyBox="moneyBox1" :moneyIndex="moneyIndex1" :type="type1" :paytype="paytype1"
                     :hasmoney="hasmoney1" :isChecked="isChecked1" :isChosed="chosed1" @index-change="choosePay1"
                     @isChosed-change="isChosed1"></pay>
                <div class="btnBottomBox">
                  <div class="info">
                    微信支付：
                    <span class="text">￥{{ataloCountCore | moneyBeautifuly}}</span>
                  </div>
                  <span class="btnJinbi" @click="btnJinbi">立即支付</span>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <!-- 金币拿 必中的 -->
        <div class="cover" v-if="jinbi_1">
          <div class="plus">
            <h2>金币不足</h2>
            <p>请充值</p>
            <transition name="move">
              <div class="userContainerBox">
                <pay :title="title1" :moneyBox="moneyBox1" :moneyIndex="moneyIndex1" :type="type1" :paytype="paytype1"
                     :hasmoney="hasmoney1" :isChecked="isChecked1" :isChosed="chosed1" @index-change="choosePay1"
                     @isChosed-change="isChosed1"></pay>
                <div class="btnBottomBox">
                  <div class="info">
                    微信支付：
                    <span class="text">￥{{ataloCountCore | moneyBeautifuly}}</span>
                  </div>
                  <span class="btnJinbi" @click="btnJinbi_1">立即支付</span>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <!-- 金币充值成功的提示 -->
        <alert v-model="jinbicgNa" @on-hide='BaiNaSucess'>
          <h2 style="font-size:2rem;color:#08090a;padding-top:2rem">充值成功</h2>
          <p style="font-size:1.4rem;color:#75787f;margin-top:1.6rem">请继续完成你的申请</p>
        </alert>
        <!-- 必中的金币充值的提示 -->
        <alert v-model="jinbicgNa_1" @on-hide='BaiNaSucess_1'>
          <h2 style="font-size:2rem;color:#08090a;padding-top:2rem">充值成功</h2>
          <p style="font-size:1.4rem;color:#75787f;margin-top:1.6rem">请继续完成你的申请</p>
        </alert>
        <!-- vip支付成功之后触发的效果 -->
        <alert v-model="Vipcg" @on-hide='VipPaySucess'>
          <h2 style="font-size:2rem;color:#08090a;padding-top:2rem">支付成功</h2>
          <p style="font-size:1.4rem;color:#75787f;margin-top:1.6rem">请继续完成你的申请</p>
        </alert>

      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
import { Clocker, Cell, Group, Swiper, Confirm, XSwitch, Alert, Spinner, AlertPlugin } from 'vux'
import Scroll from '../../../base/scroll/scroll'
import Binsert from '../../../base/bottom_insert/binsert.vue'
import Coupons from '../../../base/coupons/coupons.vue'
import Pay from '../../../base/pay/pay'
import { mapGetters, mapActions } from 'vuex'
import Pass from '../../../assets/images/pass.svg'
import Pass_no from '../../../assets/images/no-pass.svg'

Vue.use(AlertPlugin)
export default {
  components: {
    Clocker,
    Cell,
    Group,
    Swiper,
    Scroll,
    Spinner,
    Binsert,
    Confirm,
    Group,
    XSwitch,
    Alert,
    Pay,
    Coupons,
    AlertPlugin
  },
  name: "details",
  data() {
    return {
      //金币换的数据
      firstTaskObj: {},
      //优惠券
      ticArr: [],
      ticIndex: 0,
      Pass: Pass,
      Pass_no: Pass_no,
      objDeli: {
        leftTime: '2017-10-10 21:54:55',
      },
      demo07_list: [{
        url: 'javascript:',
        img: '',
      }],
      hei: '32rem',
      //      底部组件
      tType: 'btn',
      typeFoot: 3,
      leftTime: '14:00开始',
      //      底部组件结束
      // 金币拿支付的提示
      paycode: false,
      paycode_1: false,
      pic: false,
      wait: false,
      quan: false,
      pay: false,
      cg: false,
      sb: false,
      vip: false,
      jinbi: false,
      bainaNum: true,
      process_1: true,
      process_2: true,
      jinbicg: false,
      jinbicgNa: false,
      jinbicgNa_1: false,
      jinbi_1: false,
      Vipcg: false,
      //            提示用户绑定信息的提示
      wran: false,
      // phone: false,
      // weixin: false,
      // taobao: false,
      yes: '使用',
      no: '不使用',
      go: '前去完成',
      tan: '我已支付',
      text1: '正在提交订单',
      alerts: '立即去绑定',
      //              充值会员部分
      paytype: 2,
      isChecked: 0,
      hasmoney: 2,
      title: '选择套餐',
      moneyBox: [
        {
          price: '20',
          type: '1个月套餐',
          info: '每天仅需0.6元'
        },
        {
          price: '96',
          oldPrice: '120',
          type: '1个月套餐',
          info: '每天仅需0.5元'
        },
        {
          price: '120',
          oldPrice: '240',
          type: '1个月套餐',
          info: '每天仅需0.3元'
        },
      ],
      moneyIndex: 0,
      type: 0,
      chosed: true,

      //              充值金币部分
      paytype1: 2,
      isChecked1: 0,
      hasmoney1: 1,
      title1: '选择面额',
      moneyBox1: [
        {
          price: '20金币',
          oldPrice: '50元',
        },
        {
          price: '100金币',
          oldPrice: '100元',

        },
        {
          price: '200金币',
          oldPrice: '200元',
        },
        {
          price: '300金币',
          oldPrice: '300元',
        },
        {
          price: '500金币',
          oldPrice: '500元',
        },
      ],
      moneyIndex1: 0,
      type1: 1,
      chosed1: true,
    }
  },
  created() {
    this.getDesc()
    // console.log(this.userInfo)
  },
  methods: {
    //      定义一个当前时间的函数
    nowTime() {
      let now = new Date().getHours()
      return now
    },

    //选择使用优惠券
    chooseIndex(index) {
      // console.log(this.ticArr[index])
      for (var i = 0; i < this.ticArr.length; i++) {
        if (index === i) {
          this.ticArr[i].ticObj.checked = true
        } else {
          this.ticArr[i].ticObj.checked = false
        }
      }
      this.ticIndex = index;
    },
    /*当点击一张必中券之后 点击使用 跳到必中任务里面去*/
    useCou() {
      this.$axios.post('/api/orderOperate/getFirstOrder', {
        sellerTaskId: this.$route.query.sellerTaskId,
        buyerUserId: this.userInfo.buyerUserId,
        bitslap: 1
      }).then((data) => {
        // console.log(data);
        this.firstTaskObj = data.data.data
        if (data.data.code === '200') {
          this.$axios.post('/api/buyerTicket/updateByBuyerTicketId', {
            status: 2,
            buyerTicketId: this.ticArr[this.ticIndex].ticObj.buyerTicketId
          }).then((data) => {
            // console.log(data);
            if (data.data.code === '200') {
              this.paySucess()
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: data.data.message
              })
            }
          })
        } else if (data.data.code === '1701') {
          let that = this;
          this.$vux.alert.show({
            title: '提示',
            content: '您还有未完成的任务,请去个人中心查看',
            onHide() {
              that.$router.push({ name: 'noPayOrder' })
            }
          })
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: data.data.message
          })
        }
      })
    },
    useCansel() {
      this.$axios.post('/api/orderOperate/getFirstOrder', {
        sellerTaskId: this.$route.query.sellerTaskId,
        buyerUserId: this.userInfo.buyerUserId
      }).then((data) => {
        // console.log(data);
        let that = this
        if (data.data.code === '200') {
          this.$router.push({
            name: 'taskOneStep1',
            query: {
              buyerTaskRecordId: data.data.data.buyerTaskRecordId,
              sellerTaskId: this.$route.query.sellerTaskId,
              type: data.data.data.taskId
            }
          })
        } else if (data.data.code === '1701') {
          this.$vux.alert.show({
            title: '提示',
            content: '您还有未完成的任务,请去个人中心查看',
            onHide() {
              that.$router.push({ name: 'noPayOrder' })
            }
          })
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: data.data.message
          })
        }
      })
    },

    btnClick() {
      //var buyerTaskRecordId = localStorage.getItem("buyerTaskRecordId")
      var buyerUserId = JSON.parse(window.localStorage.getItem('__userInfo__')).buyerUserId
      var weixin = JSON.parse(window.localStorage.getItem('__userInfo__')).wechatStatus
      var taobao = JSON.parse(window.localStorage.getItem('__userInfo__')).taobaoStatus
      var phone = JSON.parse(window.localStorage.getItem('__userInfo__')).telephone
      let that = this
      // 做绑定判断,平台端审核的判断
      this.$axios.post('/api/user/loginOrNot', {}).then((res) => {
        if (res.data.code !== '200') {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '您未登录，请登录',
            onHide() {
              that.$router.push({ name: 'login' })
              return false
            }

          })
        }
      })
      //      判断是否会弹出提示框的 微信 淘宝 手机号
      if (this.userInfo.wechatNum === undefined || this.userInfo.taobaoId === undefined || this.userInfo.telephone === undefined) {
        this.wran = true
        return false
      }
      this.$axios.post('/api/user/getStatusByUserId', {
        buyerUserId: this.userInfo.buyerUserId,
      }).then((data) => {
        console.log(data)
        let res = data.data.data
        if (res.alipayStatus === 0) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '审核未通过,请重新修改信息',
          })

        } else if (res.alipayStatus === 2) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '信息还在审核中,请耐心等待...',
          })

        } else if (res.alipayStatus === 3) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '支付宝账号未绑定,请先进行绑定',
          })

        } else if (res.taobaoStatus === 0) {
          let that=this
          this.$vux.alert.show({
            title: '温馨提示',
            content: '淘宝账号审核未通过,请重新修改信息',
            onHide() {
              that.$router.push({ name: 'registerThree' })
            }
          })
        } else if (res.taobaoStatus === 2) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '信息还在审核中,请耐心等待...',
          })
        } else if (res.taobaoStatus === 3) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '您还未绑定淘宝/天猫,点击前往进行绑定',
            onHide() {
              that.$router.push({ name: 'registerThree' })
            }
          })
        }else {



          //        状态为我要白拿触发的东西 this.typeFoot===1 申请白拿可用
          if (this.typeFoot === 1) {
            //      查询用户是否有必中券 有的话对应的弹出来
            this.$axios.post('/api/buyerTicket/getUseableBuyerTickets', {
              maxPriceValue: that.objDeli.price,
              buyerUserId: this.userInfo.buyerUserId,
              pageNo: '1',
              pageSize: '100'
            }).then((data) => {
              let res = data.data
              if (res.code === '200') {
                if (res.data.buyerTickets.length !== 0) {
                  for (let i of res.data.buyerTickets) {
                    this.ticArr.push({
                      ticObj: {
                        state: 1,
                        maxPrice: i.maxPriceValue,
                        text: '全场通用',
                        time: i.validendtime,
                        checked: false,
                        buyerUserId: i.buyerUserId,
                        buyerTicketId: i.buyerTicketId
                      },
                    })
                  }
                  this.pic = true
                } else {
                  //没有的话则走 我要白拿的正常任务
                  this.$axios.post('/api/orderOperate/getFirstOrder', {
                    sellerTaskId: this.$route.query.sellerTaskId,
                    buyerUserId: this.userInfo.buyerUserId
                  }).then((data) => {
                    // console.log(data);
                    let that = this
                    if (data.data.code === '200') {
                      this.$router.push({
                        name: 'taskOneStep1',
                        query: {
                          buyerTaskRecordId: data.data.data.buyerTaskRecordId,
                          sellerTaskId: this.$route.query.sellerTaskId,
                          type: data.data.data.taskId
                        }
                      })
                    } else if (data.data.code === '1701') {
                      this.$vux.alert.show({
                        title: '提示',
                        content: '您还有未完成的任务,请去个人中心查看',
                        onHide() {
                          that.$router.push({ name: 'noPayOrder' })
                        }
                      })
                    } else {
                      this.$vux.alert.show({
                        title: '提示',
                        content: data.data.message
                      })
                    }
                  })
                }
              }
            })
            //         状态为我要白拿触发的东西
          }
          //如果底部按钮状态为申请就中奖的时候 即this.typeFoot===3 即拿金币换
          if (this.typeFoot === 3) {
            this.jinbizhong()
          }
          // 即this.typeFoot===3结束

          // 如果底部按钮状态为Plus白拿的时候 即this.typeFoot===4 即Plus白拿
          if (this.typeFoot === 4) {
            this.$axios.post('/api/buyerFundsAccount/getByBuyerUserId', {
              userId: this.userInfo.buyerUserId
            }).then((data) => {
              let res = data.data
              this.hasmoney = res.data.availableDeposit
            })
            var isVip = parseInt(this.userInfo.isVip)
            // console.log(isVip)
            if (isVip === 1) {
              this.Plus()
              //不是vip 提示充值 
            } else {
              this.vip = true
            }
          }
        }
      })
      // 即this.typeFoot===4结束 Plus白拿结束
    },
    //Plus白拿需要公用出来的部分
    Plus() {
      this.$axios.post('/api/orderOperate/getFirstOrder', {
        sellerTaskId: this.$route.query.sellerTaskId,
        buyerUserId: this.userInfo.buyerUserId,
      }).then((data) => {
        let res = data.data
        this.firstTaskObj = res.data
        // console.log(data)
        let that = this
        if (res.code === '1701') {
          this.$vux.alert.show({
            title: '提示',
            content: '您还有未完成的任务,请去个人中心查看',
            onHide() {
              that.$router.push({ name: 'noPayOrder' })
            }
          })
        } else if (res.code === '200') {
          this.paySucess()
        }
      })
    },
    //Plus白拿结束部分 
    //金币换的必中任务的成功提醒 支付成功之后的弹窗的确定按钮
    paySucess() {
      if (this.firstTaskObj.taskId === 39) {
        this.$router.push({          name: 'sureGetStep1',
          query: {
            buyerTaskRecordId: this.firstTaskObj.buyerTaskRecordId,
            sellerTaskId: this.$route.query.sellerTaskId,
            type: 1
          }
        })
      } else if (this.firstTaskObj.taskId === 40) {
        this.$router.push({          name: 'sureGetStep1',
          query: {
            buyerTaskRecordId: this.firstTaskObj.buyerTaskRecordId,
            sellerTaskId: this.$route.query.sellerTaskId,
            type: 2
          }
        })
      } else if (this.firstTaskObj.taskId === 41) {
        this.$router.push({          name: 'sureGetStep1',
          query: {
            buyerTaskRecordId: this.firstTaskObj.buyerTaskRecordId,
            sellerTaskId: this.$route.query.sellerTaskId,
            type: 3
          }
        })
      } else if (this.firstTaskObj.taskId === 42) {
        this.$router.push({          name: 'sureGetStep1',
          query: {
            buyerTaskRecordId: this.firstTaskObj.buyerTaskRecordId,
            sellerTaskId: this.$route.query.sellerTaskId,
            type: 4
          }
        })
      } else if (this.firstTaskObj.taskId === 43) {
        this.$router.push({          name: 'sureGetStep1',
          query: {
            buyerTaskRecordId: this.firstTaskObj.buyerTaskRecordId,
            sellerTaskId: this.$route.query.sellerTaskId,
            type: 5
          }
        })
      } else if (this.firstTaskObj.taskId === 44) {
        this.$router.push({          name: 'sureGetStep1',
          query: {
            buyerTaskRecordId: this.firstTaskObj.buyerTaskRecordId,
            sellerTaskId: this.$route.query.sellerTaskId,
            type: 6
          }
        })
      }

    },
    // 先支付的功能 支付完开通vip 如果余额不够 则微信支付的下面点击事件 微信支付不为0
    btnZhiVip() {
      this.$axios.post('/api/fundsFlow/depositCharge', {
        //用户
        type: 'buyer',
        //资金
        income: this.ataloCount,
        userFundId: this.userInfo.buyerUserId
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          //充值成功之后直接给它扣除 成为vip 
          this.$axios.post('/api/fundsFlow/depositExchangeForVip', {
            vipPlan: parseInt(this.moneyIndex + 1)
          }).then((data) => {
            let res = data.data
            if (res.code === '200') {
              this.Vipcg = true
              // let obj=this.$store.state.userInfo
              let obj = Object.assign({}, this.userInfo, {
                isVip: 1
              })
              this.setUserInfo(obj)
            } else {
              this.sb = true
            }
          })
        }
      })
    },
    //如果是余额足够则是去直接开通 微信支付不为数字0 立即开通
    btnKaiVip() {
      this.$axios.post('/api/fundsFlow/depositExchangeForVip', {
        vipPlan: parseInt(this.moneyIndex + 1)
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          this.Vipcg = true
        } else {
          this.sb = true
        }
      })
    },
    //成功开通Vip点击成功之后跳转
    VipPaySucess() {
      this.Plus()
    },

    //    当点击立即去绑定触发的效果  判断微信 手机号 淘宝账号是否绑定了
    hideAlert() {
      if (this.userInfo.telephone === undefined) {
        this.$router.push({ name: 'registerOne' })
      } else if (this.userInfo.wechatNum === undefined) {
        this.$router.push({ name: 'registerTwo' })
      } else if (this.userInfo.taobaoId === undefined) {
        this.$router.push({ name: 'registerThree' })
      }
    },
    choosePay(index) {
      this.moneyIndex = index
    },
    isChosed(val) {
      this.chosed = val
    },
    choosePay1(index) {
      this.moneyIndex1 = index
    },
    isChosed1(val) {
      this.chosed1 = val
    },
    ceshi() {
      this.cg = true
    },
    //进入页面发送的请求
    getDesc() {
      let that = this
      this.$axios.post('/api/homePage/getDesc', {
        sellerTaskId: this.$route.query.sellerTaskId
      }).then((data) => {
        // console.log(data)
        let res = data.data;
        if (res.code == "200") {
          let obj = {
            picUrl: res.data.picUrl,
            productName: res.data.productName,
            totalNum: res.data.totalNum,
            applyNum: res.data.applyNum,
            leftTime: res.data.leftTime,
            format: res.data.format,
            price: res.data.price,
            isPlus: res.data.isPlus,
            isMore: res.data.isMore,
            extraGold: res.data.extraGold,
            isGold: res.data.isGold,
            goldNum: res.data.goldNum,
            leftNumToday: res.data.leftNumToday,
            //              我要必中的剩余数
            goldChangeLeftNum: res.data.goldChangeLeftNum,
            //              申请白拿的剩余数量  金币拿的数量 plus白拿的数量
            applyLeftNum: res.data.applyLeftNum
          }
          that.objDeli = obj
          this.demo07_list[0].img = obj.picUrl
          //         进行一系列的判断
          //            如果是金币换的底部出现的情况
          that.$nextTick(() => {
            that.$refs.scroll.refresh()
          })
          if (that.objDeli.isGold === 1 || (that.objDeli.isGold === 1 && that.objDeli.isMore === 0)) {
            this.bainaNum = false
            //              申请就中奖的数量没有的时候
            if (that.objDeli.leftNumToday <= 0) {
              this.typeFoot = 0
              this.tType = ''
              return false
            } else {
              this.typeFoot = 3
              this.tType = ''
              return false
            }
          }
          //            进行pulus的判断 plus+全额返  plus+超额返
          if ((that.objDeli.isPlus === 1 && that.objDeli.isMore === 0) || (that.objDeli.isPlus === 1 && that.objDeli.isMore === 1)) {
            this.bainaNum = false
            //              当plus白拿的数量没有的时候做出的判断
            if (that.objDeli.leftNumToday <= 0) {
              this.typeFoot = 0
              this.tType = ''
              return false
            } else {
              this.typeFoot = 4
              this.tType = ''
              return false
            }
            //超额返  全额返
          } else if (that.objDeli.isMore === 1 || that.objDeli.isMore === 0) {
            //              时间大于14点的时候
            if (this.nowTime() > 14) {
              //                必中剩余数量和申请白拿数量都为0的时候
              if (that.goldChangeLeftNum <= 0 && that.objDeli.applyLeftNum <= 0) {
                this.tType = 'notDo'
                this.typeFoot = 0
                return false
              } else {
                this.tType = 'btn'
                //                  申请白拿剩余数量为0的时候
                if (that.objDeli.applyLeftNum <= 0) {
                  this.typeFoot = 2
                  return false
                } else {
                  this.typeFoot = 1
                  return false
                }
              }
            } else {
              this.tType = 'time'
              this.typeFoot = 1
              return false
            }
          }
          //          进行判断结束
        }
      }).catch((error) => {
        // console.log(error)
        this.$vux.alert.show({
          title: '错误提示',
          content: '服务器错误',
        })
      })
    },
    //      请求结束部分

    /*白拿里面的我要必中当点击我要必中*******的时候触发的事件*/
    wantGet() {
      if (this.userInfo.wechatNum === undefined || this.userInfo.taobaoId === undefined || this.userInfo.telephone === undefined) {
        this.wran = true
        return false
      }
      this.$axios.post('/api/user/getStatusByUserId', {
        buyerUserId: this.userInfo.buyerUserId,
      }).then((data) => {
        console.log(res)
        let res = data.data.data
        if (res.alipayStatus === 0) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '审核未通过,请重新修改信息',
          })
          this.$router.push({ name: 'registerThree' })
        } else if (res.alipayStatus === 2) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '信息还在审核中,请耐心等待...',
          })

        } else if (res.alipayStatus === 3) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '支付宝账号未绑定,请先进行绑定',
          })

        } else if (res.taobaoStatus === 0) {
           let that=this
          this.$vux.alert.show({
            title: '温馨提示',
            content: '淘宝账号审核未通过,请重新修改信息',
            onHide() {
              that.$router.push({ name: 'registerThree' })
            }
          })

        } else if (res.taobaoStatus === 2) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '信息还在审核中,请耐心等待...',
          })
        }else if (res.taobaoStatus === 3) {
          this.$vux.alert.show({
            title: '温馨提示',
            content: '您还未绑定淘宝/天猫,点击前往进行绑定',
            onHide() {
              that.$router.push({ name: 'registerThree' })
            }
          })
        }else {
          //请求查询金币的接口
          this.$axios.post('/api/buyerFundsAccount/getByBuyerUserId', {
            userId: this.userInfo.buyerUserId
          }).then((data) => {
            // console.log(data)
            let res = data.data
            this.hasmoney1 = res.data.availableGold
            //如果需要支付的金币数量大于用户账户中的可用金币的时候触发下面 金币不够 提示用户充值
            if (Math.ceil(this.objDeli.price * 0.1) <= res.data.availableGold) {
              this.paycode = true
            } else {
              //提示用户去充值金币
              this.jinbi = true
            }
          })
        }
      })
    },
    //必中里面的金币换 
    jinbizhong() {
      //请求查询金币的接口
      this.$axios.post('/api/buyerFundsAccount/getByBuyerUserId', {
        userId: this.userInfo.buyerUserId
      }).then((data) => {
        // console.log(data)
        let res = data.data
        this.hasmoney1 = res.data.availableGold
        //如果需要支付的金币数量大于用户账户中的可用金币的时候触发下面 金币不够 提示用户充值
        if (this.objDeli.goldNum <= res.data.availableGold) {
          this.paycode_1 = true
        } else {
          //提示用户去充值金币
          this.jinbi_1 = true
        }
      })
    },
    //白拿的金币换的页面
    payMoney() {
      this.$axios.post('/api/orderOperate/getFirstOrder', {
        sellerTaskId: this.$route.query.sellerTaskId,
        buyerUserId: this.userInfo.buyerUserId,
        bitslap: 2
      }).then((data) => {
        // console.log(data)
        let res = data.data
        let that = this
        if (res.code === '200') {
          this.firstTaskObj = res.data
          this.$axios.post('/api/fundsFlow/buyerGoldExchange', {
            //金币数量
            amount: Math.ceil(this.objDeli.price * 0.1),
            //用户id
            userFundId: this.userInfo.buyerUserId,
            orderId: this.$route.query.sellerTaskId
          }).then((data) => {
            // console.log(data)
            let res = data.data
            if (res.code === '200') {
              this.cg = true
            } else {
              this.sb = true
            }
          })
        } else if (res.code === '1701') {
          this.$vux.alert.show({
            title: '提示',
            content: '您还有未完成的任务,请去个人中心查看',
            onHide() {
              that.$router.push({ name: 'noPayOrder' })
            }
          })
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: data.data.message
          })
        }
      })
    },
    //必中的金币换的页面 
    payMoney_1() {
      this.$axios.post('/api/orderOperate/getFirstOrder', {
        sellerTaskId: this.$route.query.sellerTaskId,
        buyerUserId: this.userInfo.buyerUserId,
      }).then((data) => {
        // console.log(data)
        let res = data.data
        let that = this
        if (res.code === '200') {
          this.firstTaskObj = res.data
          this.$axios.post('/api/fundsFlow/buyerGoldExchange', {
            //金币数量
            amount: this.objDeli.goldNum,
            //用户id
            userFundId: this.userInfo.buyerUserId,
            orderId: this.$route.query.sellerTaskId
          }).then((data) => {
            // console.log(data)
            let res = data.data
            if (res.code === '200') {
              this.cg = true
            } else {
              this.sb = true
            }
          })
        } else if (res.code === '1701') {
          this.$vux.alert.show({
            title: '提示',
            content: '您还有未完成的任务,请去个人中心查看',
            onHide() {
              that.$router.push({ name: 'noPayOrder' })
            }
          })
        } else {
          this.$vux.alert.show({
            title: '提示',
            content: data.data.message
          })
        }
      })
    },
    //点击确认支付 白拿的金币换
    payMoney1() {
      this.payMoney()
    },
    //必中的金币换  点击确认支付
    payMoney2() {
      this.payMoney_1()
    },
    //金币不足进行充值
    //金币换的支付接口 金币不足弹出充值金币的接口
    btnJinbi() {
      this.$axios.post('/api/fundsFlow/goldCharge', {
        //用户
        type: 'buyer',
        //资金
        income: this.ataloCountCore,
        userFundId: this.userInfo.buyerUserId
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          this.jinbicgNa = true
          this.jinbi = false
        } else {
          this.sb = true
        }
      })
    },
    btnJinbi_1() {
      this.$axios.post('/api/fundsFlow/goldCharge', {
        //用户
        type: 'buyer',
        //资金
        income: this.ataloCountCore,
        userFundId: this.userInfo.buyerUserId
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          this.jinbicgNa_1 = true
          this.jinbi = false
        } else {
          this.sb = true
        }
      })
    },
    //金币充值成功之后再次调用以上接口判断是否支付成功 余额是否足够 
    BaiNaSucess() {
      this.wantGet()
    },
    BaiNaSucess_1() {
      this.jinbizhong()
    },
    /*白拿里面的我要必中当点击我要必中*******的时候触发的事件*/
    ...mapActions([
      'setUserInfo'
    ]),
  },
  computed: {
    ...mapGetters([
      'userNopay',
      'userInfo'
    ]),
    ataloCount: {
      //        会员充值
      get() {
        let ataloCount = 0
        let choosePrice = parseFloat(this.moneyBox[this.moneyIndex].price)
        ataloCount = choosePrice - (this.chosed ? this.hasmoney : 0)
        if (ataloCount <= 0) {
          ataloCount = 0
        }
        return ataloCount
      },
      set(val) {
        return val
      }
    },
    ataloCountCore: {
      //        金币充值
      get() {
        let ataloCount = 0
        let choosePrice = parseFloat(this.moneyBox1[this.moneyIndex1].price)
        ataloCount = choosePrice - (this.chosed1 ? this.hasmoney1 : 0)
        if (ataloCount <= 0) {
          ataloCount = 0
        }
        return ataloCount
      },
      set(val) {
        return val
      }
    }
  },
  //      发送请求 请求数据
  // activated() {
  //   this.sellerTaskId = this.$route.query.sellerTaskId
  //   this.getDesc()
  // },
  // deactivated() {
  //   this.objDeli = {}
  // }
  //这种写法便于多个的使用

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/variable'
@import '../../../assets/stylus/mixin'
.scrollContainer
  height 100%
  box-sizing border-box
  display flex
  flex-direction column
  // padding-bottom 11.6rem
.scroll-content
  height 100%
  flex 1
  overflow hidden
  position relative
  .img
    width 100%
    height 32rem
  .conten
    margin-top 2rem
    padding-left 1.6rem
    .content_info
      h1
        font-size 1.6rem
        font-weight 500
        color #08090a
        line-height 2.5rem
      .bn
        margin-top 0.8rem
        font-size 1.2rem
        font-weight 300
        color #75787f
        margin-left -2.4rem
        strong
          color #08090a
      .time
        margin-top 1.6rem
        height 1.8rem
        width 100%
        .pric
          font-size 2.4rem
          color #75787f
          text-decoration line-through
          font-weight 100
          display inline-block
          margin-top 8px
        .jinbihuan
          margin-right 2rem
          font-size 1.4rem
          color #e6a545
          padding-top 10px
        .prics
          color #75787f
          text-decoration line-through
          font-size 1.2rem
          margin-left 0.5rem
        .weui-cell
          padding 0
          margin-top -2.5rem
      .guige
        margin-top -1rem
        font-size 1.2rem
        color #08090a
        margin-left -0.5rem
      .size
        margin-top 0.8rem
        span
          display inline-block
          width 3.2rem
          height 1.8rem
          border-radius 2px
          background #e6a545
          margin-right 0.8rem
          line-height 1.8rem
          text-align center
          color #ffffff
          font-size 1.2rem
    .process
      margin-top 2.45rem
      border-top 10px solid #eff0f2
      margin-left -1.6rem
      .process_1, .process_2
        margin-left 1.6rem
        margin-top 1.8rem
        border-bottom 1px solid #d4d5d8
        padding-bottom 1.8rem
        span
          display inline-block
          width 3.2rem
          height 1.8rem
          border-radius 2px
          background #e6a545
          margin-right 0.8rem
          line-height 1.8rem
          text-align center
          color #ffffff
          font-size 1.2rem
        strong
          font-size 1.4rem
          color #e6a545
          text-align center
      h3
        margin-top 1.8rem
        font-size 1.4rem
        color #08090a
        margin-left 1.6rem
      .seq
        height 6rem
        margin-top 1.8rem
        border-top 1px solid #d4d5d8
        border-bottom 1px solid #d4d5d8
        display flex
        justify-content space-around
        div
          width 9rem
          border-right 1px solid #75787f
          strong
            display inline-block
            font-size 1.6rem
            padding 2.2rem 0 0 0.8rem
          p
            width 4.3rem
            margin-left 2.8rem
            line-height 1.5rem
            font-size 1rem
            margin-top -2rem
            color #75787f
    h2
      text-align center
      font-size 1.4rem
      color #b7b9bf
      margin-top 3.2rem
.bottom
  flex 0 0 5rem
  width 100%
  box-sizing border-box
  display flex
.cover
  width 100%
  height 100%
  position fixed
  left 0
  top 0
  background rgba(0, 0, 0, 0.6)
// 等待的转圈的标识
.quan
  text-align center
  width 60%
  margin 0 auto
  border-radius 3px
  background white
  margin-top 16rem
  h3
    margin-top 1.6rem
    font-size 1.4rem
    color $color-text
    padding-bottom 2rem
.wran_info
  margin-top 3.5rem
  margin-left 2.8rem
  li
    width 90%
    border-bottom 1px solid $color-text-ll
    p
      display flex
      width 100%
      padding-bottom 1.5rem
      justify-content space-between
.plus
  width 90%
  margin 0 auto
  border-radius 3px
  background white
  margin-top 7.6rem
h2
  font-size 2rem
  color #08090a
  padding-top 2.8rem
  text-align center
p
  width 20rem
  margin 0 auto
  line-height 2rem
  font-size 1.4rem
  color #75787f
  margin-top 1.6rem
  text-align center
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
  .title
    text-align left
  .info
    font-size $font-size-normal
    color $color-text-d
    width 100%
    box-sizing border-box
    padding 1.2rem 1.6rem
    line-height 2rem
  .btnBottomBox
    height 5rem
    line-height 5rem
    font-size 0
    background #fff
    display flex
    .info
      flex 1
      text-align right
      .text
        color $color-theme
        font-size $font-size-large-x
        position relative
        top 0.2rem
    .btnJinbi
      flex 0 0 12.8rem
      color $color-theme-white
      background $color-theme
      font-size $font-size-medium-x
      text-align center
.checkedTic
  position absolute
  bottom 0
  right 0
  width 24px
  height 24px
</style>
<style scoped>
/*#app .container .weui-cell .weui-cell__ft {*/
/*!*margin-top: 1rem;*!*/
/*}*/
#app .weui-cell {
  padding: 3.8rem 0rem;
  margin-top: -4.5rem;
}

.weui-cell:before {
  border: none;
}

.vux-x-dialog .weui-dialog__bd:first-child {
  overflow: auto;
  height: 40rem;
}
</style>
<style>
.scrollContainer .weui-dialog__bd:first-child {
  padding-top: 10px;
}
</style>
