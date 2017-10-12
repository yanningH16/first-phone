import * as types from './mutation-types'

const mutations = {
  [types.SET_USER_STATE](state, userState) {
    state.userState = userState
  },
  [types.SET_USER_PHONE](state, userPhone) {
    state.userPhone = userPhone
  },
  [types.SET_SERACH_LIST](state,searchList){
    state.searchList = searchList
  },
  [types.SET_USER_INFO](state,userInfo){
    state.userInfo = userInfo
  },
  [types.SET_USER_NOPAY](state,userNopay){
    state.userNopay = userNopay
  }
}

export default mutations
