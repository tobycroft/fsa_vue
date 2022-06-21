<template>
  <div class="review-list-row-container">
    <Card class="card-style">
      <main class="flex-start" @click="onClick">
        <Avatar
          :imgUrl="source.img ? source.img : ''"
          :width="115"
          :height="154"
        />
        <div class="content-style">
          <div class="flex">
            <div class="flex-start">
              <p class="username-style">{{ source.name }}</p>
              <p v-if="source.instructor_info" class="job-info-style">
                {{ source.instructor_info ? source.instructor_info.job : "" }}
                <span>|</span>
                {{ source.instructor_info ? source.instructor_info.title : "" }}
              </p>
            </div>
            <van-image
              class="icon-style"
              :src="require('@/assets/icon/arrow_right_disable_icon.png')"
            ></van-image>
          </div>
          <p class="address-style">
            {{ source.instructor_info ? source.instructor_info.location : "" }}
          </p>
          <p class="fafsa-time-style">
            申请时间:
            <span class="timer-style">{{ applyTimeCmp }}</span>
          </p>
        </div>
      </main>

      <footer>
        <div v-if="showOperation" class="flex">
          <van-button class="reject-btn-style" round @click="fail"
            >拒绝通过</van-button
          >
          <van-button
            class="resovle-btn-style"
            round
            type="info"
            @click="success"
          >
            通过
          </van-button>
        </div>
        <div v-if="!showOperation" class="flex">
          <p class="audit-time-style">
            审核时间:
            <span class="time-style">{{ verifyTimeCmp }}</span>
          </p>
          <div>
            <p v-if="status" class="through-style">已通过</p>
            <p v-if="!status" class="not-through-style">未通过</p>
          </div>
        </div>
      </footer>
    </Card>
  </div>
</template>

<script>
export default {
  components: {
    Card: () => import("@/components/Card"),
    Avatar: () => import("@/components/Avatar"),
  },
  props: {
    // 是否显示操作按钮内容
    showOperation: {
      type: Boolean,
      default: false,
    },
    // 列表数据
    source: {
      type: [Array, Object],
      default: () => [],
    },
    // 通过状态
    status: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    // 申请时间
    applyTimeCmp() {
      return this.$dateFormat(this.source.date, "UTC:yyyy年mm月dd日 HH:MM:ss");
    },
    // 审核时间
    verifyTimeCmp() {
      return this.$dateFormat(
        this.source.change_date,
        "UTC:yyyy年mm月dd日 HH:MM:ss"
      );
    },
  },
  created() {
    console.log("this.source :>> ", this.source.name);
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
    fail() {
      this.$emit("fail");
    },
    success() {
      this.$emit("success");
    },
  },
};
</script>

<style lang="scss" scoped>
.review-list-row-container {
  .card-style {
    padding: px(24);
    main {
      padding: 0 0 px(24);
      border-bottom: 1px solid #eeeeee;
      .content-style {
        margin-left: px(16);
        width: 100%;
        font-size: px(24);
        color: #999999;
        .username-style {
          font-size: px(40);
          font-weight: bold;
          color: #333;
        }
        .job-info-style {
          margin: 0 0 0 px(16);
          width: px(300);
          @include text-ellipsis(1);
        }
        .icon-style {
          width: px(32);
          height: px(32);
        }
        .address-style {
          margin: px(16) 0 0;
        }
        .fafsa-time-style {
          margin: px(16) 0 0;
          .timer-style {
            margin: 0 0 0 px(6);
          }
        }
      }
    }
    footer {
      padding: px(24) 0 0;
      .reject-btn-style {
        width: px(200);
        height: px(72);
        border: 1px solid #eeeeee;
        font-size: px(30);
        color: #999999;
      }
      .resovle-btn-style {
        width: px(439);
        height: px(72);
        font-size: px(30);
        font-weight: bold;
      }
      .audit-time-style {
        font-size: px(24);
        color: #999999;
        .time-style {
          margin: 0 0 0 px(6);
        }
      }
      .through-style {
        font-size: px(30);
        color: #03c76b;
      }
      .not-through-style {
        font-size: px(30);
        color: #ea5c4c;
      }
    }
  }
}
</style>
