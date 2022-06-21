<template>
  <div class="historical-event-collection-status-container">
    <div class="status-img-box">
      <van-image
        class="status-img-style"
        :src="require('@/assets/images/successful_tip.png')"
      ></van-image>
      <p class="status-text-style">提交成功</p>
    </div>

    <div class="operation-box flex">
      <van-button class="btn-style" round @click="goBack">返回</van-button>
      <van-button
        class="btn-style"
        type="info"
        round
        @click="continueToSupplementEntry"
        >继续补录</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    continueToSupplementEntry() {
      this.$router.replace({
        path: `newActivities`,
        query: {
          supplement: true,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.historical-event-collection-status-container {
  .status-img-box {
    margin: px(190) auto 0;
    text-align: center;
    .status-img-style {
      width: px(285);
      height: px(243);
    }
    .status-text-style {
      margin: px(73) 0 0;
      font-size: px(36);
      font-weight: bold;
    }
  }

  .operation-box {
    margin: px(244) 0 0 0;
    padding: 0 px(40);
    .btn-style {
      width: px(323);
      height: px(120);
      font-size: px(36);
      font-weight: bold;
    }
  }
}
</style>
