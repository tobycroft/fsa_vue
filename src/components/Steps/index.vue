<template>
  <div class="steps-container">
    <ul class="list flex-around">
      <li v-for="(item, index) in list" :key="index" class="list-item">
        <div class="step-num-box" :class="{ ['active-idx']: active >= index }">
          {{ index + 1 }}
        </div>
        <div
          class="step-label-box"
          :class="{ ['active-font']: active >= index }"
        >
          {{ item }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // 步骤列表
    list: {
      type: [Array],
      default: () => ["第一步", "第二步", "第三步"],
    },
    // 初始步骤
    activeStep: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      // 当前选中下标, 默认0
      active: null,
    };
  },

  created() {
    this.active = this.activeStep;
  },

  methods: {
    /**
     * 下一步
     */
    next() {
      if (this.active >= this.list.length - 1) {
        console.log("已经是最后一步了 :>>>");
        return;
      }

      this.active++;

      this.changeActive(this.active);
    },

    /**
     * 上一步
     */
    previous() {
      if (this.active <= 0) {
        console.log("已经是第一步了 :>>");
        return;
      }

      this.active--;

      this.changeActive(this.active);
    },

    /**
     * 通知父组件当前步骤发生变化
     */
    changeActive(active) {
      this.$emit("change", active);
    },
  },
};
</script>

<style lang="scss" scoped>
.steps-container {
  .list {
    .list-item {
      font-size: px(26);
      color: $disable-color;
      text-align: center;
      .step-num-box {
        margin: 0 auto;
        width: px(56);
        height: px(56);
        line-height: px(56);
        background: $disable-bg-color;
        font-weight: bold;
        border-radius: 50%;
      }
      .step-label-box {
        margin-top: px(12);
      }

      .active-idx {
        border: px(4) solid $primary-color;
        background: #fff;
        color: $primary-color;
      }
      .active-font {
        color: $primary-color;
      }
    }
  }
}
</style>
