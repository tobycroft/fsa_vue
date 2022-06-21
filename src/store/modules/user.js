/**
 * 用户信息相关store
 */

import request from "@/config/request";

const user = {
  namespaced: true,
  state: {
    // 登录信息
    loginInfo: {
      token: null,
      uid: null,
    },
    // 当前账号绑定的各项ID信息
    accountIdInfo: {
      aid: null,
      change_date: null,
      date: null,
      id: null,
      iid: null,
      is_admin: null,
      mtids: null,
      uid: null,
    },
    // 用户注册历史表单信息
    registerUserInfo: {
      img: "",
      gender: "",
      mail: "",
      job: "",
      title: "",
      cert: "",
      work_address: "",
      tel: "",
      location: "",
      address: "",
      name: "",
    },
  },
  mutations: {
    // 设置登录信息
    setLoginInfo(state, loginInfo) {
      state.loginInfo = loginInfo;
    },
    // 设置当前账号绑定的各项ID信息
    setAccountIdInfo(state, accountIdInfo) {
      state.accountIdInfo = accountIdInfo;
    },
    // 初始化用户注册历史表单信息
    initRegisterUserInfo(state) {
      state.registerUserInfo = {
        img: "",
        gender: "",
        mail: "",
        job: "",
        title: "",
        cert: "",
        work_address: "",
        tel: "",
        location: "",
        address: "",
        name: "",
      };
    },
    // 设置用户注册历史表单信息
    setRegisterUserInfo(state, params) {
      state.registerUserInfo = params;
    },
  },
  actions: {
    async getLoginInfo({ commit }, params) {
      const res = await request("login.userAuthPhone", params);
      commit("setLoginInfo", res);
    },
    /**
     * 获取当前账号绑定的各项ID信息
     */
    async getAccountIdInfo({ commit }, aid) {
      const data = { aid };
      const res = await request("association.reqMemberMe", data);
      commit("setAccountIdInfo", res);
    },
    /**
     * 设置用户注册历史表单信息
     * @param {Object} registerHistory 用户选中的历史表单信息
     */
    setCallBackViewRegisterInfo({ commit }, registerHistory) {
      console.log("registerHistory :>> ", registerHistory);
      const params = {
        img: registerHistory.img,
        gender: registerHistory.gender,
        mail: registerHistory.verify_info
          ? registerHistory.verify_info.mail
          : "",
        job: registerHistory.verify_info ? registerHistory.verify_info.job : "",
        title: registerHistory.verify_info
          ? registerHistory.verify_info.title
          : "",
        cert: registerHistory.verify_info
          ? registerHistory.verify_info.cert
          : "",
        work_address: registerHistory.verify_info
          ? registerHistory.verify_info.work_address
          : "",
        tel: registerHistory.verify_info ? registerHistory.verify_info.tel : "",
        location: registerHistory.verify_info
          ? registerHistory.verify_info.location
          : "",
        address: registerHistory.verify_info
          ? registerHistory.verify_info.address
          : "",
        name: registerHistory.name,
      };
      commit("setRegisterUserInfo", params);
    },
  },
};

export default user;
