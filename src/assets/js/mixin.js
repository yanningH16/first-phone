import { mapGetters } from 'vuex'
import { award, awarded, comment, notify, orderRouter } from '../data/task'
export const userInfoMixin = {
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  }
};
//滚动加载页面
export const scrollPages = {
  computed: {
    ...mapGetters([
      'userInfo',
      'userCoin'
    ])
  },
  mounted() {
    if (this.isNoLoad) {
      return false
    }
    this.getApi()
  },
  data() {
    return {
      pageSize: 10,
      maxPageSize: 0,
      pageNo: 1,
      canLoading: false,
      pullup: true
    }
  },
  methods: {
    getApi() {
      this.$axios.post(this.apiUrl, this.params).then((response) => {
        this.$vux.loading.hide()
        let data = response.data
        if (data.code !== "200") {
          this.$vux.alert.show({
            title: '错误提示',
            content: data.message,
          })
        } else {
          this.setInfo(data.data)
        }
      }).catch((error) => {
        this.$vux.alert.show({
          title: '错误提示',
          content: '网络错误',
        })
      })
    },
    scrollLoad() {
      if (!this.canLoading) {
        return false
      }
      if (this.pageNo * this.pageSize < this.maxPageSize) {
        this.pageNo += 1
        this.getApi()
        this.canLoading = false
      }
    }
  }
};
//order
export const orderOperate = {
  data() {
    return {
      orderList: [],
      typeArr: ['综合排序', '信用', '价格从高到低', '价格从低到高', '销量优先']
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
    orderList: {
      handler(val) {
        let myArr = []
        if (val.length === (this.axiosResult.length + (this.pageNo - 1) * this.pageSize)) {
          val.forEach((item, i) => {
            let obj = Object.assign(item, this.axiosResult[i - (this.pageNo - 1) * this.pageSize])
            myArr.push(obj)
          })
          this.setGoodsList(myArr)
        }
      },
      deep: true
    },
    checkIndex(val) {
      this.$nextTick(() => {
        this.$refs.scrollBox.refresh()
      })
    }
  },
  props: {
    checkIndex: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scrollBox.refresh()
      this.canLoading = true
    })
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.scrollBox.refresh()
      this.canLoading = true
    })
  },
  methods: {
    //设置请求的buyerTaskRecords
    setInfo(data) {
      this.axiosResult = data.buyerTaskRecords
      this.maxPageSize = data.totalCount
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
        this.$vux.loading.hide()
        if (data.code === '200') {
          this.orderList.push(data.data)
        } else {
          this.$vux.loading.hide()
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    //设置时间
    setTime(time) {
      var nowTime
      if (time) {
        nowTime = time.substring(time.length - 8, time.length - 3)
      }
      let timeArr = nowTime.split(':')
      let hours = parseInt(timeArr[0]) + 2
      if (hours < 9) {
        hours = '0' + hours
      } else if (hours > 23) {
        hours = hours - 24
        hours = '0' + hours
      }
      return `${hours}:${timeArr[1]}`
    },
  }
};
//
export const sweepstakeOrderOperate = {
  methods: {
    //删除订单
    giveUpLottery(item) {
      let _this = this
      this.$vux.confirm.show({
        // 组件除show外的属性
        title: '确认放弃白拿？',
        content: '放弃的商品不能再次申请',
        onCancel() {
          console.log('取消')
        },
        onConfirm() {
          _this.doGiveUpLottery(item)
        }
      })
    },
    doGiveUpLottery(item) {
      this.$axios.post('/api/orderOperate/orderCancel', {
        buyerTaskRecordId: item.orderNum
      }).then((response) => {
        this.$vux.toast.text(response.data.message, 'middle')
        if (response.data.code === '200') {
          this.getApi()
        }
      }).catch((error) => {
        console.log(error)
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
    },
    //去做任务
    doTask(item) {
      console.log('做任务')
    },
  }
};
//评论模块操作
export const evaluateOrderOperate = {
  methods: {
    //评价路由跳转
    goEvaluate(item) {
      let index = comment.indexOf(item.taskFlag)
      let taskIndex
      if (index >= 0 && index <= 3) { //预评价
        taskIndex = item.taskFiveId
      } else if (index > 3 && index <= 7) { //评价
        taskIndex = item.taskSixId
      } else if (index > 7 && index <= 11) { //评价+预追评
        taskIndex = item.taskEightId
      } else if (index > 11 && index <= 15) { //评价+追评
        taskIndex = item.taskNineId
      }
      this.$router.push({ name: orderRouter[taskIndex - 1], query: { buyerTaskRecordId: item.buyerTaskRecordId, sellerTaskId: item.sellerTaskId, type: item.taskType } })
    },
    //申请售后
    applyCustomer(item) {

    }
  }
};
//驳回模块操作
export const rejectOrderOperate = {
  methods: {
    //驳回路由跳转
    rejectOperate(item, taskFlag) {
      let myIndex = notify.indexOf(taskFlag)
      let taskIndex
      if (myIndex >= 0 && myIndex <= 4) {
        taskIndex = item.taskFourId
      } else if (myIndex > 4 && myIndex <= 9) {
        taskIndex = item.taskFiveId
      } else if (myIndex > 9 && myIndex <= 14) {
        taskIndex = item.taskSixId
      } else if (myIndex > 14 && myIndex <= 19) {
        taskIndex = item.taskEightId
      } else if (myIndex > 19 && myIndex <= 24) {
        taskIndex = item.taskNinetId
      }
      this.$router.push({ name: orderRouter[taskIndex], query: { buyerTaskRecordId: item.buyerTaskRecordId, sellerTaskId: item.sellerTaskId, type: item.taskType } })
    },
  }
};
//中奖模块操作
export const winningOrderOperate = {
  methods: {
    //中奖了路由跳转
    getAward(item) {
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
    //删除订单
    deleteOrder(item) {
      this.$vux.confirm.show({
        // 组件除show外的属性
        title: '确认删除订单？',
        content: '删除之后将不能恢复',
        onCancel() {
          console.log('取消')
        },
        onConfirm() {
          console.log('确认')
        }
      })
    }
  }
}