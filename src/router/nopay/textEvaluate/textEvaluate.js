/*预评价模块*/
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
const textEvaluate = [{ //预评价文字+关键字
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
  }
]
export default textEvaluate