<template>
  <div class="gift-bag-library-container">
    <van-popup :show="show" round position="top">
      <div class="pop-content">
        <p>编辑文案</p>
        <van-field class="input" v-model="posters[key]"></van-field>
        <van-button color="#2374FF" round @click="handleClose">确定</van-button>
      </div>
    </van-popup>
    <div id="poster-box" class="poster-box">
      <p class="poster-title" @click="handleShow('title')">
        {{ posters.title }}
      </p>
      <p class="poster-date" @click="handleShow('date')">{{ posters.date }}</p>
      <div class="poster-name">
        <span class="name" @click="handleShow('name')">{{ posters.name }}</span>
        <span class="work" @click="handleShow('work')">{{ posters.work }}</span>
      </div>
      <p class="poster-power van-ellipsis" @click="handleShow('power')">
        {{ posters.power }}
      </p>
      <div class="poster-place">
        <div class="img-box">
          <div class="img">
            <!-- <upload-avatar @change="handleAvatarUrl"></upload-avatar> -->
            <van-image class="avatar-style" :src="posters.imgUrl"></van-image>
          </div>
        </div>
        <div class="place-box">
          <p class="char" @click="handleShow('unit')">
            举办单位：{{ posters.unit }}
          </p>
          <p class="char" @click="handleShow('address')">
            举办地点：
            {{ posters.address }}
          </p>
          <p class="char" @click="handleShow('number')">
            参与人数：{{ posters.number }}人
          </p>
        </div>
      </div>
      <p class="blue-char mt">数据来源：福建省家庭教育研究会数智化平台</p>
      <p class="blue-char">技术支持：福建亲师友科技有限公司</p>
    </div>

    <div class="gap"></div>
    <footer class="flex">
      <div class="btn custom-upload-style">
        自定义海报上传
        <input
          ref="uploadInput"
          class="file-btn-style"
          type="file"
          accept="image/png, image/jpeg"
          @change="customUploadPoster"
        />
      </div>

      <div class="btn-blue" @click="savePosters">保存海报并返回</div>
    </footer>
  </div>
</template>

