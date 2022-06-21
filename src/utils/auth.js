/**
 *  和鉴权相关的方法
 */

// import Cookies from 'js-cookie'

import store from "@/store";

const TokenKey = "Token";

export function getToken() {
  const token = store.getters.loginInfo.token;
  return token;
}

export function setToken(token) {
  localStorage[TokenKey] = token;
}

export function removeToken() {
  // Cookies.remove(TokenKey)
  delete localStorage[TokenKey];
}
