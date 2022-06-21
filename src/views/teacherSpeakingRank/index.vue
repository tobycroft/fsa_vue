<template>
  <div class="teacher-speaking-rank-container">
    <TableList
      :showTitle="false"
      :columns="cloumnListPreach"
      :list="instructorListCmp"
    />
  </div>
</template>

<script>
export default {
  components: {
    TableList: () => import("@/components/TableList"),
  },
  computed: {
    // 授课老师排名列表
    instructorListCmp() {
      const arr = [];
      for (const key in this.instructorList) {
        arr.push({
          rankingName: `第${parseInt(key) + 1}名`,
          name: this.instructorList[key].instructor_info
            ? this.instructorList[key].instructor_info.name
            : "",
          visitorStr: `${
            this.instructorList[key].instructor_info
              ? this.instructorList[key].sum_visitor
              : 0
          }人`,
          roundStr: `${this.instructorList[key].host_time}场`,
        });
      }
      return arr;
    },
  },
  data() {
    return {
      // 列表数据标题以及数据 Key 值
      cloumnListPreach: [
        {
          label: "姓名",
          keyName: "name",
        },
        {
          label: "听课人数",
          keyName: "visitorStr",
        },
        {
          label: "场次",
          keyName: "roundStr",
        },
      ],
      // 授课老师排名列表
      instructorList: [],
    };
  },
  created() {
    this.instructorListAPI();
  },
  methods: {
    /**
     * 授课老师排名列表API
     */
    async instructorListAPI() {
      const aid = this.$store.getters.associationInfo.id;
      const data = { aid };
      const res = await this.$request("lecture.instructorList", data);
      console.log("授课老师排名列表API_res :>> ", res);
      this.instructorList = res;
    },
  },
};
</script>

<style lang="scss" scoped>
.teacher-speaking-rank-container {
  padding: px(24);
}
</style>
