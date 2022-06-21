<template>
  <div class="register-container">
    <!-- 步骤条 -->
    <Steps ref="steps" :activeStep="activeStep" @change="changeSteps" />

    <!-- 步骤1(组件) -->
    <StepOne ref="stepOne" v-show="activeStep === 0" />

    <!-- 步骤2(组件) -->
    <selectInfo @goNext="next" @goBack="previous" v-show="activeStep === 1" />

    <!-- 步骤3(组件) -->
    <StepTwo ref="stepTwo" v-show="activeStep === 2" />

    <!-- 操作 -->

    <div class="footer">
      <div
        v-show="activeStep == 0 || activeStep == 2"
        class="step-operation-box flex"
      >
        <van-button class="btn-style" round plain @click="previous"
          >上一步</van-button
        >
        <van-button
          v-show="activeStep == 0"
          class="btn-style"
          round
          type="info"
          @click="next"
          >下一步</van-button
        >
        <van-button
          v-show="activeStep == 2"
          class="btn-style"
          round
          type="info"
          @click="handleSubmitBack"
          >完成并返回</van-button
        >
      </div>
      <!-- <div v-show="activeStep === 2" class="flex-center">
        <van-button class="btn-back-style" round>立即返回</van-button>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Steps: () => import("@/components/Steps"),
    StepOne: () => import("@/views/adminAddMainTeacher/components/StepOne"),
    StepTwo: () => import("@/views/adminAddMainTeacher/components/StepTwo"),
    StepThree: () => import("@/views/adminAddMainTeacher/components/StepThree"),
    selectInfo: () =>
      import("@/views/adminAddMainTeacher/components/selectInfo"),
  },

  data() {
    return {
      // 当前步骤
      activeStep: 0,
    };
  },

  methods: {
    async handleSubmitBack() {
      const aid = this.$store.getters.associationInfo.id;
      const data = {
        aid,
        img: this.$refs.stepOne.img,
        name: this.$refs.stepOne.userName,
        gender: this.$refs.stepOne.gender,
        tel: this.$refs.stepOne.tel,
        cert: this.$refs.stepTwo.cert,
        mail: this.$refs.stepTwo.email,
        work_address: this.$refs.stepTwo.work_address,
        job: this.$refs.stepTwo.job,
        title: this.$refs.stepTwo.title,
        location: this.$refs.stepTwo.location,
        address: this.$refs.stepTwo.address,
        mtids: "[]",
        is_admin: true,
      };
      await this.instructorAssociationAddAPI(data);
      this.$router.back();
    },
    /**
     * 添加主讲人
     */
    async instructorAssociationAddAPI(data) {
      await this.$request("instructor.instructorAssociationAdd", data);
      this.$toast.success("新增成功!");
    },
    /**
     * 上一步
     */
    previous() {
      this.$refs.steps.previous();
    },

    /**
     * 下一步
     */
    next() {
      this.$refs.steps.next();
    },

    /**
     * 当前步骤发生改变
     */
    changeSteps(val) {
      console.log("当前步骤 :>> ", val);
      this.activeStep = val;
    },

    onSubmit(values) {
      console.log("submit", values);
    },
  },
};
</script>

<style lang="scss" scoped>
.register-container {
  background: #ffffff;
  // height: 100vh;
  padding: px(24);

  .footer {
    padding: 0 px(24);
    position: absolute;
    top: calc(100vh - px(250));
    right: 0;
    left: 0;
    .step-operation-box {
      .btn-style {
        width: px(339);
        height: px(88);
      }
    }
    .btn-back-style {
      width: px(496);
      height: px(120);
      background: #ffffff;
      border: 1px solid #eeeeee;
      font-size: px(36);
      font-weight: bold;
      color: $primary-color;
    }
  }
}
</style>
