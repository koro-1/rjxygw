import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import BlogDetail from "@/components/BlogDetail";
import FileDownload from "@/components/FilesDownload"
Vue.use(VueRouter)

// 路由规则
const routes = [
  // 路由重定向，访问根路径自动重定向到 Home 组件
  { path: '/', redirect: '/home' },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/download',
    name: 'fileDownload',
    component: FileDownload
  }
]

const router = new VueRouter({
  routes,
})

export default router
