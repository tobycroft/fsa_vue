<template>
  <div class="step-one-container">
    <div class="form-style">
      <van-form>
        <!-- 头像 -->
        <AvatarUpload  
           @change="changeAvatarUpload" class="form-item" />

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

        <!-- 电话 -->
        <CardForm class="form-item">
          <van-field
            maxlength="11"
            @blur="emitTel"
            v-model="tel"
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
import bus from "@/utils/bus";

export default {
  components: {
    AvatarUpload: () => import("@/components/AvatarUpload"),
    CardForm: () => import("@/components/CardForm"),
  },
  data() {
    return {
      // 头像
      img:'',
      // 用户名称
      userName: "",
      // 性别
      gender: 1,
      // 手机号
      tel: "",
    };
  },
  methods: {
    changeAvatarUpload(newImgUrl) {
      console.log("debug :>> ", newImgUrl);
      this.img = newImgUrl;
    },
    emitTel() {
      bus.$emit('Tel',this.tel)
    }
  }
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
