import axios from 'axios'
import router from '@/router/index.js'
import msg from '@/utils/message'
import util from '@/utils/util.js'

const requestbook = axios.create({
  // 获取环境变量中的 API 基础路径
  baseURL: import.meta.env.VITE_BASE_URLBOOK,
  timeout: 3000, // 请求超时时间
})


// 请求拦截器
requestbook.interceptors.request.use(
  config => {
    // 在这里做一些请求前的处理，例如添加 token 等
    let token = util.getCookie('access_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // 假设使用 Bearer 方式携带 token
    }
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