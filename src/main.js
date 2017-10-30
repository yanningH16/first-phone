// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'
import App from './App'
import axios from 'axios'
Vue.prototype.$axios = axios

import './assets/stylus/index.styl'
Vue.filter('moneyBeautifuly', function (value) {
  return parseFloat(value)
})
Vue.use(VueLazyload, {
  // loading: '/static/images/wait.gif',
  error: '/static/images/noContainer.svg'
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app-box',
  router,
  store,
  template: '<App/>',
  components: { App }
})