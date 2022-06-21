/**
 * 公用请求
 */

import axios from "axios";
import api from "@/api";
import store from "@/store";
import { getToken } from "@/utils/auth";
import { Toast, Dialog } from "vant";
import router from "@/router";
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 10000, // 请求超时时间
  withCredentials: false, // 允许携带cookie
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    config.headers = {
      uid: store.getters.loginInfo.uid,
      token: store.getters.loginInfo.token,
      "Content-Type": "multipart/form-data",
    };
    if (getToken()) {
      config.headers.ticket = getToken();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response拦截器
service.interceptors.response.use(
  async (response) => {
    const res = response.data;
    //如果设置了不校验response，则直接返回接口结果，一般用于oss系统的接口
    if (!response.config.checkRes) {
      return res;
    }

    if (res.errorCode !== 0 && res.code !== 0) {
      // 错误
      let msg = "";
      if (res.errorInfo) {
        msg += res.errorInfo;
      }
      if (res.msg) {
        msg += res.msg;
      }

      if (res.code === "-1" || res.code === -1) {
        router.replace("/login");
      }

      //  101 越权访问，100登录过期
      if (res.code === 101 || res.code === 100) {
        await store.dispatch("user/clearUserInfo");
        await Dialog.alert({ message: msg });
        return location.reload();
      }

      if (res.code === 404) {
        return res;
      }

      Toast(res.echo);
      return Promise.reject(msg);
    } else {
      return res.data;
    }
  },
  (error) => {
    Toast.fail("网络异常");
    return Promise.reject(error);
  }
);

const request = (
  url,
  data = {},
  { method = "post", checkRes = true, urlParams = [] } = {}
) => {
  const config = {
    //请求方式
    method,
    //是否使用response拦截器
    checkRes,
  };

  //如果api[url]是function类型，则将urlParams传入获取url
  if (typeof api[url] === "function") {
    config.url = api[url](...urlParams);
  }

  //如果api[url]是string类型，则直接使用
  if (typeof api[url] === "string") {
    config.url = api[url];
  }

  if (["post", "POST", "put", "PUT"].includes(method)) {
    config.data = data;
  }

  if (["get", "GET"].includes(method)) {
    config.params = data;
  }

  return service(config);
};

export default request;
