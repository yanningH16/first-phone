const UserMoney = (resolve) => {
  import ('@/components/user/userMoney/userMoney').then((module) => {
    resolve(module)
  })
}
const DesPostList = (resolve) => {
  import ('@/components/user/desPostList/desPostList').then((module) => {
    resolve(module)
  })
}
const UserCoin = (resolve) => {
  import ('@/components/user/userCoin/userCoin').then((module) => {
    resolve(module)
  })
}
const BuyCoin = (resolve) => {
  import ('@/components/user/buyCoin/buyCoin').then((module) => {
    resolve(module)
  })
}
const ExChangeCoin = (resolve) => {
  import ('@/components/user/exChangeCoin/exChangeCoin').then((module) => {
    resolve(module)
  })
}
const NoPayOrder = (resolve) => {
  import ('@/components/user/noPayOrder/noPayOrder').then((module) => {
    resolve(module)
  })
}
const ApplyCustomer = (resolve) => {
  import ('@/components/user/applyCustomer/applyCustomer').then((module) => {
    resolve(module)
  })
}
const UserCoupons = (resolve) => {
  import ('@/components/user/userCoupons/userCoupons').then((module) => {
    resolve(module)
  })
}
const UserMessage = (resolve) => {
  import ('@/components/user/userMessage/userMessage').then((module) => {
    resolve(module)
  })
}
const UserMessageInfo = (resolve) => {
  import ('@/components/user/userMessageInfo/userMessageInfo').then((module) => {
    resolve(module)
  })
}
const BuyPlus = (resolve) => {
  import ('@/components/user/buyPlus/buyPlus').then((module) => {
    resolve(module)
  })
}
const GetUserMoney = (resolve) => {
  import ('@/components/user/getUserMoney/getUserMoney').then((module) => {
    resolve(module)
  })
}
const State = (resolve) => {
  import ('@/components/state/state').then((module) => {
    resolve(module)
  })
}
const coin = [{
    path: '/user/userMoney',
    component: UserMoney,
    name: 'userMoney',
    meta: { title: '我的资金' },
  },
  {
    path: '/user/desPostList',
    component: DesPostList,
    name: 'desPostList',
    meta: { title: '提现明细', isLogin: true },
  },
  {
    path: '/user/userCoin',
    component: UserCoin,
    name: 'userCoin',
    meta: { title: '我的金币' },
  },
  {
    path: '/user/buyCoin',
    component: BuyCoin,
    name: 'buyCoin',
    meta: { title: '充值金币' },
  },
  {
    path: '/user/exChangeCoin',
    component: ExChangeCoin,
    name: 'exChangeCoin',
    meta: { title: '兑换可提现金额' },
  },
  {
    path: '/user/noPayOrder',
    component: NoPayOrder,
    name: 'noPayOrder',
    meta: { title: '白拿订单' },
  },
  {
    path: '/user/applyCustomer',
    component: ApplyCustomer,
    name: 'applyCustomer',
    meta: { title: '申请售后' },
  },
  {
    path: '/user/userCoupons',
    component: UserCoupons,
    name: 'userCoupons',
    meta: { title: '我的必中券' },
  },
  {
    path: '/user/userMessage',
    component: UserMessage,
    name: 'userMessage',
    meta: { title: '消息中心' },
  },
  {
    path: '/user/userMessageInfo',
    component: UserMessageInfo,
    name: 'userMessageInfo',
  },
  {
    path: '/user/buyPlus',
    component: BuyPlus,
    name: 'buyPlus',
    meta: { title: '充值Plus会员' },
  },
  {
    path: '/user/getUserMoney',
    component: GetUserMoney,
    name: 'getUserMoney',
    meta: { title: '提现' },
  },
  { //state
    path: '/state/state',
    component: State,
    name: 'state',
    meta: { title: '' }
  },
]
export default coin