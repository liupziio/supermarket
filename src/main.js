import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';


import toast from 'components/common/toast'
// import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue() //给$bus赋值一个vue实例，来充当"事件总线"

//安装toast插件
Vue.use(toast) //自定义插件，为了点击加入购物弹出toast

//使用懒加载vue插件
// Vue.use(VueLazyLoad,{
//   loading:  require('./assets/img/common/loading.png')
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



