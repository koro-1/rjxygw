import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'mavon-editor/dist/css/index.css'
// 导入全局样式表
import '@/assets/css/global.css'
// 导入样式表
import '@/assets/fonts/iconfont.css'
import mavonEditor from 'mavon-editor'
// 导入axios
import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'http://106.14.29.161:8123'
//axios.defaults.baseURL = 'http://127.0.0.1:8082'
// 把axios这个包挂载到Vue的原型对象上，这样每个组件都可以通过this访问$http，发起请求
Vue.prototype.$http = axios
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
