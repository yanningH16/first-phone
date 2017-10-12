import { mapGetters } from 'vuex'
export const userInfoMixin = {
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  }
}