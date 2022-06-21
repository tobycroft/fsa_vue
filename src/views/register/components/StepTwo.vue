<template>
  <div class="step-two-container">
    <div class="form-style">
      <van-form>
        <!-- 身份证号 -->
        <CardForm class="form-item">
          <van-field
            v-model="formData.cert"
            name="idCard"
            label="身份证号"
            placeholder="请输入身份证号码"
          />
        </CardForm>
        <!-- 电子邮箱 -->
        <CardForm class="form-item">
          <van-field
            v-model="formData.mail"
            name="email"
            label="电子邮箱"
            placeholder="请输入电子邮箱"
          />
        </CardForm>
        <!-- 工作单位 -->
        <CardForm class="form-item">
          <van-field
            v-model="formData.work_address"
            name="workUnits"
            label="工作单位"
            placeholder="请输入工作单位名称"
          />
        </CardForm>
        <!-- 职务 -->
        <CardForm class="form-item">
          <van-field
            v-model="formData.job"
            name="job"
            label="职务"
            placeholder="请输入工作职务"
          />
        </CardForm>
        <!-- 职称 -->
        <CardForm class="form-item">
          <van-field
            v-model="formData.title"
            name="jobTitle"
            label="职称"
            placeholder="请输入职称"
          />
        </CardForm>
        <!-- 所在区域 -->
        <CardForm class="form-item">
          <div @click="showPopup = true">
            <van-field
              class="not-disable-style"
              v-model="formData.location"
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
            v-model="formData.address"
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
import { areaList } from '@vant/area-data'

export default {
  components: {
    CardForm: () => import('@/components/CardForm'),
  },
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      // 身份证号码
      idCard: '',
      // 电子邮箱
      email: '',
      // 工作单位
      workUnits: '',
      // 职务
      job: '',
      // 职称
      jobTitle: '',
      // 所在区域
      area: '',
      // 通讯地址
      address: '',

      // 省市区列表
      areaList,
      // 是否显示区域选择弹窗
      showPopup: false,
    }
  },

  mounted() {
    console.log('this.areaList :>> ', this.areaList)
  },
  methods: {
    confirm(areaArr) {
      console.log('areaArr :>> ', areaArr)
      let area = ''
      for (const item of areaArr) {
        area += `${item.name} `
      }
      this.formData.location = area
      this.showPopup = false
    },
  },
}
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
  }
}
</style>
