<template>
  <div
    class="card-container"
    :class="{ active }"
    :style="{ borderRadius: radiusCmp + 'px' }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    // 圆角角度
    radius: {
      type: Number,
      default: 20,
    },
    // 选中状态
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    radiusCmp() {
      return this.$cpx(this.radius);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  height: auto;
  background: $card-bg-color;
}
.active {
  background: #e8f3ff;
  border-radius: px(16);
  border: px(2) solid #0077ff;
}
</style>
