const TaskOneStep1 = (resolve) => {
  import('@/components/task/taskOne/taskOne_step1').then((module) => {
    resolve(module)
  })
}
const TaskOneStep2 = (resolve) => {
  import('@/components/task/taskOne/taskOne_step2').then((module) => {
    resolve(module)
  })
}
const GetPriceOneStep1 = (resolve) => {
  import('@/components/task/getPrice/getPriceOneStep1').then((module) => {
    resolve(module)
  })
}
const GetPriceOneStep2 = (resolve) => {
  import('@/components/task/getPrice/getPriceOneStep2').then((module) => {
    resolve(module)
  })
}
const GetPriceOneStep3 = (resolve) => {
  import('@/components/task/getPrice/getPriceOneStep3').then((module) => {
    resolve(module)
  })
}
const GetPriceOneStep4 = (resolve) => {
  import('@/components/task/getPrice/getPriceOneStep4').then((module) => {
    resolve(module)
  })
}
const taskOne = [{
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
{ // 任务一领奖步骤一
  path: '/task/getPrice/getPriceOneStep1',
  component: GetPriceOneStep1,
  name: 'getPriceOneStep1',
  meta: { title: '领奖(1/4)', isLogin: true }
},
{ // 任务一领奖步骤二
  path: '/task/getPrice/getPriceOneStep2',
  component: GetPriceOneStep2,
  name: 'getPriceOneStep2',
  meta: { title: '领奖(2/4)', isLogin: true }
},
{ // 任务一领奖步骤三
  path: '/task/getPrice/getPriceOneStep3',
  component: GetPriceOneStep3,
  name: 'getPriceOneStep3',
  meta: { title: '领奖(3/4)', isLogin: true }
},
{ // 任务一领奖步骤四
  path: '/task/getPrice/getPriceOneStep4',
  component: GetPriceOneStep4,
  name: 'getPriceOneStep4',
  meta: { title: '领奖(4/4)', isLogin: true }
}
]
export default taskOne
