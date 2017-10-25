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