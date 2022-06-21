<template>
  <div class="root">
    <van-search
      v-model="searchKeyword"
      placeholder="请输入主讲人名字"
      @search="onSearch"
      @clear="onClear"
    />

    <div class="container">
      <p class="title">全部主讲人({{ teacherCount }})</p>
      <div
        class="box-teacher"
        v-for="item in mentorList"
        @click="handleChose(item.id)"
        :key="item.id"
      >
        <van-image class="avatar-img" :src="item.img" />
        <span class="name">{{ item.name }}</span>
      </div>
    </div>
    <div class="no-more">没有更多了~</div>
    <div class="bottom-wrap">
      <div class="bottom-gap"></div>
      <div class="btn-bottom" @click="handleAddTeacher">新建主讲人</div>
    </div>
  </div>
</template>

<script>
import bus from "@/utils/bus.js";
import { handleSearch, handleSortReverse } from "@/utils/common";

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
      mentorList: [],
      aid: "",
    };
  },
  computed: {
    teacherCount() {
      return this.mentorList.length;
    },
  },

  async created() {
    this.aid = this.$store.getters.associationInfo.id;

    this.reqMentorListApi(this.aid);
  },

  // destoryed() {
  //     bus.$emit('mainTeacherId', id)
  // },

  methods: {
    onSearch() {
      this.mentorList = handleSearch(
        this.mentorList,
        this.searchKeyword,
        "name"
      );
    },
    handleChose(id) {
      // window.localStorage.setItem('mainTeacherId', id)
      bus.$emit("mainTeacherId", id);

      // this.$route.params.id = id;
      this.$router.back();
    },

    /**
     *   导师列表
     */
    async reqMentorListApi(aid) {
      const data = { aid };
      const res = await this.$request("instructor.mentorList", data);
      console.log("导师列表 :>> ", res);
      this.mentorList = handleSortReverse(res);
    },
    handleAddTeacher() {
      this.$router.push({
        path: "/adminAddMainTeacher",
      });
    },
    /**
     * 点击清除按钮后触发
     */
    onClear() {
      console.log("onClear :>> ");
      this.reqMentorListApi(this.aid);
    },
  },
};
</script>

<style lang="scss" scoped>
.root {
  height: 100vh;
}
.head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: px(146);
  background: #ffffff;
}
.container {
  padding: 0 px(24) 0 px(24);
  box-sizing: border-box;
  .title {
    font-size: px(40);
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #333333;
    margin: px(24) 0;
  }
  .box-teacher {
    padding: 0 px(24);
    margin-bottom: px(24);
    // width: px(702);
    height: px(183);
    background: #ffffff;
    border-radius: px(16);
    display: flex;
    align-items: center;
    .avatar-img {
      width: px(100);
      height: px(135);
      border-radius: px(16);
      margin-right: px(22);
    }
    .name {
      font-size: px(40);
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #333333;
    }
  }
}
.no-more {
  text-align: center;
  margin-top: 40rpx;
  font-size: px(24);
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #cccccc;
}

.bottom-wrap {
  height: px(120);
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
