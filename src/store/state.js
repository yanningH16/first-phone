import { loadUserPhone, loadUserInfo, loadUserNopay, loadUserState, loadUserCoin, loadHistory } from '../assets/js/cache'
const state = {
    userPhone: loadUserPhone(),
    userInfo: loadUserInfo(),
    userNopay: loadUserNopay(),
    userCoin: loadUserCoin(),
    history: loadHistory()
}
export default state