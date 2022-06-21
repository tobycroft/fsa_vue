<template>
  <div class="active-dynamic-container">
    <van-search
      v-model="keyword"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @clear="onClear"
    />
    <van-tabs v-model="activeTab" animated @change="changeTabs">
      <van-tab title="全部">
        <van-list
          class="list-style"
          v-model="loadingDynamic"
          :finished="finishedDynamic"
          finished-text="没有更多了"
          @load="onLoadDynamic"
        >
          <div
            v-for="item in activeDynamicList"
            :key="item.id"
            @click="goToDetail(item)"
          >
            <ActiveRow :data="item" class="active-row-style" />
          </div>
        </van-list>
      </van-tab>

      <van-tab title="已备案">
        <van-list
          class="list-style"
          v-model="loadingCertain"
          :finished="finishedCertain"
          finished-text="没有更多了"
          @load="onLoadCertain"
        >
          <div
            v-for="item in listBeforeCertainTime"
            :key="item.id"
            @click="goToDetail(item)"
          >
            <ActiveRow :data="item" class="active-row-style" />
          </div>
        </van-list>
      </van-tab>
      <van-tab title="已提交">
        <van-list
          class="list-style"
          v-model="loadingPeriod"
          :finished="finishedPeriod"
          finished-text="没有更多了"
          @load="onLoadPeriod"
        >
          <div
            v-for="item in listAfterCertainPeriodTime"
            :key="item.id"
            @click="goToDetail(item)"
          >
            <ActiveRow :data="item" class="active-row-style" />
          </div>
        </van-list>
        <!-- <ul class="list-style">
          <li
            v-for="item in listAfterCertainPeriodTime"
            :key="item.id"
            @click="goToDetail(item)"
          >
            <ActiveRow :data="item" class="active-row-style" />
          </li>
        </ul> -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { handleSearch } from "@/utils/common";

