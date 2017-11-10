import taskOne from './taskOne/taskOne'
import taskTwo from './taskTwo/taskTwo'
import taskThree from './taskThree/taskThree'
import sureGet from './sureGet/sureGet'
import taskFive from './taskFive/taskFive'
import pre from './pre/pre'
import onlyEvaluate from './onlyEvaluate/onlyEvaluate'
import textEvaluate from './textEvaluate/textEvaluate'
import preAppend from './preAppend/preAppend'
import append from './append/append'

const Nopay = (resolve) => {
  import('@/components/nopay/nopay').then((module) => {
    resolve(module)
  })
}
const Details = (resolve) => {
  import('@/components/nopay/details/details').then((module) => {
    resolve(module)
  })
}
const SubmitSuccess = (resolve) => {
  import('@/components/task/submitSuccess').then((module) => {
    resolve(module)
  })
}
const defaultNopay = [{
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
  path: '/task/submitSuccess',
  component: SubmitSuccess,
  name: 'submitSuccess',
  meta: { title: '提交成功', isLogin: true }
}
]
const nopay = [...defaultNopay, ...taskOne, ...taskTwo, ...taskThree, ...sureGet, ...taskFive, ...pre, ...onlyEvaluate, ...textEvaluate, ...preAppend, ...append]
export default nopay
