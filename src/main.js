// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//vuex
import store from './store/index'
Vue.config.productionTip = false
// 路由拦截
router.beforeEach((to,from,next)=>{
  if(to.meta.requiresAuth){
    if(store.getters.getIsLoginInfo.isLogin){
      next()
    }else {
      alert('请你先登录')
      next("/login")
    }
  }else {
    next()
  }	
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
