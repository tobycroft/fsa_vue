<template>
  <div class="host-unit-list-container">
    <van-list
      class="main-talker-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(item, index) in list" :key="index" class="main-talker-item">
        <HostUnitRow
          :avatarUrl="item.img ? item.img : ''"
          :userName="item.name"
          :employee="item.employee"
          :student="item.student"
        />
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "HostUnitList",
  components: {
    HostUnitRow: () => import("./HostUnitRow.vue"),
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
      limit: 10,
      page: 1,
    };
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      const res = await this.hostInfoSearchAPI();
      console.log("res :>> ", res);

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

    async hostInfoSearchAPI() {
      const data = {
        aid: this.aid,
        limit: this.limit,
        page: this.page,
        name: this.keyword,
      };
      return await this.$request("host.hostInfoSearch", data);
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
.host-unit-list-container {
}
</style>
