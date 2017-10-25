import { mapGetters } from 'vuex'
export const userInfoMixin = {
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    }
  }
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
  }
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
        val.forEach((item, i) => {
          let obj = Object.assign(item, this.axiosResult[i])
          myArr.push(obj)
        })
        if (val.length === this.axiosResult.length * this.pageNo) {
          this.setGoodsList(myArr)
        }
      },
      deep: true
    }
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
}