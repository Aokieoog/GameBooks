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
    component: () => import('@/views/game-login/index.vue'),
  },
  {
    path: '/jx3home',
    name: 'jx3home',
    meta: {
      fullPageDisplay: true,
      title: '公告',
    },
    component: () => import('@/views/game-home/index.vue'),
  },
  {
    path: '/js3book',
    name: 'js3book',
    meta: {
      fullPageDisplay: false,
      title: '剑网三交易行',
    },
    component: () => import('@/views/game-jx3/index.vue'),
  },
  {
    path: '/appearance',
    name: 'appearance',
    meta: {
      fullPageDisplay: false,
      title: '剑网三外观',
    },
    component: () => import('@/views/game-feiniubook/index.vue'),
  },
  {
    path: '/tools',
    name: 'tools',
    meta: {
      fullPageDisplay: false,
      title: '剑网三工具箱',
    },
    component: () => import('@/views/game-jx3/components/Jx3AddFrom.vue'),
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

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  await userStore.init();
  const user = userStore.user;
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // 不需要登录的路径
  const publicPages = ['/', '/jx3home'];
  const authRequired = !publicPages.includes(to.path);

  if (user && to.path === '/') {
    return next('/js3book');
  }
  if (authRequired && !user) {
    return next({
      path: '/',
      query: { redirect: to.fullPath },
    });
  }

  next();
});

export default router;
