<template>
  <div class="table-list-container">
    <Card class="content-box" :radius="16">
      <div v-show="showTitle" class="header flex">
        <p class="title">{{ title }}</p>
        <CheckDetailsBtn @click="onCheckDetail" />
      </div>
      <el-table
        class="table-style"
        :data="list"
        stripe
        :show-header="showHeader"
        style="width: 100%"
        :header-row-style="{
          color: '#0077FF',
          fontSize: fontSize + 'px',
        }"
      >
        <el-table-column
          v-if="showSort"
          type="index"
          label="名次"
          :width="sortWidth"
          align="center"
        >
          <template slot-scope="scope">
            <van-image
              class="sort-num-style"
              v-if="scope.$index + 1 === 1"
              :src="require('@/assets/icon/top_one_icon.png')"
            />
            <van-image
              class="sort-num-style"
              v-else-if="scope.$index + 1 === 2"
              :src="require('@/assets/icon/top_two_icon.png')"
            />
            <van-image
              class="sort-num-style"
              v-else-if="scope.$index + 1 === 3"
              :src="require('@/assets/icon/top_three_icon.png')"
            />
            <p class="sort-num-style sort-num-text-style" v-else>
              {{ scope.$index + 1 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(columnItem, columnIndex) in columns"
          :key="columnIndex"
          :prop="columnItem.keyName"
          :label="columnItem.label"
          :width="columnItem.width ? columnItem.width : ''"
          align="center"
        >
          <template slot-scope="scope">
            <p class="column-default-style">
              {{ scope.row[columnItem.keyName] }}
            </p>
          </template>
        </el-table-column>
      </el-table>
    </Card>
  </div>
</template>

<script>
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

    // 列表数据标题以及数据Key值
    columns: {
      type: [Array, Object],
      required: true,
    },

    // 排行榜列表数据
    list: {
      type: [Array, Object],
      required: true,
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true,
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

  data() {
    return {
      fontSize: this.$cpx(26),
      sortWidth: this.$cpx(100),
    };
  },

  methods: {
    onCheckDetail() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.table-list-container {
  .content-box {
    padding: px(24);
    .header {
      .title {
        font-size: px(32);
        font-weight: bold;
      }
    }

    .table-style {
      margin: px(17) 0 0 0;
      ::v-deep thead {
        th.el-table__cell {
          background: #f3f5f9;
        }
        th.el-table__cell.is-leaf {
          border: none;
        }
      }
      ::v-deep tbody {
        .el-table__row--striped {
          background: #f3f5f9;
          .el-table__cell {
            background: #f3f5f9;
            border: none;
          }
        }
      }

      .column-default-style {
        font-size: px(26);
        color: #999999;
      }

      .sort-num-style {
        width: px(32);
        height: px(40);
        text-align: center;
      }
      .sort-num-text-style {
        width: 100%;
        line-height: px(40);
        font-weight: bold;
        text-align: center;
      }

      .num-style {
        color: #999999;
      }
    }

    .zebra-row-style {
      background: #f3f5f9;
    }
  }
}
</style>