<script>
import { fileUpload } from "@/api/aoss.js";
// import UploadAvatar from './components/uploadAvatar.vue';
export default {
  components: {
    uploadAvatar: () => import("./components/uploadAvatar.vue"),
  },

  data() {
    return {
      // 当前活动ID
      lid: "",
      fileUpload: fileUpload,
      show: false,
      key: "title",
      posters: {
        title: "",
        date: "",
        name: "",
        work: "主讲老师",
        power: "福建省家庭教育研究会副秘书长",
        unit: "",
        address: "",
        number: "",
        imgUrl: "", //头像图片地址
      },
    };
  },
  created() {
    this.getLid();
    this.eventDetailsAPI();
    this.linstructorInfoByIdAPI(this.$store.getters.lecturerInfo.id);
  },
  methods: {
    handleShow(key) {
      this.show = true;
      this.key = key;
    },
    handleClose() {
      this.show = false;
    },
    handleAvatarUrl(val) {
      this.imgUrl = val;
    },
    /**
     * 获取活动ID
     */
    getLid() {
      this.lid = this.$route.query.lid;
    },
    /**
     * 讲座模块-获取信息(活动详情)API
     */
    async eventDetailsAPI() {
      const data = { id: this.lid };
      const res = await this.$request("lecture.eventDetails", data);
      console.log("讲座模块-获取信息(活动详情)API_res :>> ", res);
      this.posters.title = res.title;
      this.posters.date = this.$dateFormat(res.start_date, "yyyy年m月d日");

      this.posters.unit = res.host_info.name;
      this.posters.address = `${res.province}${res.city}${res.district}${res.street}`;
      this.posters.number = res.visitor;
    },
    /**
     * 根据ID获取讲师信息API
     * @param {String} iid 讲师ID
     */
    async linstructorInfoByIdAPI(iid) {
      const aid = this.$store.getters.associationInfo.id;
      const data = {
        id: iid,
        aid,
      };
      const res = await this.$request("instructor.instructorInfoGet", data);
      console.log("根据ID获取讲师信息API_res :>> ", res);
      this.posters.name = res.name;
      this.posters.imgUrl = res.img;
    },

    /**
     * dataURL转File对象
     * @param {String} dataurl
     * @param {String} filename
     */
    dataURLtoFile(dataurl, filename) {
      //将base64转换为文件
      let uint8 = this.getUint8Arr(dataurl);
      return new File([uint8.u8arr], filename, { type: uint8.mime });
    },
    /**
     * 二进制容器
     * @param {String} dataurl
     */
    getUint8Arr(dataurl) {
      // 截取base64的数据内容
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        // 获取解码后的二进制数据的长度，用于后面创建二进制数据容器
        n = bstr.length,
        // 创建一个Uint8Array类型的数组以存放二进制数据
        u8arr = new Uint8Array(n);
      // 将二进制数据存入Uint8Array类型的数组中
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return { u8arr, mime };
    },
    /**
     * 上传接口API
     */
    async fileUploadAPI(file) {
      const data = {
        file,
      };
      return await this.$request("aoss.fileUpload", data);
    },
    /**
     * 设置导师讲座海报API
     */
    async lecturePosterInstructorAPI(posterImgUrl, lid) {
      const apiUrl =
        this.$route.query.type === "host"
          ? "lecture.lecturePosterHost"
          : "lecture.lecturePosterInstructor";

      const aid = this.$store.getters.associationInfo.id;

      const data = {
        poster_img: posterImgUrl,
        id: lid,
        aid,
        hid: this.$store.getters.hostMenberMe.hid,
      };
      return await this.$request(apiUrl, data);
    },
    /**
     * 保存海报并返回
     */
    async savePosters() {
      const posterBox = document.querySelector("#poster-box");
      const canvas = await this.$html2canvas(posterBox, {
        allowTaint: true,
        useCORS: true,
        logging: true,
        scale: 1.3,
      });

      const strDataURI = canvas.toDataURL("png");
      const file = this.dataURLtoFile(strDataURI, "posters.png");
      console.log("生成的file数据 :>> ", file);
      const uploadRes = await this.fileUploadAPI(file);
      console.log("文件上传API_res :>> ", uploadRes);
      const lecturePosterRes = await this.lecturePosterInstructorAPI(
        uploadRes,
        this.lid
      );
      console.log("设置导师讲座海报API_res :>> ", lecturePosterRes);
      this.$toast("保存海报成功");
      this.$router.go(-1);
    },
    /**
     * 自定义上传海报
     */
    async customUploadPoster() {
      const file = this.$refs.uploadInput.files[0];
      console.log("自定义上传海报_file :>> ", file);
      const posterImgUrl = await this.fileUploadAPI(file);
      await this.lecturePosterInstructorAPI(posterImgUrl, this.lid);
      this.$toast("保存海报成功");
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.gift-bag-library-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .pop-content {
    padding: px(24) 0;
    width: 100vw;
    height: px(250);
    border-radius: 0 px(16);
    display: flex;
    flex-direction: column;
    align-items: center;
    .input {
      flex: 1;
    }
  }
  .poster-box {
    width: px(640);
    height: px(980);
    padding: px(75) 0 0 px(32);
    margin-top: px(147);
    background-image: url("@/assets/images/890.png");
    background-size: 100% 100%;
    .poster-title {
      font-size: px(56);
      width: px(450);
      word-break: break-all;
      font-family: Source Han Sans CN-Heavy, Source Han Sans CN;
      font-weight: 800;
      line-height: px(84);
      color: #0077ff;
    }
    .poster-date {
      margin-top: px(12);
      padding-left: px(12);
      box-sizing: border-box;
      width: px(503);
      height: px(52);
      font-size: px(30);
      font-family: Source Han Sans CN-Heavy, Source Han Sans CN;
      font-weight: 800;
      color: #ffffff;
      line-height: px(52);
      background: linear-gradient(
        93deg,
        #0077ff 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }
    .poster-name {
      margin-top: px(120);
      .name {
        font-size: px(40);
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: bold;
        color: #0077ff;
        margin-right: px(14);
      }
      .work {
        font-size: px(24);
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #0077ff;
      }
    }
    .poster-power {
      background-image: url("@/assets/images/371.png");
      background-size: 100% 100%;
      width: px(314);
      height: px(36);
      padding-left: px(7);
      margin-top: px(12);
      font-size: px(20);
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      line-height: px(36);
    }
    .poster-place {
      margin-top: px(40);
      width: px(465);

      position: relative;
      .place-box {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: px(465);
        background-image: url("@/assets/images/891.png");
        background-size: 100% 100%;
        padding-left: px(18);
        box-sizing: border-box;
        height: px(189);
        border-radius: px(8) px(8) px(8) px(40);
        .char {
          font-size: px(20);
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
        }
      }
      .img-box {
        position: absolute;
        right: px(-130);
        top: px(-190);
        width: px(263);
        height: px(263);
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
          width: 85%;
          height: 85%;
          border-radius: 50%;
          border: px(8) solid #0077ff;
          overflow: hidden;
          .avatar-style {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .blue-char {
      font-size: px(22);
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #0077ff;
      &.mt {
        margin-top: px(155);
        margin-bottom: px(14);
      }
    }
  }
  .gap {
    margin-bottom: px(140);
    height: px(1);
  }
  footer {
    background: #fff;
    position: fixed;
    height: px(120);
    width: 100vw;
    right: 0;
    bottom: 0;
    left: 0;
    .btn {
      background: #ffffff;
      font-size: px(36);
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #2374ff;
      line-height: px(120);
      text-align: center;
      position: relative;
    }
    .custom-upload-style {
      width: px(375);
      overflow: hidden;
      .file-btn-style {
        opacity: 0;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
    .btn-blue {
      width: px(375);
      background: #2374ff;
      font-size: px(36);
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #ffffff;
      line-height: px(120);
      text-align: center;
    }
  }
}
</style>
