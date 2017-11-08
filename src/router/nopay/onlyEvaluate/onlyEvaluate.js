  /*评价模块*/
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

const onlyEvaluate = [
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
  }
]
export default onlyEvaluate