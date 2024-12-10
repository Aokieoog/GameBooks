// import generateToken from '@/utils/http/token.js'

// const token = generateToken()
const Cookie = function (token) {
  // 登录成功后，服务器返回 Token，并将其存储在 Cookie 中
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 设置有效期
  document.cookie = `access_token=${token}; expires=${expires.toUTCString()}; path=/`
}
export default Cookie