<template>
  <div class="no-record-container">
    <van-image
      class="no-record-icon-style"
      :src="require('@/assets/images/no_record.png')"
    ></van-image>
    <p class="no-record-text">暂无记录</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.no-record-container {
  margin: 0 auto;
  text-align: center;
  .icon-style {
    width: px(285);
    height: px(243);
  }
  .no-record-text {
    margin-top: px(41);
    font-size: px(28);
    color: #cccccc;
  }
}
</style>
