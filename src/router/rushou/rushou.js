const Rushou = (resolve) => {
  import('@/components/rushou/rushou').then((module) => {
    resolve(module)
  })
}
const rushou = [{
  path: '/rushou',
  component: Rushou,
  name: 'rushow',
  meta: { title: '入手' }
}]
export default rushou
