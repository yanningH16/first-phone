import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import { loadUserInfo } from '../assets/js/cache'

import Index from './index/index'
import Nopay from './nopay/nopay'
import Rushou from './rushou/rushou'
import User from './user/user'
import Youpin from './youpin/youpin'

Vue.use(Router)

const defaultRouter = [{
  path: '/',
  redirect: {
    name: 'index'
  }
}]
const routes = [...defaultRouter, ...Index, ...Nopay, ...Rushou, ...Youpin, ...User]
Vue.use(Router)
let router = new Router({
    routes,
    mode: 'history'
  })
  // 设置title
router.beforeEach((to, from, next) => {
  
  if (to.meta.isLogin) {
    axios.post('/api/user/loginOrNot', {}).then((res) => {
      if (res.data.code !== '200' || !loadUserInfo()) {
        Vue.$vux.alert.show({
          title: '温馨提示',
          content: '您未登录，请登录',
          onHide() {
            router.push({ name: 'login' })
            next()
          }
        })
      } else {
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name }) : next('/') //未定义路由条状到首页
        }
        next()
      }
    }).catch(() => {
      Vue.$vux.alert.show({
        title: '温馨提示',
        content: '网路故障',
        onHide() {
          router.push({ name: 'index' })
        }
      })

    })
  } else {
    next()
  }
  if (to.meta.title || to.params.message) {
    document.title = to.meta.title || to.params.message.title
  } else {
    document.title = 'BaoyiBao'
  }
})
export default router