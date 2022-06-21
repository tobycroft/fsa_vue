<template>
  <div class="step-three-container">
    <div class="content-box">
      <div class="flex-center">
        <van-image
          class="img-completed"
          :src="require('@/assets/images/completed.png')"
        />
      </div>

      <p class="title-style">已提交审核</p>
      <p class="tips-style">5秒后自动返回首页</p>

      <van-button class="btn-style" round block @click="goToHome"
        >立即返回</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
    };
  },
  created() {
    this.returnsCountdown();
  },
  methods: {
    /**
     * 返回倒计时
     */
    returnsCountdown() {
      console.log("debug :>>");
      this.timer = setTimeout(() => {
        this.$router.replace({
          path: `/`,
        });
      }, 5000);
    },
    goToHome() {
      clearTimeout(this.timer);
      this.$router.replace({
        path: `/`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.step-three-container {
  text-align: center;

  .content-box {
    margin-top: px(16);
    .img-completed {
      width: px(452);
      height: px(451);
    }
    .title-style {
      margin-top: px(24);
      font-size: px(36);
      font-weight: bold;
      color: $primary-color;
    }
    .tips-style {
      margin-top: px(16);
      font-size: px(26);
      color: #cccccc;
    }

    .btn-style {
      position: absolute;
      top: px(1280);
      right: 0;
      left: 0;
      margin: 0 auto;
      width: px(496);
      height: px(120);
      font-size: px(36);
      color: #0077ff;
    }
  }
}
</style>
