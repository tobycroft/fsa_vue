<template>
  <div class="gift-bag-library-container">
    <ul class="list-box">
      <li v-for="item in giftList" :key="item.id" class="list-item">
        <PackageListRow :data="item" @choose="onChoose" />
      </li>
    </ul>

    <footer class="flex">
      <p class="content-style">
        已选择<span class="active-num-style">{{ giftActiveList.length }}</span
        >个礼包
      </p>
      <van-button type="info" round @click="$router.go(-1)"
        >确认并返回</van-button
      >
    </footer>
  </div>
</template>

<script>
export default {
  components: {
    PackageListRow: () => import("./components/PackageListRow"),
  },
  data() {
    return {
      // 礼包列表
      giftList: [],
      // 已选中礼包列表
      giftActiveList: [],
      // 工会ID
      aid: "",
    };
  },
  created() {
    this.aid = this.$store.getters.associationInfo.id;
    console.log("this.aid :>> ", this.aid);
    this.giftDataListAPI();
  },
  methods: {
    /**
     * 礼品列表API
     */
    async giftDataListAPI() {
      const data = {
        aid: this.aid,
      };
      const res = await this.$request("gift.giftDataList", data, {
        methods: "get",
      });
      console.log("礼品列表API_res :>> ", res);
      this.giftList = res;
    },
    onChoose(val) {
      this.giftActiveList = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.gift-bag-library-container {
  position: relative;
  .list-box {
    padding: px(24) px(24) px(160);
    .list-item {
      padding: 0 0 px(24) 0;
    }
  }
  footer {
    padding: px(16) px(24);
    background: #fff;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    .content-style {
      font-size: px(32);
      font-weight: bold;
      .active-num-style {
        margin: 0 px(8) 0;
        color: $primary-color;
      }
    }
  }
}
</style>
