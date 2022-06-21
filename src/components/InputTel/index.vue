<template>
  <div class="input-tel-container flex-center">
    <div class="field-box flex">
      <!-- 通用输入框 -->
      <div v-if="type === ''" class="flex">
        <div
          class="field-label-box flex-start"
          @click="showAreaCodePicker = true"
        >
          <p>{{ label }}</p>
        </div>
        <van-field
          class="field"
          v-model="inputVal"
          center
          clearable
          :placeholder="placeholder"
        />
      </div>
      <!-- 手机号输入框 -->
      <div v-if="type === 'tel'" class="flex">
        <div
          class="field-label-box flex-start"
          @click="showAreaCodePicker = true"
        >
          <p>{{ curAreaCode }}</p>
          <van-image
            class="field-label-icon"
            :src="require('@/assets/icon/arrow_down.png')"
          ></van-image>
        </div>
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field
          class="field"
          v-model="inputVal"
          type="tel"
          placeholder="请输入手机号码"
          @input="changeInput"
        />
      </div>
      <!-- 短信验证码输入框 -->
      <div v-show="type === 'validation'" class="validation flex">
        <div
          class="field-label-box flex-start"
          @click="showAreaCodePicker = true"
        >
          <p>验证码</p>
        </div>
        <van-field
          class="field"
          v-model="inputVal"
          center
          clearable
          placeholder="请输入短信验证码"
          @input="changeInput"
        >
          <template #button>
            <!-- <van-button size="small" type="primary">发送验证码</van-button> -->
            <p
              class="btn-text-primary"
              :class="{ disable: isDisableCmp }"
              @click="sendValidation"
            >
              {{ timerViewCmp }}
            </p>
          </template>
        </van-field>
      </div>
    </div>

    <!-- 选择国际编码弹窗 -->
    <van-popup v-model="showAreaCodePicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="telAreaCode"
        value-key="phone_code"
        @cancel="showAreaCodePicker = false"
        @confirm="onConfirmAreaCode"
      />
    </van-popup>
  </div>
</template>

<script>
import telAreaCode from "@/static/tel_area_code";
export default {
  props: {
    // 输入框类型
    type: {
      type: String,
      default: "",
    },
    // 输入框左侧文本 (只有在通用类型下生效)
    label: {
      type: String,
      default: "",
    },

    // 输入框占位提示文字 (只有在通用类型下生效)
    placeholder: {
      type: String,
      default: "",
    },

    // 手机号码，发送验证码用
    tel: {
      type: String,
      default: "",
    },
  },

  computed: {
    timerViewCmp() {
      return !this.isDisableCmp
        ? "发送验证码"
        : `验证码已发送(${this.timerView})`;
    },
    isDisableCmp() {
      return this.timerView > 0;
    },
  },

  data() {
    return {
      // 是否显示手机号区号选择弹窗
      showAreaCodePicker: false,
      // 当前选择的国际区号
      curAreaCode: telAreaCode[0].phone_code,
      // 手机号
      inputVal: "",
      // 国际区号
      telAreaCode: telAreaCode,
      // 获取验证码的计时器
      timmer: null,
      // 当前倒计时的显示时间
      timerView: 0,
    };
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  methods: {
    /**
     * 发送验证码
     */
    sendValidation() {
      if (!this.tel || this.tel.length != 11) {
        this.$toast("请输入正确的手机号码");
        return;
      }
      if (this.isDisableCmp) {
        return;
      }
      this.$request("login.userAuthSend", {
        phone: this.tel,
      }).then((res) => {
        // console.log('调用发送验证码接口 :>>')
        this.timerView = 60;
        this.timer = setInterval(() => {
          if (this.timerView === 0) {
            clearInterval(this.timer);
            return;
          }
          this.timerView--;
        }, 1000);
      });
    },

    /**
     * 确认选择手机区域编码
     */
    onConfirmAreaCode(value, index) {
      this.curAreaCode = value.phone_code;

      const submitData = this.handleSubmitData();

      this.submit(submitData);
      // 隐藏手机号区号选择弹窗
      this.showAreaCodePicker = false;
    },

    /**
     * 输入框内容变化时触发
     */
    changeInput(val) {
      this.inputVal = val;

      const submitData = this.handleSubmitData();

      this.submit(submitData);
    },

    /**
     * 处理 submitData 数据
     */
    handleSubmitData() {
      return this.inputVal;
      // return this.type === 'tel'
      //   ? `${this.curAreaCode} ${this.inputVal}`
      //   : this.inputVal
    },

    /**
     * 将数据给与父组件
     * @param {any} submitData 要给予父组件的数据
     */
    submit(submitData) {
      this.$emit("submit", submitData);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-tel-container {
  margin: 0 auto;
  width: px(702);
  height: px(120);
  background: $input-bg-color;
  border-radius: px(90);
  opacity: 1;
  font-size: px(30);

  .field-box {
    padding: px(48);
    width: 100%;
    .van-cell {
      padding: 0;
    }
    .field-label-box {
      width: px(170);
      .field-label-icon {
        margin: 0 px(50) 0 px(10);
        width: px(14);
        height: px(13);
      }
    }
    .field {
      background: transparent;
    }
    .validation {
      ::v-deep .van-field__label {
        font-size: px(30);
      }

      .btn-text-primary {
        font-size: px(30);
        font-weight: bold;
        color: $primary-color;
      }
      .disable {
        color: #999;
      }
    }
  }
}
</style>
