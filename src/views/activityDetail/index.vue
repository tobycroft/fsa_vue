<template>
  <div class="active-dynamic-details-container">
    <div class="background-box"></div>
    <div class="container">
      <div class="header flex-start">
        <div class="header-left">{{ dateFormat }}</div>
        <div class="header-right">
          <van-tag type="primary" size="large "
            >{{ activityInfo.city }}{{ activityInfo.district
            }}{{ activityInfo.street }}</van-tag
          >
          <p class="header-date-style">
            {{ ymFormat }}
            {{ weekFormat }}
            {{ activityInfo.duration / 3600 }}小时
          </p>
        </div>
        <van-button
          class="delete-btn-style"
          size="small"
          round
          @click="onDelete"
        >
          <van-image
            class="delete-icon-style"
            :src="require('@/assets/icon/delete_icon.png')"
          />
          删除
        </van-button>
      </div>
      <Card class="basic-infor-box">
        <div class="basic-info-headre">
          <p class="basic-info-title">{{ activityInfo.title }}</p>
          <div class="tag-box-style">
            <van-tag
              class="tag-style"
              v-for="(item, index) in activityInfo.tag_info"
              :key="index"
              type="primary"
              size="medium"
              >{{ item.name }}</van-tag
            >
          </div>
        </div>
        <div class="basic-info-main">
          <div class="basic-info-main-row flex-start">
            <p class="basic-info-main-row-label">举办单位:</p>
            <p class="basic-info-main-row-value">
              {{ activityInfo.host_info ? activityInfo.host_info.name : "" }}
            </p>
          </div>
        </div>
      </Card>

      <!-- 现场记录 -->
      <Record
        :activityId="$route.query.id"
        :activityVisitor="`${activityInfo.visitor}`"
        @confirm="onConfirmRecord"
      />

      <!-- 举办单位反馈表&主讲人承诺书 -->
      <Certificate
        :activityId="$route.query.id"
        :file1="activityInfo.file1"
        :file2="activityInfo.file2"
      />

      <!-- 活动海报 -->
      <ActivityPosters :posterImgUrl="activityInfo.poster_img" />

      <!--  TODO: 听众评价 -->
      <AudienceEvaluation :list="rateList" class="audience-evaluation-style" />
    </div>

    <!--  二维码-延后 -->
    <van-button
      class="footer-btn-style"
      type="info"
      size="large"
      block
      @click="onQRCode"
    >
      签到二维码
    </van-button>
  </div>
</template>

