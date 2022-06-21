<template>
  <div class="recent-undertaking-unit-container">
    <TopList :showTitle="false" :list="topListUndertakeCmp" :showSort="false" />
  </div>
</template>

<script>
export default {
  components: {
    TopList: () => import("@/components/TopList"),
  },
  computed: {
    // 近期承办单位列表`
    topListUndertakeCmp() {
      const arr = [];
      this.recentList.forEach((item) => {
        arr.push({
          label: item.host_info.name,
          value: this.handleDateFormat(item.start_date),
        });
      });
      console.log("近期承办单位列表arr :>> ", arr);
      return arr;
    },
  },
  data() {
    return {
      // 近期列表
      recentList: [],
    };
  },
  created() {
    this.recentListAPI();
  },
  methods: {
    /**
     * 格式化日期
     */
    handleDateFormat(date) {
      return this.$dateFormat(date, "yyyy年mm月dd日");
    },
    /**
     * 近期列表API
     */
    async recentListAPI() {
      const aid = this.$store.getters.associationInfo.id;
      const data = { aid };
      const res = await this.$request("lecture.recentList", data);
      console.log("近期列表API_res :>> ", res);
      this.recentList = res;
    },
  },
};
</script>

<style lang="scss" scoped>
.recent-undertaking-unit-container {
  padding: px(24);
}
</style>
