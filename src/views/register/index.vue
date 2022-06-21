<template>
  <div class="register-container">
    <header>
      <!-- 步骤条 -->
      <Steps ref="steps" :activeStep="activeStep" @change="changeSteps" />
    </header>

    <main>
      <!-- 步骤1(组件) -->
      <StepOne v-show="activeStep === 0" :formData.sync="form" />

      <!-- 步骤2(组件) -->
      <StepTwo v-show="activeStep === 1" :formData.sync="form" />

      <!-- 步骤3(组件) -->
      <StepThree v-show="activeStep === 2" :formData.sync="form" />
    </main>

    <!-- 操作 -->
    <div class="footer">
      <div v-show="activeStep < 2" class="step-operation-box flex">
        <van-button class="btn-style" round plain @click="previous">
          上一步
        </van-button>
        <van-button class="btn-style" round type="info" @click="next">
          下一步
        </van-button>
      </div>
      <div v-show="activeStep === 2" class="flex-center">
        <van-button class="btn-back-style" round @click="$router.replace('/')"
          >立即返回</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Steps: () => import("@/components/Steps"),
    StepOne: () => import("@/views/register/components/StepOne"),
    StepTwo: () => import("@/views/register/components/StepTwo"),
    StepThree: () => import("@/views/register/components/StepThree"),
  },

  data() {
    return {
      // 当前步骤
      activeStep: 0,
      form: {
        img: "",
        gender: "",
        mail: "",
        job: "",
        title: "",
        cert: "",
        work_address: "",
        tel: "",
        location: "",
        address: "",
        name: "",
      },
      // 是否需要回填历史表单数据
      history: false,
    };
  },

  created() {
    const history = this.$route.query.history;
    this.history = history ? history : false;
    if (history) {
      this.backfillForm();
    }
  },

  methods: {
    /**
     * 回填表单信息
     */
    backfillForm() {
      const registerUserInfo = this.$store.getters.registerUserInfo;
      registerUserInfo.gender = `${registerUserInfo.gender}`;
      this.form = registerUserInfo;
    },
    /**
     * 上一步
     */
    previous() {
      this.$refs.steps.previous();
    },

    // 表单校验
    checkFormData() {
      if (this.activeStep == 0) {
        // if (!this.form.img) {
        //   this.$toast("请上传导师头像！");
        //   return false;
        // }
        if (!this.form.name) {
          this.$toast("请输入真实姓名！");
          return false;
        }
        // if (!this.form.gender) {
        //   this.$toast("请选择性别！");
        //   return false;
        // }
        if (!this.form.tel || this.form.tel.length != 11) {
          this.$toast("请输入手机号码");
          return false;
        }
        return true;
      }
      if (this.activeStep == 1) {
        // if (!this.form.cert) {
        //   this.$toast("请输入身份证号码");
        //   return false;
        // }
        // if (!this.form.mail) {
        //   this.$toast("请输入电子邮箱");
        //   return false;
        // }
        // if (!this.form.work_address) {
        //   this.$toast("请输入工作单位名称");
        //   return false;
        // }
        // if (!this.form.job) {
        //   this.$toast("请输入工作职务");
        //   return false;
        // }
        // if (!this.form.title) {
        //   this.$toast("请输入职称");
        //   return false;
        // }
        // if (!this.form.location) {
        //   this.$toast("请选择所在区域");
        //   return false;
        // }
        // if (!this.form.address) {
        //   this.$toast("请输入详细的地址信息");
        //   return false;
        // }

        return true;
      }
    },
    /**
     * 下一步
     */
    next() {
      if (this.checkFormData()) {
        const aid = this.$store.getters.associationInfo.id;
        this.form.aid = aid;
        if (this.activeStep == "1") {
          // 提交注册信息
          this.$request("instructor.instructorVerfyAdd", this.form).then(
            (res) => {
              this.$refs.steps.next();
              setTimeout(() => {
                this.$router.replace("/");
              }, 3000);
            }
          );
        } else {
          this.$refs.steps.next();
        }
      }
    },

    /**
     * 当前步骤发生改变
     */
    changeSteps(val) {
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
  header,
  main {
    padding: px(24);
    background: #ffffff;
  }

  main {
    margin-top: px(16);
    height: calc(100vh - px(310));
  }

  .footer {
    padding: 0 px(24);
    position: absolute;
    right: 0;
    bottom: px(16);
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
