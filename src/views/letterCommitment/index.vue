<template>
  <div class="letter-commitment-container">
    <header>
      <p>检测到您上次上传的承诺书 是否再次使用</p>
    </header>

    <main>
      <van-image
        :src="require('@/assets/mock/letter_commitment.jpg')"
      ></van-image>
    </main>

    <footer class="position-block-bottom flex">
      <van-uploader>
        <van-button class="refresh-load-btn-style" block>换一张</van-button>
      </van-uploader>
      <van-button type="info" block>确认使用并返回</van-button>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.letter-commitment-container {
  padding: px(88) px(55);
  header {
    text-align: center;
    p {
      margin: px(0) auto px(64);
      width: px(432);
      font-size: px(36);
      font-weight: bold;
    }
  }

  footer {
    height: px(120);
    ::v-deep .van-uploader {
      width: 100%;
      height: 100%;
      .van-uploader__wrapper {
        width: 100%;
        height: 100%;
        .van-uploader__input-wrapper {
          width: 100%;
          height: 100%;
        }
      }
    }
    ::v-deep .van-button {
      height: 100%;
      font-weight: bold;
    }
    .refresh-load-btn-style {
      color: #2374ff;
    }
  }
}
</style>
