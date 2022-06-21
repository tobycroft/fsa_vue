<template>
  <div class="speaker-information-changes-container">
    <header>
      <!-- 步骤条 -->
      <Steps ref="steps" :activeStep="activeStep" @change="changeSteps" />
    </header>
    <main>
      <!-- 步骤1(组件) -->
      <StepOne
        v-if="activeStep === 0"
        :source="instructorInfo"
        @nextStep="next"
      />

      <!-- 步骤2(组件) -->
      <StepTwo
        v-if="activeStep === 1"
        :source="instructorInfo"
        @nextStep="next"
      />

      <!-- 步骤3(组件) -->
      <StepThree v-if="activeStep === 2" />
      <!-- 操作 -->
    </main>
  </div>
</template>

<script>
export default {
  components: {
    Steps: () => import("@/components/Steps"),
    StepOne: () => import("./components/StepOne"),
    StepTwo: () => import("./components/StepTwo"),
    StepThree: () => import("./components/StepThree"),
  },

  data() {
    return {
      // 当前步骤
      activeStep: 0,
      // 讲师ID
      iid: null,
      // 工会ID
      aid: null,
      // 讲师信息
      instructorInfo: {},
    };
  },
  created() {
    const query = this.$route.query;

    this.iid = query.iid ? query.iid : this.$store.getters.accountIdInfo.iid;
    this.aid = query.aid ? query.aid : this.$store.getters.associationInfo.id;
    this.instructorVerifyById(this.iid, this.aid);
  },

  methods: {
    /**
     * 根据ID获取讲师验证详情API
     */
    async instructorVerifyById(id, aid) {
      const data = { id, aid };
      const res = await this.$request("instructor.instructorVerifyById", data);
      console.log("根据ID获取讲师验证详情API_res :>> ", res);
      this.instructorInfo = res;
    },
    /**
     * 下一步
     */
    next() {
      this.$refs.steps.next();
      this.instructorVerifyById(this.iid, this.aid);
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
.speaker-information-changes-container {
  header {
    padding: px(24);
    background: #fff;
  }

  main {
    margin-top: px(16);
    height: calc(100vh - px(255));
    background: #fff;
  }
}
</style>
