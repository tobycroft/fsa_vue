<template>
  <div class="avatar-container">
    <!-- <van-image :src="imgUrl" :radius="radiusCmp" /> -->
    <van-image
      :src="imgUrl"
      fit="cover"
      :style="{
        width: widthCmp + 'px',
        height: heightCmp + 'px',
      }"
      :radius="radiusCmp"
    />
  </div>
</template>

<script>
export default {
  props: {
    // 头像图片地址
    imgUrl: {
      type: String,
      required: true,
    },
    // 头像宽度
    width: {
      type: Number,
      default: 100,
    },
    // 头像高度
    height: {
      type: Number,
      default: 135,
    },
    // 圆角角度
    radius: {
      type: Number,
      default: 16,
    },
  },

  computed: {
    // 自适应宽度尺寸
    widthCmp() {
      return this.$cpx(this.width);
    },
    // 自适应高度尺寸
    heightCmp() {
      console.log("this.height :>> ", this.height);
      return this.$cpx(this.height);
    },
    // 自适应圆角尺寸
    radiusCmp() {
      return this.$cpx(this.radius);
    },
  },
};
</script>

<style lang="scss" scoped></style>
