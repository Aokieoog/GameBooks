import axios from 'axios'
import util from '@/utils/util.js'
import message from '@/utils/message'
import router from '@/router'
import { ElNotification } from 'element-plus'


const requestbook = axios.create({
  // 获取环境变量中的 API 基础路径
  baseURL: import.meta.env.VITE_BASE_URLBOOK,
  timeout: 3000, // 请求超时时间
  withCredentials: true, 
})


// 请求拦截器
requestbook.interceptors.request.use(
  config => {
    // 获取 token
    let token = util.getCookie('access_tokenbook');
    // 定义不需要 token 的请求路径
    const noAuthPaths = ['/register', '/login', '/forgot-password'];
    // 检查请求路径是否在不需要 token 的列表中
    const isNoAuthPath = noAuthPaths.some(path => config.url.includes(path));
    if (!token && !isNoAuthPath) {
      // 如果没有 token 且请求路径需要权限，则跳转到登录页面
        ElNotification({
          title: 'Info',
          message: '请先登录',
          type: 'info',
          duration: 3000,
          position: 'bottom-right',
        })
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
    // if (token) {
    //   // 如果有 token，添加到请求头
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
requestbook.interceptors.response.use(
  response => {
    return response
  },
)

export default requestbook