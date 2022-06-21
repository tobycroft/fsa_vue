<template>
  <div class="chart-card-container">
    <header class="flex">
      <IconTitle :title="title" :iconColor="iconColor" />

      <TimeUpdate v-show="showTime" :time="time" />
    </header>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ChartCard",
  components: {
    IconTitle: () => import("@/components/IconTitle"),
    TimeUpdate: () => import("@/components/TimeUpdate"),
  },
  props: {
    // 标题icon的颜色
    iconColor: {
      type: String,
      default: "#0077ff",
    },
    // 标题
    title: {
      type: String,
      default: "标题",
    },
    // 是否显示时间
    showTime: {
      type: Boolean,
      default: true,
    },
    // 数据更新时间
    time: {
      type: Date,
      default: () => new Date(),
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-card-container {
  padding: px(24);
  box-shadow: 0px px(3) px(60) px(1) rgba(0, 0, 0, 0.05);
  border-radius: px(16);
  background: #fff;
  header {
    margin-bottom: px(24);
  }
}
</style>
