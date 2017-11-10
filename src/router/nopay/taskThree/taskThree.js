const TaskThreeStep1 = (resolve) => {
  import('@/components/task/taskThree/taskThree_step1').then((module) => {
    resolve(module)
  })
}
const TaskThreeStep2 = (resolve) => {
  import('@/components/task/taskThree/taskThree_step2').then((module) => {
    resolve(module)
  })
}
const GetPriceThreeStep1 = (resolve) => {
  import('@/components/task/getPrice3/getPrice1').then((module) => {
    resolve(module)
  })
}
const GetPriceThreeStep2 = (resolve) => {
  import('@/components/task/getPrice3/getPrice2').then((module) => {
    resolve(module)
  })
}
const GetPriceThreeStep3 = (resolve) => {
  import('@/components/task/getPrice3/getPrice3').then((module) => {
    resolve(module)
  })
}
const taskThree = [{ // 任务三步骤一
  path: '/task/taskThree/taskThreeStep1',
  component: TaskThreeStep1,
  name: 'taskThreeStep1',
  meta: { title: '任务三(1/2)', isLogin: true }
},
{ // 任务三步骤二
  path: '/task/taskThree/taskThreeStep2',
  component: TaskThreeStep2,
  name: 'taskThreeStep2',
  meta: { title: '任务三(2/2)', isLogin: true }
},
{ // 任务三领奖步骤一
  path: '/task/getPrice3/getPrice1',
  component: GetPriceThreeStep1,
  name: 'getPriceThreeStep1',
  meta: { title: '领奖(1/3)', isLogin: true }
},
{ // 任务三领奖步骤二
  path: '/task/getPrice3/getPrice2',
  component: GetPriceThreeStep2,
  name: 'getPriceThreeStep2',
  meta: { title: '领奖(2/3)', isLogin: true }
},
{ // 任务三领奖步骤三
  path: '/task/getPrice3/getPrice3',
  component: GetPriceThreeStep3,
  name: 'getPriceThreeStep3',
  meta: { title: '领奖(3/3)', isLogin: true }
}
]
export default taskThree
