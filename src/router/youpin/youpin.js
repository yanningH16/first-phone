const Youpin = (resolve) => {
  import('@/components/youpin/youpin').then((module) => {
    resolve(module)
  })
}
const youpin = [{
  path: '/youpin',
  component: Youpin,
  name: 'youpin',
  meta: { title: '有品' }
}]
export default youpin
