<template>
  <div class="circle-friends-marketing-editor-container">
    <div class="header-img-box">
      <van-uploader class="header-upload-style">
        <div class="header-upload-content">
          <van-image
            class="header-img-style"
            :src="require('@/assets/mock/avatar_test.png')"
          />
          <div class="header-upload-text-box position-full-screen">
            <p class="week-style">TUES</p>
            <p class="day-style">29</p>
            <p class="years-month-style">2022.03</p>
          </div>
        </div>
      </van-uploader>
    </div>
    <div class="main-box">
      <div class="flex-start">
        <div class="main-upload-box">
          <van-uploader>
            <div>
              <van-image
                class="header-img-style"
                :src="require('@/assets/mock/avatar_test.png')"
              />
            </div>
          </van-uploader>
        </div>
        <p class="main-describe-style text-box-style">
          孩子不需要惩戒，需要的是尊重和同理。被尊重和同理的孩子，自然知道对错，也能友善地对待外界
        </p>
      </div>
      <p class="username-style text-box-style">赛文奥特曼</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.circle-friends-marketing-editor-container {
  padding: px(55);
  text-align: center;

  .header-img-box {
    .header-upload-style {
      width: 100%;
      ::v-deep .van-uploader__input-wrapper {
        width: 100%;
      }
      .header-upload-content {
        position: relative;
        .header-img-style {
          width: 100%;
          height: px(360);
        }
        .header-upload-text-box {
          color: #ffffff;
          @include self-center();
          p {
            margin-bottom: px(20);
          }
          .week-style {
            padding-left: px(20);
            letter-spacing: px(20);
            font-size: px(30);
          }
          .day-style {
            font-size: px(56);
            font-weight: bold;
          }
          .years-month-style {
            font-size: px(24);
            font-weight: bold;
          }
        }
      }
    }
  }

  .main-box {
    padding: px(24);
    background: #ffffff;

    .main-upload-box {
      margin-right: px(10);
      width: px(145);
      height: px(145);
      background: #2374ff;
      flex-grow: 0;
      flex-shrink: 0;
    }
  }
  .username-style {
    margin-top: px(24);
    color: #ccc;
  }

  .text-box-style {
    display: inline-block;
    padding: px(12);
    border: 1px dotted #707070;
    text-align: left;
    font-size: px(26);
    font-weight: bold;
    line-height: px(40);
  }
}
</style>
