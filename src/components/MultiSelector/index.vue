<template>
  <div class="multi-selector-container">
    <van-popup
      v-model="show"
      position="bottom"
      round
      safe-area-inset-bottom
      :close-on-click-overlay="false"
    >
      <Card class="card-style">
        <!-- 弹窗头部 -->
        <div class="popup-header-style flex">
          <p class="cancel-btn-style" @click="fnCancel">取消</p>
          <p class="popup-header-title">管理标签</p>
          <p class="confirm-btn-style" @click="fnConfirm">保存</p>
        </div>

        <!-- 选中标签列表 -->
        <ul class="select-label-list flex-start">
          <li v-for="(item, index) in 3" :key="index" class="select-label-item">
            <Tag title="金牌讲师" close bigSize active />
          </li>
        </ul>

        <!-- 主题标签 -->
        <div class="option-list-box">
          <p class="option-list-title">主题标签</p>
          <ul class="option-list flex-start flex-wrap">
            <li v-for="(item, index) in 10" :key="index" class="option-item">
              <Tag title="金牌讲师" bigSize />
            </li>
          </ul>
        </div>
        <!-- 形式标签 -->
        <div class="option-list-box">
          <p class="option-list-title">形式标签</p>
          <ul class="option-list flex-start flex-wrap">
            <li v-for="(item, index) in 4" :key="index" class="option-item">
              <Tag title="金牌讲师" bigSize />
            </li>
          </ul>
        </div>
        <!-- 对象标签 -->
        <div class="option-list-box">
          <p class="option-list-title">对象标签</p>
          <ul class="option-list flex-start flex-wrap">
            <li v-for="(item, index) in 6" :key="index" class="option-item">
              <Tag title="金牌讲师" bigSize />
            </li>
          </ul>
        </div>
      </Card>
    </van-popup>
  </div>
</template>

<script>
export default {
  components: {
    Card: () => import("@/components/Card"),
    Tag: () => import("@/components/Tag"),
  },
  props: {
    // 是否显示"管理标签"弹窗
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 隐藏弹窗
     */
    fnCancel() {
      this.$emit("update:show", false);
    },
    /**
     * 确认: 通知父组件选中的标签
     */
    fnConfirm() {
      this.$emit("confirm");
      this.fnCancel();
    },
  },
};
</script>

<style lang="scss" scoped>
.multi-selector-container {
  .card-style {
    padding: px(56) px(32);
    .popup-header-style {
      .cancel-btn-style {
        font-size: px(32);
        color: #999999;
      }
      .popup-header-title {
        font-size: px(32);
        font-weight: bold;
      }
      .confirm-btn-style {
        font-size: px(32);
        font-weight: bold;
        color: #0077ff;
      }
    }

    .select-label-list {
      padding: 0 0 px(116) 0;
      margin-top: px(68);
      border-bottom: px(1) solid #eeeeee;
      .select-label-item {
        margin: px(24) px(24) 0 0;
      }
    }

    .option-list-box {
      margin: px(32) 0 0 0;
      .option-list-title {
        font-size: px(32);
        font-weight: bold;
      }
      .option-list {
        margin: px(24) 0 0 0;
        .option-item {
          margin: 0 px(24) px(24) 0;
        }
      }
    }
  }
}
</style>
