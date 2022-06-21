<template>
  <div class="icon-title-container flex-start">
    <i class="title-icon-style" :style="{ background: iconColor }"></i>
    <p class="title-style">{{ title }}</p>
  </div>
</template>

<script>
export default {
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
  },
};
</script>

<style lang="scss" scoped>
.icon-title-container {
  .title-icon-style {
    display: inline-block;
    width: px(8);
    height: px(20);
    border-radius: px(6);
  }
  .title-style {
    margin-left: px(8);
    font-size: px(30);
    font-weight: bold;
    line-height: px(52);
  }
}
</style>
