import { loadUserPhone, loadUserInfo, loadUserNopay, loadUserState } from '../assets/js/cache'
const state = {
  userPhone: loadUserPhone(),
  userInfo: loadUserInfo(),
  userNopay: loadUserNopay(),
  userState: loadUserState()
}
export default state