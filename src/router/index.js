import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'jx3home',
    meta: {
      fullPageDisplay: true,
      title: '欢迎'
    },
    component: () => import('@/views/Home/jx3home.vue')
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
    path: '/login',
    name: 'login',
    meta: {
      fullPageDisplay: true,
      title: '登录'
    },
    component: () => import('@/views/Login/login.vue')
  },
  {
    path: '/js3book',//剑三记账本
    name: 'js3book',
    meta: {
      fullPageDisplay: false, //不需要全页展示的组件
      title: '账单'
    },
    component: () => import('@/views/Js3book/js3book.vue')
  },
  {
    path: '/lineChart',
    name: 'lineChart',
    meta: {
      fullPageDisplay: false,
      title: '图表'
    },
    component: () => import('@/components/echarts/lineChart.vue')
  },
  {
    path: '/getHeatMap',
    name: 'getHeatMap',
    meta: {
      fullPageDisplay: false,
      title: '热力图'
    },
    component: () => import('@/components/echarts/getHeatMap.vue')
  },
  {
    path: '/pieLike',
    name: 'pieLike',
    meta: {
      fullPageDisplay: true,
      title: '图饼'
    },
    component: () => import('@/components/echarts/pieLike.vue')
  },
  {
    path: '/jx3user',
    name: 'jx3user',
    meta: {
      fullPageDisplay: false,
      title: 'jx3user'
    },
    component: () => import('@/views/Js3book/Jx3user.vue')
  },{
    path: '/appearance',
    name: 'appearance',
    meta: {
      fullPageDisplay: false,
      title: 'appearance'
    },
    component: () => import('@/views/Js3book/appearance.vue')
  },
  {
    path: '/Swiper',
    name: 'Swiper',
    meta: {
      fullPageDisplay: true
    },
    component: () => import('@/components/Swiper/Swiper.vue')
  },
  {
    path: '/counter',
    name: 'counter',
    meta: {
      fullPageDisplay: true
    },
    component: () => import('@/dome/counter.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

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
