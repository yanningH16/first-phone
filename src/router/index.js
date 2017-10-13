// import Vue from 'vue'
// import Router from 'vue-router'

// import Index from './index/index'
// import Nopay from './nopay/nopay'
// import Rushou from './rushou/rushou'
// import User from './user/user'
// import Youpin from './youpin/youpin'

// Vue.use(Router)

// const defaultRouter = [{
//   path: '/',
//   redirect: {
//     name: 'index'
//   }
// }]
// const routes = [...defaultRouter, ...Index, ...Nopay, ...Rushou, ...Youpin, ...User]
// let router = new Router({
//   routes
// })

// // 设置title
// router.beforeEach((to, from, next) => {
//   if (to.meta.title || to.params.message) {
//     document.title = to.meta.title || to.params.message.title
//   } else {
//     document.title = 'BaoyiBao'
//   }
//   next()
// })
// export default router
import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import {loadUserInfo} from '../assets/js/cache'
// import Index from '@/components/index/index'
// import Nopay from '@/components/nopay/nopay'
// import Rushou from '@/components/rushou/rushou'
// import Youpin from '@/components/youpin/youpin'
// import User from '@/components/user/user'
const Index = (resolve) => {
  import ('@/components/index/index').then((module) => {
    resolve(module)
  })
}
const Nopay = (resolve) => {
  import ('@/components/nopay/nopay').then((module) => {
    resolve(module)
  })
}
const Rushou = (resolve) => {
  import ('@/components/rushou/rushou').then((module) => {
    resolve(module)
  })
}
const Youpin = (resolve) => {
  import ('@/components/youpin/youpin').then((module) => {
    resolve(module)
  })
}
const User = (resolve) => {
    import ('@/components/user/user').then((module) => {
      resolve(module)
    })
  }
  /*用户-个人中心模块*/
  // import Settings from '@/components/user/settings/settings'
  // import Usersex from '@/components/user/usersex/usersex'
  // import UserAddress from '@/components/user/userAddress/userAddress'
  // import UserQq from '@/components/user/userQq/userQq'
  // import UserPhone from '@/components/user/userPhone/userPhone'
  // import UserSafe from '@/components/user/userSafe/userSafe'
  // import Zhifubao from '@/components/user/zhifubao/zhifubao'
  // import YinHangKa from '@/components/user/yinHangKa/yinHangKa'
  // import SetPayPwd from '@/components/user/setPayPwd/setPayPwd'
  // import UpdateUserPwd from '@/components/user/updateUserPwd/updateUserPwd'
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
const HelpCenter = (resolve) => {
  import ('@/components/user/helpCenter/helpCenter').then((module) => {
    resolve(module)
  })
}
const UserSuggest = (resolve) => {
    import ('@/components/user/userSuggest/userSuggest').then((module) => {
      resolve(module)
    })
  }
  /*用户-资金模块*/
  // import UserMoney from '@/components/user/userMoney/userMoney'
  // import UserCoin from '@/components/user/userCoin/userCoin'
  // import BuyCoin from '@/components/user/buyCoin/buyCoin'
  // import ExChangeCoin from '@/components/user/exChangeCoin/exChangeCoin'
  // import NoPayOrder from '@/components/user/noPayOrder/noPayOrder'
  // import ApplyCustomer from '@/components/user/applyCustomer/applyCustomer'
  // import UserCoupons from '@/components/user/userCoupons/userCoupons'
  // import UserMessage from '@/components/user/userMessage/userMessage'
  // import UserMessageInfo from '@/components/user/userMessageInfo/userMessageInfo'
  // import BuyPlus from '@/components/user/buyPlus/buyPlus'
