<template>
  <div class="tabs-num-container">
    <ul class="tabs-list horizontal-scroll flex align-start">
      <li
        class="tabs-item"
        :class="{
          ['tabs-item-active']: active === index,
          ['tabs-hiden-label-style']: !isLabel,
        }"
        v-for="(item, index) in list"
        :key="index"
        @click="changeActive(index)"
      >
        <div class="index-style flex-center">
          <div class="index-style-internal">
            {{ index + 1 }}
          </div>
        </div>
        <div v-if="isLabel" class="label-style">{{ item }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // Tabs选项列表数据
    list: {
      type: [Array, Number],
      required: true,
    },
    // 当前选中列表项下标
    active: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  data() {
    return {
      // 是否显示带label的列表
      isLabel: false,
    };
  },
  created() {
    // 判断是否存在长度
    // 存在长度则显示有label的列表,否则显示无label列表
    this.isLabel = this.list.length ? true : false;
  },
  methods: {
    /**
     * 修改当前选中的tab
     */
    changeActive(val) {
      this.$emit("change", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-num-container {
  .tabs-list {
    text-align: center;

    .tabs-item {
      // margin: 0 px(63) 0 0;
      width: px(64);
      .index-style {
        width: px(54);
        height: px(54);
        border-radius: 50%;
        background: rgba($color: #0077ff, $alpha: 0);
        .index-style-internal {
          margin: 0 auto;
          width: px(40);
          height: px(40);
          line-height: px(40);
          background: #cccccc;
          border-radius: 50%;
          font-size: px(24);
          font-weight: bold;
          color: #ffffff;
        }
      }

      .label-style {
        margin: px(15) 0 0 0;
        width: px(64);
        height: auto;
        font-size: px(32);
        font-weight: bold;
        color: #cccccc;
        line-height: px(32);
        word-break: break-all;
      }
    }
    .tabs-hiden-label-style {
      margin: 0 px(26) 0 0 !important;
    }
    .tabs-item-active {
      .index-style {
        background: rgba($color: #0077ff, $alpha: 0.1);
        .index-style-internal {
          background: #0077ff;
        }
      }
      .label-style {
        color: #333;
      }
    }
  }
}
</style>
