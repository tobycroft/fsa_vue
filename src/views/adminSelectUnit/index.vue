<template>
  <div>
    <van-search v-model="searchKeyword" placeholder="请输入主办方关键词" />
    <div class="gap"></div>
    <div class="container">
      <div
        class="section"
        :class="{ 'one-style': index === 0 }"
        v-for="(item, index) in hostList"
        :key="item.id"
        @click="handleSelect(item.id, item.name)"
      >
        <span class="char">{{ item.name }}</span>
      </div>
    </div>
    <div class="no-more">没有更多了~</div>

    <div class="bottom-gap"></div>
    <div class="btn-bottom" @click="handleAdd">新建</div>
  </div>
</template>

<script>
import bus from "@/utils/bus.js";
import { handleSortReverse } from "@/utils/common";

export default {
  components: {},
  data() {
    return {
      searchKeyword: "",
      // 分页参数
      page: {
        // 每页显示条数
        limit: 10,
        // 当前页码
        pageNo: 1,
      },
      hostList: [],
    };
  },
  created() {
    this.reqHostList();
  },

  methods: {
    handleSelect(id, name) {
      bus.$emit("hostObj", { id, name });

      // this.$route.params.hid = id;
      // this.$route.params.name = name;
      this.$router.back();
    },
    /**
     *   主办方列表
     */
    async reqHostList() {
      const aid = this.$store.getters.associationInfo.id;
      const data = { aid };
      const res = await this.$request("host.hostList", data);
      console.log("主办方列表 :>> ", typeof res);
      this.hostList = handleSortReverse(res);
    },

    handleAdd() {
      this.$router.push({
        path: "/adminAddtUnit",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: px(146);
  background: #ffffff;
}
.gap {
  background: #f3f5f9;
  height: px(16);
}
.container {
  background: #ffffff;

  padding: 0 0 px(24);
  box-sizing: border-box;
  .section {
    padding: 0 px(24);
    height: px(101);
    line-height: px(101);
    border-bottom: px(1) solid #eeeeee;

    .char {
      font-size: px(32);
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
  }

  .one-style {
    background: #cccccc;
  }
}
.no-more {
  text-align: center;
  margin-top: px(40);
  font-size: px(24);
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
}

.bottom-gap {
  height: px(1);
  margin-bottom: px(120);
}

.btn-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: px(120);
  background: #ffffff;
  font-size: px(32);
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: bold;
  color: #0077ff;
  line-height: px(120);
  text-align: center;
}
</style>
