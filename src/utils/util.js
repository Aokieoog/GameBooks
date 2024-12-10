export default {
  getCookie(name) { // 在客户端中读取 Cookie 的方法
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1)
      }
    }
    return null
  },

  removeCookie(name) {
    document.cookie = name + '=; Max-Age=0; path=/';
  },
  
  generateToken() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let tokens = ''
    for (let i = 0; i < 128; i++) {
      const index = Math.floor(Math.random() * chars.length)
      tokens += chars[index]
    }
    return tokens
  }
}