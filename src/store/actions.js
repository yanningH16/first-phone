import * as types from './mutation-types'
import { setUserPhone, loadUserPhone, setUserInfoStorage, setUserNopayStorage, setUserStateStorage } from '../assets/js/cache'

export const setUserPhoneHistory = function({ commit }, query) {
  commit(types.SET_USER_PHONE, setUserPhone(query))
}

export const setSearchList = function({ commit }, searchList) {
  commit(types.SET_USER_PHONE, searchList)
}

export const setUserInfo = function({ commit }, userInfo) {
    commit(types.SET_USER_INFO, setUserInfoStorage(userInfo))
  }
  //调用相应的方法
  //const定义的不能跟之前的一样,不然就会报错
export const setUserNopay = function({ commit }, userNopay) {
    commit(types.SET_USER_NOPAY, setUserNopayStorage(userNopay))
  }
  // 设置用户登录状态
export const setUserState = function({ commit }, query) {
  commit(types.SET_USER_STATE, setUserStateStorage(query))
}