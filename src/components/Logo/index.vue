<template>
  <div class="logo-container">
    <van-image
      :src="imgUrl"
      :class="{ border, round }"
      :style="{ width: sizeCmp + 'px', height: sizeCmp + 'px' }"
    />
  </div>
</template>

<script>
export default {
  props: {
    // logo图片地址
    imgUrl: {
      type: String,
      default: () => "",
      required: true,
    },
    // logo尺寸
    size: {
      type: Number,
      default: 80,
    },
    // 是否是圆形
    round: {
      type: Boolean,
      default: false,
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    // 自适应尺寸
    sizeCmp() {
      return this.$cpx(this.size);
    },
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
.logo-container {
  .border {
    border: px(10) solid #fff;
  }

  .round {
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
