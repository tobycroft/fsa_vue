<template>
  <div class="historical-events-collection-container">
    <Card class="card-style">
      <div class="title-box flex-start">
        <van-image
          class="title-icon-style"
          :src="require('@/assets/icon/batch_icon.png')"
        ></van-image>
        <p class="title-text-style">批量导入</p>
      </div>
      <p class="describe-style">复制链接，在电脑打开进行操作</p>
      <div class="url-box">
        <p>{{ adminUrl }}</p>
        <van-button
          class="copy-btn-style"
          type="info"
          round
          v-clipboard:copy="adminUrl"
          v-clipboard:success="onCopy"
          >复制</van-button
        >
      </div>
    </Card>

    <Card class="card-style">
      <div class="title-box flex-start">
        <van-image
          class="title-icon-style"
          :src="require('@/assets/icon/hand_icon.png')"
        ></van-image>
        <p class="title-text-style">手动导入</p>
      </div>
      <p class="describe-style">手动录入，每次只能录入一场讲座的信息</p>
      <div class="btn-box flex-center" @click="beganToEnter">
        <p class="btn-text-style">开始录入</p>
        <van-image
          class="btn-icon-style"
          :src="require('@/assets/icon/arrow_right_blue_icon.png')"
        ></van-image>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  components: {
    Card: () => import("@/components/Card"),
  },
  data() {
    return {
      adminUrl: "http://instructor.fsa.familyeducation.org.cn/",
    };
  },
  methods: {
    /**
     * 复制成功提示
     */
    onCopy: function () {
      this.$toast("成功复制到剪切板");
    },
    /**
     * 跳转到新建(补录)活动页面
     */
    beganToEnter() {
      const admin = this.$route.query.admin;
      const host = this.$route.query.host;
      if (admin) {
        this.$router.push({
          path: `/adminNewActivity`,
          query: {
            supplement: true,
          },
        });
        return;
      }

      if (host) {
        this.$router.push({
          path: `/newActivitiesHost`,
          query: {
            supplement: true,
          },
        });
        return;
      }

      this.$router.push({
        path: `/newActivities`,
        query: {
          supplement: true,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.historical-events-collection-container {
  padding: px(56) px(24);
  .card-style {
    padding: px(40) px(32) px(32);
    margin: 0 0 px(32) 0;
    .title-box {
      .title-icon-style {
        width: px(40);
        height: px(40);
      }
      .title-text-style {
        margin-left: px(10);
        font-size: px(36);
        font-weight: bold;
      }
    }
    .describe-style {
      margin: px(56) 0 0 0;
      text-align: center;
      font-size: px(30);
      color: #999;
    }
    .url-box {
      padding: px(0) px(24);
      margin: px(56) 0 0 0;
      height: px(88);
      background: #eeeeee;
      border-radius: px(44);
      position: relative;
      p {
        line-height: px(88);
      }
      .copy-btn-style {
        width: px(211);
        height: px(84);
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
      }
    }
    .btn-box {
      margin: px(56) 0 0 0;
      .btn-text-style {
        font-size: px(32);
        font-weight: bold;
        color: #0077ff;
      }
      .btn-icon-style {
        margin: 0 0 0 px(12);
        width: px(32);
        height: px(32);
      }
    }
  }
}
</style>