<script>
export default {
  components: {
    Card: () => import("@/components/Card"),
    Avatar: () => import("@/components/Avatar"),
    Logo: () => import("@/components/Logo"),
    NoRecord: () => import("@/components/NoRecord"),
    Record: () => import("./components/Record"),
    Certificate: () => import("./components/Certificate"),
    ActivityPosters: () => import("./components/ActivityPosters"),
    AudienceEvaluation: () => import("./components/AudienceEvaluation"),
  },
  computed: {
    dateFormat() {
      if (this.activityInfo.start_date) {
        return this.$dateFormat(this.activityInfo.start_date, "UTC:dd");
      } else {
        return "";
      }
    },
    ymFormat() {
      if (this.activityInfo.start_date) {
        return this.$dateFormat(this.activityInfo.start_date, "UTC:yyyy/MM");
      } else {
        return "";
      }
    },
    weekFormat() {
      if (this.activityInfo.start_date) {
        return this.$dateFormat(this.activityInfo.start_date, "UTC:ddd");
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      activityInfo: {},
      show: false,
      // 活动ID
      lid: "",
      // 评价列表
      rateList: [],
    };
  },
  created() {
    this.lid = this.$route.query.id;
    this.getActivityInfo(this.lid);
    this.rateIndexListAPI(this.lid);
  },
  methods: {
    getActivityInfo(lid) {
      this.$request("lecture.eventDetails", { id: lid }).then((info) => {
        this.activityInfo = info;
      });
    },
    onDelete() {
      console.log("delete :>>");
      this.$dialog
        .confirm({
          title: "",
          message: "您将删除该活动信息，是否继续？",
          confirmButtonColor: "#2374FF",
          cancelButtonColor: "#999999",
        })
        .then(() => {
          const aid = this.$store.getters.associationInfo.id;
          const apiUrl =
            this.$route.query.type === "host"
              ? "lecture.lectureDelHost"
              : "lecture.lectureDelInstructor";

          this.$request(apiUrl, {
            id: this.activityInfo.id,
            is_del: 1,
            aid,
          }).then((res) => {
            this.$router.back();
          });
        })
        .catch(() => {
          console.log("取消删除 :>>");
        });
    },
    onQRCode() {
      this.$router.push({
        path: `/newActivitiesQRCode`,
        query: {
          aid: this.activityInfo.aid,
          hid: this.activityInfo.hid,
          lid: this.activityInfo.id,
        },
      });
    },

    /**
     * 查看他人的评价API
     * @param {String} lid 活动ID
     */
    async rateIndexListAPI(lid) {
      const data = {
        lid: lid,
      };
      const res = await this.$request("rate.rateIndexList", data);
      console.log("查看他人的评价API_res :>> ", res);
      this.rateList = res;
    },

    onConfirmRecord(val) {
      this.handleLectureEditPersonNum(val);
    },

    /**
     * 设置学员人数
     * @param {Number} visitor 要设置的人数
     */
    async handleLectureEditPersonNum(visitor) {
      const apiUrl =
        this.$route.query.type === "host"
          ? "lecture.lectureEditHost"
          : "lecture.lectureEditInstructor";
      const activityInfoNew = Object.assign(this.activityInfo);
      for (const key in activityInfoNew) {
        if (Array.isArray(activityInfoNew[key])) {
          activityInfoNew[key] = JSON.stringify(activityInfoNew[key]);
          console.log("activityInfoNew[key] :>> ", activityInfoNew[key]);
        }
      }
      const data = activityInfoNew;
      data.visitor = visitor;
      data.tag_ids = data.tag_ids;
      data.tag_dataunit_ids = data.tag_dataunit_ids;
      const res = await this.$request(apiUrl, data);
      console.log("res :>> ", res);
      this.getActivityInfo(this.lid);
    },
  },
};
</script>

<style lang="scss" scoped>
.active-dynamic-details-container {
  position: relative;
  .background-box {
    height: px(340);
    background: linear-gradient(180deg, #0077ff 0%, #f7f7f7 100%);
    opacity: 0.6;
  }
  .container {
    padding: px(40) px(24);
    height: 340px;
    border-radius: 0px 0px 0px 0px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .header {
      .header-left {
        font-size: px(120);
        font-weight: bold;
        color: $primary-color;
        opacity: 1;
      }
      .header-right {
        position: relative;
        margin-left: px(12);
        .header-date-style {
          margin-top: px(7);
          font-size: px(26);
          font-weight: bold;
        }
      }
      .delete-btn-style {
        position: absolute;
        top: px(96);
        right: px(24);
        .delete-icon-style {
          width: px(22);
          height: px(22);
        }
      }
    }
    .basic-infor-box {
      padding: px(32) px(24);
      .basic-info-headre {
        padding-bottom: px(32);
        border-bottom: px(1) solid #eeeeee;
        .basic-info-title {
          font-size: px(40);
          font-weight: bold;
        }
        .tag-box-style {
          margin-top: px(24);
          .tag-style {
            margin-right: px(9);
          }
        }
      }
      .basic-info-main {
        .basic-info-main-row {
          padding-top: px(24);
          .basic-info-main-row-label {
            font-size: px(30);
          }
          .basic-info-main-row-value {
            margin-left: px(10);
            font-size: px(30);
            font-weight: bold;
          }
        }
      }
    }
    .audience-evaluation-style {
      padding-bottom: px(249);
    }
  }

  .footer-btn-style {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