export default {
  components: {
    ActiveRow: () => import("./components/ActiveRow"),
  },
  data() {
    return {
      keyword: "",
      activeTab: null,

      loadingDynamic: false,
      finishedDynamic: false,

      loadingCertain: false,
      finishedCertain: false,

      loadingPeriod: false,
      finishedPeriod: false,

      pageDynamic: {
        limit: 10,
        pageNo: 1,
      },
      pageCertain: {
        limit: 10,
        pageNo: 1,
      },
      pagePeriod: {
        limit: 10,
        pageNo: 1,
      },

      // 工会ID
      aid: null,
      // 活动动态列表
      activeDynamicList: [],
      // 讲座模块-某个时间段前的列表(活动列表)API
      listBeforeCertainTime: [],
      // 讲座模块-某个时间段后的列表(活动列表)API
      listAfterCertainPeriodTime: [],
      // 查询的活动列表类型
      type: "association",
    };
  },
  async created() {
    this.aid = this.$store.getters.associationInfo.id;
    this.initListData();
  },
  methods: {
    async onLoadDynamic() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const res = await this.listLectureAPI(
        this.aid,
        this.pageDynamic.pageNo,
        this.pageDynamic.limit,
        this.keyword
      );
      const list = res.data;

      if (list.length <= 0) {
        this.finishedDynamic = true;
        return;
      }

      for (const item of list) {
        this.activeDynamicList.push(item);
      }

      this.pageDynamic.pageNo += 1;

      // 加载状态结束
      this.loadingDynamic = false;

      // 数据全部加载完成
      if (this.pageDynamic.pageNo >= res.last_page) {
        this.finishedDynamic = true;
      }
    },

    async onLoadCertain() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const res = await this.listBeforeCertainTimeAPI(
        this.aid,
        this.pageCertain.pageNo,
        this.pageCertain.limit,
        this.$dateFormat(new Date(), "yyyy-mm-dd")
      );
      const list = res.data;

      if (!list.length > 0) {
        this.finishedCertain = true;
        return;
      }

      for (const item of list) {
        this.listBeforeCertainTime.push(item);
      }

      this.pageCertain.pageNo += 1;

      // 加载状态结束
      this.loadingCertain = false;

      // 数据全部加载完成
      if (this.pageCertain.pageNo >= res.last_page) {
        this.finishedCertain = true;
      }
    },

    async onLoadPeriod() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const res = await this.listAfterCertainPeriodTimeAPI(
        this.aid,
        this.pagePeriod.pageNo,
        this.pagePeriod.limit,
        this.$dateFormat(new Date(), "yyyy-mm-dd")
      );
      const list = res.data;

      console.log("list :>> ", list);

      if (list.length <= 0) {
        this.finishedPeriod = true;
        return;
      }

      for (const item of list) {
        this.listAfterCertainPeriodTime.push(item);
      }

      this.pagePeriod.pageNo += 1;

      // 加载状态结束
      this.loadingPeriod = false;

      // 数据全部加载完成
      if (this.pagePeriod.pageNo >= res.last_page) {
        this.finishedPeriod = true;
      }
    },

    /**
     * 初始化数据
     */
    initListData() {
      // this.listLectureAPI(this.aid, this.page.pageNo, this.page.limit);
      // this.listBeforeCertainTimeAPI(
      //   this.aid,
      //   this.page.pageNo,
      //   this.page.limit,
      //   this.$dateFormat(new Date(), "yyyy-mm-dd")
      // );
      // this.listAfterCertainPeriodTimeAPI(
      //   this.aid,
      //   this.page.pageNo,
      //   this.page.limit,
      //   this.$dateFormat(new Date(), "yyyy-mm-dd")
      // );
    },
    /**
     * 当前激活的标签改变时触发
     */
    changeTabs(params) {
      console.log("params :>> ", params);
      switch (params) {
        case 0:
          // this.listLectureAPI(this.aid, this.page.pageNo, this.page.limit);
          break;
        case 1:
          // this.listBeforeCertainTimeAPI(
          //   this.aid,
          //   this.page.pageNo,
          //   this.page.limit,
          //   this.$dateFormat(new Date(), "yyyy-mm-dd")
          // );
          break;
        case 2:
          // this.listAfterCertainPeriodTimeAPI(
          //   this.aid,
          //   this.page.pageNo,
          //   this.page.limit,
          //   this.$dateFormat(new Date(), "yyyy-mm-dd")
          // );
          break;

        default:
          console.log("Error :>> ", "changeTabs参数异常");
          break;
      }
    },

    /**
     * 讲座模块-获取列表(活动列表)API
     * @param {String} aid 工会ID
     * @param {Number} page 当前页码
     * @param {Number} limit 每页显示条数
     * @param {Date} start_date 当前日期
     */
    async listLectureAPI(aid, page, limit, start_date) {
      console.log("this.keyword :>> ", this.keyword);
      const data = {
        title: this.keyword,
        aid,
        page,
        limit,
        start_date,
        type: this.type,
      };
      const res = await this.$request("common.lectureInfoSearch", data);
      console.log("讲座模块-获取列表(活动列表)API_res :>> ", res);
      return res;
    },
    /**
     * 讲座模块-某个时间段前的列表(活动列表)API
     * @param {String} aid 工会ID
     * @param {Number} page 当前页码
     * @param {Number} limit 每页显示条数
     * @param {Date} start_date 当前日期
     */
    async listBeforeCertainTimeAPI(aid, page, limit, start_date) {
      const data = {
        title: this.keyword,
        aid,
        page,
        limit,
        start_date,
        type: this.type,
      };
      const res = await this.$request("lecture.listBeforeCertainTime", data);
      console.log("讲座模块-某个时间段前的列表(活动列表)API_res :>> ", res);
      return res;
    },
    /**
     * 讲座模块-某个时间段后的列表(活动列表)API
     * @param {String} aid 工会ID
     * @param {Number} page 当前页码
     * @param {Number} limit 每页显示条数
     * @param {Date} start_date 当前日期
     */
    async listAfterCertainPeriodTimeAPI(aid, page, limit, start_date) {
      const data = {
        title: this.keyword,
        aid,
        page,
        limit,
        start_date,
        type: this.type,
      };
      const res = await this.$request(
        "lecture.listAfterCertainPeriodTime",
        data
      );
      console.log("讲座模块-某个时间段后的列表(活动列表)API_res :>> ", res);
      // this.listAfterCertainPeriodTime = res;
      return res;
    },

    /**
     * 跳转活动详情页面
     */
    goToDetail(param) {
      console.log("param :>> ", param);
      this.$router.push({
        path: `/activeDynamicDetails`,
        query: {
          id: param.id,
        },
      });
    },

    /**
     * 初始化加载配置
     */
    initLoadConfig() {
      this.activeDynamicList = [];
      this.listBeforeCertainTime = [];
      this.listAfterCertainPeriodTime = [];
      this.pageDynamic.pageNo = 1;
      this.pageCertain.pageNo = 1;
      this.pagePeriod.pageNo = 1;
      this.loadingDynamic = true;
      this.loadingCertain = true;
      this.loadingPeriod = true;
      this.finishedDynamic = false;
      this.finishedCertain = false;
      this.finishedPeriod = false;
    },

    /**
     * 确定搜索时触发
     */
    onSearch() {
      this.initLoadConfig();
      this.onLoadDynamic();
    },

    /**
     * 点击清除按钮后触发
     */
    onClear() {
      console.log("onClear :>> ");
      this.initLoadConfig();
      this.onLoadDynamic();
    },
  },
};
</script>

<style lang="scss" scoped>
.active-dynamic-container {
  .list-style {
    padding: px(24);
    .active-row-style {
      margin: 0 0 px(24);
    }
  }
}
</style>
