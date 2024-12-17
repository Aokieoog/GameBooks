// 导出命名函数
export const Cookie = function (token) {
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 设置有效期
  document.cookie = `access_token=${token}; expires=${expires.toUTCString()}; path=/`;
};

export const Cookiebook = function (token) {
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 设置有效期
  document.cookie = `access_tokenbook=${token}; expires=${expires.toUTCString()}; path=/`;
};