<template>
  <div class="venue-selector-container">
    <van-popup
      v-model="show"
      position="bottom"
      round
      :close-on-click-overlay="false"
    >
      <van-picker
        class="picker-style"
        title="选择地点"
        show-toolbar
        :columns="columns"
        value-key="name"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import pcasCode from "@/static/pcas-code";

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      columns: pcasCode,
    };
  },
  created() {
    console.log("pcasCode :>> ", pcasCode);
    this.handleStreetData(this.columns);
  },
  methods: {
    /**
     * 添加区域选择空选项
     */
    handleStreetData(list) {
      let newList = [];
      newList = Object.assign(list);
      const hashIf = (newList) => {
        for (const item of newList) {
          return item.code === "";
        }
      };
      for (const provinceItem of newList) {
        for (const cityItem of provinceItem.children) {
          const hasIf = hashIf(provinceItem.children);
          console.log("hasIf :>> ", hasIf);
          for (const areaItem of cityItem.children) {
            areaItem.children.push({
              code: "",
              name: "线上",
            });
          }
          cityItem.children.push({
            code: "",
            name: "线上",
            children: [
              {
                code: "",
                name: "线上",
              },
            ],
          });
        }
        provinceItem.children.push({
          code: "",
          name: "线上",
          children: [
            {
              code: "",
              name: "线上",
              children: [
                {
                  code: "",
                  name: "线上",
                },
              ],
            },
          ],
        });
      }
    },

    /**
     * 确认
     */
    onConfirm(value, index) {
      const province = this.columns[index[0]].name;
      const city = this.columns[index[0]].children[index[1]].name;
      const district =
        this.columns[index[0]].children[index[1]].children[index[2]].name;
      const street =
        this.columns[index[0]].children[index[1]].children[index[2]].children[
          index[3]
        ].name;
      // console.log("省 :>> ", province);
      // console.log("市 :>> ", city);
      // console.log("区 :>> ",district);
      // console.log("街道 :>> ", street);
      const val = {
        province,
        city,
        district,
        street,
      };
      this.$emit("confirm", val);
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
.venue-selector-container {
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
