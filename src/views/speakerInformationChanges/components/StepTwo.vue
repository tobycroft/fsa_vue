<template>
  <div class="step-two-container">
    <div class="form-style">
      <van-form @submit="onSubmit">
        <!-- 工作单位 -->
        <CardForm class="form-item">
          <van-field
            v-model="workUnits"
            name="workUnits"
            label="工作单位"
            placeholder="请输入工作单位名称"
          />
        </CardForm>

        <!-- 身份证号 -->
        <CardForm class="form-item">
          <van-field
            v-model="idCard"
            name="idCard"
            label="身份证号"
            placeholder="请输入身份证号码"
          />
        </CardForm>
        <!-- 通讯方式 -->
        <CardForm class="form-item">
          <van-field
            v-model="tel"
            type="tel"
            name="tel"
            label="通讯方式"
            placeholder="请输入通讯方式"
            :rules="[{ required: true, message: '请输入通讯方式' }]"
          />
        </CardForm>

        <!-- 所在区域 -->
        <CardForm class="form-item">
          <div @click="showPopup = true">
            <van-field
              class="not-disable-style"
              v-model="area"
              name="area"
              label="所在区域"
              placeholder="请选择所在区域"
              disabled
            />
          </div>
        </CardForm>
        <!-- 通讯地址 -->
        <CardForm class="form-item">
          <van-field
            v-model="address"
            name="address"
            rows="2"
            autosize
            label="通讯地址"
            type="textarea"
            maxlength="50"
            placeholder="请输入详细的地址信息"
            show-word-limit
          />
        </CardForm>

        <!-- <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div> -->

        <van-button
          class="btn-style"
          round
          block
          type="info"
          native-type="submit"
          required
        >
          保存修改
        </van-button>
      </van-form>
    </div>
    <van-popup v-model="showPopup" position="bottom" :style="{ height: '30%' }">
      <van-area
        title="标题"
        :area-list="areaList"
        @cancel="showPopup = false"
        @confirm="confirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";

export default {
  components: {
    CardForm: () => import("@/components/CardForm"),
  },
  props: {
    // 讲师信息
    source: {
      type: Object,
      default: () => {
        instructor_info: {
          address: "";
          cert: "";
          change_date: "";
          date: "";
          job: "";
          location: "";
          mail: "";
          tel: "";
          title: "";
          work_address: "";
        }
      },
    },
  },
  watch: {
    source() {
      this.initData();
    },
  },
  data() {
    return {
      // 导师ID
      iid: "",
      // 机构ID
      aid: "",
      // 工作单位
      workUnits: "",
      // 身份证号码
      idCard: "",
      // 联系方式
      tel: "",
      // 所在区域
      area: "",
      // 通讯地址
      address: "",
      // 省市区列表
      areaList,
      // 身份标签
      mtid: null,
      // 是否显示区域选择弹窗
      showPopup: false,
    };
  },
  created() {
    this.initData();
  },

  methods: {
    onSubmit(values) {
      console.log("values :>> ", values);
      this.updateLecturerInformationAPI();
    },
    confirm(areaArr) {
      console.log("areaArr :>> ", areaArr);
      this.area = "";
      for (const item of areaArr) {
        this.area += `${item.name} `;
      }
      this.showPopup = false;
    },
    initData() {
      this.iid = this.$store.getters.accountIdInfo.iid;
      this.aid = this.$store.getters.associationInfo.id;
      console.log("this.source :>> ", this.source);
      // 工作单位
      this.workUnits = this.source.instructor_info.work_address;
      // 身份证号码
      this.idCard = this.source.instructor_info.cert;
      // 联系方式
      this.tel = this.source.instructor_info.tel;
      // 所在区域
      this.area = this.source.instructor_info.location;
      // 通讯地址
      this.address = this.source.instructor_info.address;
      // 身份标签
      this.mtid = this.source.mtid;
    },
    /**
     * 工会功能-更新讲师信息API
     */
    async updateLecturerInformationAPI() {
      const data = {
        img: this.source.img,
        name: this.source.name,
        gender: `${this.source.gender}`,
        mail: this.source.instructor_info.mail,
        job: this.source.instructor_info.job,
        title: this.source.instructor_info.title,
        cert: this.idCard,
        work_address: this.workUnits,
        tel: this.tel,
        location: this.area,
        address: this.address,
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
  },
};
</script>

<style lang="scss" scoped>
.step-two-container {
  .form-style {
    padding: px(32) px(24);
    .form-item {
      margin-top: px(32);

      .not-disable-style {
        ::v-deep .van-field__label {
          color: $font-color-default;
        }
        ::v-deep .van-field__control:disabled {
          color: $font-color-default;
          -webkit-text-fill-color: $font-color-default;
        }
      }
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
