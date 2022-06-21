<template>
  <div class="lecturer-management-container">
    <header>
      <van-search
        v-model="keyword"
        background="#fff"
        placeholder="请输入主讲人名字"
        @search="onSearch"
        @clear="onClear"
      />
    </header>

    <main>
      <p class="main-talker-box-label">
        全部主讲人({{ mainTalkerList.length }})
      </p>

      <ul class="main-talker-list">
        <li
          v-for="(item, index) in mainTalkerList"
          :key="index"
          class="main-talker-item"
        >
          <MainTalker
            :avatarUrl="handleStrEmpty(item.img)"
            :userName="handleStrEmpty(item.name)"
            :patrolDistricts="item.area_count"
            :activitySession="item.lecture_count"
            :participation="item.sum_visitor"
            :showMore="true"
            @update="onUpdateMainTalker(item)"
            @delete="onDeleteMainTalker(item.id)"
          />
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { handleSearch, handleSortReverse } from "@/utils/common";

export default {
  components: {
    MainTalker: () =>
      import("@/views/introductionPlatform/components/MainTalker.vue"),
  },
  data() {
    return {
      // 搜索关键字
      keyword: "",
      // 当前工会ID
      currentTradeUnionID: null,
      // 主讲人列表
      mainTalkerList: [],
      // 讲师id
      iid: null,
      // 工会id
      aid: null,
    };
  },
  async created() {
    await this.getMemberMe();
    this.currentTradeUnionID = this.$store.getters.associationInfo.id;
    this.mentorListAPI(this.currentTradeUnionID);
  },
  methods: {
    /**
     * 我的信息API
     */
    getMemberMe() {
      this.aid = this.$store.getters.associationInfo.id;
    },
    /**
     * MainTalker-修改按钮事件
     */
    onUpdateMainTalker(instructor) {
      console.log("MainTalker修改:>>", instructor);
      this.$router.push({
        path: `/speakerInformationChanges`,
        query: {
          iid: instructor.id,
          aid: this.aid,
        },
      });
    },
    /**
     * MainTalker-删除按钮事件
     */
    onDeleteMainTalker(iid) {
      console.log("MainTalker删除:>>");
      this.$dialog
        .confirm({
          title: "删除操作",
          message: "您将删除该主讲人信息，是否继续？",
        })
        .then(() => {
          // on confirm
          console.log("确认删除 :>>");
          this.instructorAssociationDelAPI(iid, this.aid);
        })
        .catch(() => {
          // on cancel
          console.log("取消删除 :>>");
        });
    },
    /**
     * 判断字符串是否存在
     */
    handleStrEmpty(param) {
      return param ? param : "";
    },

    /**
     * 导师列表API
     */
    async mentorListAPI(aid) {
      const data = { aid };
      const res = await this.$request("instructor.mentorList", data);
      console.log("导师列表API_res :>> ", res);
      this.mainTalkerList = handleSortReverse(res);
    },

    /**
     * 工会-讲师-删除API
     */
    async instructorAssociationDelAPI(iid, aid) {
      const data = {
        iid,
        aid,
      };
      const res = await this.$request(
        "instructor.instructorAssociationDel",
        data
      );
      console.log("工会-讲师-删除API_res :>> ", res);
      this.mentorListAPI(this.currentTradeUnionID);
    },

    /**
     * 确定搜索时触发
     */
    onSearch() {
      this.mainTalkerList = handleSearch(this.mainTalkerList, this.keyword);
    },
    /**
     * 点击清除按钮后触发
     */
    onClear() {
      console.log("onClear :>> ");
      this.mentorListAPI(this.currentTradeUnionID);
    },
  },
};
</script>

<style lang="scss" scoped>
.lecturer-management-container {
  main {
    padding: 0 px(24);
    .main-talker-box-label {
      margin: px(48) 0 0;
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
}
</style>
