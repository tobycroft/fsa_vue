<template>
  <div class="lecturer-home-container">
    <div class="background-box"></div>
    <main>
      <!-- 讲师信息 -->
      <LecturerInfo />

      <!-- 历史活动补录 & 新开活动备案 -->
      <div class="card-button-box flex">
        <CardButton
          title="历史活动补录"
          describe="过往活动 添加记录"
          @click="$router.push(`/historicalEventsCollection`)"
        />
        <CardButton
          @click.native="$router.push('/newActivities')"
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
    LecturerInfo: () => import("./components/LecturerInfo"),
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
    this.aid = lecturerInfo.aid;
    this.iid = lecturerInfo.id;
  },
  methods: {
    goActivityDetail(id) {
      this.$router.push("/activityDetail?id=" + id);
    },
    initData() {
      this.aid = this.$store.getters.associationInfo.id;
      this.iid = this.$store.getters.accountIdInfo.iid;
      // 获取讲师数据
      this.$store.dispatch("lecturer/getLecturerInfo", this.aid).then((res) => {
        if (res.code === 404) {
          this.$router.replace(`/selectInfo`);
          return;
        }
        if (res.status !== 1) {
          this.$dialog
            .alert({
              title: "暂无权限",
              message: "当前账户暂无导师权限!",
            })
            .then(() => {
              this.$router.replace({
                path: `/`,
              });
            });
        }
        this.getLectureList();
        this.getLectureListCount();
      });
    },
    // 获取活动列表
    async getLectureList() {
      const res = await this.$request("lecture.lectureInstructorList", {
        ...this.searchParams,
        aid: this.aid,
        iid: this.iid,
      });
      this.lectureList = res;
    },
    // 获取活动总数
    async getLectureListCount() {
      const aid = this.$store.getters.associationInfo.id;
      const res = await this.$request("lecture.listLectureCount", {
        type: "all",
        filter: "instructor",
        iid: this.iid,
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
