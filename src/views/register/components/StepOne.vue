<template>
  <div class="step-one-container">
    <div class="form-style">
      <van-form>
        <!-- 头像 -->
        <AvatarUpload
          class="form-item"
          :src="formData.img"
          @change="setAvatar"
        />

        <!-- 用户名 -->
        <CardForm class="form-item">
          <van-field
            v-model="formData.name"
            name="userName"
            label="用户名"
            placeholder="请输入真实姓名"
          />
        </CardForm>

        <!-- 性别 -->
        <CardForm class="form-item">
          <van-field name="radio" label="性别">
            <template #input>
              <van-radio-group v-model="formData.gender" direction="horizontal">
                <van-radio name="1">男</van-radio>
                <van-radio name="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </CardForm>

        <!-- 电话 -->
        <CardForm class="form-item">
          <van-field
            v-model="formData.tel"
            name="tel"
            type="tel"
            label="手机号"
            placeholder="请输入手机号码"
          />
        </CardForm>

        <!-- <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div> -->
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    AvatarUpload: () => import("@/components/AvatarUpload"),
    CardForm: () => import("@/components/CardForm"),
  },
  data() {
    return {
      // 用户名称
      userName: "",
      // 性别
      gender: 1,
      // 手机号
      tel: "",
    };
  },
  methods: {
    setAvatar(url) {
      this.formData.img = url;
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
  }
}
</style>
