import storage from 'good-storage'

const USER_STATE_KEY = '__userState__'
const USER_PHONE_KEY = '__userPhone__'
const USER_INFO_KEY = '__userInfo__'
const USER_NOPAY_KEY = '__userNopay__'
const USER_COIN_KEY = '__userCoin__'
const HISTORY = '__history__'

//设置登录状态
export function setUserStateStorage(state) {
    storage.set(USER_STATE_KEY, state)
    return state
}
// 获得登录状态
export function loadUserState() {
    return storage.get(USER_STATE_KEY, [])
}
//设置手机号
export function setUserPhone(userPhone) {
    storage.set(USER_PHONE_KEY, userPhone)
    return userPhone
}
// 获得手机号
export function loadUserPhone() {
    return storage.get(USER_PHONE_KEY, [])
}

/*个人信息*/
//设置个人信息
export function setUserInfoStorage(userInfo) {
    storage.set(USER_INFO_KEY, userInfo)
    return userInfo
}
export function loadUserInfo() {
    return storage.get(USER_INFO_KEY, [])
}
//数据列表出来的存储数据
export function setUserNopayStorage(userNopay) {
    storage.set(USER_NOPAY_KEY, userNopay)
    return userNopay
}
//获取的数据
export function loadUserNopay() {
    return storage.get(USER_NOPAY_KEY, [])
}
//用户金币
//设置登录状态
export function setUserCoinStorage(state) {
    storage.set(USER_COIN_KEY, state)
    return state
}
// 获得登录状态
export function loadUserCoin() {
    return storage.get(USER_COIN_KEY, [])
}
//设置历史搜索记录
export function setHistoryStorage(history) {
    storage.set(HISTORY, history)
    return history
}
export function loadHistory() {
    return storage.get(HISTORY, [])
}