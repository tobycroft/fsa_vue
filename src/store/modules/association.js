/**
 * 工会模块
 */
import request from "@/config/request";

const association = {
  namespaced: true,
  state: {
    // 工会信息
    associationInfo: {},
  },
  mutations: {
    setAssociationInfo(state, associationInfo) {
      state.associationInfo = associationInfo;
    },
  },
  actions: {
    // 通过域名获取工会信息
    async associationInfoDomainAPI({ commit }) {
      const domain = window.location.hostname;
      const data = {
        // 古田
        domain:
          process.env.NODE_ENV === "development"
            ? "gutian.familyeducation.org.cn"
            : domain,

        // 福建省
        // domain:
        //   process.env.NODE_ENV === "development"
        //     ? "fujian.familyeducation.org.cn"
        //     : domain,
      };
      const res = await request("association.associationInfoDomain", data);
      commit("setAssociationInfo", res);
      return res;
    },
  },
};
export default association;
