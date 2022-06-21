<template>
  <div class="top-list-container">
    <Card class="content-box" :radius="16">
      <div v-show="showTitle" class="header flex">
        <p class="title">{{ title }}</p>
        <CheckDetailsBtn @click="onCheckDetail" />
      </div>
      <ul class="list-style">
        <li
          class="list-item-style flex"
          :class="{ ['zebra-row-style']: index % 2 === 0 }"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="flex-start">
            <div v-if="showSort">
              <van-image
                class="sort-value-style"
                v-if="index + 1 === 1"
                :src="require('@/assets/icon/top_one_icon.png')"
              />
              <van-image
                class="sort-value-style"
                v-else-if="index + 1 === 2"
                :src="require('@/assets/icon/top_two_icon.png')"
              />
              <van-image
                class="sort-value-style"
                v-else-if="index + 1 === 3"
                :src="require('@/assets/icon/top_three_icon.png')"
              />
              <p class="sort-value-style sort-value-text-style" v-else>
                {{ index + 1 }}
              </p>
            </div>
            <p>{{ item.label }}</p>
          </div>
          <div class="value-style flex-start">
            <p>{{ item.value }}</p>
          </div>
        </li>
      </ul>
    </Card>
  </div>
</template>

<script>
export default {
  name: "TopList",
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

    // 是否显示排序
    showSort: {
      type: Boolean,
      default: true,
    },

    // 是否显示标题
    showTitle: {
      type: Boolean,
      default: true,
    },
  },

  created() {
    console.log("this.list :>> ", this.list);
  },

  methods: {
    onCheckDetail() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.top-list-container {
  .content-box {
    padding: px(24);
    .header {
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

        .sort-value-style {
          margin: 0 px(14) 0 0;
          width: px(32);
          height: px(40);
          text-align: center;
        }
        .sort-value-text-style {
          line-height: px(40);
          font-weight: bold;
        }

        .value-style {
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
