// 导出命名函数
export const Cookie = function (token) {
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 设置有效期
  document.cookie = `access_token=${token}; expires=${expires.toUTCString()}; path=/`;
};

export const Cookiebook = function (name,data) {
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 设置有效期
  document.cookie = `${name}=${data};domain=${import.meta.env.VITE_COOKIE_URL}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=None`;
};