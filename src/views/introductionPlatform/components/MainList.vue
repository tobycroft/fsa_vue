<template>
  <div class="main-list-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(item, index) in list" :key="index" class="main-talker-item">
        <MainTalker
          :avatarUrl="item.img ? item.img : ''"
          :userName="item.name"
          :patrolDistricts="item.area_count"
          :activitySession="item.lecture_count"
          :participation="item.sum_visitor"
        />
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "MainList",
  components: {
    MainTalker: () => import("./MainTalker.vue"),
  },
  props: {
    aid: {
      type: [Number, String],
      default: "",
    },
    keyword: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      limit: 10,
    };
  },
  methods: {
    async onLoad() {
      const res = await this.instructorInfoSearchAPI(
        this.aid,
        this.page,
        this.limit,
        this.keyword
      );

      for (const item of res.data) {
        this.list.push(item);
      }

      this.page += 1;

      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (this.page > res.last_page) {
        this.finished = true;
      }

      this.$emit("changeTotal", res.total);
    },
    /**
     * 获取导师搜索列表API
     * @param {String} aid 工会ID
     * @param {String} page 当前页码
     * @param {String} limit 每页显示条数
     * @param {String} name 搜索关键字
     */
    async instructorInfoSearchAPI(aid, page, limit, keyword) {
      const data = { aid, page, limit, name: keyword };
      return await this.$request("instructor.instructorInfoSearch", data);
    },
    onSearch() {
      this.list = [];
      this.page = 1;
      this.loading = true;
      this.finished = false;
      this.onLoad();
    },
  },
};
</script>

<style lang="scss" scoped>
.main-list-container {
}
</style>
