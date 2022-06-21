<template>
  <div class="new-activities-qrcode-container">
    <div class="background-box">
      <div class="content-style">
        <div class="info-box">
          <p class="title-style">{{ lectureData.title }}</p>
          <p class="info-style">{{ timeCmp }}</p>
          <p class="info-style">{{ addressCmp }}</p>
          <p class="info-style">{{ lectureData.host_info.name }}</p>
        </div>
        <div class="qrcode-box">
          <van-image
            class="van-image-style"
            :src="imgQR ? imgQR : require('@/assets/mock/qrcode.jpg')"
          />
        </div>
      </div>
    </div>
    <p class="tips-style">截图或者长按图片保存至手机</p>
    <p class="statement-style">“亲师友”提供技术支持</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aid: "",
      hid: "",
      lid: "",
      imgQR: "",
      lectureData: {},
    };
  },
  computed: {
    timeCmp() {
      return this.$dateFormat(
        this.lectureData.start_date,
        "yyyy年mm月dd日 hh:MM:ss"
      );
    },
    addressCmp() {
      return `${this.lectureData.province}${this.lectureData.city}${this.lectureData.district}${this.lectureData.street}`;
    },
  },
  created() {
    const query = this.$route.query;
    this.aid = query.aid;
    this.hid = query.hid;
    this.lid = query.lid;
    console.log("this.lid :>> ", this.lid);
    this.generateQRCode();
    this.eventDetailsAPI(this.lid);
  },
  methods: {
    /**
     * 生成二维码
     */
    async generateQRCode() {
      const text = {
        aid: this.aid,
        hid: this.hid,
        lid: this.lid,
        type: "home_research",
      };
      const qr = await this.$qrcode.toDataURL(JSON.stringify(text), {
        errorCorrectionLevel: "L",
      });
      console.log("qr :>> ", qr);
      this.imgQR = qr;
    },
    /**
     * 查询讲座信息
     */
    async eventDetailsAPI(lid) {
      const data = {
        id: lid,
      };
      const res = await this.$request("lecture.eventDetails", data);
      console.log("res :>> ", res);
      this.lectureData = res;
    },
  },
};
</script>

<style lang="scss" scoped>
.new-activities-qrcode-container {
  height: calc(100vh - px(84));
  background: linear-gradient(135deg, #bcd2ff 0%, #edf4ff 40%, #c6e4ff 100%);
  // background: center / fill no-repeat
  //   url("@/assets/images/activity_qrcode_background.png");
  position: relative;

  .background-box {
    width: 100%;
    height: 100%;
    background-image: url("@/assets/images/888.png");
    background-size: 100% 100%;
  }

  .content-style {
    width: px(480);
    position: absolute;
    top: px(262);
    right: px(135);
    left: px(135);
    .info-box {
      .title-style {
        margin: 0 0 px(32) 0;
        font-size: px(48);
        font-weight: bold;
        color: #ffffff;
      }
      .info-style {
        margin: 0 0 px(24) 0;
        font-size: px(32);
        color: #ffffff;
        opacity: 0.4;
      }
    }

    .qrcode-box {
      margin: px(100) auto 0;
      padding: px(16);
      width: px(373);
      height: px(373);
      background: #e4f0ff;
      border-radius: px(24);
      .van-image-style {
        width: 100%;
      }
    }
  }
  .tips-style {
    font-size: px(32);
    color: #3d7df7;
    text-align: center;
  }

  .statement-style {
    font-size: px(32);
    color: #3d7df7;
    text-align: center;
  }
}
</style>
