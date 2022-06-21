/**
 * 讲师信息相关store
 */

import request from "@/config/request";

const lecturer = {
  namespaced: true,
  state: {
    lecturerInfo: {},
  },
  mutations: {
    setLecturerInfo(state, lecturerInfo) {
      state.lecturerInfo = lecturerInfo;
    },
  },
  actions: {
    // 获取讲师信息
    getLecturerInfo({ commit, dispatch, state }, aid) {
      const data = { aid };
      return new Promise(async (resolve, reject) => {
        let lecturerInfo = await request("instructor.instructorMyInfo", data);

        if (lecturerInfo) {
          commit("setLecturerInfo", lecturerInfo);
          resolve(lecturerInfo);
        } else {
          reject();
        }
      });
    },
  },
};

export default lecturer;
