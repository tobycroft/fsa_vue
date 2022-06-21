/**
 * 全局状态管理
 */
import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import lecturer from "./modules/lecturer";
import gift from "./modules/gift";
import association from "./modules/association";
import host from "./modules/host";
import getters from "./getters";
import vuexLocal from "../config/vuexPersist";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    lecturer,
    gift,
    association,
    host,
  },
  getters,
  plugins: [vuexLocal.plugin],
});

export default store;
