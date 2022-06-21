<template>
  <div class="nav-card-container">
    <Card class="card-style">
      <div
        class="background-box position-full-screen"
        :style="{ background: color }"
      ></div>
      <div class="content-box position-full-screen flex">
        <p class="title-style">{{ title }}</p>
        <van-image class="img-style" :src="iconUrl"></van-image>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  components: {
    Card: () => import("@/components/Card"),
  },
  props: {
    // 文本标题
    title: {
      type: String,
      required: true,
    },
    // 背景颜色
    color: {
      type: String,
      required: true,
    },
    // 图片图标路径
    iconUrl: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-card-container {
  width: px(339);
  height: px(160);
  .card-style {
    height: 100%;
    overflow: hidden;
    position: relative;
    .background-box {
      background: red;
      opacity: 0.1;
    }
    .content-box {
      padding: 0 px(24);

      .title-style {
        font-size: px(32);
        font-weight: bold;
      }
      .img-style {
        width: px(57);
        height: px(49);
      }
    }
  }
}
</style>
