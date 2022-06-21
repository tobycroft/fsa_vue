// 必要依赖
import Vue from "vue";
import VueECharts from "vue-echarts";

// 手动引入 ECharts 各模块来减小打包体积
// import { use } from "echarts/core";
// import { CanvasRenderer } from "echarts/renderers";
// import { BarChart } from "echarts/charts";
// import { DataZoomComponent } from "echarts/components";
// import {
//   GridComponent,
//   TooltipComponent,
//   TitleComponent,
// } from "echarts/components";

// use([
//   CanvasRenderer,
//   BarChart,
//   GridComponent,
//   TooltipComponent,
//   TitleComponent,
//   DataZoomComponent,
// ]);

// 全量引入
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

// 全局注册组件（也可以使用局部注册）
Vue.component("v-chart", VueECharts);
