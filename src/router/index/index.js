const Index = (resolve) => {
  import ('@/components/index/index').then((module) => {
    resolve(module)
  })
}
const index = [{
  path: '/index',
  component: Index,
  name: 'index',
  meta: { title: '首页' }
}]
export default index