import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//导入element
import ElementUI from 'element-ui'
//导入element  css
import 'element-ui/lib/theme-chalk/index.css'



// 注册element
Vue.use(ElementUI)
import router from '@/router/index.js'
import store from '@/store/index.js'
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
