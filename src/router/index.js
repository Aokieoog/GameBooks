import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import util from '@/utils/util.js'
const routes = [
  {
    path: '/',
    name: 'login',
    meta: {
      fullPageDisplay: true,
      title: '登录'
    },
    component: () => import('@/views/Login/login.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    meta: {
      fullPageDisplay: true, //需要全页展示的组件
      title: '404'
    },
    component: () => import('@/views/404.vue')
  },
  {
    path: '/jx3home',
    name: 'jx3home',
    meta: {
      fullPageDisplay: true,
      title: '公告'
    },
    component: () => import('@/views/Home/jx3home.vue')
  },
  {
    path: '/js3book',//剑三记账本
    name: 'js3book',
    meta: {
      fullPageDisplay: false, //不需要全页展示的组件
      title: '剑网三交易行'
    },
    component: () => import('@/views/Js3book/js3book.vue')
  },{
    path: '/appearance',
    name: 'appearance',
    meta: {
      fullPageDisplay: false,
      title: '剑网三外观'
    },
    component: () => import('@/views/Js3book/appearance.vue')
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      fullPageDisplay: true
    },
    component: () => import('@/dome/test.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

router.beforeEach((to,from,next) => {
  let token = util.getCookie('access_tokenbook');
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !token) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
});
export default router