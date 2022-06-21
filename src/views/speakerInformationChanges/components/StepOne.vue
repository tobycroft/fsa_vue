<template>
  <div class="step-one-container">
    <div class="form-style">
      <van-form @submit="onSubmit">
        <!-- 头像 -->
        <AvatarUpload
          :src="avatarUrl"
          class="form-item"
          @change="changeAvatarUpload"
        />

        <!-- 用户名 -->
        <CardForm class="form-item">
          <van-field
            v-model="userName"
            name="userName"
            label="用户名"
            placeholder="请输入真实姓名"
          />
        </CardForm>

        <!-- 性别 -->
        <CardForm class="form-item">
          <van-field name="radio" label="性别">
            <template #input>
              <van-radio-group v-model="gender" direction="horizontal">
                <van-radio name="1">男</van-radio>
                <van-radio name="0">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </CardForm>

        <!-- 电子邮件 -->
        <CardForm class="form-item">
          <van-field
            v-model="email"
            name="email"
            label="电子邮件"
            placeholder="请输入邮箱地址"
          />
        </CardForm>

        <!-- 职务 -->
        <CardForm class="form-item">
          <van-field
            v-model="jobTitle"
            name="jobTitle"
            label="职务"
            placeholder="请输入职务"
          />
        </CardForm>
        <!-- 职称 -->
        <CardForm class="form-item">
          <van-field
            v-model="jobTerm"
            name="jobTerm"
            label="职称"
            placeholder="请输入职称"
          />
        </CardForm>
        <!-- 讲师标签 -->
        <CardForm class="form-item">
          <van-field
            :value="instructorTitleCmp"
            name="mtid"
            label="讲师标签"
            placeholder="请选择讲师标签"
            readonly
            @click="showSelectThe = true"
          />
        </CardForm>
        <van-button
          class="btn-style"
          round
          block
          type="info"
          native-type="submit"
          required
        >
          下一步
        </van-button>
      </van-form>
    </div>

    <SelectThe
      :show.sync="showSelectThe"
      :list="instructorTitleList"
      :active="mtid"
      @change="onSelectTheChange"
      @save="showSelectThe = false"
    />
  </div>
</template>

<script>
export default {
  components: {
    AvatarUpload: () => import("@/components/AvatarUpload"),
    CardForm: () => import("@/components/CardForm"),
    SelectThe: () => import("@/components/SelectThe"),
  },
  props: {
    // 讲师信息
    source: {
      type: Object,
      default: () => {
        instructor_info: {
          mail: "";
        }
      },
    },
  },
  computed: {
    instructorTitleCmp() {
      for (const item of this.instructorTitleList) {
        if (item.id === this.mtid) {
          return item.name;
        }
      }
    },
  },
  data() {
    return {
      // 用户头像
      avatarUrl: "",
      // 用户名称
      userName: "",
      // 性别
      gender: "1",
      // 手机号
      tel: "",
      // 电子邮件
      email: "",
      // 职务
      jobTitle: "",
      // 职称
      jobTerm: "",
      // 讲师标签
      mtid: null,
      // 讲师ID
      iid: "",
      // 机构ID
      aid: "",
      // 是否显示职称选择组件
      showSelectThe: false,
      // 获取职称列表
      instructorTitleList: [],
    };
  },
  watch: {
    source() {
      this.initData();
    },
  },
  created() {
    this.initData();
  },
  methods: {
    onSubmit(values) {
      values.avatarUrl = this.avatarUrl;
      console.log("values :>> ", values);
      this.updateLecturerInformationAPI();
    },
    initData() {
      console.log("this.source :>> ", this.source);
      // 用户头像
      this.avatarUrl = this.source.img;
      // 用户名称
      this.userName = this.source.name;
      // 性别
      this.gender = `${this.source.gender}`;
      // 手机号
      this.tel = this.source.phone;
      // 电子邮件
      this.email = this.source.instructor_info.mail;
      // 职务
      this.jobTitle = this.source.instructor_info.job;
      // 职称
      this.jobTerm = this.source.instructor_info.title;
      this.iid = this.$store.getters.accountIdInfo.iid;
      this.aid = this.$store.getters.associationInfo.id;

      this.instructorTitleListAPI(this.aid);
    },
    /**
     * AvatarUpload组件更新图片地址
     */
    changeAvatarUpload(newImgUrl) {
      this.avatarUrl = newImgUrl;
    },
    /**
     * 工会功能-更新讲师信息API
     */
    async updateLecturerInformationAPI() {
      console.log("this.mtid :>> ", this.mtid);
      const data = {
        img: this.avatarUrl,
        name: this.userName,
        gender: this.gender,
        mail: this.email,
        job: this.jobTitle,
        title: this.jobTerm,
        cert: this.source.instructor_info.cert,
        work_address: this.source.instructor_info.work_address,
        tel: this.tel,
        location: this.source.instructor_info.location,
        address: this.source.instructor_info.address,
        mtid: this.mtid,
        iid: this.iid,
        aid: this.aid,
        is_admin: true,
      };
      const res = await this.$request(
        "instructor.updateLecturerInformation",
        data
      );
      console.log("工会功能-更新讲师信息API_res :>> ", res);
      this.nextStep();
    },

    /**
     * 下一步
     */
    nextStep() {
      this.$emit("nextStep");
    },

    /**
     * 获取职称列表API
     * @param {String} aid 机构ID
     */
    async instructorTitleListAPI(aid) {
      const data = { aid };
      const res = await this.$request("instructor.instructorTitleList", data);
      console.log("获取职称列表API_res :>> ", res);
      this.instructorTitleList = res;
    },

    onSelectTheChange(val) {
      this.mtid = val.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.step-one-container {
  .form-style {
    padding: px(32) px(24);
    .form-item {
      margin-top: px(32);
    }
    .btn-style {
      position: absolute;
      top: px(1280);
      right: 0;
      left: 0;
      margin: 0 auto;
      width: px(496);
      height: px(120);
      font-size: px(36);
    }
  }
}
</style>
