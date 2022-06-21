<template>
  <div class="certificate-container">
    <div class="card-box">
      <div class="card-title-box flex">
        <p class="card-title-style">举办单位反馈表&主讲人承诺书</p>
        <van-button @click="downFile"> 下载附件 </van-button>
        <!-- <van-button class="download-btn-style" size="small" round>
          <van-image
            class="download-icon-style"
            :src="require('@/assets/icon/download_icon.png')"
          />
          下载附件
        </van-button> -->
      </div>
      <div class="flex">
        <Card class="card-style">
          <van-uploader
            v-model="file1Obj"
            class="upload-style"
            :show-upload="!file1Obj.length"
            :after-read="afterRead"
            :before-delete="file1BeforeDelete"
            upload-text="上传图片"
            :upload-icon="require('@/assets/icon/add_icon.png')"
          />
          <p class="title-style">反馈表</p>
        </Card>
        <Card class="card-style">
          <van-uploader
            v-model="file2Obj"
            class="upload-style"
            :show-upload="!file2Obj.length"
            :after-read="afterRead"
            :before-delete="file2BeforeDelete"
            upload-text="上传图片"
            :upload-icon="require('@/assets/icon/add_icon.png')"
          />
          <p class="title-style">承诺书</p>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Card: () => import("@/components/Card"),
  },
  props: {
    activityId: {
      type: String,
      default: "",
    },
    file1: {
      type: String,
      default: "",
    },
    file2: {
      type: String,
      default: "",
    },
  },
  watch: {
    file1(val) {
      this.file1Obj = [
        {
          message: "上传成功",
          status: "success",
          url: val,
        },
      ];
    },
    file2(val) {
      this.file2Obj = [
        {
          message: "上传成功",
          status: "success",
          url: val,
        },
      ];
    },
  },
  data() {
    return {
      file1Obj: [],
      file2Obj: [],
    };
  },
  methods: {
    downFile() {
      window.open(
        "https://static.familyeducation.org.cn/fsa/20220527/4bb4eaebb62a94baf04f62c955cf3350.docx"
      );
    },
    saveFiles() {
      const aid = this.$store.getters.associationInfo.id;
      const apiUrl =
        this.$route.query.type === "host"
          ? "lecture.lectureFileHost"
          : "lecture.lectureFileInstructor";

      this.$request(apiUrl, {
        id: this.activityId,
        aid,
        hid: this.$store.getters.hostMenberMe.hid,
        file1: this.file1Obj.length ? this.file1Obj[0].url : "",
        file2: this.file2Obj.length ? this.file2Obj[0].url : "",
      });
    },
    file1BeforeDelete(file, detail) {
      this.$dialog
        .confirm({
          title: "",
          message: "您将删除反馈表，是否继续？",
          confirmButtonColor: "#2374FF",
          cancelButtonColor: "#999999",
        })
        .then(() => {
          this.file1Obj = [];
          this.saveFiles();
        })
        .catch(() => {
          console.log("取消删除 :>>");
        });
    },
    file2BeforeDelete(file, detail) {
      this.$dialog
        .confirm({
          title: "",
          message: "您将删除承诺书，是否继续？",
          confirmButtonColor: "#2374FF",
          cancelButtonColor: "#999999",
        })
        .then(() => {
          this.file2Obj = [];
          this.saveFiles();
        })
        .catch(() => {
          console.log("取消删除 :>>");
        });
    },
    async afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      const data = {
        file: file.file,
      };
      const res = await this.$request("aoss.fileUpload", data);
      file.status = "success";
      file.message = "上传成功";
      file.url = res;
      this.saveFiles();
    },
  },
};
</script>

<style lang="scss" scoped>
.certificate-container {
  .card-box {
    margin-top: px(40);
    .card-title-box {
      .download-btn-style {
        font-size: px(26);
        font-weight: bold;
        color: #0077ff;
        .download-icon-style {
          width: px(31);
          height: px(23);
        }
      }
      .card-title-style {
        font-size: px(36);
        font-weight: bold;
      }
    }
    .card-style {
      padding: px(24) px(53) !important;
      margin-top: px(12);
      padding: px(24);
      .upload-style {
        ::v-deep .van-uploader__wrapper {
          .van-uploader__upload {
            margin: 0;
            width: px(240);
            height: px(340);
          }
        }

        ::v-deep .van-uploader__preview {
          margin: 0;
        }
        ::v-deep .van-uploader__preview-image {
          width: px(240);
          height: px(340);
        }
      }

      .title-style {
        margin-top: px(11);
        text-align: center;
        font-size: px(26);
        color: #999999;
      }
    }
  }
}
</style>
