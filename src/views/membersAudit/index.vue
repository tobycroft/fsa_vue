<template>
  <div class="members-audit-container">
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
      <van-tabs class="tabs-style" v-model="active" color="#0077FF">
        <van-tab :title="`审核列表(${reviewList.length})`">
          <ul class="review-list">
            <li
              v-for="(item, index) of reviewList"
              :key="index"
              class="review-list-item"
            >
              <ReviewListRow
                :source="item"
                showOperation
                @fail="verifydenyAPI(item.instructor_info.iid)"
                @success="handleApprove(item.instructor_info.iid)"
                @click="goToDetail(item)"
              />
            </li>
            <NoRecord v-show="reviewList.length <= 0" />
          </ul>
        </van-tab>
        <van-tab title="已审核">
          <ul class="review-list">
            <li
              v-for="(item, index) of approvedList"
              :key="index"
              class="review-list-item"
            >
              <ReviewListRow :source="item" status @click="goToDetail(item)" />
            </li>
            <NoRecord v-show="approvedList.length <= 0" />
          </ul>
        </van-tab>
      </van-tabs>
    </main>
    <SelectThe
      :show.sync="showSelectThe"
      :list="instructorTitleList"
      :active="activeSelectThe"
      @change="onSelectTheChange"
      @save="onSave"
    />
  </div>
</template>

<script>
import { handleSearch } from "@/utils/common";

export default {
  components: {
    ReviewListRow: () => import("./components/ReviewListRow.vue"),
    NoRecord: () => import("@/components/NoRecord"),
    SelectThe: () => import("@/components/SelectThe"),
  },
  data() {
    return {
      // 搜索关键字
      keyword: "",
      active: 2,
      // 工会ID
      aid: "",
      // 导师ID
      iid: "",
      //审核列表
      reviewList: [],
      // 已审核列表
      approvedList: [],
      // 是否显示职称选择组件
      showSelectThe: false,
      // 获取职称列表
      instructorTitleList: [],
      // 当前选中职称
      activeSelectThe: null,
    };
  },

  async created() {
    await this.getMemberMe();
    // await this.instructorVerifyGetMeAPI();
    this.initListData();
    this.instructorTitleListAPI(this.aid);
  },

  methods: {
    /**
     * 处理审核通过逻辑
     */
    handleApprove(iid) {
      this.iid = iid;
      if (this.instructorTitleList.length > 0) {
        this.showSelectThe = true;
        return;
      }
      this.verifyApproveAPI(iid);
    },
    /**
     * 成员审核-通过API
     */
    async verifyApproveAPI(iid) {
      const aid = this.$store.getters.associationInfo.id;
      const data = {
        aid,
        iid,
      };
      const res = await this.$request("association.verifyApprove", data);
      console.log("成员审核-通过_APIres :>> ", res);
      this.$toast.success("审核操作成功");
      this.iid = null;
      this.activeSelectThe = null;
      this.showSelectThe = false;
      this.initListData();
    },
    /**
     * 成员审核-失败API
     */
    async verifydenyAPI(iid) {
      const aid = this.$store.getters.associationInfo.id;
      const data = {
        aid,
        iid,
        mtids: 0,
      };
      const res = await this.$request("association.verifydeny", data);
      console.log("成员审核-失败API_res :>> ", res);
      this.initListData();
    },
    /**
     * 跳转详情页面
     */
    goToDetail(row) {
      console.log("row :>> ", row);
      this.$router.push({
        path: `/membersAuditDetails`,
        query: {
          iid: row.instructor_info.iid,
          aid: row.aid,
        },
      });
    },
    /**
     * 我的信息API
     */
    async getMemberMe() {
      this.aid = this.$store.getters.associationInfo.id;
    },

    /**
     * 初始化列表数据
     */
    initListData() {
      this.instructorVerifyListAPI(this.aid, 0);
      this.instructorVerifyListAPI(this.aid, 1);
    },
    /**
     * 验证-列表API
     * @param {String} aid 工会ID
     */
    async instructorVerifyListAPI(aid, status) {
      const data = {
        aid,
        status,
      };
      const res = await this.$request("instructor.instructorVerifyList", data);
      console.log("验证-列表API_res :>> ", res);
      if (status === 0) {
        this.reviewList = res;
      }
      if (status === 1) {
        this.approvedList = res;
      }
    },
    /**
     * 处理搜索逻辑
     */
    // handleSearch(list, keyword) {
    //   const newList = [];
    //   list.forEach((item) => {
    //     console.log("item :>> ", item.name);
    //     const hashVal = item.name.indexOf(keyword);
    //     if (hashVal > -1) {
    //       newList.push(item);
    //     }
    //   });
    //   return newList;
    // },
    /**
     * 确定搜索时触发
     */
    onSearch() {
      this.reviewList = handleSearch(this.reviewList, this.keyword);
      this.approvedList = handleSearch(this.approvedList, this.keyword);
    },
    /**
     * 点击清除按钮后触发
     */
    onClear() {
      console.log("onClear :>> ");
      this.initListData();
    },

    /**
     * 获取职称列表API
     * @param {String} aid 机构ID
     */
    async instructorTitleListAPI(aid) {
      const data = { aid };
      const res = await this.$request("instructor.instructorTitleList", data);
      console.log("获取职称列表API_res :>> ", res);
      this.instructorTitleList = res;
    },
    onSelectTheChange(val) {
      this.activeSelectThe = val.id;
      console.log("this.activeSelectThe :>> ", this.activeSelectThe);
    },
    async onSave() {
      if (!this.activeSelectThe) {
        this.$toast("请选择身份");
        return;
      }

      await this.instructorAssociationMtidAPI(
        this.iid,
        this.aid,
        this.activeSelectThe
      );

      this.verifyApproveAPI(this.iid);
    },

    /**
     * 修改mtid_API
     * @param {String} iid 导师ID
     * @param {String} aid 机构ID
     * @param {String} mtid 要设置的身份标签ID
     */
    async instructorAssociationMtidAPI(iid, aid, mtid) {
      const data = {
        iid,
        aid,
        mtid,
      };
      const res = await this.$request(
        "instructor.instructorAssociationMtid",
        data
      );
      console.log("修改mtid_API_res :>> ", res);
      return res;
    },
  },
};
</script>

<style lang="scss" scoped>
.members-audit-container {
  main {
    .tabs-style {
      ::v-deep {
        .van-tab {
          font-size: px(30);
          font-weight: bold;
          color: #999999;
        }
        .van-tab--active {
          color: #333333;
        }
      }
      .review-list {
        padding: px(24);
        .review-list-item {
          margin-bottom: px(24);
        }
      }
    }
  }
}
</style>
