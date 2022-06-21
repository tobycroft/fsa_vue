<template>
  <div class="check-details-btn-container flex-center" @click="clickBtn">
    <p class="check-details-label">{{ label }}</p>
    <div class="check-details-icon-box flex-center">
      <van-icon class="check-details-icon" name="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 标题文本
    label: {
      type: String,
      default: "查看详情",
    },
  },
  methods: {
    /**
     * 查看详情按钮点击事件
     */
    clickBtn() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.check-details-btn-container {
  .check-details-label {
    font-size: px(26);
    color: #cccccc;
  }
  .check-details-icon-box {
    margin: 0 0 0 px(8);
    width: px(32);
    height: px(32);
    border-radius: 50%;
    background: rgba($color: #333333, $alpha: 0.1);
    .check-details-icon {
      font-size: px(24);
      opacity: 0.6;
    }
  }
}
</style>
