/**
 * 主办方信息相关store
 */

import request from "@/config/request";

const host = {
  namespaced: true,
  state: {
    // 主办方ID信息
    hostMenberMe: {},
    // 主办方详细信息
    hostInfo: {},
  },
  mutations: {
    // 设置主办方ID信息
    setHostMemberMe(state, hostMenberMe) {
      state.hostMenberMe = hostMenberMe;
    },
    // 设置主办方单位信息
    setHostInfo(state, hostInfo) {
      state.hostInfo = hostInfo;
    },
  },
  actions: {
    /**
     * 获取主办方ID信息
     * @param {String} aid 工会ID
     */
    async hostMemberMeAPI({ commit }, aid) {
      const data = { aid };
      const res = await request("host.hostMemberMe", data);
      commit("setHostMemberMe", res.length > 0 ? res[0] : null);
    },
    /**
     * 获取主办方单位信息
     * @param {String} hid 主办方ID
     */
    hostInfoGetAPI({ commit }, hid) {
      const data = { id: hid };
      return new Promise(async (resolve, reject) => {
        const res = await request("host.hostInfoGet", data);
        if (res) {
          commit("setHostInfo", res);
          resolve(res);
        } else {
          reject();
        }
      });
    },
  },
};

export default host;
