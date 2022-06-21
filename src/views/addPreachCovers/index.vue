<template>
  <div class="add-preach-covers-container">
    <ColumnChart :list="listCmp" :showTitle="false"></ColumnChart>
  </div>
</template>

<script>
export default {
  components: {
    ColumnChart: () => import("@/components/ColumnChart"),
  },
  computed: {
    // 排行榜:新增宣讲覆盖
    listCmp() {
      const arr = [];

      this.list.forEach((item) => {
        arr.push({
          label: this.$dateFormat(item.g_date, "m/dd"),
          num: item.sum_visitor,
        });
        console.log("arr :>> ", arr);
      });

      return arr;
    },
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.dateCoverListAPI();
  },
  methods: {
    /**
     * 日期覆盖列表API
     */
    async dateCoverListAPI() {
      const aid = this.$store.getters.associationInfo.id;
      const data = {
        type: "none",
        aid,
      };
      const res = await this.$request("lecture.dateCoverList", data);
      console.log("日期覆盖列表API_res :>> ", res);
      this.list = res;
    },
  },
};
</script>

<style lang="scss" scoped>
.add-preach-covers-container {
  padding: px(24);
}
</style>
