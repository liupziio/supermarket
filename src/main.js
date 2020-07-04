import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false

Vue.prototype.$bus = new Vue() //给$bus赋值一个vue实例，来充当"事件总线"

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')



