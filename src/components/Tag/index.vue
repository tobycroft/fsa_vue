<template>
  <div class="tag-container" :class="{ ['size-max']: bigSize, active: active }">
    <p>{{ title }}</p>
    <van-image
      v-show="close"
      class="close-btn-style"
      :src="require('@/assets/icon/close_icon.png')"
    />
  </div>
</template>

<script>
export default {
  props: {
    // 标签名称
    title: {
      type: String,
      required: true,
    },
    // 是否显示关闭按钮
    close: {
      type: Boolean,
      default: false,
    },
    // 大号按钮尺寸
    bigSize: {
      type: Boolean,
      default: false,
    },
    // 是否选中
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.tag-container {
  display: inline-block;
  padding: px(4) px(8);
  border-radius: px(8);
  font-size: px(22);
  border: px(1) dashed #cccccc;
  position: relative;
  .close-btn-style {
    width: px(24);
    height: px(24);
    position: absolute;
    top: px(-10);
    right: px(-10);
  }
}
.active {
  border: px(1) solid #c8e2ff;
  color: #0077ff;
  background: rgba($color: #c8e2ff, $alpha: 0.6);
}
.size-max {
  padding: px(16) px(24);
  font-size: px(32);
}
</style>
