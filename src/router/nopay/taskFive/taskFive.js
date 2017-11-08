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
const taskFive = [{ //未中补偿步骤一
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
  }
]
export default taskFive