<template>
  <div class="active-dynamic-details-container">
    <div class="background-box"></div>
    <div class="container">
      <div class="header flex-start">
        <div class="header-left">{{ dayCmp }}</div>
        <div class="header-right">
          <van-tag type="primary" size="large ">{{ areaCmp }}</van-tag>
          <p class="header-date-style">
            {{ yearsMonthsCmp }} {{ weekCmp }} {{ timeCmp }}
            {{ activityTimeCmp }}小时
          </p>
        </div>
      </div>
      <Card class="basic-infor-box">
        <div class="basic-info-headre">
          <p class="basic-info-title">{{ eventDetails.title }}</p>
          <div
            v-if="
              eventDetails.dataunit_info &&
              eventDetails.dataunit_info.length > 0
            "
            class="tag-box-style"
          >
            <van-tag
              class="tag-style"
              v-for="item in eventDetails.dataunit_info"
              :key="item.id"
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
              {{
                eventDetails && eventDetails.host_info
                  ? eventDetails.host_info.name
                  : ""
              }}
            </p>
          </div>
          <div v-show="false" class="basic-info-main-row flex-start">
            <p class="basic-info-main-row-label">维护方:</p>
            <p class="basic-info-main-row-value">
              {{
                lecturePermissions.name ? lecturePermissions.name : "暂无维护方"
              }}
            </p>
          </div>
        </div>
      </Card>

      <!-- 主讲人 -->
      <div class="card-box">
        <p class="card-title-style">主讲人</p>
        <Card class="card-style flex-start">
          <Avatar
            :imgUrl="
              handleImgEmptyUrl(
                eventDetails.instructor_info
                  ? eventDetails.instructor_info.img
                  : ''
              )
            "
            :width="120"
            :height="161"
          />
          <p class="username-style">
            {{
              eventDetails.instructor_info
                ? eventDetails.instructor_info.name
                : ""
            }}
          </p>
        </Card>
      </div>
      <!-- 现场照片 -->
      <div v-if="!!record2List > 0" class="card-box">
        <p class="card-title-style">现场照片</p>
        <Card class="card-style">
          <ul class="flex flex-wrap">
            <li
              v-for="(item, index) of record2List"
              :key="index"
              class="card-photo-style"
            >
              <Avatar
                v-show="record2List.length > 0"
                :imgUrl="handleImgEmptyUrl(item)"
                :width="200"
                :height="200"
              />
            </li>
          </ul>

          <NoRecord v-show="!record2List > 0" />
        </Card>
      </div>
      <!-- 举办单位反馈表&主讲人承诺书 -->
      <div v-if="eventDetails.file1" class="card-box">
        <p class="card-title-style">举办单位反馈表&主讲人承诺书</p>
        <div class="flex">
          <Card class="card-style card-style-average flex-center">
            <Avatar
              v-show="eventDetails.file1"
              class="card-photo-style"
              :imgUrl="handleImgEmptyUrl(eventDetails.file1)"
              :width="240"
              :height="340"
            />
            <NoRecord v-show="!eventDetails.file1" />
          </Card>
          <Card class="card-style card-style-average flex-center">
            <Avatar
              v-show="eventDetails.file2"
              class="card-photo-style"
              :imgUrl="handleImgEmptyUrl(eventDetails.file2)"
              :width="240"
              :height="340"
            />
            <NoRecord v-show="!eventDetails.file2" />
          </Card>
        </div>
      </div>

      <!-- 活动海报 -->
      <div v-if="eventDetails.poster_img" class="card-box">
        <p class="card-title-style">活动海报</p>
        <Card class="card-style flex-center">
          <Avatar
            v-show="eventDetails.poster_img"
            :imgUrl="handleImgEmptyUrl(eventDetails.poster_img)"
            :width="240"
            :height="340"
          />
          <NoRecord v-show="!eventDetails.poster_img" />
        </Card>
      </div>

      <!-- 听众评价 -->
      <div v-if="false" class="card-box">
        <p class="card-title-style">听众评价</p>
        <Card class="card-style">
          <ul v-show="show" class="comments-list">
            <li
              v-for="(item, index) in 6"
              :key="index"
              class="comments-item flex-start align-start"
            >
              <Logo
                :imgUrl="require('@/assets/mock/avatar_test.png')"
                :size="65"
                round
              />
              <div class="comments-info-box">
                <p class="comments-username-style">李思怡</p>
                <p class="comments-content-style">
                  这场讲座，让我了解双减之后家长应该做什么，对我帮助很大。
                </p>
              </div>
            </li>
          </ul>
          <NoRecord v-show="!show" />
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { timeConversion } from "@/utils/common";

