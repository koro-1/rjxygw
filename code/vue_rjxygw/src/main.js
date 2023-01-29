import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

// 导入在发起请求时页面顶部进度条的包
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://106.14.29.161:8123'

// 请求拦截器
axios.interceptors.request.use((config) => {
  NProgress.start()
  return config
})

// 响应拦截器
axios.interceptors.response.use((config) => {
  NProgress.done()
  return config
})
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
