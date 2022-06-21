<template>
  <div class="column-chart-container">
    <Card class="card-style">
      <div v-show="showTitle" class="header flex">
        <p class="title">{{ title }}</p>
        <CheckDetailsBtn @click="onClick" />
      </div>

      <ul class="list-style">
        <li
          class="list-item-style flex"
          :class="{ ['zebra-row-style']: index % 2 === 0 }"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="flex-start">
            <p>{{ item.label }}</p>
          </div>
          <div class="progress-style">
            <van-progress
              :percentage="percentage(item.num, maxNum)"
              stroke-width="8"
              :show-pivot="false"
            />
          </div>
          <div class="num-style flex-start">
            <p>{{ item.num }}</p>
            <p>人</p>
          </div>
        </li>
      </ul>
    </Card>
  </div>
</template>

<script>
import { percentage } from "@/utils/common";

export default {
  components: {
    Card: () => import("@/components/Card"),
    CheckDetailsBtn: () => import("@/components/CheckDetailsBtn"),
  },
  props: {
    // 标题
    title: {
      type: String,
      default: "标题",
    },
    // 排行榜列表数据
    list: {
      type: [Array, Object],
      required: true,
    },
    // 是否显示标题
    showTitle: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    list(newVal) {
      this.initProgress(newVal);
    },
  },
  data() {
    return {
      maxNum: null,
    };
  },
  created() {
    this.initProgress(this.list);
  },
  methods: {
    // 计算百分比
    percentage,

    /**
     * 从数组对象当中获取数字数组
     * @param {Array,Object} arrObj 数组对象
     * @returns {Array} 返回数字数组
     */
    getNumArr(arrObj) {
      const arr = [];
      for (const item of arrObj) {
        arr.push(item.num);
      }
      return arr;
    },

    /**
     * 初始化进度条数据
     * @param {Array,Object} list 数据列表
     */
    initProgress(list) {
      const numArr = this.getNumArr(list);
      this.maxNum = Math.max(...numArr);
    },

    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.column-chart-container {
  .card-style {
    padding: px(24);
    .header {
      margin: 0 0 px(17) 0;
      .title {
        font-size: px(32);
        font-weight: bold;
      }
    }

    .list-style {
      margin: px(17) 0 0 0;
      .list-item-style {
        padding: px(24) px(17);
        font-size: px(26);

        .progress-style {
          width: px(422);
        }

        .num-style {
          color: #999999;
        }
      }
    }

    .zebra-row-style {
      background: #f3f5f9;
    }
  }
}
</style>
