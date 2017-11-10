import Settings from './settings/settings'
import Coin from './coin/coin'
import Center from './center/center'
const User = (resolve) => {
  import('@/components/user/user').then((module) => {
    resolve(module)
  })
}
const defaultUser = [{
  path: '/user',
  component: User,
  name: 'user',
  meta: { title: '我的', isLogin: true }
}]
const user = [...defaultUser, ...Settings, ...Coin, ...Center]
export default user
