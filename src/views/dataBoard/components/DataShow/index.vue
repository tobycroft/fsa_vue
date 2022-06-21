<template>
  <div class="data-show-container">
    <van-swipe
      ref="swipe"
      :show-indicators="false"
      :immediate="false"
      @change="changeSwipe"
    >
      <!-- 近期宣讲区域列表 -->
      <van-swipe-item>
        <TopList
          class="card-row-style"
          title="近期宣讲区域列表"
          :list="recentPreachAreaListCmp"
          :showSort="false"
          @click="goToPreachingArea"
        />
      </van-swipe-item>

      <!-- 近期承办单位列表 -->
      <van-swipe-item>
        <TopList
          class="card-row-style"
          title="近期承办单位列表"
          :list="topListUndertakeCmp"
          :showSort="false"
          @click="goToRecentUndertakingUnit"
        />
      </van-swipe-item>

      <!-- 近期宣讲详情 -->
      <van-swipe-item>
        <TableList
          class="card-row-style"
          title="近期宣讲详情"
          :columns="cloumnListRecentAboutDetails"
          :list="preachListRecentAboutDetailsCmp"
          :showSort="false"
          @click="goToRecentAboutDetails"
        />
      </van-swipe-item>

      <!-- 宣讲区域覆盖人数排名 -->
      <van-swipe-item>
        <TopList
          title="宣讲区域覆盖人数排名"
          :list="topListCoverCmp"
          @click="goToPreachRegionalCoverageNumberRank"
        />
      </van-swipe-item>

      <!-- 授课老师宣讲数据排名 -->
      <van-swipe-item>
        <TableList
          class="card-row-style"
          title="授课老师宣讲数据排名"
          :columns="cloumnListPreach"
          :list="instructorListCmp"
          @click="goToTeacherSpeakingRank"
        />
      </van-swipe-item>

      <!-- 新增宣讲覆盖人数 -->
      <van-swipe-item>
        <ColumnChart
          class="card-row-style"
          title="新增宣讲覆盖人数"
          :list="dateCoverListCmp"
          @click="goToAddPreachCovers"
        />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { handleAreaLevel } from "@/utils/common";

export default {
  components: {
    TabsNum: () => import("@/components/TabsNum"),
    TopList: () => import("@/components/TopList"),
    ColumnChart: () => import("@/components/ColumnChart"),
    TableList: () => import("@/components/TableList"),
  },
  props: {
    // 当前选中列表项下标
    active: {
      type: Number,
      default: 0,
      required: true,
    },
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
    // 近期承办单位列表
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
    // 授课老师排名列表
    instructorListCmp() {
      console.log("debug :>> ", this.instructorList);
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
    // 排行榜:新增宣讲覆盖
    dateCoverListCmp() {
      const arr = [];

      this.dateCoverList.forEach((item) => {
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
      // 宣讲数据排名 column
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
      // 近期承办单位列表
      topListUndertake: [
        {
          label: "福州市台江区上海街道社区",
          value: "2022年2月25日",
        },
        {
          label: "福州市台江区上海街道社区",
          value: "2022年2月25日",
        },
        {
          label: "福州市台江区上海街道社区",
          value: "2022年2月25日",
        },
        {
          label: "福州市台江区上海街道社区",
          value: "2022年2月25日",
        },
      ],
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
      // 覆盖列表
      coverList: [],
      // 授课老师排名列表
      instructorList: [],
      // 日期覆盖列表
      dateCoverList: [],
    };
  },

  created() {
    this.recentListAPI();
    this.coverListAPI();
    this.instructorListAPI();
    this.dateCoverListAPI();
  },

  methods: {
    /**
     * 每一页轮播结束后触发
     */
    changeSwipe(val) {
      this.$emit("change", val);
    },
    /**
     * 切换到指定位置
     */
    activeSwipe(active) {
      this.$refs.swipe.swipeTo(active);
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
      this.dateCoverList = res;
    },
    /**
     * 格式化日期
     */
    handleDateFormat(date) {
      return this.$dateFormat(date, "yyyy年mm月dd日");
    },
    /**
     * 处理区域数据
     */
    handleAreaText(item) {
      return `${item.province}${item.city}${item.district}${item.street}`;
    },

    /**
     * 跳转:近期宣讲区域列表
     */
    goToPreachingArea() {
      this.$router.push({
        path: `/preachingArea`,
      });
    },
    /**
     * 跳转:近期承办单位列表
     */
    goToRecentUndertakingUnit() {
      this.$router.push({
        path: `/recentUndertakingUnit`,
      });
    },
    /**
     * 跳转:近期宣讲详情
     */
    goToRecentAboutDetails() {
      this.$router.push({
        path: `/recentAboutDetails`,
      });
    },
    /**
     * 跳转:宣讲区域覆盖人数排名
     */
    goToPreachRegionalCoverageNumberRank() {
      this.$router.push({
        path: `/preachRegionalCoverageNumberRank`,
      });
    },
    /**
     * 跳转:授课老师宣讲数据排名
     */
    goToTeacherSpeakingRank() {
      this.$router.push({
        path: `/teacherSpeakingRank`,
      });
    },
    /**
     * 跳转:新增宣讲覆盖人数
     */
    goToAddPreachCovers() {
      this.$router.push({
        path: `/addPreachCovers`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.data-show-container {
  padding: px(34) px(0);
  .card-row-style {
    margin: px(0) px(24);
  }
}
</style>
