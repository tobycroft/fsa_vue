<template>
  <div class="active-row-container">
    <Card class="card-box-style">
      <header class="flex">
        <div class="header-left-box flex-start align-center">
          <Logo
            class="avatar-style"
            :imgUrl="
              data.instructor_info && data.instructor_info.img
                ? data.instructor_info.img
                : ''
            "
            :size="40"
            round
          />
          <p class="username-style">
            {{
              data.instructor_info && data.instructor_info.name
                ? data.instructor_info.name
                : ""
            }}
          </p>
        </div>
        <CheckDetailsBtn :label="data.host_info.name" />
      </header>

      <main>
        <p class="title-style">{{ data.title }}</p>

        <div class="tag-box">
          <Tag
            class="tag-style"
            v-for="(item, index) in data.dataunit_info"
            :key="index"
            :title="item.name"
            active
          />
        </div>

        <div class="main-status-box flex">
          <p class="time-style">{{ dateCmp }}</p>
          <p class="status-style">·{{ viewStatus }}</p>
        </div>
      </main>

      <footer class="flex">
        <div class="flex-start">
          <van-image
            class="icon-style"
            :src="require('@/assets/icon/position_icon.png')"
          ></van-image>
          <p class="text-style">{{ areaCmp }}</p>
        </div>
        <div class="flex-end">
          <van-image
            class="icon-style"
            :src="require('@/assets/icon/person_num_icon.png')"
          ></van-image>
          <p class="text-style">{{ data.visitor }}人</p>
        </div>
      </footer>
    </Card>
  </div>
</template>

<script>
import { compareDate } from "@/utils/common";

export default {
  components: {
    Card: () => import("@/components/Card"),
    Logo: () => import("@/components/Logo"),
    CheckDetailsBtn: () => import("@/components/CheckDetailsBtn"),
    Tag: () => import("@/components/Tag"),
  },
  computed: {
    // 活动日期
    dateCmp() {
      return this.$dateFormat(this.data.start_date, "UTC:yyyy-mm-dd HH:MM");
    },
    // 活动地区
    areaCmp() {
      return `${this.data.province}${this.data.city}${this.data.district}${this.data.street}`;
    },
    // 活动状态
    viewStatus() {
      // 比较当前日期是否大于活动日期
      // 当前日期>=活动日期?已提交:已备案
      return compareDate(this.data.start_date, new Date())
        ? "已提交"
        : "已备案";
    },
  },
  props: {
    data: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.active-row-container {
  .card-box-style {
    padding: px(24);
    header {
      padding-bottom: px(24);
      border-bottom: px(1) solid #eeeeee;
      .header-left-box {
        .username-style {
          margin-left: px(12);
          font-size: px(26);
          color: #666666;
        }
      }
    }

    main {
      padding: px(24) 0;
      border-bottom: px(1) solid #eeeeee;
      .title-style {
        font-size: px(36);
        font-weight: bold;
        color: #333333;
      }
      .tag-box {
        margin-top: px(12);
        .tag-style {
          margin-right: px(17);
        }
      }
      .main-status-box {
        margin-top: px(24);
        .time-style {
          font-size: px(26);
          color: #666666;
        }
        .status-style {
          font-size: px(26);
          color: #0077ff;
        }
      }
    }

    footer {
      padding: px(24) 0 0;
      .icon-style {
        width: px(22);
        height: px(27);
      }
      .text-style {
        margin-left: px(8);
        font-size: px(26);
        color: #666666;
      }
    }
  }
}
</style>
