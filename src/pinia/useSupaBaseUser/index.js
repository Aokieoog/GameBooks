// 用户状态管理（避免每次路由都调用 getUser）
// 会保存 supabase 的 session 和 user

import { defineStore } from 'pinia';
import supabase from '@/utils/SupaBase/supabase';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    session: null,
    loaded: false, // 是否已初始化完成
  }),

  actions: {
    // 初始化：从 supabase 获取当前 session
    async init() {
      if (this.loaded) return;

      const { data } = await supabase.auth.getSession();
      this.session = data.session;
      this.user = data.session?.user || null;
      this.loaded = true;

      // 监听登录状态变化
      supabase.auth.onAuthStateChange((event, session) => {
        this.session = session;
        this.user = session?.user || null;
      });
    },
  },
});
