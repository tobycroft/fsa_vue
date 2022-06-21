<template>
  <!-- <div class="avatar-upload-container"> -->
  <el-upload
    class="avatar-uploader flex-center"
    action="#"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :http-request="submitUpload"
    :multiple="false"
  >
    <van-image
      v-if="imageUrl"
      :style="{ width: '100%', height: '100%' }"
      :src="imageUrl"
      fit="fill"
      class="avatar"
    />
    <van-image
      v-else
      :style="{ width: '100%', height: '100%' }"
      :src="require('@/assets/images/avatar_default.png')"
    ></van-image>
  </el-upload>

  <!-- </div> -->
</template>

<script>
export default {
  props: {
    // 头像地址
    src: {
      type: String,
      default: "",
    },
  },

  watch: {
    src(newVal) {
      if (newVal !== "") {
        this.imageUrl = newVal;
      }
    },
  },

  data() {
    return {
      // 已上传的文件列表
      fileList: [],
      imageUrl: "",
    };
  },

  created() {
    if (this.src !== "") {
      this.imageUrl = this.src;
    }
  },

  methods: {
    /**
     * 文件上传成功时的钩子
     */
    handleAvatarSuccess(response, file, fileList) {
      console.log(
        "文件上传成功时的钩子_handleAvatarSuccess :>> ",
        response,
        file,
        fileList
      );
    },
    /**
     * 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
     */
    beforeAvatarUpload(file) {
      console.log("上传文件之前的钩子_beforeAvatarUpload :>> ", file);
      this.file = file;
    },
    /**
     * 覆盖默认的上传行为，可以自定义上传的实现
     */
    async submitUpload() {
      const data = {
        file: this.file,
      };
      const res = await this.$request("aoss.fileUpload", data);
      console.log("上传文件之前的钩子_res :>> ", res);
      this.imageUrl = res;
      this.change();
    },
    /**
     * 更改图片地址
     * @returns {String} 新的图片地址
     */
    change() {
      this.$emit("change", this.imageUrl);
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
}
</style>
