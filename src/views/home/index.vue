<template>
  <div class="home-container">
    <van-image
      v-show="hashDomain(this.associationInfo.import_type, 'fj')"
      :src="require('@/assets/images/login_background_fj.png')"
    ></van-image>
    <van-image
      v-show="hashDomain(this.associationInfo.import_type, 'gt')"
      :src="require('@/assets/images/login_background_gt.jpg')"
    ></van-image>
    <!-- <van-image
      v-show="bgLoad"
      src="http://familyresearchassociation.oss-cn-shenzhen.aliyuncs.com/fsa/20220516/51a952d7cd60c361ca74c604ea270a9b.gif"
      @load="bgLoad = true"
    ></van-image> -->

    <div class="content">
      <Card class="nav-card-style">
        <van-grid :column-num="3" :gutter="10" :border="false">
          <van-grid-item
            v-for="(item, index) in menuList"
            :key="index"
            @click="goToPage(item.pagePath)"
          >
            <div class="flex">
              <p class="nav-name-style">{{ item.name }}</p>
              <van-image class="nav-icon-style" :src="item.imgUrl" />
            </div>
          </van-grid-item>
        </van-grid>
      </Card>

      <!-- 覆盖总人数 -->
      <CoverPeopleTotal
        :totalNum="coverTotalNumbe"
        :dataSource="coverPeopleTotal_DataSource"
        :xAxisData="coverPeopleTotal_xAxisData"
      />
      <!-- 宣讲总场次 -->
      <PreachTotal
        class="preach-total-style"
        :totalNum="preachTotalNumber"
        :dataSource="preachTotal_dataSource"
        :xAxisData="preachTotal_xAxisData"
        @change="changePreachTotal"
      />
      <!-- 区域覆盖率 -->
      <AreaCoverage class="area-coverage-style" :dataSource="areaCoverage" />
    </div>
  </div>
</template>

<script>
import { hashDomain } from "@/utils/common";

