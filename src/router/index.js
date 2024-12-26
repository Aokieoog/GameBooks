import { createRouter, createWebHistory } from 'vue-router'
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
  history: createWebHistory(),
  routes: routes
})
router.beforeEach((to) => {
  // 根据路由的 meta 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

// 请求接口获取动态路由配置
// async function getRoutesFromApi() {
//   const response = await axios.get('/api/routes')
//   return response.data
// }

// 初始化应用时动态添加路由
// async function initApp() {
//   const dynamicRoutes = await getRoutesFromApi()
//   dynamicRoutes.forEach(route => {
//     router.addRoute(route)
//   })
// }

// initApp()

// router.beforeEach((to, from, next) => {
//   let token = util.getCookie('access_token')
//   document.title = to.meta.title
//   if (!token && to.meta.fullPageDisplay == false) {
//     next({ path: '/' })
//   } else {
//     next()
//   }
// })
export default router
