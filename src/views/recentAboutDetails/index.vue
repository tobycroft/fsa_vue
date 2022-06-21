<template>
  <div class="recent-about-details-container">
    <TableList
      :columns="cloumnListRecentAboutDetails"
      :list="preachListRecentAboutDetailsCmp"
      :showSort="false"
      :showTitle="false"
    />
  </div>
</template>

<script>
export default {
  components: {
    TableList: () => import("@/components/TableList"),
  },
  computed: {
    // 近期宣讲详情 listData
    preachListRecentAboutDetailsCmp() {
      const arr = [];
      this.recentList.forEach((item) => {
        arr.push({
          ...item.instructor_info,
          title: item.title,
          visitor: `${item.visitor}人`,
        });
      });
      console.log("近期宣讲详情arr :>> ", arr);
      return arr;
    },
  },
  data() {
    return {
      // 近期宣讲详情 column
      cloumnListRecentAboutDetails: [
        {
          label: "宣讲主题",
          keyName: "title",
        },
        {
          label: "主讲人",
          keyName: "name",
          width: 70,
        },
        {
          label: "听课人数",
          keyName: "visitor",
          width: 80,
        },
      ],
      // 近期列表
      recentList: [],
    };
  },
  created() {
    this.recentListAPI();
  },
  methods: {
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
.recent-about-details-container {
  padding: px(24);
}
</style>
