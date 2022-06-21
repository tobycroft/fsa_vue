<template>
  <div
    class="card-button-container"
    :style="{ background: color }"
    @click="onClick"
  >
    <div class="title-box flex">
      <p class="title">{{ title }}</p>
      <van-image
        class="title-arrow-icon"
        :src="require('@/assets/icon/arrow_right_icon.png')"
      ></van-image>
    </div>

    <div class="describe-box flex-start">{{ describe }}</div>

    <van-image class="card-button-img" :src="imgUrl"></van-image>
  </div>
</template>

<script>
export default {
  props: {
    // 背景颜色
    color: {
      type: String,
      default: "#f0e6ec",
    },
    // 标题文本
    title: {
      type: String,
      default: "标题",
    },
    // 描述文本
    describe: {
      type: String,
      default: "描述",
    },
    // 图片地址
    imgUrl: {
      type: String,
      default: require("@/assets/images/activities_through.png"),
    },
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.card-button-container {
  padding: px(30) px(24);
  width: px(295);
  height: px(274);
  border-radius: px(16);
  border: px(1) solid #eeeeee;
  .title-box {
    .title {
      font-size: px(36);
      font-weight: bold;
    }
    .title-arrow-icon {
      width: px(32);
      height: px(32);
    }
  }
  .describe-box {
    margin-top: px(12);
    font-size: px(24);
    color: #000000;
  }
  .card-button-img {
    margin-top: px(28);
    width: px(144);
    height: px(144);
  }
}
</style>
