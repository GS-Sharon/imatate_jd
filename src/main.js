import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import Axios from 'axios'
import setAxios from './setAxios'

setAxios();
// 路由守卫，通过存在token与否进行是否允许切换到有登陆权限的页面
router.beforeEach((to, from, next) => {
  // 每次切换路由或者是刷新都会进入路由守卫
  // 因为刷新的时候vuex会丢失数据，所以vuex要重新记录token
  store.state.token = window.localStorage.token;
  if(to.meta.needLogin) {
    // 如果存在token 
    if(store.state.token) {
      next();
    } else {
      router.replace({path: '/login',query:{redirect: to.fullPath}});
    }
  } else {
    next();
  }
})
Vue.config.productionTip = false
// 引入axios
Vue.prototype.$http = Axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
