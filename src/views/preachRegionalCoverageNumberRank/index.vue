<template>
  <div class="preach-regional-coverage-number-rank-container">
    <TopList :list="topListCoverCmp" :showTitle="false" />
  </div>
</template>

<script>
import { handleAreaLevel } from "@/utils/common";

export default {
  components: {
    TopList: () => import("@/components/TopList"),
  },
  computed: {
    // 排行榜:覆盖
    topListCoverCmp() {
      const arr = [];
      this.coverList.forEach((item) => {
        console.log("item :>> ", item);
        for (const arrItem of arr) {
          if (arrItem.name === item.city) {
            arrItem.value += item.sum_visitor;
            return;
          }
        }
        arr.push({
          label: this.handleAreaText(item),
          value: `${item.sum_visitor}人`,
        });
      });

      console.log("排行榜:覆盖arr :>> ", arr);
      return arr;
    },
  },
  data() {
    return {
      // 覆盖列表
      coverList: [],
    };
  },
  created() {
    this.coverListAPI();
  },
  methods: {
    /**
     * 处理区域数据
     */
    handleAreaText(item) {
      return `${item.province}${item.city}${item.district}${item.street}`;
    },
    /**
     * 覆盖列表API
     */
    async coverListAPI() {
      const aid = this.$store.getters.associationInfo.id;
      const modelType = handleAreaLevel(
        this.$store.getters.associationInfo.model_type
      );
      const data = { aid, type: modelType };
      const res = await this.$request("common.coverList", data);
      console.log("覆盖列表API_res :>> ", res);
      this.coverList = res;
    },
  },
};
</script>

<style lang="scss" scoped>
.preach-regional-coverage-number-rank-container {
  padding: px(24);
}
</style>
