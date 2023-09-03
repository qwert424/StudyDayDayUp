const TokenKey = 'adminAuthentication'

// 获取Token
export function getToken() {
  return localStorage.getItem(TokenKey)
}

// 设置Token
export function setToken(token) {
  return localStorage.setItem(TokenKey, token);

}

// 移除Token
export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
