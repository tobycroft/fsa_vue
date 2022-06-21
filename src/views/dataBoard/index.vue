<template>
  <div class="data-coard-container">
    <!-- 背景图片 -->
    <div class="background-box">
      <van-image
        v-show="hashDomain(this.associationInfo.import_type, 'fj')"
        :src="require('@/assets/images/login_background_fj.png')"
      ></van-image>
      <van-image
        v-show="hashDomain(this.associationInfo.import_type, 'gt')"
        :src="require('@/assets/images/login_background_gt.jpg')"
      ></van-image>
      <div class="data-board-style">
        <div class="blur-style"></div>
        <van-image
          class="data-board-bg-style"
          :src="require('@/assets/images/data_board_bg.png')"
        ></van-image>
      </div>
    </div>

    <!-- 主体内容 -->
    <article>
      <Card class="page-box-style" :radius="40">
        <!-- 覆盖 | 宣讲 | 区域 面板信息 -->
        <DataBoardCard
          :coverTotalNumber="coverTotalNumber"
          :preachTotalNumber="preachTotalNumber"
          :areaCoverage="areaCoverage"
        />

        <!-- tabs区域 -->
        <TabsNum
          class="tabs-num-style"
          :list="tabsList"
          :active="active"
          @change="tabsNumChange"
        />

        <!-- 排行榜 -->
        <DataShow ref="dataShow" :active="active" @change="changeDataShow" />
      </Card>
    </article>
  </div>
</template>

<script>
import { hashDomain } from "@/utils/common";

export default {
  components: {
    Card: () => import("@/components/Card"),
    IconTitle: () => import("@/components/IconTitle"),
    TimeUpdate: () => import("@/components/TimeUpdate"),
    NumUnit: () => import("@/components/NumUnit"),
    TabsNum: () => import("@/components/TabsNum"),
    DataBoardCard: () => import("@/components/DataBoardCard"),
    DataShow: () => import("./components/DataShow"),
  },
  data() {
    return {
      tabsList: [
        "近期区域",
        "承办单位",
        "宣讲详情",
        "区域覆盖",
        "授课排名",
        "新增人数",
      ],

      // 覆盖总人数
      coverTotalNumber: 0,
      // 宣讲总场次
      preachTotalNumber: 0,
      // 区域覆盖率
      areaCoverage: 0,
      active: 0,
      bgLoad: false,
      // 机构信息
      associationInfo: {},
    };
  },
  created() {
    this.associationInfo = this.$store.getters.associationInfo;
    this.coverTotalNumberAPI();
    this.preachTotalNumberAPI();
    this.areaCoverageAPI();
  },
  methods: {
    hashDomain,

    /**
     * tabsNum 选中项发生改变
     */
    tabsNumChange(val) {
      console.log("tabsNum_val :>> ", val);
      this.active = val;
      this.$refs.dataShow.activeSwipe(this.active);
    },
    /**
     * DataShow组件的change事件
     */
    changeDataShow(val) {
      console.log("DataShow_val :>> ", val);
      this.active = val;
    },

    /**
     * 覆盖总人数API
     */
    async coverTotalNumberAPI() {
      const aid = this.$store.getters.associationInfo.id;
      const data = {
        aid,
      };
      const res = await this.$request("lecture.coverTotalNumber", data);
      console.log("覆盖总人数API_res :>> ", res);
      this.coverTotalNumber = res;
    },
    /**
     * 宣讲总场次API
     */
    async preachTotalNumberAPI() {
      const aid = this.$store.getters.associationInfo.id;
      const data = {
        type: "all",
        aid,
      };
      const res = await this.$request("lecture.preachTotalNumber", data);
      console.log("宣讲总场次API_res :>> ", res);
      this.preachTotalNumber = res;
    },
    /**
     * 区域覆盖率API
     */
    async areaCoverageAPI() {
      const aid = this.$store.getters.associationInfo.id;
      const data = { aid };
      const res = await this.$request("lecture.areaCoverage", data);
      console.log("区域覆盖率API_res :>> ", res);
      this.areaCoverage = res;
    },
  },
};
</script>

<style lang="scss" scoped>
.data-coard-container {
  position: relative;
  .background-box {
    position: relative;
    .data-board-style {
      padding: px(29) px(28);
      border: px(1) solid #192681;
      border-radius: px(40) px(40) 0 0;
      overflow: hidden;
      opacity: 0.8;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      .blur-style {
        background: #192681;
        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
  }

  article {
    padding-top: px(620);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .page-box-style {
      padding: px(24);
      height: 100vh;
      background: #f3f5f9;

      .tabs-num-style,
      .top-list-style {
        margin: px(50) px(24) 0;
      }
    }
  }
}
</style>
