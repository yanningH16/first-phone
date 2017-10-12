const User = (resolve) => {
  import ('@/components/user/user').then((module) => {
    resolve(module)
  })
}
import Settings from './settings/settings'
import Coin from './coin/coin'
import Center from './center/center'
const defaultUser = [{
  path: '/user',
  component: User,
  name: 'user',
  meta: { title: '我的' }
}]
const user = [...defaultUser, ...Settings, ...Coin, ...Center]
export default user