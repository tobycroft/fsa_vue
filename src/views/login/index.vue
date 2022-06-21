<template>
  <div class="login-container">
    <van-image
      v-show="hashDomain(this.associationInfo.import_type, 'fj')"
      :src="require('@/assets/images/login_background_fj.png')"
    ></van-image>
    <van-image
      v-show="hashDomain(this.associationInfo.import_type, 'gt')"
      :src="require('@/assets/images/login_background_gt.jpg')"
    ></van-image>

    <div class="login-from-box">
      <Card class="card">
        <div class="content">
          <Logo
            :imgUrl="associationInfo.logo ? associationInfo.logo : ''"
            :size="250"
            round
            border
          />

          <p class="title">
            {{ associationInfo.name ? associationInfo.name : "暂无名称" }}
          </p>

          <van-divider class="divider">●</van-divider>

          <InputTel class="input-style" type="tel" @submit="getInputTel" />
          <InputTel type="validation" :tel="tel" @submit="getValidation" />

          <van-button class="login-btn" round type="info" @click="login"
            >立即登录</van-button
          >

          <p class="agreement">
            登录即同意
            <Link linkUrl="#;"> 用户协议</Link>
            和
            <Link linkUrl="#;">隐私政策</Link>
            首次登录将自动注册
          </p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { hashDomain } from "@/utils/common";

export default {
  components: {
    Card: () => import("@/components/Card"),
    Logo: () => import("@/components/Logo"),
    InputTel: () => import("@/components/InputTel"),
    Link: () => import("@/components/Link"),
  },

  data() {
    return {
      // 电话号码
      tel: "",
      // 验证码
      validateCode: "",
      // 当前工会信息
      associationInfo: {},
      // 动图是否加载完成
      bgLoad: false,
    };
  },

  created() {
    // 获取当前工会信息
    this.$store.dispatch("association/associationInfoDomainAPI");
    this.associationInfo = this.$store.getters.associationInfo;
  },

  methods: {
    hashDomain,

    /**
     * 获取输入的手机号数据
     */
    getInputTel(val) {
      this.tel = val;
    },

    /**
     * 获取输入的验证码数据
     */
    getValidation(val) {
      this.validateCode = val;
    },
    /**
     * 登录
     */
    async login() {
      if (this.tel === "" || this.validateCode === "") {
        this.$toast("手机号及验证码不能为空!");
        return;
      }
      if (this.tel.length != 11) {
        this.$toast("请输入正确的手机号码!");
        return;
      }

      // this.$request("login.userAuthPhone", {
      //   phone: this.tel,
      //   code: this.validateCode,
      // }).then((loginInfo) => {
      //   this.$store.commit("user/setLoginInfo", loginInfo);
      // });

      await this.$store.dispatch("user/getLoginInfo", {
        phone: this.tel,
        code: this.validateCode,
      });

      const aid = this.$store.getters.associationInfo.id;
      await this.$store.dispatch("user/getAccountIdInfo", aid);

      this.$router.replace("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  .login-from-box {
    position: absolute;
    top: px(570);
    right: 0;
    bottom: 0;
    left: 0;
    .card {
      height: 100%;
      .content {
        width: 100%;
        @include hor-center();
        top: -20%;

        .title {
          font-size: px(40);
          font-weight: bold;
        }

        .divider {
          margin: px(36) px(24);
          color: $border-color;
        }

        .input-style {
          margin-bottom: px(32);
        }

        .login-btn {
          margin-top: px(64);
          width: px(496);
          height: px(120);
          background: $primary-color;
          font-size: px(36);
        }

        .agreement {
          margin-top: px(48);
          font-size: px(24);
        }
      }
    }
  }
}
</style>
