<template>
  <div class="lecturer-home-container">
    <div class="background-box"></div>
    <main>
      <!-- 讲师信息 -->
      <HostInfo :hostInfo="hostInfo" />

      <!-- 历史活动补录 & 新开活动备案 -->
      <div class="card-button-box flex">
        <CardButton
          title="历史活动补录"
          describe="过往活动 添加记录"
          @click="
            $router.push({
              path: `/historicalEventsCollection`,
              query: { host: true },
            })
          "
        />
        <CardButton
          @click.native="$router.push('/newActivitiesHost')"
          color="#E0E6F9"
          title="新开活动备案"
          describe="新建全新的活动"
          :imgUrl="require('@/assets/images/activities_record.png')"
        />
      </div>

      <!-- 我的活动 -->
      <div class="my-activities-box">
        <div class="my-activities-header-box flex">
          <p class="title-style">
            我的活动
            <template v-if="lectureListCount">
              ({{ lectureListCount }})</template
            >
          </p>
          <van-popover
            v-model="showPopover"
            trigger="click"
            :actions="actions"
            @select="onSelect"
          >
            <template #reference>
              <van-button class="filter-btn-style" round>
                <van-image
                  class="filter-icon-style"
                  :src="require('@/assets/icon/filter_icon.png')"
                />
                {{ searchParams.str }}
              </van-button>
            </template>
          </van-popover>
        </div>

        <ul class="my-activitie-list">
          <li
            v-for="(item, index) in lectureList"
            :key="index"
            class="my-activitie-item"
          >
            <MyActivities
              @click.native="goActivityDetail(item.id)"
              :lecture="item"
            />
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  components: {
    HostInfo: () => import("./components/HostInfo"),
    CardButton: () => import("./components/CardButton"),
    MyActivities: () => import("./components/MyActivities"),
  },
  computed: {
    lecturerInfo() {
      return this.$store.state.lecturer.lecturerInfo;
    },
  },
  data() {
    return {
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [{ text: "全部" }, { text: "已备案" }, { text: "已提交" }],
      searchParams: {
        // str: "筛选",
        limit: 10,
        page: 1,
      },
      lectureList: [],
      lectureListCount: 0,
      // 工会ID
      aid: null,
      // 导师ID
      iid: null,
      // 主办方ID
      hid: null,
      // 主办方详情
      hostInfo: {},
    };
  },
  watch: {
    $route(to, from) {
      // 监听路由变化, 实现类似 小程序的 onShow 事件
      if (to.path === "/lecturerHome") {
        this.initData();
      }
    },
  },
  created() {
    this.initData();
    const lecturerInfo = this.$store.getters.lecturerInfo;
    const associationInfo = this.$store.getters.associationInfo;
    this.aid = associationInfo.id;
    this.iid = lecturerInfo.id;
  },
  methods: {
    goActivityDetail(id) {
      this.$router.push({
        path: "/activityDetail",
        query: {
          id,
          type: "host",
        },
      });
    },
    initData() {
      this.aid = this.$store.getters.associationInfo.id;
      this.iid = this.$store.getters.accountIdInfo.iid;
      // 当前账户不存在主办单位情况执行if模块
      if (!this.$store.getters.hostMenberMe) {
        this.$dialog
          .alert({
            title: "暂无权限",
            message: "当前账户暂无主办方管理权限!",
          })
          .then(() => {
            this.$router.replace({
              path: `/`,
            });
          });
      }

      this.hid = this.$store.getters.hostMenberMe.hid;
      // 获取主办方单位信息
      this.$store.dispatch("host/hostInfoGetAPI", this.hid).then((res) => {
        console.log("主办方单位信息_res :>> ", res);
        this.hostInfo = res;
        this.getLectureList();
        this.getLectureListCount();
      });
    },
    // 获取活动列表
    async getLectureList() {
      const res = await this.$request("common.listLecture", {
        ...this.searchParams,
        aid: this.aid,
        iid: this.iid,
        hid: this.$store.getters.hostMenberMe.hid,
        type: "host",
      });
      this.lectureList = res;
    },
    // 获取活动总数
    async getLectureListCount() {
      const aid = this.$store.getters.associationInfo.id;
      const res = await this.$request("lecture.listLectureCount", {
        type: "all",
        filter: "host",
        hid: this.hid,
        aid,
      });
      this.lectureListCount = res;
    },
    onSelect(action) {
      this.searchParams.str = action.text;
      this.searchParams.page = 1;
      this.getLectureList();
      this.getLectureListCount();
    },
    goToActivitiesComplement() {
      this.$dialog
        .alert({
          title: "公告",
          message: `数据正在升级维护中，暂不开放`,
        })
        .then(() => {
          // on close
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.lecturer-home-container {
  position: relative;
  .background-box {
    height: px(480);
    background: linear-gradient(180deg, #0077ff 0%, #f7f7f7 100%);
    opacity: 0.1;
  }
  main {
    padding: px(64) px(24);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    .card-button-box {
      margin-top: px(48);
    }
    .my-activities-box {
      margin-top: px(56);
      .my-activities-header-box {
        .title-style {
          font-size: px(40);
          font-weight: bold;
        }
        .filter-btn-style {
          padding: px(15) px(50);
          .filter-icon-style {
            width: px(20);
            height: px(25);
          }
        }
      }
      .my-activitie-list {
        margin: px(16) 0 0;

        .my-activitie-item {
          margin-bottom: px(24);
        }
      }
    }
  }
}
</style>
