<template>
  <div class="how-long-selector-container">
    <van-popup
      v-model="show"
      position="bottom"
      round
      :close-on-click-overlay="false"
    >
      <van-picker
        class="picker-style"
        title="选择时长"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
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
      columns: [
        {
          text: "0.5小时",
          value: 1800,
        },
        {
          text: "1小时",
          value: 3600,
        },
        {
          text: "1.5小时",
          value: 5400,
        },
        {
          text: "2小时",
          value: 7200,
        },
        {
          text: "2.5小时",
          value: 9000,
        },
      ],
    };
  },
  methods: {
    /**
     * 确定
     */
    onConfirm(val) {
      this.$emit('confirm', val)
      this.onCancel();
    },
    /**
     * 取消
     */
    onCancel() {
      this.$emit("update:show", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.how-long-selector-container {
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