const UserMoney = (resolve) => {
  import ('@/components/user/userMoney/userMoney').then((module) => {
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
  /*登录注册模块*/
  // import Login from '../components/user/login/login'
  // import RegisterOne from '../components/user/register/registerOne'
  // import RegisterTwo from '../components/user/register/registerTwo'
  // import RegisterThree from '../components/user/register/registerThree'
const Login = (resolve) => {
  import ('@/components/user/login/login').then((module) => {
    resolve(module)
  })
}
const RegisterOne = (resolve) => {
  import ('@/components/user/register/registerOne').then((module) => {
    resolve(module)
  })
}
const ForgetPwd = (resolve) => {
  import ('@/components/user/forgetPwd/forgetPwd').then((module) => {
    resolve(module)
  })
}
const RegisterTwo = (resolve) => {
  import ('@/components/user/register/registerTwo').then((module) => {
    resolve(module)
  })
}
const RegisterThree = (resolve) => {
  import ('@/components/user/register/registerThree').then((module) => {
    resolve(module)
  })
}

/*任务模块*/
// import Details from '@/components/nopay/details/details'
const Details = (resolve) => {
    import ('@/components/nopay/details/details').then((module) => {
      resolve(module)
    })
  }
  /*任务一模块*/
  // import TaskOneStep1 from '@/components/task/taskOne/taskOne_step1'
  // import TaskOneStep2 from '@/components/task/taskOne/taskOne_step2'
const TaskOneStep1 = (resolve) => {
  import ('@/components/task/taskOne/taskOne_step1').then((module) => {
    resolve(module)
  })
}
const TaskOneStep2 = (resolve) => {
    import ('@/components/task/taskOne/taskOne_step2').then((module) => {
      resolve(module)
    })
  }
  /*任务提交成功模块*/
  // import SubmitSuccess from '@/components/task/submitSuccess'
const SubmitSuccess = (resolve) => {
    import ('@/components/task/submitSuccess').then((module) => {
      resolve(module)
    })
  }
  /*任务一领取奖励*/
  // import GetPriceOneStep1 from '@/components/task/getPrice/getPriceOneStep1'
  // import GetPriceOneStep2 from '@/components/task/getPrice/getPriceOneStep2'
  // import GetPriceOneStep3 from '@/components/task/getPrice/getPriceOneStep3'
  // import GetPriceOneStep4 from '@/components/task/getPrice/getPriceOneStep4'
const GetPriceOneStep1 = (resolve) => {
  import ('@/components/task/getPrice/getPriceOneStep1').then((module) => {
    resolve(module)
  })
}
const GetPriceOneStep2 = (resolve) => {
  import ('@/components/task/getPrice/getPriceOneStep2').then((module) => {
    resolve(module)
  })
}
const GetPriceOneStep3 = (resolve) => {
  import ('@/components/task/getPrice/getPriceOneStep3').then((module) => {
    resolve(module)
  })
}
const GetPriceOneStep4 = (resolve) => {
    import ('@/components/task/getPrice/getPriceOneStep4').then((module) => {
      resolve(module)
    })
  }
  /*任务二模块*/
  // import TaskTwoStep1 from '@/components/task/taskTwo/taskTwo_step1'
  // import TaskTwoStep2 from '@/components/task/taskTwo/taskTwo_step2'
const TaskTwoStep1 = (resolve) => {
  import ('@/components/task/taskTwo/taskTwo_step1').then((module) => {
    resolve(module)
  })
}
const TaskTwoStep2 = (resolve) => {
    import ('@/components/task/taskTwo/taskTwo_step2').then((module) => {
      resolve(module)
    })
  }
  /*任务二领取奖励*/
  // import GetPriceTwoStep1 from '@/components/task/getPrice2/getPrice1'
  // import GetPriceTwoStep2 from '@/components/task/getPrice2/getPrice2'
  // import GetPriceTwoStep3 from '@/components/task/getPrice2/getPrice3'
const GetPriceTwoStep1 = (resolve) => {
  import ('@/components/task/getPrice2/getPrice1').then((module) => {
    resolve(module)
  })
}
const GetPriceTwoStep2 = (resolve) => {
  import ('@/components/task/getPrice2/getPrice2').then((module) => {
    resolve(module)
  })
}
const GetPriceTwoStep3 = (resolve) => {
    import ('@/components/task/getPrice2/getPrice3').then((module) => {
      resolve(module)
    })
  }
  /*任务三模块*/
  // import TaskThreeStep1 from '@/components/task/taskThree/taskThree_step1'
  // import TaskThreeStep2 from '@/components/task/taskThree/taskThree_step2'
  // import GetPriceThreeStep1 from '@/components/task/getPrice3/getPrice1'
  // import GetPriceThreeStep2 from '@/components/task/getPrice3/getPrice2'
  // import GetPriceThreeStep3 from '@/components/task/getPrice3/getPrice3'
const TaskThreeStep1 = (resolve) => {
  import ('@/components/task/taskThree/taskThree_step1').then((module) => {
    resolve(module)
  })
}
const TaskThreeStep2 = (resolve) => {
  import ('@/components/task/taskThree/taskThree_step2').then((module) => {
    resolve(module)
  })
}
const GetPriceThreeStep1 = (resolve) => {
  import ('@/components/task/getPrice3/getPrice1').then((module) => {
    resolve(module)
  })
}
const GetPriceThreeStep2 = (resolve) => {
  import ('@/components/task/getPrice3/getPrice2').then((module) => {
    resolve(module)
  })
}
const GetPriceThreeStep3 = (resolve) => {
    import ('@/components/task/getPrice3/getPrice3').then((module) => {
      resolve(module)
    })
  }
  /*必中模块*/
  // import SureGetStep1 from '@/components/task/sureGet/getPrice1'
  // import SureGetStep2 from '@/components/task/sureGet/getPrice2'
  // import SureGetStep3 from '@/components/task/sureGet/getPrice3'
  // import SureGetStep4 from '@/components/task/sureGet/getPrice4'
const SureGetStep1 = (resolve) => {
  import ('@/components/task/sureGet/getPrice1').then((module) => {
    resolve(module)
  })
}
const SureGetStep2 = (resolve) => {
  import ('@/components/task/sureGet/getPrice2').then((module) => {
    resolve(module)
  })
}
const SureGetStep3 = (resolve) => {
  import ('@/components/task/sureGet/getPrice3').then((module) => {
    resolve(module)
  })
}
const SureGetStep4 = (resolve) => {
    import ('@/components/task/sureGet/getPrice4').then((module) => {
      resolve(module)
    })
  }
  /*未中奖补偿模块*/
  // import TaskFiveStep1 from '@/components/task/taskFive/taskFiveStep1'
  // import TaskFiveStep2 from '@/components/task/taskFive/taskFiveStep2'
const TaskFiveStep1 = (resolve) => {
  import ('@/components/task/taskFive/taskFiveStep1').then((module) => {
    resolve(module)
  })
}
const TaskFiveStep2 = (resolve) => {
    import ('@/components/task/taskFive/taskFiveStep2').then((module) => {
      resolve(module)
    })
  }
  /*预评价模块*/
  // import PreOnlyFiveStar from '@/components/preEvaluate/onlyFiveStar'
  // import PreImgKey from '@/components/preEvaluate/imgKey'
  // import PreOnlyText from '@/components/preEvaluate/onlyText'
  // import PreTextImg from '@/components/preEvaluate/textImg'
  // import PreTextKey from '@/components/preEvaluate/textKey'
const PreOnlyFiveStar = (resolve) => {
  import ('@/components/preEvaluate/onlyFiveStar').then((module) => {
    resolve(module)
  })
}
const PreImgKey = (resolve) => {
  import ('@/components/preEvaluate/imgKey').then((module) => {
    resolve(module)
  })
}
const PreOnlyText = (resolve) => {
  import ('@/components/preEvaluate/onlyText').then((module) => {
    resolve(module)
  })
}
const PreTextImg = (resolve) => {
  import ('@/components/preEvaluate/textImg').then((module) => {
    resolve(module)
  })
}
const PreTextKey = (resolve) => {
    import ('@/components/preEvaluate/textKey').then((module) => {
      resolve(module)
    })
  }
  /*评价模块*/
  // import OnlyFiveStar from '@/components/evaluate/onlyFiveStar/onlyFiveStar'
  // import OnlyFiveStar2 from '@/components/evaluate/onlyFiveStar/onlyFiveStar2'
  // import OnlyText1 from '@/components/evaluate/onlyText/onlyText1'
  // import OnlyText2 from '@/components/evaluate/onlyText/onlyText2'
  // import TextImg1 from '@/components/evaluate/textImg/textImg1'
  // import TextImg2 from '@/components/evaluate/textImg/textImg2'
  // import TextKey1 from '@/components/evaluate/textKey/textKey1'
  // import TextKey2 from '@/components/evaluate/textKey/textKey2'
const OnlyFiveStar = (resolve) => {
  import ('@/components/evaluate/onlyFiveStar/onlyFiveStar').then((module) => {
    resolve(module)
  })
}
const OnlyFiveStar2 = (resolve) => {
  import ('@/components/evaluate/onlyFiveStar/onlyFiveStar2').then((module) => {
    resolve(module)
  })
}
const OnlyText1 = (resolve) => {
  import ('@/components/evaluate/onlyText/onlyText1').then((module) => {
    resolve(module)
  })
}
const OnlyText2 = (resolve) => {
  import ('@/components/evaluate/onlyText/onlyText2').then((module) => {
    resolve(module)
  })
}
const TextImg1 = (resolve) => {
  import ('@/components/evaluate/textImg/textImg1').then((module) => {
    resolve(module)
  })
}
const TextImg2 = (resolve) => {
  import ('@/components/evaluate/textImg/textImg2').then((module) => {
    resolve(module)
  })
}
const TextKey1 = (resolve) => {
  import ('@/components/evaluate/textKey/textKey1').then((module) => {
    resolve(module)
  })
}
const TextKey2 = (resolve) => {
    import ('@/components/evaluate/textKey/textKey2').then((module) => {
      resolve(module)
    })
  }
  /*预追评模块*/
  // import PreAppendOnlyText from '@/components/preAppend/onlyText'
  // import PreAppendOnlyTextKey from '@/components/preAppend/onlyTextKey'
  // import PreAppendTextFav1 from '@/components/preAppend/textFav1'
  // import PreAppendTextFav2 from '@/components/preAppend/textFav2'
  // import PreAppendTextFavKey1 from '@/components/preAppend/textFavKey1'
  // import PreAppendTextFavKey2 from '@/components/preAppend/textFavKey2'
  // import PreAppendTextImg from '@/components/preAppend/textImg'
  // import PreAppendTextImgFav1 from '@/components/preAppend/textImgFav1'
  // import PreAppendTextImgFav2 from '@/components/preAppend/textImgFav2'
  // import PreAppendTextKeyImg from '@/components/preAppend/textKeyImg'
  // import PreAppendTextKeyImgFav1 from '@/components/preAppend/textKeyImgFav1'
  // import PreAppendTextKeyImgFav2 from '@/components/preAppend/textKeyImgFav2'
const PreAppendOnlyText = (resolve) => {
  import ('@/components/preAppend/onlyText').then((module) => {
    resolve(module)
  })
}
const PreAppendOnlyTextKey = (resolve) => {
  import ('@/components/preAppend/onlyTextKey').then((module) => {
    resolve(module)
  })
}
const PreAppendTextFav1 = (resolve) => {
  import ('@/components/preAppend/textFav1').then((module) => {
    resolve(module)
  })
}
const PreAppendTextFav2 = (resolve) => {
  import ('@/components/preAppend/textFav2').then((module) => {
    resolve(module)
  })
}
const PreAppendTextFavKey1 = (resolve) => {
  import ('@/components/preAppend/textFavKey1').then((module) => {
    resolve(module)
  })
}
const PreAppendTextFavKey2 = (resolve) => {
  import ('@/components/preAppend/textFavKey2').then((module) => {
    resolve(module)
  })
}
const PreAppendTextImg = (resolve) => {
  import ('@/components/preAppend/textImg').then((module) => {
    resolve(module)
  })
}
const PreAppendTextImgFav1 = (resolve) => {
  import ('@/components/preAppend/textImgFav1').then((module) => {
    resolve(module)
  })
}
const PreAppendTextImgFav2 = (resolve) => {
  import ('@/components/preAppend/textImgFav2').then((module) => {
    resolve(module)
  })
}
const PreAppendTextKeyImg = (resolve) => {
  import ('@/components/preAppend/textKeyImg').then((module) => {
    resolve(module)
  })
}
const PreAppendTextKeyImgFav1 = (resolve) => {
  import ('@/components/preAppend/textKeyImgFav1').then((module) => {
    resolve(module)
  })
}
const PreAppendTextKeyImgFav2 = (resolve) => {
    import ('@/components/preAppend/textKeyImgFav2').then((module) => {
      resolve(module)
    })
  }
  /*追评模块*/
  // import AppendToTaoBao1 from '@/components/append/toTaoBao1'
  // import AppendToTaoBao2 from '@/components/append/toTaoBao2'
const AppendToTaoBao1 = (resolve) => {
  import ('@/components/append/toTaoBao1').then((module) => {
    resolve(module)
  })
}
const AppendToTaoBao2 = (resolve) => {
    import ('@/components/append/toTaoBao2').then((module) => {
      resolve(module)
    })
  }
  //当点击申请白拿的时候跳转到任务界面的路由


Vue.use(Router)
const routes = [{
    path: '/',
    redirect: {
      name: 'index'
    }
  },
  {
    path: '/index',
    component: Index,
    name: 'index',
    meta: { title: '首页' }
  },
  {
    path: '/nopay',
    component: Nopay,
    name: 'nopay',
    meta: { title: '白拿' }
  },
  {
    path: '/nopay/details',
    component: Details,
    name: 'details',
    meta: { title: '白拿' }
  },
  {
    path: '/rushou',
    component: Rushou,
    name: 'rushow',
    meta: { title: '入手' }
  },
  {
    path: '/youpin',
    component: Youpin,
    name: 'youpin',
    meta: { title: '有品' }
  },
  {
    path: '/user',
    component: User,
    name: 'user',
    meta: { title: '我的', isLogin: true }
  },
  {
    path: '/user/settings',
    component: Settings,
    name: 'settings',
    meta: { title: '设置', isLogin: true },
  },
  {
    path: '/user/settings/usersex',
    component: Usersex,
    name: 'usersex',
    meta: { title: '设置性别', isLogin: true },
  },
  {
    path: '/user/settings/userAddress',
    component: UserAddress,
    name: 'userAddress',
    meta: { title: '设置地址', isLogin: true },
  },
  {
    path: '/user/settings/userQq',
    component: UserQq,
    name: 'userQq',
    meta: { title: '设置QQ', isLogin: true },
  },
  {
    path: '/user/settings/userPhone',
    component: UserPhone,
    name: 'userPhone',
    meta: { title: '更改手机号', isLogin: true },
  },
  {
    path: '/user/settings/userSafe',
    component: UserSafe,
    name: 'userSafe',
    meta: { title: '账号安全', isLogin: true },
  },
  {
    path: '/user/settings/userSafe/zhifubao',
    component: Zhifubao,
    name: 'zhifubao',
    meta: { title: '绑定支付宝', isLogin: true },
  },
  {
    path: '/user/settings/userSafe/yinHangKa',
    component: YinHangKa,
    name: 'yinHangKa',
    meta: { title: '绑定银行卡', isLogin: true },
  },
  {
    path: '/user/settings/userSafe/SetPayPwd',
    component: SetPayPwd,
    name: 'setPayPwd',
    meta: { title: '设置提现密码', isLogin: true },
  },
  {
    path: '/user/settings/userSafe/updateUserPwd',
    component: UpdateUserPwd,
    name: 'updateUserPwd',
    meta: { title: '更改登录密码', isLogin: true },
  },
  {
    path: '/user/userMoney',
    component: UserMoney,
    name: 'userMoney',
    meta: { title: '我的资金', isLogin: true },
  },
  {
    path: '/user/userCoin',
    component: UserCoin,
    name: 'userCoin',
    meta: { title: '我的金币', isLogin: true },
  },
  {
    path: '/user/buyCoin',
    component: BuyCoin,
    name: 'buyCoin',
    meta: { title: '充值金币', isLogin: true },
  },
  {
    path: '/user/exChangeCoin',
    component: ExChangeCoin,
    name: 'exChangeCoin',
    meta: { title: '兑换可提现金额', isLogin: true },
  },
  {
    path: '/user/noPayOrder',
    component: NoPayOrder,
    name: 'noPayOrder',
    meta: { title: '白拿订单', isLogin: true },
  },
  {
    path: '/user/applyCustomer',
    component: ApplyCustomer,
    name: 'applyCustomer',
    meta: { title: '申请售后', isLogin: true },
  },
  {
    path: '/user/userCoupons',
    component: UserCoupons,
    name: 'userCoupons',
    meta: { title: '我的必中券', isLogin: true },
  },
  {
    path: '/user/userMessage',
    component: UserMessage,
    name: 'userMessage',
    meta: { title: '消息中心', isLogin: true },
  },
  {
    path: '/user/userMessageInfo',
    component: UserMessageInfo,
    name: 'userMessageInfo',
    meta: { isLogin: true }
  },
  {
    path: '/user/buyPlus',
    component: BuyPlus,
    name: 'buyPlus',
    meta: { title: '充值Plus会员', isLogin: true },
  },
  {
    path: '/user/helpCenter',
    component: HelpCenter,
    name: 'helpCenter',
    meta: { title: '帮助中心' },
  },
  {
    path: '/user/userSuggest',
    component: UserSuggest,
    name: 'userSuggest',
    meta: { title: '意见反馈' },
  },
  {
    path: '/user/login',
    component: Login,
    name: 'login',
    meta: { title: '登录' },
  },
  {
    path: '/user/forgetPwd',
    component: ForgetPwd,
    name: 'forgetPwd',
    meta: { title: '忘记密码' },
  },
  {
    path: '/user/registerOne',
    component: RegisterOne,
    name: 'registerOne',
    meta: { title: '注册(1/3)' },
  },
  {
    path: '/user/registerTwo',
    component: RegisterTwo,
    name: 'registerTwo',
    meta: { title: '注册(2/3)' },
  },
  {
    path: '/user/registerThree',
    component: RegisterThree,
    name: 'registerThree',
    meta: { title: '注册(3/3)' },
  },
  {
    path: '/task/taskOne/taskOneStep1',
    component: TaskOneStep1,
    name: 'taskOneStep1',
    meta: { title: '任务一(1/2)', isLogin: true }
  },
  {
    path: '/task/taskOne/taskOneStep2',
    component: TaskOneStep2,
    name: 'taskOneStep2',
    meta: { title: '任务一(2/2)', isLogin: true }
  },
  {
    path: '/task/submitSuccess',
    component: SubmitSuccess,
    name: 'submitSuccess',
    meta: { title: '提交成功', isLogin: true }
  },
  { //任务一领奖步骤一
    path: '/task/getPrice/getPriceOneStep1',
    component: GetPriceOneStep1,
    name: 'getPriceOneStep1',
    meta: { title: '领奖(1/4)', isLogin: true }
  },
  { //任务一领奖步骤二
    path: '/task/getPrice/getPriceOneStep2',
    component: GetPriceOneStep2,
    name: 'getPriceOneStep2',
    meta: { title: '领奖(2/4)', isLogin: true }
  },
  { //任务一领奖步骤三
    path: '/task/getPrice/getPriceOneStep3',
    component: GetPriceOneStep3,
    name: 'getPriceOneStep3',
    meta: { title: '领奖(3/4)', isLogin: true }
  },
  { //任务一领奖步骤四
    path: '/task/getPrice/getPriceOneStep4',
    component: GetPriceOneStep4,
    name: 'getPriceOneStep4',
    meta: { title: '领奖(4/4)', isLogin: true }
  },
  { //任务二步骤一
    path: '/task/taskTwo/taskTwoStep1',
    component: TaskTwoStep1,
    name: 'taskTwoStep1',
    meta: { title: '任务二(1/2)', isLogin: true }
  },
  { //任务二步骤二
    path: '/task/taskTwo/taskTwoStep2',
    component: TaskTwoStep2,
    name: 'taskTwoStep2',
    meta: { title: '任务二(2/2)', isLogin: true }
  },
  { //任务二领奖步骤一
    path: '/task/getPrice2/getPrice1',
    component: GetPriceTwoStep1,
    name: 'getPriceTwoStep1',
    meta: { title: '领奖(1/3)', isLogin: true }
  },
  { //任务二领奖步骤二
    path: '/task/getPrice2/getPrice2',
    component: GetPriceTwoStep2,
    name: 'getPriceTwoStep2',
    meta: { title: '领奖(2/3)', isLogin: true }
  },
  { //任务二领奖步骤三
    path: '/task/getPrice2/getPrice3',
    component: GetPriceTwoStep3,
    name: 'getPriceTwoStep3',
    meta: { title: '领奖(3/3)', isLogin: true }
  },
  { //任务三步骤一
    path: '/task/taskThree/taskThreeStep1',
    component: TaskThreeStep1,
    name: 'taskThreeStep1',
    meta: { title: '任务三(1/2)', isLogin: true }
  },
  { //任务三步骤二
    path: '/task/taskThree/taskThreeStep2',
    component: TaskThreeStep2,
    name: 'taskThreeStep2',
    meta: { title: '任务三(2/2)', isLogin: true }
  },
  { //任务三领奖步骤一
    path: '/task/getPrice3/getPrice1',
    component: GetPriceThreeStep1,
    name: 'getPriceThreeStep1',
    meta: { title: '领奖(1/3)', isLogin: true }
  },
  { //任务三领奖步骤二
    path: '/task/getPrice3/getPrice2',
    component: GetPriceThreeStep2,
    name: 'getPriceThreeStep2',
    meta: { title: '领奖(2/3)', isLogin: true }
  },
  { //任务三领奖步骤三
    path: '/task/getPrice3/getPrice3',
    component: GetPriceThreeStep3,
    name: 'getPriceThreeStep3',
    meta: { title: '领奖(3/3)', isLogin: true }
  },
  { //必中步骤一
    path: '/task/sureGet/getPrice1',
    component: SureGetStep1,
    name: 'sureGetStep1',
    meta: { title: '领奖(1/4)', isLogin: true }
  },
  { //必中步骤二
    path: '/task/sureGet/getPrice2',
    component: SureGetStep2,
    name: 'sureGetStep2',
    meta: { title: '领奖(2/4)', isLogin: true }
  },
  { //必中步骤三
    path: '/task/sureGet/getPrice3',
    component: SureGetStep3,
    name: 'sureGetStep3',
    meta: { title: '领奖(3/4)', isLogin: true }
  },
  { //必中步骤四
    path: '/task/sureGet/getPrice4',
    component: SureGetStep4,
    name: 'sureGetStep4',
    meta: { title: '领奖(4/4)', isLogin: true }
  },
  { //未中补偿步骤一
    path: '/task/taskFive/taskFiveStep1',
    component: TaskFiveStep1,
    name: 'taskFiveStep1',
    meta: { title: '未中奖补偿(1/2)', isLogin: true }
  },
  { //未中补偿步骤二
    path: '/task/taskFive/taskFiveStep2',
    component: TaskFiveStep2,
    name: 'taskFiveStep2',
    meta: { title: '未中奖补偿(2/2)', isLogin: true }
  },
  { //预评价图+关键字
    path: '/prEvaluate/imgKey',
    component: PreImgKey,
    name: 'preImgKey',
    meta: { title: '预评价', isLogin: true }
  },
  { //预评价全五星
    path: '/prEvaluate/onlyFiveStar',
    component: PreOnlyFiveStar,
    name: 'preOnlyFiveStar',
    meta: { title: '预评价', isLogin: true }
  },
  { //预评价纯文字
    path: '/prEvaluate/onlyText',
    component: PreOnlyText,
    name: 'preOnlyText',
    meta: { title: '预评价', isLogin: true }
  },
  { //预评价图文
    path: '/prEvaluate/textImg',
    component: PreTextImg,
    name: 'preTextImg',
    meta: { title: '预评价', isLogin: true }
  },
  { //预评价文字+关键字
    path: '/prEvaluate/textKey',
    component: PreTextKey,
    name: 'preTextKey',
    meta: { title: '预评价', isLogin: true }
  },
  { //评价全五星
    path: '/evaluate/onlyFiveStar/onlyFiveStar',
    component: OnlyFiveStar,
    name: 'onlyFiveStar',
    meta: { title: '评价到淘宝(1/2)', isLogin: true }
  },
  {
    path: '/evaluate/onlyFiveStar/onlyFiveStar2',
    component: OnlyFiveStar2,
    name: 'onlyFiveStar2',
    meta: { title: '评价到淘宝(2/2)', isLogin: true }
  },
  { //评价文字+关键字
    path: '/evaluate/onlyText/onlyText1',
    component: OnlyText1,
    name: 'onlyText1',
    meta: { title: '评价到淘宝(1/2)', isLogin: true }
  },
  {
    path: '/evaluate/onlyText/onlyText2',
    component: OnlyText2,
    name: 'onlyText2',
    meta: { title: '评价到淘宝(2/2)', isLogin: true }
  },
  { //预评价文字+关键字
    path: '/evaluate/textImg/textImg1',
    component: TextImg1,
    name: 'textImg1',
    meta: { title: '评价到淘宝(1/2)', isLogin: true }
  },
  { //预评价文字+关键字
    path: '/evaluate/textImg/textImg2',
    component: TextImg2,
    name: 'textImg2',
    meta: { title: '评价到淘宝(2/2)', isLogin: true }
  },
  { //预评价文字+关键字
    path: '/evaluate/textKey/textKey1',
    component: TextKey1,
    name: 'textKey1',
    meta: { title: '评价到淘宝(1/2)', isLogin: true }
  },
  { //预评价文字+关键字
    path: '/evaluate/textKey/textKey2',
    component: TextKey2,
    name: 'textKey2',
    meta: { title: '评价到淘宝(2/2)', isLogin: true }
  },
  { //预追评纯文字
    path: '/preAppend/onlyText',
    component: PreAppendOnlyText,
    name: 'preAppendOnlyText',
    meta: { title: '预追评', isLogin: true }
  },
  { //预追评文字+关键字
    path: '/preAppend/onlyTextKey',
    component: PreAppendOnlyTextKey,
    name: 'preAppendOnlyTextKey',
    meta: { title: '预追评', isLogin: true }
  },
  { //预追评文字+收藏
    path: '/preAppend/textFav1',
    component: PreAppendTextFav1,
    name: 'preAppendTextFav1',
    meta: { title: '预追评(1/2)', isLogin: true }
  },
  { //预追评文字+收藏
    path: '/preAppend/textFav2',
    component: PreAppendTextFav2,
    name: 'preAppendTextFav2',
    meta: { title: '预追评(2/2)', isLogin: true }
  },
  { //预追评文字+关键字+收藏
    path: '/preAppend/textFavKey1',
    component: PreAppendTextFavKey1,
    name: 'preAppendTextFavKey1',
    meta: { title: '预追评(1/2)', isLogin: true }
  },
  { //预追评文字+关键字+收藏
    path: '/preAppend/textFavKey2',
    component: PreAppendTextFavKey2,
    name: 'preAppendTextFavKey2',
    meta: { title: '预追评(2/2)', isLogin: true }
  },
  { //预追评图文
    path: '/preAppend/textImg',
    component: PreAppendTextImg,
    name: 'preAppendTextImg',
    meta: { title: '预追评', isLogin: true }
  },
  { //预追评图文+收藏
    path: '/preAppend/textImgFav1',
    component: PreAppendTextImgFav1,
    name: 'preAppendTextImgFav1',
    meta: { title: '预追评(1/2)', isLogin: true }
  },
  { //预追评图文+收藏
    path: '/preAppend/textImgFav2',
    component: PreAppendTextImgFav2,
    name: 'preAppendTextImgFav2',
    meta: { title: '预追评(2/2)', isLogin: true }
  },
  { //预追评图文+关键字
    path: '/preAppend/textKeyImg',
    component: PreAppendTextKeyImg,
    name: 'preAppendTextKeyImg',
    meta: { title: '预追评', isLogin: true }
  },
  { //预追评图文+关键字+收藏
    path: '/preAppend/textKeyImgFav1',
    component: PreAppendTextKeyImgFav1,
    name: 'preAppendTextKeyImgFav1',
    meta: { title: '预追评(1/2)', isLogin: true }
  },
  { //预追评图文+关键字+收藏
    path: '/preAppend/textKeyImgFav2',
    component: PreAppendTextKeyImgFav2,
    name: 'preAppendTextKeyImgFav2',
    meta: { title: '预追评(2/2)', isLogin: true }
  },
  { //评论到淘宝
    path: '/append/toTaoBao1',
    component: AppendToTaoBao1,
    name: 'appendToTaoBao1',
    meta: { title: '追评到淘宝', isLogin: true }
  },
  { //评论到淘宝
    path: '/append/toTaoBao2',
    component: AppendToTaoBao2,
    name: 'appendToTaoBao2',
    meta: { title: '追评到淘宝', isLogin: true }
  },
]

let router = new Router({
  routes,
  mode: 'history'
})

// 设置title
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    axios.post('/api/user/loginOrNot', {}).then((res) => {
      if (res.data.code !== '200'|| !loadUserInfo()) {
        Vue.$vux.alert.show({
          title: '温馨提示',
          content: '您未登录，请登录',
          onHide() {
            router.push({ name: 'login' })
          }
        })
      } else {
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name }) : next('/') //未定义路由条状到首页
        }
        if (to.meta.title || to.params.message) {
          document.title = to.meta.title || to.params.message.title
        } else {
          document.title = 'BaoyiBao'
        }
      }
    }).catch(() => {
      Vue.$vux.alert.show({
        title: '温馨提示',
        content: '网路故障',
        onHide() {
          router.push({ name: 'index' })
        }
      })
    })
  }
  next()
})
export default router