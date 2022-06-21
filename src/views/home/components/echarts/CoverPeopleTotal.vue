<template>
  <div class="cover-people-total-container">
    <ChartCard title="覆盖总人数" class="cover-people-total-style">
      <div class="total-box flex-start align-end">
        <p class="people-num-style">{{ totalNum }}</p>
        <p class="people-unit-style">人</p>
      </div>
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
    // 总人数
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
  data() {
    return {
      // 柱状图宽度
      barWidth: 40,
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

  watch: {
    dataSource() {
      this.optionInit();
    },
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
          top: 20,
          right: 0,
          bottom: 20,
          left: 0,
        },
        xAxis: {
          axisTick: {
            show: false,
          },
          minorTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          type: "category",
          max: 7,
          data: this.xAxisData,
        },
        yAxis: {
          show: false,
        },
        dataZoom: {
          type: "inside",
        },
        series: [
          {
            type: "bar",
            barWidth: this.$cpx(this.barWidth),
            itemStyle: {
              borderRadius: 90,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#0077FF", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#BEDCFF", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            data: this.dataSource,
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.cover-people-total-container {
  .cover-people-total-style {
    margin-top: px(40);
    .total-box {
      padding-bottom: px(24);
      border-bottom: px(1) solid #eee;
      .people-num-style {
        font-size: px(72);
        font-weight: 800;
        color: $primary-color;
        line-height: px(52);
      }
      .people-unit-style {
        margin-left: px(7);
        font-size: px(24);
        color: #ccc;
      }
    }
    .chart {
      width: 100%;
      height: px(300);
    }
  }
}
</style>
