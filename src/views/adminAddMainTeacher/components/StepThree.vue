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
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.step-three-container {
  text-align: center;

  .content-box {
    margin-top: px(80);
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
  }
}
</style>
