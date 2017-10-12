const Settings = (resolve) => {
  import ('@/components/user/settings/settings').then((module) => {
    resolve(module)
  })
}
const Usersex = (resolve) => {
  import ('@/components/user/usersex/usersex').then((module) => {
    resolve(module)
  })
}
const UserAddress = (resolve) => {
  import ('@/components/user/userAddress/userAddress').then((module) => {
    resolve(module)
  })
}
const UserQq = (resolve) => {
  import ('@/components/user/userQq/userQq').then((module) => {
    resolve(module)
  })
}
const UserPhone = (resolve) => {
  import ('@/components/user/userPhone/userPhone').then((module) => {
    resolve(module)
  })
}
const UserSafe = (resolve) => {
  import ('@/components/user/userSafe/userSafe').then((module) => {
    resolve(module)
  })
}
const Zhifubao = (resolve) => {
  import ('@/components/user/zhifubao/zhifubao').then((module) => {
    resolve(module)
  })
}
const YinHangKa = (resolve) => {
  import ('@/components/user/yinHangKa/yinHangKa').then((module) => {
    resolve(module)
  })
}
const SetPayPwd = (resolve) => {
  import ('@/components/user/setPayPwd/setPayPwd').then((module) => {
    resolve(module)
  })
}
const UpdateUserPwd = (resolve) => {
  import ('@/components/user/updateUserPwd/updateUserPwd').then((module) => {
    resolve(module)
  })
}
const settings = [{
    path: '/user/settings',
    component: Settings,
    name: 'settings',
    meta: { title: '设置' },
  },
  {
    path: '/user/settings/usersex',
    component: Usersex,
    name: 'usersex',
    meta: { title: '设置性别' },
  },
  {
    path: '/user/settings/userAddress',
    component: UserAddress,
    name: 'userAddress',
    meta: { title: '设置地址' },
  },
  {
    path: '/user/settings/userQq',
    component: UserQq,
    name: 'userQq',
    meta: { title: '设置QQ' },
  },
  {
    path: '/user/settings/userPhone',
    component: UserPhone,
    name: 'userPhone',
    meta: { title: '更改手机号' },
  },
  {
    path: '/user/settings/userSafe',
    component: UserSafe,
    name: 'userSafe',
    meta: { title: '账号安全' },
  },
  {
    path: '/user/userSafe',
    component: UserSafe,
    name: 'userSafe',
    meta: { title: '账号安全' },
  },
  {
    path: '/user/settings/userSafe/zhifubao',
    component: Zhifubao,
    name: 'zhifubao',
    meta: { title: '绑定支付宝' },
  },
  {
    path: '/user/settings/userSafe/yinHangKa',
    component: YinHangKa,
    name: 'yinHangKa',
    meta: { title: '绑定银行卡' },
  },
  {
    path: '/user/settings/userSafe/SetPayPwd',
    component: SetPayPwd,
    name: 'setPayPwd',
    meta: { title: '设置提现密码' },
  },
  {
    path: '/user/settings/userSafe/updateUserPwd',
    component: UpdateUserPwd,
    name: 'updateUserPwd',
    meta: { title: '更改登录密码' },
  }
]
export default settings