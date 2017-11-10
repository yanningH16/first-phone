import { loadUserPhone, loadUserInfo, loadUserNopay, loadUserCoin, loadHistory } from '../assets/js/cache'
const state = {
  userPhone: loadUserPhone(),
  userInfo: loadUserInfo(),
  userNopay: loadUserNopay(),
  userCoin: loadUserCoin(),
  history: loadHistory(),
  preurl: null
}
export default state
