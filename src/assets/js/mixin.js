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
  data() {
    return {
      pageSize: 5,
      maxPageSize: 0,
      pageNo: 1,
      canLoading: false,
      pullup: true
    }
  },
  methods: {
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