<template>
  <div class="introduction-platform-container">
    <van-image
      class="bg-style"
      :src="require('@/assets/images/introduction_platform_bg.png')"
    ></van-image>

    <article>
      <Logo
        class="logo-style"
        :imgUrl="unionDetails.logo ? unionDetails.logo : ''"
        :size="250"
        round
        border
      />

      <Card :radius="16" class="introduction-box">
        <p class="introduction-title">{{ unionDetails.name }}</p>
        <p class="introduction-content">{{ unionDetails.info }}</p>
      </Card>

      <van-tabs class="tabs-style" ref="tabs" v-model="active" color="#0077FF">
        <!-- 平台简介 -->
        <van-tab title="平台简介">
          <van-image
            class="members-the-list-img"
            :src="unionDetails.poster"
          ></van-image>
        </van-tab>
        <!-- 讲师公示 -->
        <van-tab
          v-if="hashDomain(associationInfo.import_type, 'fj')"
          title="讲师公示"
        >
          <div class="tab-content">
            <van-search
              class="search-style"
              v-model="keywordMain"
              placeholder="请输入讲师名称"
              shape="round"
              @search="onSearch"
              @clear="onClear"
            />

            <p class="main-talker-box-label">全部主讲人({{ totalMain }})</p>

            <MainList
              ref="mainList"
              :aid="currentTradeUnionID"
              :keyword="keywordMain"
              @changeTotal="changeTotalMain"
            />

            <!-- <ul class="main-talker-list">
             
            </ul> -->
          </div>
        </van-tab>
        <!-- 成员单位 -->
        <van-tab
          v-if="hashDomain(associationInfo.import_type, 'gt')"
          title="成员单位"
        >
          <div class="tab-content">
            <van-search
              class="search-style"
              v-model="keywordHost"
              placeholder="请输入成员单位名称"
              shape="round"
              @search="onSearchHostUnit"
              @clear="hostSearchClear"
            />

            <p class="main-talker-box-label">全部成员单位({{ totalHost }})</p>

            <HostUnitList
              ref="hostUnitList"
              :aid="currentTradeUnionID"
              :keyword="keywordHost"
              @changeTotal="changeTotalHost"
            />
          </div>
        </van-tab>
      </van-tabs>
    </article>
  </div>
</template>

<script>
import { handleSearch, handleSortReverse, hashDomain } from "@/utils/common";

export default {
  components: {
    Logo: () => import("@/components/Logo"),
    Card: () => import("@/components/Card"),
    MainList: () => import("./components/MainList.vue"),
    HostUnitList: () => import("./components/HostUnitList.vue"),
  },
  data() {
    return {
      // 列表总数
      totalHost: 0,
      // 搜索关键字-成员单位
      keywordHost: "",
      // 列表总数
      totalMain: 0,
      // 搜索关键字
      keywordMain: "",

      // 当前选中 tab
      active: 0,
      // 主讲人列表
      mainTalkerList: [],
      // 当前工会ID
      currentTradeUnionID: null,
      // 工会详情
      unionDetails: {},
      // 成员单位列表
      hostUnitList: [],
      // 机构信息
      associationInfo: {},
    };
  },
  async created() {
    this.associationInfo = this.$store.getters.associationInfo;
    this.currentTradeUnionID = this.associationInfo.id;
    this.obtainTradeUnionAPI(this.currentTradeUnionID);
  },
  updated() {
    // 解决 tabs 选中下划线位置异常的问题
    this.$refs.tabs.resize();
  },
  methods: {
    hashDomain,
    onSearch() {
      this.$refs.mainList.onSearch();
    },
    onClear() {
      this.keywordMain = "";
      setTimeout(() => {
        this.$refs.mainList.onSearch();
      }, 100);
    },
    /**
     * 搜索"成员单位"
     */
    onSearchHostUnit() {
      this.$refs.hostUnitList.onSearch();
    },
    /**
     * 清除"成员单位"搜索内容
     */
    hostSearchClear() {
      this.keywordHost = "";
      setTimeout(() => {
        this.$refs.hostUnitList.onSearch();
      }, 100);
    },
    changeTotalHost(val) {
      this.totalHost = val;
    },
    changeTotalMain(val) {
      this.totalMain = val;
    },

    /**
     * 获取某个工会API
     * @param {String} aid 工会ID
     */
    async obtainTradeUnionAPI(aid) {
      const data = {
        id: aid,
      };
      const res = await this.$request("association.obtainTradeUnion", data);
      console.log("获取某个工会API_res :>> ", res);
      this.unionDetails = res;
    },
    /**
     * 导师列表API
     * @param {String} aid 工会ID
     */
    async mentorListAPI(aid) {
      const data = { aid };
      const res = await this.$request("instructor.mentorList", data);
      console.log("导师列表API_res :>> ", res);
      this.mainTalkerList = handleSortReverse(res);
    },
  },
};
</script>

<style lang="scss" scoped>
.introduction-platform-container {
  position: relative;
  .bg-style {
    width: 100%;
    height: px(560);
  }
  article {
    padding: 0 px(24);
    text-align: center;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    .logo-style {
      margin: px(100) 0 px(88);
    }
    .introduction-box {
      padding: px(37) px(49) px(40);
      .introduction-title {
        width: auto;
        font-size: px(48);
        font-weight: 800;
        color: #000000;
        text-decoration: underline solid $primary-color px(12);
      }
      .introduction-content {
        margin-top: px(23);
        font-size: px(26);
        color: #000000;
        line-height: px(48);
      }
    }
    .tabs-style {
      margin-top: px(40);
      ::v-deep .van-tabs__nav {
        background-color: transparent;
        .van-tab {
          font-size: px(36);
          color: #999999;
        }
        .van-tab--active {
          font-size: px(36);
          font-weight: bold;
          color: #333333;
        }
      }

      .tab-content {
        margin: px(32) 0 px(129);
        .tab-item {
          margin-bottom: px(24);
        }

        .search-style {
          background-color: transparent;
          ::v-deep .van-search__content {
            background: #fff;
          }
        }

        .main-talker-box-label {
          margin: px(48) 0 px(24);
          text-align: left;
          font-size: px(40);
          font-weight: bold;
          color: #333333;
        }

        .main-talker-list {
          .main-talker-item {
            margin: px(24) 0 0 0;
          }
        }
      }
      .members-the-list-img {
        margin-top: px(24);
      }
    }
  }
}
</style>
