import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default () =>  defineConfig({
  plugins: [vue()],
  envDir: path.resolve(__dirname, './env'),// 加载env环境变量
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // 代理配置
  server: {
    port: 5173,
    proxy: {
      '/dev': {
        target: "https://jx3api.btcsg.top", //目标url
        changeOrigin: true, //支持跨域
        //重写路径,替换/dev
        rewrite: (path) => path.replace(/^\/dev/, '') // 重写路径，替换 /dev
      },
      '/api': {
        target: "http://localhost:3000", //目标url
        changeOrigin: true, //支持跨域
        //重写路径,替换/dev
        rewrite: (path) => path.replace(/^\/api/, '') 
      },
    }
  }
})