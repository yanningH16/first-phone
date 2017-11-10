const Settings = (resolve) => {
  import('@/components/user/settings/settings').then((module) => {
    resolve(module)
  })
}
const Usersex = (resolve) => {
  import('@/components/user/usersex/usersex').then((module) => {
    resolve(module)
  })
}
const UserAddress = (resolve) => {
  import('@/components/user/userAddress/userAddress').then((module) => {
    resolve(module)
  })
}
const UserQq = (resolve) => {
  import('@/components/user/userQq/userQq').then((module) => {
    resolve(module)
  })
}
const UserPhone = (resolve) => {
  import('@/components/user/userPhone/userPhone').then((module) => {
    resolve(module)
  })
}
const UserSafe = (resolve) => {
  import('@/components/user/userSafe/userSafe').then((module) => {
    resolve(module)
  })
}
const Zhifubao = (resolve) => {
  import('@/components/user/zhifubao/zhifubao').then((module) => {
    resolve(module)
  })
}
const YinHangKa = (resolve) => {
  import('@/components/user/yinHangKa/yinHangKa').then((module) => {
    resolve(module)
  })
}
const SetPayPwd = (resolve) => {
  import('@/components/user/setPayPwd/setPayPwd').then((module) => {
    resolve(module)
  })
}
const UpdateUserPwd = (resolve) => {
  import('@/components/user/updateUserPwd/updateUserPwd').then((module) => {
    resolve(module)
  })
}
const HelpCenter = (resolve) => {
  import('@/components/user/helpCenter/helpCenter').then((module) => {
    resolve(module)
  })
}
const HelpInfo = (resolve) => {
  import('@/components/user/helpCenter/helpInfo').then((module) => {
    resolve(module)
  })
}
const UserSuggest = (resolve) => {
  import('@/components/user/userSuggest/userSuggest').then((module) => {
    resolve(module)
  })
}
const settings = [{
  path: '/user/settings',
  component: Settings,
  name: 'settings',
  meta: { title: '设置', isLogin: true }
},
{
  path: '/user/settings/usersex',
  component: Usersex,
  name: 'usersex',
  meta: { title: '设置性别', isLogin: true }
},
{
  path: '/user/settings/userAddress',
  component: UserAddress,
  name: 'userAddress',
  meta: { title: '设置地址', isLogin: true }
},
{
  path: '/user/settings/userQq',
  component: UserQq,
  name: 'userQq',
  meta: { title: '设置QQ', isLogin: true }
},
{
  path: '/user/settings/userPhone',
  component: UserPhone,
  name: 'userPhone',
  meta: { title: '更改手机号', isLogin: true }
},
{
  path: '/user/settings/userSafe',
  component: UserSafe,
  name: 'userSafe',
  meta: { title: '账号安全', isLogin: true }
},
{
  path: '/user/settings/userSafe/zhifubao',
  component: Zhifubao,
  name: 'zhifubao',
  meta: { title: '绑定支付宝' }
},
{
  path: '/user/settings/userSafe/yinHangKa',
  component: YinHangKa,
  name: 'yinHangKa',
  meta: { title: '绑定银行卡', isLogin: true }
},
{
  path: '/user/settings/userSafe/SetPayPwd',
  component: SetPayPwd,
  name: 'setPayPwd',
  meta: { title: '设置提现密码', isLogin: true }
},
{
  path: '/user/settings/userSafe/updateUserPwd',
  component: UpdateUserPwd,
  name: 'updateUserPwd',
  meta: { title: '更改登录密码', isLogin: true }
},
{
  path: '/user/helpCenter',
  component: HelpCenter,
  name: 'helpCenter',
  meta: { title: '帮助中心', isLogin: true }
},
{
  path: '/user/helpInfo',
  component: HelpInfo,
  name: 'helpInfo'
},
{
  path: '/user/userSuggest',
  component: UserSuggest,
  name: 'userSuggest',
  meta: { title: '意见反馈' }
}
]
export default settings
