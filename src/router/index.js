import { createRouter, createWebHashHistory } from 'vue-router';
import { useUserStore } from '@/pinia/useSupaBaseUser/index';

const routes = [
  {
    path: '/',
    name: 'login',
    meta: {
      fullPageDisplay: true,
      title: '登录',
    },
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/jx3home',
    name: 'jx3home',
    meta: {
      fullPageDisplay: true,
      title: '公告',
    },
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/js3book',
    name: 'js3book',
    meta: {
      fullPageDisplay: false,
      title: '剑网三交易行',
    },
    component: () => import('@/views/Jx3Book/index.vue'),
  },
  {
    path: '/appearance',
    name: 'appearance',
    meta: {
      fullPageDisplay: false,
      title: '剑网三外观',
    },
    component: () => import('@/views/FeiNiuBook/index.vue'),
  },
  // 正确的通配 404
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: {
      fullPageDisplay: true,
      title: '404',
    },
    component: () => import('@/views/404.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 🟣 路由守卫（推荐写法）
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  await userStore.init();

  const user = userStore.user;

  // 设置标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  // 不需要登录的路径
  const publicPages = ['/', '/jx3home'];

  const authRequired = !publicPages.includes(to.path);

  // ✔ 已登录 → 尝试去登录页 → 自动跳回首页
  if (user && to.path === '/') {
    return next('/js3book');
  }
  // ✔ 需要登录但是未登录 → 跳到登录
  if (authRequired && !user) {
    return next({
      path: '/',
      query: { redirect: to.fullPath },
    });
  }

  next();
});

export default router;
