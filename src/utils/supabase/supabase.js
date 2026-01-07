import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, // ✅ 从环境变量读
  import.meta.env.VITE_SUPABASE_ANON_KEY, // ✅ 更安全
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      // 👇 强制本地不要用 cookie 域
      cookieOptions: {
        domain: undefined,
      },
    },
  },
);

export default supabase;
