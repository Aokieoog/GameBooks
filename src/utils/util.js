export default {
  getCookie (name) { // 在客户端中读取 Cookie 的方法
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1)
      }
    }
    return null
  },

  removeCookie (name) {
    document.cookie = name + '=; Max-Age=0; path=/';
  },

  generateToken () {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let tokens = ''
    for (let i = 0; i < 128; i++) {
      const index = Math.floor(Math.random() * chars.length)
      tokens += chars[index]
    }
    return tokens
  },

  // 格式化时间戳秒级
  formatDate (timestamp) {
    const date = new Date(timestamp);  // 将毫秒级时间戳转换为日期
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZone: 'Asia/Shanghai'  // 设置为中国时区
    };
    return date.toLocaleString('zh-CN', options)
      .replace(/\//g, '-')    // 替换 / 为 年
      .replace(/,/g, '-')     // 替换 , 为 日
      .replace(/:/g, ':');    // 替换 : 为 ：
  },

  // 定义一个函数，用于将数字转换为砖、金、银、铜的表示
  numPad (amount) {
    const units = ['砖', '金', '银', '铜'];
    const dividers = [100000000, 10000, 100, 1]; // 对应砖、金、银、铜的分隔线
    if (amount > 0) {
      let result = [];
      for (let i = 0; i < dividers.length; i++) {
        const unitValue = Math.floor(amount / dividers[i]);
        if (unitValue > 0) {
          result.push(`${unitValue}${units[i]}`);
        }
        amount %= dividers[i];
      }
      return result.join('');
    }
    if (amount < 0) {
      return `-${this.numPad(-amount)}`;
    }
  }
}