<template>
  <div class="preaching-area-contain">
    <TopList
      :showTitle="false"
      :showSort="false"
      :list="recentPreachAreaListCmp"
    />
  </div>
</template>

<script>
export default {
  components: {
    TopList: () => import("@/components/TopList"),
  },
  computed: {
    // 近期宣讲区域列表
    recentPreachAreaListCmp() {
      const arr = [];
      this.recentList.forEach((item) => {
        arr.push({
          label: this.handleAreaText(item),
          value: this.handleDateFormat(item.start_date),
        });
      });

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
      console.log("date :>> ", date);

      return this.$dateFormat(date, "yyyy年mm月dd日");
    },
    /**
     * 处理区域数据
     */
    handleAreaText(item) {
      return `${item.province}${item.city}${item.district}${item.street}`;
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
.preaching-area-contain {
  padding: px(24);
}
</style>
