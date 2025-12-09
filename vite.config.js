import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
export default () =>
  defineConfig({
    plugins: [vue()],
    envDir: path.resolve(__dirname, './env'), // 加载env环境变量
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    // 本地代理配置
    server: {
      port: 5173,
    },
  });
