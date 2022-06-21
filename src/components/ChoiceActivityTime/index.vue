<template>
  <div class="choice-activity-time-container">
    <van-popup
      v-model="show"
      position="bottom"
      round
      :close-on-click-overlay="false"
    >
      <van-datetime-picker
        class="picker-style"
        v-model="currentDate"
        type="datetime"
        title="选择时间"
        confirm-button-text="保存"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="onCancel"
        @confirm="onConfirm"
        :formatter="formatter"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    // 是否显示弹窗
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      minDate: new Date(this.minYear(), 0, 1),
      maxDate: new Date(this.maxYear(), 12, 1),
      currentDate: new Date(),
    };
  },
  methods: {
    /**
     * 选项格式化函数
     */
    formatter(type, val) {
      console.log("type :>> ", type);
      console.log("val :>> ", val);
      if (type === "year") {
        return `${val}年`;
      }
      if (type === "month") {
        return `${val}月`;
      }
      if (type === "day") {
        return `${val}日`;
      }
      if (type === "hour") {
        return `${val}时`;
      }
      if (type === "minute") {
        return `${val}分`;
      }
    },

    // 最大年份
    maxYear() {
      const d = new Date();
      console.log("d.getFullYear() :>> ", d.getFullYear() + 10);
      return d.getFullYear() + 10;
    },
    // 最小年份
    minYear() {
      const d = new Date();
      console.log("d.getFullYear() :>> ", d.getFullYear() - 10);
      return d.getFullYear() - 10;
    },
    /**
     * 取消
     */
    onCancel() {
      this.$emit("update:show", false);
    },
    /**
     * 确认
     */
    onConfirm(val) {
      this.$emit("confirm", val);
      this.onCancel();
    },
  },
};
</script>

<style lang="scss" scoped>
.choice-activity-time-container {
  .picker-style {
    ::v-deep .van-picker__toolbar {
      margin: px(36) 0 0 0;
      .van-picker__cancel {
        font-size: px(32);
        color: #999999;
      }
      .van-picker__title {
        font-size: px(32);
        font-weight: bold;
      }
      .van-picker__confirm {
        font-size: px(32);
        font-weight: bold;
        color: #0077ff;
      }
    }
  }
}
</style>
