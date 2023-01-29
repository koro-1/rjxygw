import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import LunBoTu from '@/components/shouYe/lunBoTu.vue'
import xueYuanXinWen from '@/components/shouYe/xueYuanXinWen.vue'
import shuangChuangXianFeng from '@/components/shouYe/shuangChuangXianFeng.vue'
import diBuDaTu from '@/components/shouYe/diBuDaTu.vue'
import tongZhiGongGao from '@/components/tongZhiGongGao/tongZhiGongGao.vue'
import xinWenDongTai from '@/components/xinWenDongTai/xinWenDongTai.vue'
import zhengCeWenJian from '@/components/zhengCeWenJian/zhengCeWenJian.vue'
import dangJianGongZuo from '@/components/dangJianGongZuo/dangJianGongZuo.vue'
import xiaZaiZhongXin from '@/components/xiaZaiZhongXin/xiaZaiZhongXin.vue'
import xueYuanJieShao from '@/components/xueYuanGaiKuang/xueYuanJieShao.vue'
import xueYuanLingDao from '@/components/xueYuanGaiKuang/xueYuanLingDao.vue'
import banGongDianHua from '@/components/zuZhiJiGou/banGongDianHua.vue'
import jiGouSheZhi from '@/components/zuZhiJiGou/jiGouSheZhi.vue'
import buMenzhiZe from '@/components/zuZhiJiGou/buMenzhiZe.vue'
import daoShiJieShao from '@/components/shiZhiDuiWu/daoShiJieShao.vue'
import jiaoYanShiJieShao from '@/components/shiZhiDuiWu/jiaoYanShiJieShao.vue'
import shiZhiPeiXun from '@/components/shiZhiDuiWu/shiZhiPeiXun.vue'
import xueFenGuanLi from '@/components/shuangChuangJiaoYu/xueFenGuanLi.vue'
import keChengTiXi from '@/components/shuangChuangJiaoYu/keChengTiXi.vue'
import jiaoXueZhiDuGuanLi from '@/components/shuangChuangJiaoYu/jiaoXueZhiDuGuanLi.vue'
import shuangChuangXiangMu from '@/components/shuangChuangShiJian/shuangChuangXiangMu.vue'
import jingSaiHuoDong from '@/components/shuangChuangShiJian/jingSaiHuoDong.vue'
import zhongChuangKongJian from '@/components/shuangChuangShiJian/zhongChuangKongJian.vue'
import jiDiJianShe from '@/components/shuangChuangShiJian/jiDiJianShe.vue'
import daXueShengXiangMuFuHua from '@/components/shuangChuangShiJian/daXueShengXiangMuFuHua.vue'
import teSeXiangMu from '@/components/chengGuoZhanShi/teSeXiangMu.vue'
import shuangChuangBangYang from '@/components/chengGuoZhanShi/shuangChuangBangYang.vue'
import Blog from "@/components/shouYe/Blog";
import BlogDetail from "@/components/shouYe/BlogDetail";
import BlogEdit from "@/components/shouYe/BlogEdit";
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {path:'/register',component:Register},
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      // 欢迎页面的路由规则
      {
        path: '/welcome',
        component: Welcome,
      },

      // 首页的“轮播图”管理页面的路由规则
      {
        path: '/061',
        component: LunBoTu,
      },

      // 首页的“学院新闻”管理页面的路由规则
      {
        path: '/062',
        component: xueYuanXinWen,
        redirect: '/blog'
      },
      {
        path: '/blog',
        name: 'Blog',
        component: Blog
      },
      {
        path: '/blog/add',
        name: 'BlogEdit',
        component: BlogEdit,
        meta:{
          requireAuth: true
        }
      },
      {
        path: '/blog/:blogId',
        name: 'BlogDetail',
        component: BlogDetail
      },

      // 首页的“双创先锋”管理页面的路由规则
      {
        path: '/063',
        component: shuangChuangXianFeng,
      },

      // 首页的“底部大图”管理页面的路由规则
      {
        path: '/064',
        component: diBuDaTu,
      },

      // “通知公告”管理页面的路由规则
      {
        path: '/1',
        component: tongZhiGongGao,
      },

      // “新闻动态”管理页面的路由规则
      {
        path: '/2',
        component: xinWenDongTai,
      },

      // “政策文件”管理页面的路由规则
      {
        path: '/3',
        component: zhengCeWenJian,
      },

      // “党建工作”管理页面的路由规则
      {
        path: '/4',
        component: dangJianGongZuo,
      },

      // “新闻动态”管理页面的路由规则
      {
        path: '/5',
        component: xiaZaiZhongXin,
      },

      // “学院概况”管理页面的路由规则
      {
        path: '/071',
        component: xueYuanJieShao,
      },

      // “学院领导”管理页面的路由规则
      {
        path: '/072',
        component: xueYuanLingDao,
      },

      // “办公电话”管理页面的路由规则
      {
        path: '/081',
        component: banGongDianHua,
      },

      // “机构设置”管理页面的路由规则
      {
        path: '/082',
        component: jiGouSheZhi,
      },

      // “部门职责”管理页面的路由规则
      {
        path: '/083',
        component: buMenzhiZe,
      },

      // “导师介绍”管理页面的路由规则
      {
        path: '/091',
        component: daoShiJieShao,
      },

      // “教研室介绍”管理页面的路由规则
      {
        path: '/092',
        component: jiaoYanShiJieShao,
      },

      // “师资培训”管理页面的路由规则
      {
        path: '/093',
        component: shiZhiPeiXun,
      },

      // “学分管理”管理页面的路由规则
      {
        path: '/0101',
        component: xueFenGuanLi,
      },

      // “课程体系”管理页面的路由规则
      {
        path: '/0102',
        component: keChengTiXi,
      },

      // “师资培训”管理页面的路由规则
      {
        path: '/0103',
        component: jiaoXueZhiDuGuanLi,
      },

      // “双创项目”管理页面的路由规则
      {
        path: '/0111',
        component: shuangChuangXiangMu,
      },

      // “竞赛活动”管理页面的路由规则
      {
        path: '/0112',
        component: jingSaiHuoDong,
      },

      // “众创空间”管理页面的路由规则
      {
        path: '/0113',
        component: zhongChuangKongJian,
      },

      // “基地建设”管理页面的路由规则daXueShengXiangMuFuHua
      {
        path: '/0114',
        component: jiDiJianShe,
      },

      // “大学生项目孵化”管理页面的路由规则
      {
        path: '/0115',
        component: daXueShengXiangMuFuHua,
      },

      // “特色项目”管理页面的路由规则daXueShengXiangMuFuHua
      {
        path: '/0121',
        component: teSeXiangMu,
      },

      // “双创榜样”管理页面的路由规则
      {
        path: '/0122',
        component: shuangChuangBangYang,
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
