<template>
  <div class="record-container">
    <div class="card-box">
      <p class="card-title-style">现场记录</p>
      <Card class="card-style">
        <div>
          <van-uploader
            v-model="records"
            class="upload-style"
            :before-delete="beforeDelete"
            :after-read="afterRead"
            upload-text="上传图片"
            :upload-icon="require('@/assets/icon/add_icon.png')"
          />
        </div>

        <div class="record-footer-box flex">
          <div class="record-left flex-start">
            <p>学员人数</p>
          </div>
          <div class="record-right flex-end" @click="show = true">
            <p class="record-label-style">{{ activityVisitor }}</p>
            <p>人</p>
          </div>
        </div>
      </Card>
    </div>
    <van-dialog
      v-model="show"
      title="设置学员人数"
      show-cancel-button
      @confirm="onConfirm"
    >
      <van-field v-model="value" type="number" placeholder="请输入学员人数" />
    </van-dialog>
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
    activityVisitor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 是否显示人数编辑弹窗
      show: false,
      // 编辑的人数
      value: null,
      records: [],
    };
  },
  created() {
    this.getRecords();
  },
  methods: {
    getRecords() {
      this.$request("lecture.lectureRecord2List", {
        lid: this.activityId,
      }).then((data) => {
        if (data[this.activityId] && data[this.activityId]) {
          let records = [];
          data[this.activityId].forEach((x) => {
            if (x) {
              records.push({
                message: "上传成功",
                status: "success",
                url: x,
              });
            }
          });
          this.records = records;
        } else {
          this.records = [];
        }
      });
    },
    saveRecords() {
      const apiUrl =
        this.$route.query.type === "host"
          ? "lecture.lectureRecord2Host"
          : "lecture.lectureRecord2Instructor";

      const aid = this.$store.getters.associationInfo.id;

      this.$request(apiUrl, {
        aid,
        lid: this.activityId,
        hid: this.$store.getters.hostMenberMe.hid,
        title: "",
        content: "",
        imgs: JSON.stringify(
          this.records.map((x) => {
            return x.url;
          })
        ),
      }).then((res) => {
        console.log(res);
      });
    },
    beforeDelete(file, detail) {
      this.$dialog
        .confirm({
          title: "",
          message: "您将删除该现场图片，是否继续？",
          confirmButtonColor: "#2374FF",
          cancelButtonColor: "#999999",
        })
        .then(() => {
          this.records.splice(detail.index, 1);
          this.saveRecords();
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
      this.saveRecords();
    },
    /**
     * 确认设置学员人数
     */
    onConfirm() {
      this.$emit("confirm", this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.record-container {
  .card-box {
    margin-top: px(40);
    .card-title-style {
      font-size: px(36);
      font-weight: bold;
    }
    .card-style {
      margin-top: px(12);
      padding: px(24);
      .username-style {
        margin-left: px(24);
        font-size: px(40);
        font-weight: bold;
      }
      .card-photo-style {
        margin-right: px(12);
      }

      .record-upload-style {
        ::v-deep .van-uploader__upload {
          border-radius: px(16);
          overflow: hidden;
        }
      }
      .record-footer-box {
        margin-top: px(24);
        padding: px(32) 0 0 0;
        border-top: px(1) solid #eeeeee;
        .record-left {
          font-size: px(30);
          font-weight: bold;
          .record-left-icon-style {
            margin-left: px(8);
            width: px(28);
            height: px(28);
          }
        }
        .record-right {
          font-size: px(30);
          .record-label-style {
            margin-right: px(12);
            color: #cccccc;
          }
        }
      }
    }
  }
}
</style>
