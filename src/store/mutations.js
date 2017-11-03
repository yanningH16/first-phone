import * as types from './mutation-types'

const mutations = {
    [types.SET_USER_PHONE](state, userPhone) {
        state.userPhone = userPhone
    },
    [types.SET_SERACH_LIST](state, searchList) {
        state.searchList = searchList
    },
    [types.SET_USER_INFO](state, userInfo) {
        state.userInfo = userInfo
    },
    [types.SET_USER_NOPAY](state, userNopay) {
        state.userNopay = userNopay
    },
    [types.SET_USER_COIN](state, coin) {
        state.userCoin = coin
    },
    [types.SET_HISTORY](state, history) {
        state.history = history
    },
    [types.SET_PREURL](state, preurl) {
        state.preurl = preurl
    }
}

export default mutations