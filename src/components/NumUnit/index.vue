<template>
  <div class="num-unit-container flex-start align-baseline">
    <p class="num-style" :style="{ color }">{{ text }}</p>
    <p class="unit-style">{{ unit }}</p>
  </div>
</template>

<script>
export default {
  props: {
    // 数量文本色值
    color: {
      type: String,
      default: "#0077ff",
    },
    // 数量文本
    text: {
      type: Number,
      default: "0",
    },
    // 单位文本
    unit: {
      type: String,
      default: "单位",
    },
  },
};
</script>

<style lang="scss" scoped>
.num-unit-container {
  .num-style {
    font-size: px(48);
    font-weight: 800;
  }
  .unit-style {
    margin-left: px(8);
    font-size: px(24);
    color: #cccccc;
  }
}
</style>
