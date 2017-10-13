<template>
  <div id="app" @touchmove.prevent>
    <div class="container">
      <!-- <keep-alive :exclude="excludeArr">   暂时不需 -->
        <router-view></router-view>
      <!-- </keep-alive> -->
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script type="text/ecmascript-6">
import Tabbar from './base/tabbar/tabbar'
import Vue from 'vue'
import { LoadingPlugin, AlertPlugin, ConfirmPlugin,ToastPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
export default {
  name: 'app',
  components: {
    Tabbar
  },
  data(){
    return {
      excludeArr:'details,nopay'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './assets/stylus/reset.styl'
@import './assets/stylus/vux.styl'
  #app
    position fixed
    width 100%
    height 100%
    .container
      height 100%
      width 100%
      overflow hidden
</style>
