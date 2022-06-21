<template>
  <div class="avatar-upload-container flex-start">
    <el-upload
      class="avatar-uploader flex-center"
      :class="{ 'square-style': shape === 'square' }"
      action="#"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="submitUpload"
      :multiple="false"
      ref="upload"
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
        :src="defaultSrc"
      ></van-image>
    </el-upload>

    <p class="describe-style">{{ title }}</p>
    <input
      type="file"
      name="file"
      class="file-input-style"
      @change="changeFile"
    />
  </div>
</template>

<script>
export default {
  props: {
    // 头像地址
    src: {
      type: String,
      default: "",
    },
    // 标题
    title: {
      type: String,
      default: "点击上传头像",
    },
    // 默认图地址
    defaultSrc: {
      type: String,
      default: require("@/assets/images/avatar_default.png"),
    },
    // 形状 默认为空, 方形为square
    shape: {
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
    async changeFile(e) {
      await this.beforeAvatarUpload(e.target.files[0]);
      if (this.file) {
        this.submitUpload();
      }
    },
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
      console.log("覆盖默认的上传行为_res :>> ", res);
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
.avatar-upload-container {
  position: relative;
  .uploader-style {
    ::v-deep {
      .van-uploader__preview {
        .van-uploader__preview-image {
          .van-image__img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .van-uploader__upload {
        width: 160px;
        height: 215px;
        .van-icon__image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .avatar-uploader {
    width: px(160);
    height: px(215);
    border-radius: px(16);
    overflow: hidden;
    ::v-deep {
      .el-upload {
        width: 100%;
        height: 100%;
      }
    }
  }

  .square-style {
    width: px(160);
    height: px(160);
  }

  .describe-style {
    margin-left: px(28);
    font-size: px(32);
    font-weight: bold;
  }

  .file-input-style {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
  }
}
</style>
