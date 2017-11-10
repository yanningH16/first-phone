const Login = (resolve) => {
  import('@/components/user/login/login').then((module) => {
    resolve(module)
  })
}
const RegisterOne = (resolve) => {
  import('@/components/user/register/registerOne').then((module) => {
    resolve(module)
  })
}
const RegisterTwo = (resolve) => {
  import('@/components/user/register/registerTwo').then((module) => {
    resolve(module)
  })
}
const RegisterThree = (resolve) => {
  import('@/components/user/register/registerThree').then((module) => {
    resolve(module)
  })
}
const ForgetPwd = (resolve) => {
  import('@/components/user/forgetPwd/forgetPwd').then((module) => {
    resolve(module)
  })
}
const settings = [{
  path: '/user/login',
  component: Login,
  name: 'login',
  meta: { title: '登录' }
},
{
  path: '/user/forgetPwd',
  component: ForgetPwd,
  name: 'forgetPwd',
  meta: { title: '忘记密码' }
},
{
  path: '/user/registerOne',
  component: RegisterOne,
  name: 'registerOne',
  meta: { title: '注册(1/3)' }
},
{
  path: '/user/registerTwo',
  component: RegisterTwo,
  name: 'registerTwo',
  meta: { title: '注册(2/3)' }
},
{
  path: '/user/registerThree',
  component: RegisterThree,
  name: 'registerThree',
  meta: { title: '注册(3/3)' }
}
]
export default settings