export default {
  components: {
    Card: () => import("@/components/Card"),
    Avatar: () => import("@/components/Avatar"),
    Logo: () => import("@/components/Logo"),
    NoRecord: () => import("@/components/NoRecord"),
  },
  computed: {
    // 区域
    areaCmp() {
      return `${this.eventDetails.city}${this.eventDetails.street}`;
    },
    // 日期
    yearsMonthsCmp() {
      return this.$dateFormat(this.eventDetails.start_date, "UTC:yyyy/mm");
    },
    // 星期
    weekCmp() {
      return this.$dateFormat(this.eventDetails.start_date, "UTC:dddd");
    },
    // 日
    dayCmp() {
      return this.$dateFormat(this.eventDetails.start_date, "UTC:dd");
    },
    // 时-分
    timeCmp() {
      return this.$dateFormat(this.eventDetails.start_date, "UTC:HH:MM");
    },
    // 活动时长
    activityTimeCmp() {
      return Number(
        timeConversion(this.eventDetails.duration, "s", "h")
          .toString()
          .match(/^\d+(?:\.\d{0,2})?/)
      );
    },
  },
  data() {
    return {
      show: false,
      // 活动ID
      id: null,
      // 活动详情对象
      eventDetails: {
        instructor_info: {},
      },
      // 讲座模块-权限对象
      lecturePermissions: {},
      // 现场照片列表
      record2List: [],
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.eventDetailsAPI(this.id);
    this.lecturePermissionsAPI(this.id);
    this.lectureRecord2ListAPI(this.id);
  },
  methods: {
    /**
     * 处理图片数据为空时的图片地址
     */
    handleImgEmptyUrl(imgUrl) {
      return imgUrl ? imgUrl : "";
    },
    /**
     * 讲座模块-获取信息(活动详情)API
     */
    async eventDetailsAPI(id) {
      const data = {
        id,
      };
      const res = await this.$request("lecture.eventDetails", data);
      console.log("讲座模块-获取信息(活动详情)API_res :>> ", res);
      this.eventDetails = res;
    },
    /**
     * 讲座模块-权限API
     * @param {String} lid 讲座ID
     */
    async lecturePermissionsAPI(lid) {
      const data = {
        lid,
      };
      const res = await this.$request("lecture.lecturePermissions", data);
      console.log("讲座模块-权限API_res :>> ", res);
      this.lecturePermissions = res;
    },
    /**
     * 记录2列表API
     */
    async lectureRecord2ListAPI(lid) {
      const data = {
        lid,
      };
      const res = await this.$request("lecture.lectureRecord2List", data);
      console.log("记录2列表API_res :>> ", res);
      this.record2List = res[1];
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
        margin-left: px(12);
        .header-date-style {
          margin-top: px(7);
          font-size: px(26);
          font-weight: bold;
        }
      }
    }
    .basic-infor-box {
      padding: px(32) px(24);
      .basic-info-headre {
        padding-bottom: px(24);
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
    .card-box {
      margin-top: px(40);
      .card-title-style {
        font-size: px(36);
        font-weight: bold;
      }
      .card-style {
        margin-top: px(12);
        padding: px(24);
        .username-style {
          margin-left: px(24);
          font-size: px(40);
          font-weight: bold;
        }
        .card-photo-style {
          margin-right: px(12);
        }
      }
      .card-style-average {
        width: px(290);
      }
    }
    .comments-list {
      .comments-item {
        .comments-info-box {
          padding-bottom: px(32);
          margin: 0 0 px(32) px(16);
          border-bottom: px(1) solid #eeeeee;

          .comments-username-style {
            font-size: px(32);
            font-weight: bold;
            color: #181818;
          }
          .comments-content-style {
            margin-top: px(8);
            font-size: px(28);
          }
        }
      }
    }
  }
}
</style>
