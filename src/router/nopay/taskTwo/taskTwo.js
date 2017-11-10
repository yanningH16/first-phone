const TaskTwoStep1 = (resolve) => {
  import('@/components/task/taskTwo/taskTwo_step1').then((module) => {
    resolve(module)
  })
}
const TaskTwoStep2 = (resolve) => {
  import('@/components/task/taskTwo/taskTwo_step2').then((module) => {
    resolve(module)
  })
}
const GetPriceTwoStep1 = (resolve) => {
  import('@/components/task/getPrice2/getPrice1').then((module) => {
    resolve(module)
  })
}
const GetPriceTwoStep2 = (resolve) => {
  import('@/components/task/getPrice2/getPrice2').then((module) => {
    resolve(module)
  })
}
const GetPriceTwoStep3 = (resolve) => {
  import('@/components/task/getPrice2/getPrice3').then((module) => {
    resolve(module)
  })
}
const taskTwo = [{ // 任务二步骤一
  path: '/task/taskTwo/taskTwoStep1',
  component: TaskTwoStep1,
  name: 'taskTwoStep1',
  meta: { title: '任务二(1/2)', isLogin: true }
},
{ // 任务二步骤二
  path: '/task/taskTwo/taskTwoStep2',
  component: TaskTwoStep2,
  name: 'taskTwoStep2',
  meta: { title: '任务二(2/2)', isLogin: true }
},
{ // 任务二领奖步骤一
  path: '/task/getPrice2/getPrice1',
  component: GetPriceTwoStep1,
  name: 'getPriceTwoStep1',
  meta: { title: '领奖(1/3)', isLogin: true }
},
{ // 任务二领奖步骤二
  path: '/task/getPrice2/getPrice2',
  component: GetPriceTwoStep2,
  name: 'getPriceTwoStep2',
  meta: { title: '领奖(2/3)', isLogin: true }
},
{ // 任务二领奖步骤三
  path: '/task/getPrice2/getPrice3',
  component: GetPriceTwoStep3,
  name: 'getPriceTwoStep3',
  meta: { title: '领奖(3/3)', isLogin: true }
}
]
export default taskTwo
