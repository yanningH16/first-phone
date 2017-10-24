import { loadUserPhone, loadUserInfo, loadUserNopay, loadUserState, loadUserCoin } from '../assets/js/cache'
const state = {
  userPhone: loadUserPhone(),
  userInfo: loadUserInfo(),
  userNopay: loadUserNopay(),
  userCoin: loadUserCoin(),
}
export default state