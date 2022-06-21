<template>
  <div class="area-coverage-container">
    <ChartCard title="区域覆盖率" iconColor="#03C76B">
      <v-chart class="chart" :init-options="initEcharts" :option="option" />
    </ChartCard>
  </div>
</template>

<script>
export default {
  components: {
    ChartCard: () => import("@/components/ChartCard"),
  },
  props: {
    // 图表数据
    dataSource: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    dataSource() {
      this.optionInit();
    },
  },
  data() {
    return {
      // X轴标签
      xAxisData: ["2/23", "2/24", "2/25", "2/26", "2/27", "2/28"],
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
          right: 0,
          bottom: 20,
          left: 0,
        },
        series: [
          {
            type: "gauge",
            radius: "100%",
            center: ["50%", "80%"],
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: {
              color: "#03C76B",
            },
            progress: {
              show: true,
              width: 30,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 30,
                color: [[1, "#f7f7f7"]],
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            anchor: {
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              width: this.$cpx(77),
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, "-15%"],
              fontSize: this.$cpx(64),
              fontWeight: "800",
              formatter: function (val) {
                return "{value|" + val + "} %";
              },
              rich: {
                value: {
                  fontSize: this.$cpx(64),
                  color: "#333",
                },
              },
              color: "#ccc",
              fontSize: this.$cpx(24),
            },
            data: [
              {
                value: this.dataSource,
              },
            ],
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.area-coverage-container {
  .chart {
    margin: px(-60) 0 0;
    width: 100%;
    height: px(400);
  }
}
</style>
