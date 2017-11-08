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
const sureGet = [{ //必中步骤一
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
]
export default sureGet