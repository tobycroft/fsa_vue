<template>
  <div class="time-update-container flex-start">
    <p>数据更新于:</p>
    <p>{{ dateStrCmp }}</p>
    <p>{{ dateTimeCmp }}</p>
  </div>
</template>

<script>
import dateformat from "dateformat";

export default {
  props: {
    // 数据更新时间
    time: {
      type: Date,
      default: () => new Date(),
    },
  },
  computed: {
    // 日期字符串
    dateStrCmp() {
      return dateformat(this.time, "yyyy.mm.dd");
    },
    // 时间字符串
    dateTimeCmp() {
      return dateformat(this.time, "HH:MM:ss");
    },
  },
};
</script>

<style lang="scss" scoped>
.time-update-container {
  font-size: px(22);
  color: #cccccc;
  line-height: px(52);
  p {
    margin-left: px(10);
  }
}
</style>
