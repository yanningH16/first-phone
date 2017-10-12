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
          <!--全部-->
          <scroll class="scroll-content" v-show="checkIndex===0" ref="scrollBox1">
            <div class="orderBox" v-if="goodsAll.length>0">
              <div class="orderBoxList" v-for="(item,index) in goodsAll" :key="index">
                <appendCommon :goodsObj="item">
                  <span slot="state">{{item.stateText}}</span>
                  <span slot="info" class="infoRed" v-if="item.coinType===0">多返
                    <span class="num">{{item.coinInfo}}</span>金币</span>
                  <span slot="info" class="infoOrange" v-if="item.coinType===1">
                    <span class="num">{{item.coinInfo}}</span>金币兑换</span>
                  <div class="bottom" slot="bottom">
                    <span class="btn confirm">取消关注</span>
                    <span class="btn details" v-show="item.isDetail">查看详情</span>
                  </div>
                </appendCommon>
              </div>
            </div>
            <div class="noArray" v-else>还没有相关订单呢</div>
          </scroll>
          <!-- 抽奖 -->
          <scroll class="scroll-content" v-show="checkIndex===1" ref="goodsLottery">
            <div class="orderBox" v-if="goodsLottery.length>0">
              <!--未抽奖-->
              <div class="stateBox" :class="{'isNoBottom':showContent}">
                <cell title="未抽奖" is-link :arrow-direction="!showContent? 'up' : 'down'" @click.native="doShowContent">
                  <span style="font-size:1.2rem;margin-right:0.5rem;vertical-align: text-bottom;">{{valueLength}}</span>
                </cell>
              </div>
              <div class="orderBoxList" v-for="(item,index) in goodsLottery" :key="index" v-show="showContent">
                <appendCommon :goodsObj="item">
                  <span slot="state" class="reject">{{item.stateText}}</span>
                  <span slot="info" class="infoRed" v-if="item.coinType===0">多返
                    <span class="num">{{item.coinInfo}}</span>金币</span>
                  <span slot="info" class="infoOrange" v-if="item.coinType===1">
                    <span class="num">{{item.coinInfo}}</span>金币兑换</span>
                  <div class="bottom" slot="bottom">
                    <span class="details">{{item.lotteryInfo}}</span>
                    <span class="btn" @click="giveUpLottery" v-if="item.isLotteryState!==1">放弃白拿</span>
                    <span class="btn details" v-if="item.isLotteryState===0" @click="getLottery">继续申请</span>
                    <span class="btn details" v-if="item.isLotteryState===1" @click="doTask">去做任务</span>
                  </div>
                </appendCommon>
              </div>
              <!--再一次抽奖-->
              <div class="stateBox" :class="{'isNoBottom':showContentNext}">
                <cell title="再一次抽奖" is-link :arrow-direction="!showContentNext? 'up' : 'down'" @click.native="doShowContentNext">
                  <span style="font-size:1.2rem;margin-right:0.5rem;vertical-align: text-bottom;">{{valueLengthNext}}</span>
                </cell>
              </div>
              <div class="orderBoxList" v-for="(item,index) in goodsLotteryNext" :key="index" v-show="showContentNext">
                <appendCommon :goodsObj="item">
                  <span slot="state" class="reject">{{item.stateText}}</span>
                  <span slot="info" class="infoRed" v-if="item.coinType===0">多返
                    <span class="num">{{item.coinInfo}}</span>
                    金币
                  </span>
                  <span slot="info" class="infoOrange" v-if="item.coinType===1">
                    <span class="num">{{item.coinInfo}}</span>
                    金币兑换
                  </span>
                  <span slot="info" class="infoRed" v-if="item.coinType===2">白拿还赚
                    <span class="num">{{item.coinInfo}}</span>
                    金币
                  </span>
                  <div class="bottom" slot="bottom">
                    <span class=" details">{{item.lotteryInfo}}</span>
                    <span class="btn" v-if="item.isLotteryState!==1" @click="giveUpLottery">放弃白拿</span>
                    <span class="btn details" v-if="item.isLotteryState===0" @click="getLottery">继续申请</span>
                    <span class="btn details" v-if="item.isLotteryState===1" @click="doTask">去做任务</span>
                  </div>
                </appendCommon>
              </div>
            </div>
            <div class="noArray" v-else>还没有相关订单呢</div>
          </scroll>
          <!-- 中奖了 -->
          <scroll class="scroll-content" v-show="checkIndex===2" ref="awardScroll" :pullup="pullup" @scrollToEnd="scrollLoad">
            <div class="orderBox">
              <!--抽奖订单-->
              <div class="stateBox border-bottom-1px" :class="{'isNoBottom':showAwardIndex===1}">
                <cell title="抽奖订单" is-link :arrow-direction="!(showAwardIndex===1)? 'up' : 'down'" @click.native="changeAwardIndex(1)">
                  <span style="font-size:1.2rem;margin-right:0.5rem;vertical-align: text-bottom;">{{valueDraw}}</span>
                </cell>
              </div>
              <div class="orderBoxList" v-for="(item,index) in goodsDraw" :key="index" v-show="showAwardIndex===1">
                <appendCommon :goodsObj="item">
                  <span slot="state" class="reject">{{item.stateText}}</span>
                  <span slot="info" class="infoRed" v-if="item.coinType===0">多返
                    <span class="num">{{item.coinInfo}}</span>金币</span>
                  <span slot="info" class="infoOrange" v-if="item.coinType===1">
                    <span class="num">{{item.coinInfo}}</span>金币兑换</span>
                  <div class="bottom" slot="bottom">
                    <span class="details">{{item.lotteryInfo}}</span>
                    <span class="btn" @click="giveUpLottery" v-if="item.isLotteryState!==1">放弃白拿</span>
                    <span class="btn details" v-if="item.isLotteryState===0" @click="getAward(item.buyerTaskRecordId)">前去领奖</span>
                    <span class="btn" v-if="item.isLotteryState===1" @click="deleteOrder">删除订单</span>
                  </div>
                </appendCommon>
              </div>
              <!--金币拿订单-->
              <div class="stateBox" :class="{'isNoBottom':showAwardIndex===2}">
                <cell title="金币拿订单" is-link :arrow-direction="!(showAwardIndex==2)? 'up' : 'down'" @click.native="changeAwardIndex(2)">
                  <span style="font-size:1.2rem;margin-right:0.5rem;vertical-align: text-bottom;">{{valueCoin}}</span>
                </cell>
              </div>
              <div class="orderBoxList" v-for="(item,index) in goodsCoin" :key="index" v-show="showAwardIndex===2">
                <appendCommon :goodsObj="item">
                  <span slot="state" class="reject">{{item.stateText}}</span>
                  <span slot="info" class="infoRed" v-if="item.coinType===0">多返
                    <span class="num">{{item.coinInfo}}</span>
                    金币
                  </span>
                  <span slot="info" class="infoOrange" v-if="item.coinType===1">
                    <span class="num">{{item.coinInfo}}</span>
                    金币兑换
                  </span>
                  <span slot="info" class="infoRed" v-if="item.coinType===2">白拿还赚
                    <span class="num">{{item.coinInfo}}</span>
                    金币
                  </span>
                  <div class="bottom" slot="bottom">
                    <span class=" details">{{item.lotteryInfo}}</span>
                    <span class="btn" @click="giveUpLottery" v-if="item.isLotteryState!==1">放弃白拿</span>
                    <span class="btn details" v-if="item.isLotteryState===0" @click="getAward(item.buyerTaskRecordId)">前去领奖</span>
                    <span class="btn" v-if="item.isLotteryState===1" @click="deleteOrder">删除订单</span>
                  </div>
                </appendCommon>
              </div>
              <!--必中券订单-->
              <div class="stateBox" :class="{'isNoBottom':showAwardIndex===3}">
                <cell title="必中券订单" is-link :arrow-direction="!(showAwardIndex===3)? 'up' : 'down'" @click.native="changeAwardIndex(3)">
                  <span style="font-size:1.2rem;margin-right:0.5rem;vertical-align: text-bottom;">{{valueMust}}</span>
                </cell>
              </div>
              <div class="orderBoxList" v-for="(item,index) in goodsMust" :key="index" v-show="showAwardIndex===3">
                <appendCommon :goodsObj="item">
                  <span slot="state" class="reject">{{item.stateText}}</span>
                  <span slot="info" class="infoRed" v-if="item.coinType===0">多返
                    <span class="num">{{item.coinInfo}}</span>
                    金币
                  </span>
                  <span slot="info" class="infoOrange" v-if="item.coinType===1">
                    <span class="num">{{item.coinInfo}}</span>
                    金币兑换
                  </span>
                  <span slot="info" class="infoRed" v-if="item.coinType===2">白拿还赚
                    <span class="num">{{item.coinInfo}}</span>
                    金币
                  </span>
                  <div class="bottom" slot="bottom">
                    <span class=" details">{{item.lotteryInfo}}</span>
                    <span class="btn" @click="giveUpLottery" v-if="item.isLotteryState!==1">放弃白拿</span>
                    <span class="btn details" v-if="item.isLotteryState===0" @click="getAward(item.buyerTaskRecordId)">前去领奖</span>
                    <span class="btn" v-if="item.isLotteryState===1" @click="deleteOrder">删除订单</span>
                  </div>
                </appendCommon>
              </div>
              <!--Plus会员订单-->
              <div class="stateBox" :class="{'isNoBottom':showAwardIndex===4}">
                <cell title="Plus会员订单" is-link :arrow-direction="!(showAwardIndex===4)? 'up' : 'down'" @click.native="changeAwardIndex(4)">
                  <span style="font-size:1.2rem;margin-right:0.5rem;vertical-align: text-bottom;">{{valuePlus}}</span>
                </cell>
              </div>
              <div class="orderBoxList" v-for="(item,index) in goodsPlus" :key="index" v-show="showAwardIndex===4">
                <appendCommon :goodsObj="item">
                  <span slot="state" class="reject">{{item.stateText}}</span>
                  <span slot="info" class="infoRed" v-if="item.coinType===0">多返
                    <span class="num">{{item.coinInfo}}</span>
                    金币
                  </span>
                  <span slot="info" class="infoOrange" v-if="item.coinType===1">
                    <span class="num">{{item.coinInfo}}</span>
                    金币兑换
                  </span>
                  <span slot="info" class="infoRed" v-if="item.coinType===2">白拿还赚
                    <span class="num">{{item.coinInfo}}</span>
                    金币
                  </span>
                  <div class="bottom" slot="bottom">
                    <span class=" details">{{item.lotteryInfo}}</span>
                    <span class="btn" @click="giveUpLottery" v-if="item.isLotteryState!==1">放弃白拿</span>
                    <span class="btn details" v-if="item.isLotteryState===0" @click="getAward(item.buyerTaskRecordId)">前去领奖</span>
                    <span class="btn" v-if="item.isLotteryState===1" @click="deleteOrder">删除订单</span>
                  </div>
                </appendCommon>
              </div>
            </div>
          </scroll>
          <!-- 评价 -->
          <scroll class="scroll-content" v-show="checkIndex===3" ref="scrollBox4">
            <div class="orderBox" v-if="goodsEvaluate.length>0">
              <div class="orderBoxList" v-for="(item,index) in goodsEvaluate" :key="index">
                <appendCommon :goodsObj="item">
                  <span slot="state" class="reject">{{item.stateText}}</span>
                  <span slot="info" class="infoRed" v-if="item.coinType===0">多返
                    <span class="num">{{item.coinInfo}}</span>金币</span>
                  <span slot="info" class="infoOrange" v-if="item.coinType===1">
                    <span class="num">{{item.coinInfo}}</span>金币兑换</span>
                  <div class="bottom" slot="bottom">
                    <span class="details">{{item.evaluateInfo}}</span>
                    <span class="btn details" v-if="item.isEvaluateState===0" @click="goEvaluate">去预评价</span>
                    <span class="btn details" v-else-if="item.isEvaluateState===1" @click="goEvaluate">评价到淘宝</span>
                    <span class="btn details" v-else-if="item.isEvaluateState===2" @click="goEvaluate">去预追评</span>
                    <span class="btn details" v-else-if="item.isEvaluateState===3" @click="evaluateTaobao">追评到淘宝</span>
                    <span class="btn" v-else-if="item.isEvaluateState===4" @click="applyCustomer">申请售后</span>
                  </div>
                </appendCommon>
              </div>
            </div>
            <div class="noArray" v-else>还没有相关订单呢</div>
          </scroll>
          <!-- 驳回 -->
          <scroll class="scroll-content" v-show="checkIndex===4" ref="scrollBox5">
            <div class="orderBox" v-if="goodsReject.length>0">
              <div class="orderBoxList" v-for="(item,index) in goodsReject" :key="index">
                <appendCommon :goodsObj="item">
                  <span slot="state" class="reject">{{item.stateText}}</span>
                  <span slot="info" class="infoRed" v-if="item.coinType===0">多返
                    <span class="num">{{item.coinInfo}}</span>金币</span>
                  <span slot="info" class="infoOrange" v-if="item.coinType===1">
                    <span class="num">{{item.coinInfo}}</span>金币兑换</span>
                  <div class="bottom" slot="bottom">
                    <span class="btn details">{{item.btnText}}</span>
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
    valueLength: {
      get() {
        return `(${this.goodsLottery.length})`
      },
      set(val) {
        return val
      }
    },
    valueLengthNext: {
      get() {
        return `(${this.goodsLotteryNext.length})`
      },
      set(val) {
        return val
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  crated() {
    if(this.$route.params.checkIndex){
      this.checkIndex = this.$route.params.checkIndex
    }
    this.doChangeIndex()
    if(this.checkIndex===2){
      this.getColums()
    }
  },
  data() {
    return {
      pullup: true,
      axiosResult: [],//获得的数据
      maxPageSize: 0,
      pageSize: 5,
      pageNo: 1,
      canLoading: true,
      goodsDrawResult: [],//
      tabArr: ['全部', '抽奖', '中奖了', '评价', '驳回'],
      checkIndex: 2,
      goodsAll: [],
      //驳回
      goodsReject: [],
      goodsEvaluate: [],
      // 未抽奖
      showContent: true,
      goodsLottery: [],
      //已抽奖
      showContentNext: true,
      goodsLotteryNext: [],
      // 抽奖订单
      showAwardIndex: 0,
      goodsDraw: [],
      //金币拿订单
      goodsCoin: [],
      //必中券订单
      goodsMust: [],
      //Plus订单
      goodsPlus: [],
      valueDraw: 0,
      valueCoin: 0,
      valueMust: 0,
      valuePlus: 0
    }
  },
  watch: {
    //监测获得数据变化
    axiosResult: {
      handler(val) {
        for (let i of val) {
          this.doInfo(i.buyerTaskRecordId)
        }
      },
      deep: true
    },
    goodsDrawResult: {
      handler(val) {
        let myArr = []
        val.forEach((item, i) => {
          let obj = Object.assign(item, this.axiosResult[i])
          myArr.push(obj)
        })
        if (val.length === this.axiosResult.length * this.pageNo) {
          this.setGoodsDraw(myArr)
        }
      },
      deep: true
    }
  },
  methods: {
    // 切换
    choose(index) {
      this.checkIndex = index
      this.$nextTick(() => {
        this.$refs.scrollBox1.refresh()
        this.$refs.goodsLottery.refresh()
        this.$refs.awardScroll.refresh()
        this.$refs.scrollBox4.refresh()
        this.$refs.scrollBox5.refresh()
      })
      this.pageNo = 1
      this.doChangeIndex()
    },
    //显示未抽奖
    doShowContent() {
      this.showContent = !this.showContent
      if (this.showContent) {
        this.$refs.goodsLottery.refresh()
        this.$refs.goodsLottery.enable()
      } else {
        this.$refs.goodsLottery.disable()
      }
    },
    //显示已抽奖
    doShowContentNext() {
      this.showContentNext = !this.showContentNext
      if (this.showContentNext) {
        this.$refs.goodsLottery.refresh()
        this.$refs.goodsLottery.enable()
      } else {
        this.$refs.goodsLottery.disable()
      }
    },
    //中奖了模块显示
    changeAwardIndex(index) {
      if (this.showAwardIndex === index) {
        this.showAwardIndex = 0
        return false
      }
      this.showAwardIndex = index
      this.doChangeIndex()
    },
    //放弃白拿
    giveUpLottery() {
      this.$vux.confirm.show({
        // 组件除show外的属性
        title: '确认放弃白拿？',
        content: '放弃的商品不能再次申请',
        onCancel() {
          console.log('取消')
        },
        onConfirm() {
          console.log('确认')
        }
      })
    },
    //继续申请
    getLottery() {
      console.log('继续申请')
    },
    //去做任务
    doTask() {
      console.log('做任务')
    },
    //前去领奖
    getAward(buyerTaskRecordId) {
      this.$router.push({ name: 'sureGetStep1', params: { buyerTaskRecordId: buyerTaskRecordId } })
    },
    //删除任务
    deleteOrder() {
      this.$vux.confirm.show({
        title: '确认删除订单？',
        content: '删除之后将不能恢复',
        onCancel() {
          console.log('取消')
        },
        onConfirm() {
          console.log('确认')
        }
      })
    },
    // 去预评价
    goEvaluate() {
      this.$router.push({ name: 'preOnlyText' })
    },
    // 申请售后
    applyCustomer() {
      this.$router.push({ name: 'applyCustomer' })
    },
    //评价到淘宝
    evaluateTaobao() {

    },
    //切换获取数据
    doChangeIndex() {
      //全部
      if (this.checkIndex === 0) {
        this.doAxios({
          buyerUserId: this.userInfo.buyerUserId,
          buyerTaskStatuss: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"
          ],
          taskFlags: allTask,
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
      }
      //抽奖-再一次抽奖
      else if (this.checkIndex === 1 && this.showAwardIndex === 1) {
        this.doAxios({
          buyerUserId: this.userInfo.buyerUserId,
          buyerTaskStatuss: [
            "0", "5"
          ],
          taskFlags:award,
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
      } 
      //抽奖--未中奖
      else if (this.checkIndex === 1 && this.showAwardIndex === 2) {
        this.doAxios({
          buyerUserId: this.userInfo.buyerUserId,
          buyerTaskStatuss: [
            "2", "3"
          ],
          taskFlags:award,
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
      } 
      //中奖了-抽奖订单
      else if (this.checkIndex === 2 && this.showAwardIndex === 1) {
        this.doAxios({
          buyerUserId: this.userInfo.buyerUserId,
          buyerTaskStatuss: [
            "4", "9"
          ],
          taskType:0,
          taskFlags:[awarded[0],awarded[1],awarded[2]],
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
      } 
      //中奖了-金币拿订单
      else if (this.checkIndex === 2 && this.showAwardIndex === 2) {
        this.doAxios({
          buyerUserId: this.userInfo.buyerUserId,
          buyerTaskStatuss: [
            "4", "5"
          ],
          taskFlags:[awarded[3],awarded[4],awarded[5]],
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          taskType:1 ,
          isFree:0
        })
      } 
      //中奖了-必中券订单
      else if (this.checkIndex === 2 && this.showAwardIndex === 3) {
        this.doAxios({
          buyerUserId: this.userInfo.buyerUserId,
          buyerTaskStatuss: [
            "4", "5"
          ],
          taskType:0,
          taskFlags:[awarded[5]],
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
      } 
      //中奖了-Plus会员
      else if (this.checkIndex === 2 && this.showAwardIndex === 4) {
        this.doAxios({
          buyerUserId: this.userInfo.buyerUserId,
          buyerTaskStatuss: [
            "4", "5"
          ],
          taskType:1 , 
          isFree:1,
          taskFlags:[awarded[0],awarded[1],awarded[2]],
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
      } 
      //评价
      else if (this.checkIndex === 3) {
        this.doAxios({
          buyerUserId: this.userInfo.buyerUserId,
          buyerTaskStatuss: [
            "4"
          ],
          taskType:1 , 
          isFree:1,
          taskFlags:comment,
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
      } 
      //驳回
      else if (this.checkIndex === 4) {
        this.doAxios({
          buyerUserId: this.userInfo.buyerUserId,
          buyerTaskStatuss: [
            "12"
          ],
          taskFlags: notify,
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
      }
    },
    //(特殊tarbar)获得条数
    getColums() {
      this.$axios.post('/api/orderOperate/getWinningCountDetail', {
        buyerUserId: this.userInfo.buyerUserId
      }).then((response) => {
        let data = response.data
        if (data.code !== "200") {
          this.$vux.alert.show({
            title: '错误提示',
            content: data.message,
          })
        } else {
          var myData = data.data
          this.valueDraw = myData.winLotteryCount
          this.valueCoin = myData.goldGetCount
          this.valueMust = myData.winTicketCount
          this.valuePlus = myData.plusCount
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    //api请求list数据
    doAxios(stateObj) {
      this.$axios.post('/api/orderOperate/getBuyerTaskListByStatusAndTaskFlag', stateObj).then((response) => {
        let data = response.data
        if (data.code !== "200") {
          this.$vux.alert.show({
            title: '错误提示',
            content: data.message,
          })
        } else {
          this.axiosResult = data.data.buyerTaskRecords
          this.maxPageSize = data.data.totalCount
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    //api请求商品信息
    doInfo(infoId) {
      this.$axios.post('/api/orderOperate/getAdditionalInfo', {
        buyerTaskRecordId: infoId
      }).then((response) => {
        let data = response.data
        if (data.code === '200') {
          this.goodsDrawResult.push(data.data)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    //设置订单
    setGoodsDraw(arr) {
      let goodsDramArr = []
      for (let item of arr) {
        let goodsState, isBottom
        goodsState = this.setGoodsState(item.taskFlag, item.buyerTaskStatus)
        let time = item.gmtModify
        var nowTime
        if (time) {
          nowTime = time.substring(time.length - 8, time.length - 3)
        }
        let timeArr = nowTime.split(':')
        let timeInfo = ''
        let hours = parseInt(timeArr[0]) + 2
        if (hours < 9) {
          hours = '0' + hours
        } else if (hours > 23) {
          hours = hours - 24
          hours = '0' + hours
        }
        timeInfo = `${hours}:${timeArr[1]}`
        let obj = {
          goodsImg: item.platformPicId,
          shopName: item.shopName,
          stateText: goodsState.stateText,
          btnText:goodsState.btnText,
          goodsName: item.productName,
          temp: typeArr[(parseInt(item.taskType) - 1)] || '无',
          // coinInfo: '10',
          coinType: 2,
          num: `${item.numPerOrder}件`,
          price: item.price,
          orderNum: item.buyerTaskRecordId,
          info: `请在今天${timeInfo}前提交，否则取消中奖资格`,
          isLotteryState: 0,
          isBottom: goodsState.isBottom,
          buyerTaskRecordId: item.buyerTaskRecordId,
          isEvaluateState: goodsState.isEvaluateState,
          errInfo: `未通过原因 ${item.remarks}` || '未通过原因 错误原因'
        }
        //中奖了没有errInfo
        if(this.checkIndex === 2){
          obj.errInfo = ''
        }
        goodsDramArr.push(obj)
      }
      if (this.checkIndex === 2 && this.showAwardIndex === 1) {
        this.goodsDraw = [...this.goodsDraw, ...goodsDramArr]
      } else if (this.checkIndex === 2 && this.showAwardIndex === 2) {
        this.goodsCoin = [...this.goodsCoin, ...goodsDramArr]
      } else if (this.checkIndex === 3) {
        this.goodsEvaluate = [...this.goodsEvaluate, ...goodsDramArr]
      } else if (this.checkIndex === 4) {
        this.goodsReject = [...this.goodsReject, ...goodsDramArr]
      }
      console.log(this.goodsDraw)
      this.$nextTick(() => {
        this.$refs.awardScroll.refresh()
        this.canLoading = true
      })
    },
    setGoodsState(taskFlag, buyerTaskStatus) {
      // 设置驳回stateText
      let goodsState = {}
      //驳回的状态
      if (this.checkIndex === 4) {
        let myIndex = notify.indexOf(taskFlag)
        if (buyerTaskStatus === '12') {
          if (myIndex >= 0 && myIndex <= 3) {
            goodsState.stateText = '预评价审核未通过'
            goodsState.btnText = '修改预评价'
          } else if (myIndex > 3 && myIndex <= 7) {
            goodsState.stateText = '评价审核未通过'
            goodsState.btnText = '修改评价'
          } else if (myIndex > 7 && myIndex <= 11) {
            goodsState.stateText = '预追评审核未通过'
            goodsState.btnText = '修改预追价'
          } else if (myIndex > 11 && myIndex <= 15) {
            goodsState.stateText = '追评审核未通过'
            goodsState.btnText = '修改追价'
          } else if (myIndex > 15 && myIndex <= 18) {
            goodsState.stateText = '订单审核未通过'
            goodsState.btnText = '修改申请'
          }
        }
      }
      //评价的状态
      else if(this.checkIndex === 3){
        let myIndex = notify.indexOf(taskFlag)
        if (buyerTaskStatus === '4') {
          if (myIndex >= 0 && myIndex <= 3) {
            goodsState.stateText = '待预评价'
            goodsState.isEvaluateState = 0
          } else if (myIndex > 3 && myIndex <= 7) {
            goodsState.stateText = '待评价到淘宝'
            goodsState.isEvaluateState = 1
          } else if (myIndex > 7 && myIndex <= 11) {
            goodsState.stateText = '待预追评'
            goodsState.isEvaluateState = 2
          } else if (myIndex > 11 && myIndex <= 15) {
            goodsState.stateText = '待追评到淘宝'
            goodsState.isEvaluateState = 3
          }
        }else if (buyerTaskStatus === '9') {
          if (myIndex >= 0 && myIndex <= 3) {
            goodsState.stateText = '预评价审核中'
            goodsState.isEvaluateState = 4
          } else if (myIndex > 3 && myIndex <= 7) {
            goodsState.stateText = '淘宝评价审核中'
          } else if (myIndex > 7 && myIndex <= 11) {
            goodsState.stateText = '预追评审核中'
          } else if (myIndex > 11 && myIndex <= 15) {
            goodsState.stateText = '淘宝追评审核中'
          }
        }
      }
      //中奖了的状态
      else if(this.checkIndex === 2){
        if (buyerTaskStatus === '4') {
          goodsState.stateText = '待领奖'
          goodsState.isLotteryState = 2

        }else if (buyerTaskStatus === '9') {
          goodsState.stateText = '订单审核中'
          goodsState.isBottom = 1
        }else if (buyerTaskStatus === '6') {
           goodsState.stateText = '超时领奖'
           goodsState.isLotteryState = 0
        }
      }
      //抽奖
      else if(this.checkIndex === 1){
        let myIndex = notify.indexOf(taskFlag)
        if (buyerTaskStatus === '0') {
          goodsState.stateText = '待开奖'
          goodsState.isLotteryState = 3
        }else if (buyerTaskStatus === '2') {
          goodsState.stateText = '未中奖'
          goodsState.isLotteryState = 0
        }else if (buyerTaskStatus === '6') {
           goodsState.stateText = '超时领奖'
           goodsState.isLotteryState = 0
        }else if (buyerTaskStatus === '4') {
           goodsState.stateText = '待提交审核'
           goodsState.isLotteryState = 0
        }
        
      }
      return goodsState
    },
    //下滑结束加载数据
    scrollLoad() {
      if (!this.canLoading) {
        return false
      }
      if (this.pageNo * this.pageSize < this.maxPageSize) {
        this.pageNo += 1
        this.doChangeIndex()
        this.canLoading = false
      }
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
  background: $color-background
  &.move-enter-active, .move-leave-active 
    transition all 0.2s linear
    transform translate3d(0, 0, 0)
  &.move-enter, .move-leave 
    transform translate3d(100%, 0, 0)
  .scrollBox 
    background #eff0f2
    display flex
    flex-direction column
    height 100%
    .stateBox 
      background #ffffff
      border-bottom-1px($color-text-ll)
      margin-bottom 1.2rem
      &.isNoBottom 
        margin-bottom: 0
    .tabContainer 
      flex 0 0 4.1rem
      position relative
      z-index 99
    .listBox
      flex 1
      overflow hidden
      .scroll-content 
        height 100%
      .infoRed
        color $color-theme
        .num
          color $color-theme
          font-size $font-size-large
          margin-left 0
      .infoOrange
        color: $color-theme-orange
        .num
          color $color-theme-orange
          font-size $font-size-large
          margin-left 0
      .bottom
        padding 1.2rem 0
        .btn
          font-size $font-size-medium
          padding 0.8rem 1.2rem
          color $color-text
          margin-left 1.2rem
          border-small($color-text, $border-radius)
          &.details
            color $color-theme
            border-small($color-theme, $border-radius)
        .details
          color $color-theme
          font-size $font-size-medium
      .reject 
        color $color-theme
        font-size $font-size-normal
    .noArray 
      padding 10rem 0
      font-size 1.2rem
      text-align center
      color $color-text-d
</style>