export default {
  components: {
    Card: () => import("@/components/Card"),
    ChartCard: () => import("@/components/ChartCard"),
    CoverPeopleTotal: () => import("./components/echarts/CoverPeopleTotal"),
    PreachTotal: () => import("./components/echarts/PreachTotal"),
    AreaCoverage: () => import("./components/echarts/AreaCoverage"),
  },
  computed: {
    /**
     * 新增宣讲覆盖人数-图表数据
     */
    coverPeopleTotal_DataSource() {
      const arr = [];
      this.dateCoverList.forEach((item) => {
        arr.push(item.visitor);
      });
      console.log("新增宣讲覆盖人数-数据arr :>> ", arr);
      return arr;
    },
    /**
     * 新增宣讲覆盖人数-X轴标签
     */
    coverPeopleTotal_xAxisData() {
      const arr = [];
      this.dateCoverList.forEach((item) => {
        arr.push(this.$dateFormat(item.g_date, "m/dd"));
      });
      console.log("新增宣讲覆盖人数-X轴标题arr :>> ", arr);
      return arr;
    },
    /**
     * 宣讲总场次-图表数据
     */
    preachTotal_dataSource() {
      const arr = [];
      this.preachTotalList.forEach((item) => {
        arr.push(item.host_time);
      });
      console.log("宣讲总场次-数据arr :>> ", arr);
      return arr;
    },
    /**
     * 宣讲总场次-X轴标签
     */
    preachTotal_xAxisData() {
      const arr = [];
      this.preachTotalList.forEach((item) => {
        arr.push(this.$dateFormat(item.date, "m/dd"));
      });
      console.log("宣讲总场次-X轴标题arr :>> ", arr);
      return arr;
    },
  },
  data() {
    return {
      // 菜单列表
      menuList: [
        {
          imgUrl: require("@/assets/icon/unit_icon.png"),
          name: "单位登录",
          pagePath: `/hostHome`,
        },
        {
          imgUrl: require("@/assets/icon/account_in_diagnosis_of.png"),
          name: "讲师登录",
          pagePath: `/lecturerHome`,
        },
        {
          imgUrl: require("@/assets/icon/account_dismantl.png"),
          name: "管理中心",
          pagePath: `/administratorHomePage`,
        },
        {
          imgUrl: require("@/assets/icon/my_team.png"),
          name: "平台简介",
          pagePath: `/introductionPlatform`,
        },
        {
          imgUrl: require("@/assets/icon/drainage_the_task.png"),
          name: "数据展示",
          pagePath: `/dataBoard`,
        },
        {
          imgUrl: require("@/assets/icon/excellent_lecture.png"),
          name: "活动动态",
          pagePath: `/activeDynamic`,
        },
      ],
      // 覆盖总人数
      coverTotalNumbe: 0,
      // 日期覆盖列表
      dateCoverList: [],
      // 宣讲总场次
      preachTotalNumber: 0,
      // 区域覆盖率
      areaCoverage: 0,
      // 宣讲总场次数据列表
      preachTotalList: [],
      // 动图是否加载完成
      bgLoad: false,
      // 机构信息
      associationInfo: {},
    };
  },
  async created() {
    const loginInfo = this.$store.getters.loginInfo;
    // 通过域名获取工会信息
    this.associationInfo = await this.$store.dispatch(
      "association/associationInfoDomainAPI"
    );
    const aid = this.associationInfo.id;

    if (loginInfo.token && loginInfo.uid) {
      // 获取当前账号绑定的各项ID信息
      this.$store.dispatch("user/getAccountIdInfo", aid);
      // 获取主办方ID信息
      this.$store.dispatch("host/hostMemberMeAPI", aid);
      // 获取讲师信息
      this.$store.dispatch("lecturer/getLecturerInfo", aid);
    }

    this.coverTotalNumberAPI();
    this.dateCoverList = await this.dateCoverListAPI();
    this.areaCoverageAPI();
    this.changePreachTotal();
  },
  updated() {
    // 获取当前工会信息
    this.$store.dispatch("association/associationInfoDomainAPI");
  },
  methods: {
    hashDomain,

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
      this.coverTotalNumbe = res;
    },
    /**
     * 日期覆盖列表API
     * @param {String} type 日期列表的状态 none:默认图标(大屏) |all:所有 | week:周 | month:月
     */
    async dateCoverListAPI(type = "none") {
      const aid = this.$store.getters.associationInfo.id;
      const data = {
        type,
        aid,
      };
      const res = await this.$request("lecture.dateCoverList", data);

      console.log("日期覆盖列表API_res :>> ", res);
      return res;
    },
    /**
     * PreachTotal组件改变选项触发
     */
    async changePreachTotal(eventVal) {
      let type = "all";
      switch (eventVal) {
        case 1:
          type = "week";
          break;
        case 2:
          type = "month";
          break;

        default:
          type = "all";
          break;
      }

      const res = await this.dateCoverListAPI(type);
      console.log("PreachTotal组件改变选项触发res :>> ", res);
      this.preachTotalList = res;

      await this.preachTotalNumberAPI(type);
    },
    /**
     * 统计宣讲总场次
     */
    async preachTotalNumberAPI(type) {
      const aid = this.$store.getters.associationInfo.id;
      const data = {
        type,
        aid,
      };
      const res = await this.$request("lecture.preachTotalNumber", data);
      this.preachTotalNumber = res;
      console.log("preachTotalNumber :>> ", this.preachTotalNumber);
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
    /**
     * 页面跳转
     * @param {String} pagePath 跳转的目标页面路径
     */
    goToPage(pagePath) {
      if (pagePath === "") {
        return;
      }
      if (pagePath === "/lecturerHome") {
        const aid = this.$store.getters.associationInfo.id;
        this.$store.dispatch("lecturer.getLecturerInfo", aid);
      }
      if (pagePath === "/administratorHomePage") {
        this.$store.dispatch("user.getAccountIdInfo");
      }
      this.$router.push({
        path: pagePath,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background: $input-bg-color;
  text-align: center;
  .content {
    padding: px(24) px(24);
    .nav-card-style {
      padding: px(12) 0;
      ::v-deep {
        .van-grid-item__content {
          background: #f7f7f7;
          border-radius: px(16);
        }
      }
      .nav-name-style {
        font-size: px(26);
      }
      .nav-icon-style {
        margin-left: px(8);
        width: px(56);
        height: px(56);
      }
    }
    // .menu-list {
    //   .list-item {
    //     .icon-img-style {
    //       width: px(80);
    //       height: px(80);
    //     }
    //     .icon-name-style {
    //       font-size: px(26);
    //       line-height: px(52);
    //     }
    //   }
    // }
    .preach-total-style,
    .area-coverage-style {
      margin-top: px(32);
    }
  }
}
</style>
