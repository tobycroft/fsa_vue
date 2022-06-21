<template>
  <div class="edit-tel-container">
    <header>
      <p class="bind-tel-title">已绑定的手机号：</p>
      <p class="bind-tel-number">
        {{ hostMenberMe.tel ? hostMenberMe.tel : "-" }}
      </p>
    </header>
    <article>
      <p class="form-title">更换的新手机号</p>
      <van-form @submit="onSubmit">
        <CardForm class="card-form-style">
          <InputTel type="tel" @submit="onChangePhone" />
        </CardForm>

        <CardForm class="card-form-style">
          <InputTel type="validation" @submit="onChangeValicode" :tel="tel" />
        </CardForm>

        <van-button
          class="submit-btn"
          round
          block
          type="info"
          native-type="submit"
        >
          确定修改并返回
        </van-button>
      </van-form>
    </article>
  </div>
</template>

<script>
export default {
  components: {
    CardForm: () => import("@/components/CardForm"),
    InputTel: () => import("@/components/InputTel"),
  },
  data() {
    return {
      hostMenberMe: {},
      // 手机号
      tel: "",
      // 验证码
      code: "",
    };
  },
  created() {
    this.initData();
  },
  methods: {
    /**
     * 初始化数据
     */
    initData() {
      this.hostMenberMe = this.$store.getters.hostMenberMe;
    },
    /**
     * 改变输入手机号
     */
    onChangePhone(val) {
      this.tel = val;
    },
    /**
     * 改变输入验证码
     */
    onChangeValicode(val) {
      this.code = val;
    },
    /**
     * 校验表单数据
     */
    handleValiDator() {
      if (this.tel === "") {
        this.$toast("请输入手机号!");
        return false;
      }
      if (this.code === "") {
        this.$toast("请输入验证码");
        return false;
      }
      return true;
    },
    /**
     * 修改主办方经办人信息
     */
    async hostMemberEditAPI() {
      const data = {
        hid: this.hostMenberMe.hid,
        nickname: this.hostMenberMe.name,
        tel: this.tel,
        code: this.code,
      };
      const res = await this.$request("host.hostMemberEdit", data);
      console.log("res :>> ", res);
      this.$toast("修改成功!");
      setTimeout(() => {
        this.$router.go(-1);
      }, 100);
    },
    onSubmit() {
      if (this.handleValiDator()) {
        console.log("submit", this.tel, this.code);
        this.hostMemberEditAPI();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-tel-container {
  height: 100%;
  background: #fff;
  header {
    padding: px(120) 0 px(120);
    background: #f7f7f7;
    text-align: center;
    .bind-tel-title {
      font-size: px(32);
      color: #999999;
    }
    .bind-tel-number {
      margin-top: px(32);
      font-size: px(56);
      font-weight: bold;
    }
  }

  article {
    margin-top: px(-20);
    padding: px(48) px(24) px(24);
    border-radius: px(40) px(40) 0 0;
    background: #fff;
    text-align: center;
    .form-title {
      margin-bottom: px(48);
      font-size: px(36);
      font-weight: bold;
    }
    .card-form-style {
      margin-bottom: px(32);
    }

    .submit-btn {
      margin: calc(px(80) - px(32)) auto 0;
      width: px(339);
      height: px(88);
      font-size: px(32);
      font-weight: bold;
      color: #ffffff;
    }
  }
}
</style>
