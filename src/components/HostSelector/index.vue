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
        title="选择举办单位"
        show-toolbar
        :columns="hostList"
        value-key="name"
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
      hostList: [],
    };
  },
  created() {
    this.getHostList();
  },
  methods: {
    async getHostList() {
      const aid = this.$store.getters.associationInfo.id;
      const data = { aid };
      const res = await this.$request("host.hostList", data);
      this.hostList = res;
    },
    /**
     * 确认
     */
    onConfirm(value, index) {
      this.$emit("confirm", value);
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
