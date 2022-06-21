<template>
  <div class="members-audit-details-container">
    <header>
      <Card class="card-style flex-start">
        <Avatar
          :imgUrl="instructorVerify.img ? instructorVerify.img : ''"
          :width="117"
          :height="157"
        />
        <div class="content-style">
          <p class="username-style">{{ instructorVerify.name }}</p>
          <p class="userinfo-style">
            {{ genderCmp }}丨{{ instructorVerify.instructor_info.job }}丨{{
              instructorVerify.instructor_info.title
            }}
          </p>
        </div>
      </Card>
    </header>

    <main>
      <Card class="card-style">
        <p class="title">个人信息</p>
        <ul class="userinfo-list">
          <li class="userinfo-list-item flex-start">
            <p class="label">联系电话</p>
            <p class="value">{{ instructorVerify.instructor_info.tel }}</p>
          </li>
          <li class="userinfo-list-item flex-start">
            <p class="label">身份证号</p>
            <p class="value">{{ instructorVerify.instructor_info.cert }}</p>
          </li>
          <li class="userinfo-list-item flex-start">
            <p class="label">工作单位</p>
            <p class="value">
              {{ instructorVerify.instructor_info.work_address }}
            </p>
          </li>
          <li class="userinfo-list-item flex-start">
            <p class="label">职务</p>
            <p class="value">{{ instructorVerify.instructor_info.job }}</p>
          </li>
          <li class="userinfo-list-item flex-start">
            <p class="label">职称</p>
            <p class="value">{{ instructorVerify.instructor_info.title }}</p>
          </li>
          <li class="userinfo-list-item flex-start">
            <p class="label">电子邮箱</p>
            <p class="value">{{ instructorVerify.instructor_info.mail }}</p>
          </li>
          <li class="userinfo-list-item flex-start">
            <p class="label">所在区域</p>
            <p class="value">{{ instructorVerify.instructor_info.location }}</p>
          </li>
          <li class="userinfo-list-item flex-start">
            <p class="label">通讯地址</p>
            <p class="value">{{ instructorVerify.instructor_info.address }}</p>
          </li>
        </ul>
      </Card>

      <Card
        v-if="this.instructorVerify.status !== 0"
        class="card-style userinfo-status-card"
      >
        <ul class="userinfo-list">
          <li class="userinfo-list-item flex-start">
            <p class="label">审核状态</p>
            <p v-if="statusCmp" class="value value-resolve">已通过</p>
            <p v-else class="value value-resolve">已拒绝</p>
          </li>
          <li class="userinfo-list-item flex-start">
            <p class="label">审核时间</p>
            <p class="value">{{ applyTimeCmp }}</p>
          </li>
        </ul>
      </Card>
    </main>

    <footer v-if="this.instructorVerify.status === 0" class="flex-start">
      <van-button class="reject-btn-style" round @click="verifydenyAPI"
        >拒绝通过</van-button
      >
      <van-button
        class="resolve-btn-style"
        round
        type="info"
        @click="verifyApproveAPI"
        >通过</van-button
      >
    </footer>
  </div>
</template>

<script>
export default {
  components: {
    Card: () => import("@/components/Card"),
    Avatar: () => import("@/components/Avatar"),
  },
  computed: {
    // 性别
    genderCmp() {
      let genderStr = "";
      if (
        this.instructorVerify.gender === 0 ||
        this.instructorVerify.gender === "0"
      ) {
        genderStr = "女";
      }
      if (
        this.instructorVerify.gender === 1 ||
        this.instructorVerify.gender === "1"
      ) {
        genderStr = "男";
      }
      return genderStr;
    },
    // 审核状态
    statusCmp() {
      return this.instructorVerify.status === 1;
    },
    // 审核时间
    applyTimeCmp() {
      return this.$dateFormat(
        this.instructorVerify.instructor_info.date,
        "yyyy年mm月dd日 HH:MM:ss"
      );
    },
  },
  data() {
    return {
      instructorVerify: {},
      // 导师ID
      iid: null,
      // 工会ID
      aid: null,
    };
  },
  created() {
    this.iid = this.$route.query.iid;
    this.aid = this.$route.query.aid;
    console.log("this.iid :>> ", this.iid);
    this.instructorVerifyByIdAPI(this.iid, this.aid);
  },
  methods: {
    /**
     * 成员审核-通过API
     */
    async verifyApproveAPI() {
      const aid = this.$store.getters.associationInfo.id;
      const data = {
        aid,
        iid: this.iid,
        mtids: 0,
      };
      const res = await this.$request("association.verifyApprove", data);
      console.log("成员审核-通过_APIres :>> ", res);
      this.instructorVerifyByIdAPI(this.iid, this.aid);
    },
    /**
     * 成员审核-失败API
     */
    async verifydenyAPI(iid) {
      const aid = this.$store.getters.associationInfo.id;
      const data = {
        aid,
        iid: this.iid,
        mtids: 0,
      };
      const res = await this.$request("association.verifydeny", data);
      console.log("成员审核-失败API_res :>> ", res);
      this.instructorVerifyByIdAPI(this.iid, this.aid);
    },
    /**
     * 根据ID获取讲师验证详情API
     */
    async instructorVerifyByIdAPI(id, aid) {
      const data = {
        id,
        aid,
      };
      const res = await this.$request("instructor.instructorVerifyById", data);
      console.log("根据ID获取讲师验证详情API_res :>> ", res);
      this.instructorVerify = res;
    },
  },
};
</script>

<style lang="scss" scoped>
.members-audit-details-container {
  padding: px(24);
  header {
    .card-style {
      padding: px(24);
      .content-style {
        margin: 0 0 0 px(24);
        width: 100%;
        .username-style {
          font-size: px(40);
          font-weight: bold;
        }
        .userinfo-style {
          margin: px(24) 0 0;
          font-size: px(30);
          color: #999999;
        }
      }
    }
  }

  main {
    margin: px(24) 0 0;
    .card-style {
      padding: px(24);
      .title {
        font-size: px(40);
        font-weight: bold;
        color: #333333;
      }
      .userinfo-list {
        margin: px(48) 0 0;
        .userinfo-list-item {
          margin: 0 0 px(48);
          .label {
            width: px(120);
            font-size: px(30);
            color: #767676;
          }
          .value {
            margin: 0 0 0 px(82);
            font-size: px(30);
            font-weight: bold;
          }
          .value-resolve {
            color: #03c76b;
          }
        }
      }
    }
    .userinfo-status-card {
      margin: px(24) 0;
    }
  }

  footer {
    padding: px(16) px(48);
    background: #fff;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    .reject-btn-style {
      width: px(200);
      height: px(88);
      background: #ffffff;
      border: px(1) solid #eeeeee;
    }
    .resolve-btn-style {
      margin: 0 0 0 px(16);
      width: px(439);
      height: px(88);
      background: #0077ff;
    }
  }
}
</style>
