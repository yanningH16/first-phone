import * as types from './mutation-types'
import { setUserPhone, loadUserPhone, setUserInfoStorage, setUserNopayStorage, setUserStateStorage ,setUserCoinStorage} from '../assets/js/cache'

export const setUserPhoneHistory = function({ commit }, query) {
  commit(types.SET_USER_PHONE, setUserPhone(query))
}

export const setSearchList = function({ commit }, searchList) {
  commit(types.SET_USER_PHONE, searchList)
}

export const setUserInfo = function({ commit }, userInfo) {
  commit(types.SET_USER_INFO, setUserInfoStorage(userInfo))
}

export const setUserNopay = function({ commit }, userNopay) {
  commit(types.SET_USER_NOPAY, setUserNopayStorage(userNopay))
}

export const setUserCoin = function({ commit }, coin) {
  commit(types.SET_USER_COIN, setUserCoinStorage(coin))
}