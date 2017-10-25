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
          <scroll class="scroll-content" v-show="checkIndex===0" ref="scrollBox1" :pullup="pullup" @scrollToEnd="scrollLoad">
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
          <sweepstakeOrder></sweepstakeOrder>
          <!-- 中奖了 -->
          <!-- <winningOrder></winningOrder> -->
          <!-- 评价 -->
          <!-- <evaluateOrder></evaluateOrder> -->
          <!-- 驳回 -->
          <!-- <rejectOrder></rejectOrder> -->
        </div>
      </div>
    </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from '../../../base/scroll/scroll'
import AppendCommon from '../../../base/appendCommon/appendCommon'
import RejectOrder from './rejectOrder'
import EvaluateOrder from './evaluateOrder'
import WinningOrder from './winningOrder'
import SweepstakeOrder from './sweepstakeOrder'
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
    Cell,
    RejectOrder,
    EvaluateOrder,
    WinningOrder,
    SweepstakeOrder
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
  created() {
    if (this.$route.params.checkIndex) {
      this.checkIndex = this.$route.params.checkIndex
    }
    this.doChangeIndex()
    if (this.checkIndex === 2) {
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
      checkIndex: 1,
      goodsAll: [],
      //驳回
      goodsReject: [],
      goodsEvaluate: [],
      // 未抽奖
      goodsLottery: [],
      //再一次抽奖
      goodsLotteryNext: [],
      // 抽奖订单
      showAwardIndex: 0,
      showLotteryIndex: 0,
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
    changeLotteryIndex(index) {
      if (this.showLotteryIndex === index) {
        this.showLotteryIndex = 0
        return false
      }
      this.showLotteryIndex = index
      this.doChangeIndex()
      this.$nextTick(() => {
        this.$refs.goodsLottery.refresh()
      })
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
    getLottery(item) {
      const lotteryRouter = [
        'taskOneStep1',
        'taskTwoStep1',
        'taskThreeStep1',
        ''
      ]
      let index = award.indexOf(item.taskFlag)
      if (item.buyerTaskStatus === '6' || item.buyerTaskStatus === '2') {
        this.$router.push({ name: lotteryRouter[index + 1], query: { buyerTaskRecordId: item.buyerTaskRecordId, sellerTaskId: item.sellerTaskId, type: item.taskType } })
      } else if (item.buyerTaskStatus === '4') {
        this.$router.push({ name: lotteryRouter[index], query: { buyerTaskRecordId: item.buyerTaskRecordId, sellerTaskId: item.sellerTaskId, type: item.taskType } })
      }
      // this.$router.push({ name: lotteryRouter[index], query: { buyerTaskRecordId: item.buyerTaskRecordId ,sellerTaskId:item.sellerTaskId,type:item.taskType} })
    },
    //去做任务
    doTask() {
      console.log('做任务')
    },
    //前去领奖
    getAward(item) {
      if (this.checkIndex === 2) {
        this.doCheckTwo(item)
      }
    },
    doCheckTwo(item) {
      const routerLink = [
        'getPriceOneStep1',
        'getPriceTwoStep1',
        'getPriceThreeStep1',
        '',
        '',
        'sureGetStep1'
      ]
      let index = awarded.indexOf(item.taskFlag)
      this.$router.push({ name: routerLink[index], query: { buyerTaskRecordId: item.buyerTaskRecordId, sellerTaskId: item.sellerTaskId, type: item.taskType } })
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
    goEvaluate(item) {
      // this.$router.push({ name: 'preOnlyText' })
      const routerLink = [
        'taskOneStep1', 'taskOneStep1', 'taskOneStep1', 'taskTwoStep1', '', 'taskThreeStep1', '', '', 'getPriceOneStep1', 'getPriceTwoStep1', 'getPriceThreeStep1',
        'preOnlyFiveStar', 'preOnlyText', 'preTextImg', 'preTextKey', 'preImgKey', 'onlyFiveStar', 'onlyText1', 'textImg1', 'textKey1', 'textImg1', '',
        'preAppendOnlyText', 'preAppendOnlyTextKey', 'preAppendTextFav1', 'preAppendTextFavKey1', 'preAppendTextImg', 'preAppendTextImgFav1', 'preAppendTextKeyImg',
        'preAppendTextKeyImgFav1', 'appendToTaoBao1', 'appendToTaoBao1', 'appendToTaoBao1', 'appendToTaoBao1', 'appendToTaoBao2', 'appendToTaoBao2', 'appendToTaoBao2',
        'appendToTaoBao2', 'sureGetStep1', 'sureGetStep1', 'sureGetStep1', 'sureGetStep1', 'sureGetStep1 ', 'sureGetStep1'
      ]
      let index = comment.indexOf(item.taskFlag)
      let taskIndex
      if (index >= 0 && index < 3) {//预评价
        taskIndex = item.taskFiveId
      } else if (index >= 3 && index < 7) {//评价
        taskIndex = item.taskSixId
      } else if (index >= 7 && index < 11) {//评价+预追评
        taskIndex = item.taskSevenId
      } else if (index >= 11 && index < 15) {//评价+追评
        taskIndex = item.taskEightId
      }
      this.$router.push({ name: routerLink[taskIndex - 1], query: { buyerTaskRecordId: item.buyerTaskRecordId, sellerTaskId: item.sellerTaskId, type: item.taskType } })
    },
    //修改驳回
    rejectOperate(item) {
      const routerLink = [
        'taskOneStep1', 'taskOneStep1', 'taskOneStep1', 'taskTwoStep1', '', 'taskThreeStep1', '', '', 'getPriceOneStep1', 'getPriceTwoStep1', 'getPriceThreeStep1',
        'preOnlyFiveStar', 'preOnlyText', 'preTextImg', 'preTextKey', 'preImgKey', 'onlyFiveStar', 'onlyText1', 'textImg1', 'textKey1', 'textImg1', '',
        'preAppendOnlyText', 'preAppendOnlyTextKey', 'preAppendTextFav1', 'preAppendTextFavKey1', 'preAppendTextImg', 'preAppendTextImgFav1', 'preAppendTextKeyImg',
        'preAppendTextKeyImgFav1', 'appendToTaoBao1', 'appendToTaoBao1', 'appendToTaoBao1', 'appendToTaoBao1', 'appendToTaoBao2', 'appendToTaoBao2', 'appendToTaoBao2',
        'appendToTaoBao2', 'sureGetStep1', 'sureGetStep1', 'sureGetStep1', 'sureGetStep1', 'sureGetStep1 ', 'sureGetStep1'
      ]
      const lotteryRouter = [
        'taskOneStep1',
        'taskTwoStep1',
        'taskThreeStep1',
        ''
      ]
      let myIndex = notify.indexOf(taskFlag)
      let taskIndex
      if (myIndex >= 0 && myIndex <= 3) {
        taskIndex = item.taskFiveId
      } else if (myIndex > 3 && myIndex <= 7) {
        taskIndex = item.taskSixId
      } else if (myIndex > 7 && myIndex <= 11) {
        taskIndex = item.taskSevenId
      } else if (myIndex > 11 && myIndex <= 15) {
        taskIndex = item.taskEightId
      } else if (myIndex > 15 && myIndex <= 18) {
        let awardIndex = award.indexOf(item.taskFlag)
        this.$router.push({ name: lotteryRouter[awardIndex - 1], query: { buyerTaskRecordId: item.buyerTaskRecordId, sellerTaskId: item.sellerTaskId, type: item.taskType } })
        return false
      }
      this.$router.push({ name: routerLink[taskIndex], query: { buyerTaskRecordId: item.buyerTaskRecordId, sellerTaskId: item.sellerTaskId, type: item.taskType } })
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
      //抽奖-未抽奖
      else if (this.checkIndex === 1 && this.showLotteryIndex === 1) {
        this.doAxios({
          buyerUserId: this.userInfo.buyerUserId,
          buyerTaskStatuss: [
            "0", "5"
          ],
          taskFlags: award,
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
      }
      //抽奖--再一次抽奖
      else if (this.checkIndex === 1 && this.showLotteryIndex === 2) {
        this.doAxios({
          buyerUserId: this.userInfo.buyerUserId,
          buyerTaskStatuss: [
            "2", "3"
          ],
          taskFlags: award,
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
          taskType: 1,
          taskFlags: [awarded[0], awarded[1], awarded[2]],
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
          taskFlags: [awarded[3], awarded[4], awarded[5]],
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          taskType: 2,
          isFree: 0
        })
      }
      //中奖了-必中券订单
      else if (this.checkIndex === 2 && this.showAwardIndex === 3) {
        this.doAxios({
          buyerUserId: this.userInfo.buyerUserId,
          buyerTaskStatuss: [
            "4", "5"
          ],
          taskType: 1,
          taskFlags: [awarded[5]],
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
          taskType: 2,
          isFree: 1,
          taskFlags: [awarded[0], awarded[1], awarded[2]],
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
      }
      //评价
      // else if (this.checkIndex === 3) {
      //   this.doAxios({
      //     buyerUserId: this.userInfo.buyerUserId,
      //     buyerTaskStatuss: [
      //       "4"
      //     ],
      //     taskFlags:comment,
      //     pageSize: this.pageSize,
      //     pageNo: this.pageNo
      //   })
      // } 
      //驳回
      // else if (this.checkIndex === 4) {
      //   this.doAxios({
      //     buyerUserId: this.userInfo.buyerUserId,
      //     buyerTaskStatuss: [
      //       "12"
      //     ],
      //     taskFlags: notify,
      //     pageSize: this.pageSize,
      //     pageNo: this.pageNo
      //   })
      // }
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
      this.$vux.loading.show({
        text: '加载中，请稍后'
      })
      this.$axios.post('/api/orderOperate/getAdditionalInfo', {
        buyerTaskRecordId: infoId
      }).then((response) => {
        let data = response.data
        if (data.code === '200') {
          this.goodsDrawResult.push(data.data)
          this.$vux.loading.hide()
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
          btnText: goodsState.btnText,
          goodsName: item.productName,
          temp: typeArr[(parseInt(item.taskType) - 1)] || '无',
          coinType: 2,
          num: `${item.numPerOrder}件`,
          price: item.price,
          orderNum: item.buyerTaskRecordId,
          info: `请在今天${timeInfo}前提交，否则取消中奖资格`,
          isLotteryState: goodsState.isLotteryState,
          isBottom: goodsState.isBottom,
          buyerTaskRecordId: item.buyerTaskRecordId,
          isEvaluateState: goodsState.isEvaluateState,
          errInfo: `未通过原因 ${item.remarks}` || '未通过原因 错误原因',
          taskFlag: item.taskFlag,
          taskType: item.taskType,
          sellerTaskId: item.sellerTaskId,
          buyerTaskStatus: item.buyerTaskStatus,
          taskOneId: item.taskOneId,
          taskTwoId: item.taskTwoId,
          taskThreeId: item.taskThreeId,
          taskFourId: item.taskFourId,
          taskFiveId: item.taskFiveId,
          taskSixId: item.taskSixId,
          taskSevenId: item.taskSevenId,
          taskEightId: item.taskEightId,
          taskNineId: item.taskNineId,
        }
        //中奖了没有errInfo
        if (this.checkIndex === 2) {
          obj.errInfo = ''
        }
        goodsDramArr.push(obj)
      }
      if (this.checkIndex === 1 && this.showLotteryIndex === 1) {
        this.goodsLottery = [...goodsDramArr]
      } else if (this.checkIndex === 1 && this.showLotteryIndex === 2) {
        this.goodsLotteryNext = [...goodsDramArr]
      }
      else if (this.checkIndex === 2 && this.showAwardIndex === 1) {
        this.goodsDraw = [...goodsDramArr]
      } else if (this.checkIndex === 2 && this.showAwardIndex === 2) {
        this.goodsCoin = [...goodsDramArr]
      } else if (this.checkIndex === 3) {
        this.goodsEvaluate = [...goodsDramArr]
      } else if (this.checkIndex === 4) {
        this.goodsReject = [...goodsDramArr]
      } else {
        this.goodsAll = [...goodsDramArr]
      }
      this.$nextTick(() => {
        this.$refs.scrollBox1.refresh()
        this.$refs.goodsLottery.refresh()
        this.$refs.awardScroll.refresh()
        this.$refs.scrollBox4.refresh()
        this.$refs.scrollBox5.refresh()
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
      else if (this.checkIndex === 3) {
        let myIndex = comment.indexOf(taskFlag)
        if (buyerTaskStatus === '4') {
          if (myIndex >= 0 && myIndex < 3) {
            goodsState.stateText = '待预评价'
            goodsState.isEvaluateState = 0
          } else if (myIndex > 3 && myIndex < 7) {
            goodsState.stateText = '待评价到淘宝'
            goodsState.isEvaluateState = 1
          } else if (myIndex > 7 && myIndex < 11) {
            goodsState.stateText = '待预追评'
            goodsState.isEvaluateState = 2
          } else if (myIndex > 11 && myIndex < 15) {
            goodsState.stateText = '待追评到淘宝'
            goodsState.isEvaluateState = 3
          }
        } else if (buyerTaskStatus === '9') {
          if (myIndex >= 0 && myIndex < 3) {
            goodsState.stateText = '预评价审核中'
            goodsState.isEvaluateState = 4
          } else if (myIndex > 3 && myIndex < 7) {
            goodsState.stateText = '淘宝评价审核中'
          } else if (myIndex > 7 && myIndex < 11) {
            goodsState.stateText = '预追评审核中'
          } else if (myIndex > 11 && myIndex < 15) {
            goodsState.stateText = '淘宝追评审核中'
          }
        }
      }
      //中奖了的状态
      else if (this.checkIndex === 2) {
        if (buyerTaskStatus === '4') {
          goodsState.stateText = '待领奖'
          goodsState.isLotteryState = 2
        } else if (buyerTaskStatus === '9') {
          goodsState.stateText = '订单审核中'
          goodsState.isBottom = 1
        } else if (buyerTaskStatus === '6') {
          goodsState.stateText = '超时领奖'
          goodsState.isLotteryState = 0
        }
      }
      //抽奖
      else if (this.checkIndex === 1) {
        let myIndex = notify.indexOf(taskFlag)
        if (buyerTaskStatus === '0') {
          goodsState.stateText = '待开奖'
          goodsState.isLotteryState = 3
        } else if (buyerTaskStatus === '2') {
          goodsState.stateText = '未中奖'
          goodsState.isLotteryState = 0
        } else if (buyerTaskStatus === '6') {
          goodsState.stateText = '超时领奖'
          goodsState.isLotteryState = 2
        } else if (buyerTaskStatus === '4') {
          goodsState.stateText = '待提交审核'
          goodsState.isLotteryState = 2
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
  background $color-background
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
        margin-bottom 0
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
        color $color-theme-orange
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
