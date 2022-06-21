<template>
  <div class="activity-posters-container">
    <div class="card-box">
      <p class="card-title-style">活动海报</p>
      <Card class="card-style">
        <div class="edit-poster-box flex-center" @click="showPopup = true">
          <p v-if="posterImgUrl === ''" class="text-style">编辑海报</p>
          <van-image v-else :src="posterImgUrl"></van-image>
        </div>
      </Card>
    </div>
    <van-popup
      class="van-popup-style"
      v-model="showPopup"
      round
      position="bottom"
    >
      <van-cell
        class="van-cell-style"
        title="预览"
        is-link
        @click="onPreview"
      />
      <van-cell
        class="van-cell-style"
        title="编辑"
        is-link
        @click="onEditPoster"
      />
    </van-popup>
    <van-image-preview
      v-model="showPreview"
      :images="[posterImgUrl]"
      :showIndex="false"
    >
    </van-image-preview>
  </div>
</template>

<script>
export default {
  components: {
    Card: () => import("@/components/Card"),
  },
  props: {
    // 海报图片地址
    posterImgUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      lid: "",
      showPopup: false,
      showPreview: false,
    };
  },
  created() {
    this.lid = this.$route.query.id;
  },
  methods: {
    onHidenPopup() {
      this.showPopup = false;
    },
    onPreview() {
      this.showPreview = true;
      this.onHidenPopup();
    },
    onEditPoster() {
      this.$router.push({
        path: `/editPoster`,
        query: {
          lid: this.lid,
          type: this.$route.query.type,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.activity-posters-container {
  .card-box {
    margin-top: px(40);
    .card-title-style {
      font-size: px(36);
      font-weight: bold;
    }
    .card-style {
      margin-top: px(12);
      padding: px(24);
      .edit-poster-box {
        margin: 0 auto;
        width: px(240);
        height: px(340);
        background: #f7f7f7;
        border-radius: px(16);
        border: px(1) solid #eeeeee;
        .text-style {
          font-size: px(36);
          font-weight: bold;
          color: #cccccc;
        }
      }
    }
  }

  .van-popup-style {
    padding: 0 0 px(20);
    .van-cell-style {
      text-align: center;
      font-size: px(40);
      ::v-deep {
        .van-cell__title {
          line-height: px(70);
        }
        .van-cell__right-icon {
          display: none;
        }
      }
    }
  }
}
</style>
