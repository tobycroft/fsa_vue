<template>
  <div class="host-edit-container">
    <van-form @submit="onSubmit">
      <AvatarUpload
        class="avatar-upload-style"
        title="点击更改单位标志"
        :src="icon"
        :defaultSrc="require('@/assets/images/avatar_default_host.png')"
        shape="square"
        @change="changeAvatar"
      />

      <CardForm class="card-form-style">
        <van-field
          v-model="name"
          name="name"
          label="名称"
          placeholder="请输入单位全称"
          :rules="[{ required: true, message: '请输入单位全称' }]"
        />
      </CardForm>

      <CardForm class="card-form-style">
        <van-field
          v-model="nickname"
          name="nickname"
          label="经办人姓名"
          placeholder="请输入经办人姓名"
          disabled
          :rules="[{ required: true, message: '请输入经办人姓名' }]"
        />
      </CardForm>

      <CardForm class="card-form-style">
        <van-field
          v-model="tel"
          name="tel"
          label="经办人手机号"
          placeholder="请输入经办人手机号"
          disabled
          :rules="[{ required: true, message: '请输入经办人手机号' }]"
        >
          <template #button>
            <div class="change-phone-btn" @click="$router.push('editPhone')">
              修改手机号
            </div>
          </template>
        </van-field>
      </CardForm>

      <CardForm class="card-form-style">
        <van-field
          v-model="student"
          name="student"
          label="学生人数"
          placeholder="请输入学生人数"
          :rules="[{ required: true, message: '请输入学生人数' }]"
        />
      </CardForm>

      <CardForm class="card-form-style">
        <van-field
          v-model="employee"
          name="employee"
          label="教职工人数"
          placeholder="请输入教职工人数"
          :rules="[{ required: true, message: '请输入教职工人数' }]"
        />
      </CardForm>

      <div class="submit-btn-box">
        <van-button
          class="submit-btn"
          round
          block
          type="info"
          native-type="submit"
        >
          修改
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  components: {
    AvatarUpload: () => import("@/components/AvatarUpload"),
    CardForm: () => import("@/components/CardForm"),
  },
  watch: {
    "$store.getters.hostMenberMe": function () {
      this.setEchoHostInfo();
    },
    "$store.getters.hostInfo": function () {
      this.setEchoHostInfo();
    },
  },
  data() {
    return {
      // 工会ID
      aid: null,
      // 主办方ID
      hid: null,
      // 头像
      icon: "",
      // 名称
      name: "",
      // 经办人姓名
      nickname: "",
      // 经办人手机号
      tel: "",
      // 学生人数
      student: "",
      // 教职工人数
      employee: "",
    };
  },
  created() {
    this.initData();
  },
  methods: {
    /**
     * 初始化数据
     */
    async initData() {
      this.aid = this.$store.getters.associationInfo.id;

      const hostMemberMe = this.$store.dispatch(
        "host/hostMemberMeAPI",
        this.aid
      );

      this.hid = this.$store.getters.hostMenberMe.hid;

      if (!hostMemberMe) {
        this.$dialog
          .alert({
            title: "暂无权限",
            message: "当前账户暂无主办方管理权限!",
          })
          .then(() => {
            this.$router.replace({
              path: `/`,
            });
          });
      }
      this.$store.dispatch("host/hostInfoGetAPI", this.hid);
      this.setEchoHostInfo();
    },
    /**
     * 设置表单回显数据
     */
    setEchoHostInfo() {
      const hostMenberMe = this.$store.getters.hostMenberMe;
      const hostInfo = this.$store.getters.hostInfo;
      console.log("设置表单回显数据 :>> ", hostMenberMe, hostInfo);
      // 头像
      this.icon = hostInfo.icon;
      // 名称
      this.name = hostInfo.name;
      // 经办人姓名
      this.nickname = hostMenberMe.name;
      // 经办人手机号
      this.tel = hostMenberMe.tel;
      // 学生人数
      this.student = hostInfo.student;
      // 教职工人数
      this.employee = hostInfo.employee;
    },
    /**
     * 获取头像图片地址
     */
    changeAvatar(val) {
      console.log("头像图片地址 :>> ", val);
      this.icon = val;
    },
    /**
     * 修改主办方信息
     * @param {Object} form 表单数据
     */
    async hostInfoEditAPI(form) {
      const data = {
        id: this.hid,
        icon: this.icon,
        name: form.name,
        info: "",
        img: "",
        employee: form.employee,
        student: form.student,
      };
      const res = this.$request("host.hostInfoEdit", data);
      console.log("修改主办方信息API_res :>> ", res);
      this.$toast("修改成功!");
    },
    /**
     * 提交
     */
    onSubmit(values) {
      console.log("submit", values);
      this.hostInfoEditAPI(values);
    },
  },
};
</script>

<style lang="scss" scoped>
.host-edit-container {
  padding: px(24);
  height: 100%;
  background: #fff;
  .avatar-upload-style {
    margin-bottom: px(48);
  }
  .card-form-style {
    margin-bottom: px(24);
    .change-phone-btn {
      font-size: px(26);
      font-weight: bold;
      color: #0077ff;
    }
  }
  .submit-btn-box {
    position: absolute;
    right: 0;
    bottom: px(16);
    left: 0;
    .submit-btn {
      margin: 0 auto;
      width: px(339);
      height: px(88);
      font-size: px(32);
      font-weight: bold;
      color: #ffffff;
    }
  }
}
</style>
