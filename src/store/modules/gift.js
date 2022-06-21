/**
 * 礼包模块
 */

const gift = {
  namespaced: true,
  state: {
    // 选中礼包列表
    giftActiveList: [],
  },
  mutations: {
    // 初始化-选中礼包列表
    initGiftActiveList(state) {
      state.giftActiveList = [];
    },
    setGiftActiveList(state, giftList) {
      state.giftActiveList = giftList;
    },
  },
  actions: {
    // 添加-选中礼包列表数据项
    addGiftActiveList({ commit, state }, gift) {
      const newGiftList = state.giftActiveList.slice();
      console.log("newGiftList :>> ", newGiftList);
      console.log("gift :>> ", gift);
      for (const item of newGiftList) {
        if (item.id === gift.id) {
          return;
        }
      }
      newGiftList.push(gift);
      commit("setGiftActiveList", newGiftList);
    },
    // 移除-选中礼包列表数据项
    removeGiftActiveList({ commit, state }, gift) {
      const newGiftList = state.giftActiveList.slice();
      for (const key in newGiftList) {
        if (newGiftList[key].id === gift.id) {
          newGiftList.splice(key, 1);
        }
      }
      commit("setGiftActiveList", newGiftList);
    },
  },
};

export default gift;
