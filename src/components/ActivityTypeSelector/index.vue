<template>
  <div class="host-selector-container">
    <van-popup
      v-model="show"
      position="bottom"
      round
      :close-on-click-overlay="false"
    >
      <van-picker
        class="picker-style"
        title="选择活动类型"
        show-toolbar
        :columns="typeList"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      typeList: ['线下', '线上'],
    }
  },
  created() {},
  methods: {
    /**
     * 确认
     */
    onConfirm(value, index) {
      this.$emit('confirm', value)
      this.onCancel()
    },
    /**
     * 取消
     */
    onCancel() {
      this.$emit('update:show', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.host-selector-container {
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
