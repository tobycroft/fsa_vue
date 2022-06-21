import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueClipboard from "vue-clipboard2";
import Vant from "vant";
import "vant/lib/index.css";
import "@/config/echarts";
import { Table, TableColumn, Upload } from "element-ui";
// import "default-passive-events";
import "element-ui/lib/theme-chalk/index.css";

// 导入mockjs
import "@/mock";

//引入全局常量
import "@/config/constant";

//引入路由守卫
import "@/router/permission"; // permission control

Vue.config.productionTip = false;

Vue.use(Vant);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Upload);

Vue.use(VueClipboard);

const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.vm = vm;
