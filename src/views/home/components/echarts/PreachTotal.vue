<template>
  <div class="preach-total-container">
    <ChartCard
      title="宣讲总场次"
      iconColor="#EA5C4C"
      class="preach-total-number-style"
    >
      <ul class="tab-list flex-start">
        <li
          class="tab-item"
          :class="{ ['tab-item-active']: index === active }"
          v-for="(item, index) in tabList"
          :key="index"
          @click="changeTab(index)"
        >
          {{ item }}
        </li>
      </ul>

      <div class="content flex">
        <div class="content-left flex-start align-baseline">
          <p class="left-num-style">{{ totalNum }}</p>
          <p class="left-unit-style">场</p>
        </div>
        <div class="content-right">
          <v-chart class="chart" :init-options="initEcharts" :option="option" />
        </div>
      </div>
      <!-- <v-chart class="chart" :init-options="initEcharts" :option="option" /> -->
    </ChartCard>
  </div>
</template>

<script>
export default {
  components: {
    ChartCard: () => import("@/components/ChartCard"),
  },
  props: {
    // 总场次
    totalNum: {
      type: Number,
      default: 0,
    },
    // 图表数据
    dataSource: {
      type: Array,
      default: () => [],
    },
    // X轴标签
    xAxisData: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    dataSource() {
      this.optionInit();
    },
  },
  data() {
    return {
      // tab列表
      tabList: ["全部", "本周", "本月"],
      // 当前选中tab下标
      active: 0,

      // 柱状图宽度
      barWidth: 20,
      // 初始化对象
      initEcharts: {
        // devicePixelRatio: number, // 设备像素比，默认取浏览器的值window.devicePixelRatio。
        renderer: "canvas", // 渲染模式，支持'canvas'或者'svg'。
        useDirtyRect: true, // 是否开启脏矩形渲染，只有在 Canvas 渲染模式有效，默认为false。
        ssr: false, // 是否使用服务端渲染，只有在 SVG 渲染模式有效。开启后不再会每帧自动渲染，必须要调用 renderToSVGString 方法才能得到渲染后 SVG 字符串。
        width: "auto", // 可显式指定实例宽度，单位为像素。如果传入值为null/undefined/'auto'，则表示自动取 dom（实例容器）的宽度。
        height: "auto", // 可显式指定实例高度，单位为像素。如果传入值为null/undefined/'auto'，则表示自动取 dom（实例容器）的高度。
        locale: "ZH", // 使用的语言，内置 'ZH' 和 'EN' 两个语言，也可以使用 echarts.registerLocale 方法注册新的语言包。目前支持的语言见 src/i18n。
      },
      // echarts配置对象
      option: {},
    };
  },
  created() {
    this.optionInit();
  },
  methods: {
    /**
     * 初始化Echarts配置
     */
    optionInit() {
      this.option = {
        grid: {
          top: 0,
          right: 10,
          bottom: 20,
          left: 0,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          minorTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          data: this.xAxisData,
        },
        yAxis: {
          show: false,
          type: "value",
        },
        series: [
          {
            symbol: "none",
            data: this.dataSource,
            type: "line",
            smooth: true,
            areaStyle: {
              opacity: 0.4,
            },
            itemStyle: {
              color: "#ea5c4c",
            },
          },
        ],
      };
    },
    /**
     * 切换tab
     */
    changeTab(index) {
      this.active = index;
      this.$emit("change", this.active);
    },
  },
};
</script>

<style lang="scss" scoped>
.preach-total-container {
  .preach-total-number-style {
    .tab-list {
      .tab-item {
        margin-right: px(24);
        width: px(100);
        height: px(48);
        line-height: px(48);
        background: $input-bg-color;
        border-radius: px(26);
        font-size: px(24);
        color: $disable-color;
      }
      .tab-item-active {
        background: #ea5c4c;
        color: #ffffff;
      }
    }

    .content {
      margin-top: px(40);
      .content-left {
        .left-num-style {
          font-size: px(72);
          font-weight: 800;
          color: #ea5c4c;
        }
        .left-unit-style {
          margin-left: px(4);
          font-size: px(24);
          color: #cccccc;
        }
      }

      .content-right {
        .chart {
          width: px(427);
          height: px(220);
        }
      }
    }
  }
}
</style>
