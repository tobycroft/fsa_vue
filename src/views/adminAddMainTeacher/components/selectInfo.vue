<template>
  <div class="select-selectInfo-container">
    <div class="basic-info">
      <p class="user-phone-style">{{ phone }}</p>
      <div class="tips-style" v-show="list && list.length">
        <p>该手机号已有讲师信息录入</p>
        <p>是否选择已有信息填充</p>
      </div>
    </div>

    <div class="list-box">
      <div
        class="add-box flex"
        :class="addActive ? 'active' : ''"
        @click="handleAddSelect"
      >
        <div class="flex-start">
          <Card class="card-style flex-center" :radius="16">
            <van-image
              class="add-img-style"
              :src="require('@/assets/icon/add_icon.png')"
            ></van-image>
          </Card>

          <p class="btn-label-style">新建信息</p>
        </div>

        <van-image
          v-show="addActive"
          class="selected-icon-style"
          :src="require('@/assets/icon/selected_icon.png')"
        ></van-image>
      </div>

      <van-list
        class="van-list-style"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <div :key="item.id" v-for="item in list" @click="handleSelect(item.id)">
          <!-- <UserInfoRow
            class="user-info-row-style"
            :active="item.active"
            imgUrl="https://www.bing.com/th?id=OIP.IiWC5y_d2wN0d0nW_h1eGwAAAA&w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2"
            userName="林高龙"
            userPhone="130 **** 6320"
            /> -->
          <UserInfoRow
            class="user-info-row-style"
            :active="item.active"
            :imgUrl="item.img"
            userName=""
            :userPhone="item.phone"
          />
        </div>
      </van-list>
    </div>

    <div class="footer-style flex">
      <van-button
        class="footer-btn-style"
        @click="handleBack"
        plain
        type="info"
        round
        >上一步</van-button
      >
      <van-button class="footer-btn-style" @click="handleNext" type="info" round
        >下一步</van-button
      >
    </div>
  </div>
</template>

<script>
import bus from "@/utils/bus";

export default {
  components: {
    Card: () => import("@/components/Card"),
    UserInfoRow: () => import("@/components/UserInfoRow"),
  },
  data() {
    return {
      addActive: true,
      mockList: [
        {
          id: 1,
          active: false,
        },
        {
          id: 2,
          active: false,
        },
      ],
      list: [],
      loading: false,
      finished: true,
      tel: "",
    };
  },
  computed: {
    phone() {
      let tel = this.tel;
      return tel.substr(0, 3) + "****" + tel.substring(7, 11);
    },
  },
  created() {
    bus.$on("Tel", (val) => {
      console.log("Tel", val);
      this.tel = val;
      this.instructorPhoneListApi(val);
    });
  },
  methods: {
    async instructorPhoneListApi(phone) {
      const data = { phone };
      const res = await this.$request("instructor.instructorPhoneList", data);
      this.list = res.map((item) => (item.active = false));
    },
    handleBack() {
      this.$emit("goBack");
    },
    handleNext() {
      this.$emit("goNext");
    },
    handleSelect(id) {
      this.addActive = false;
      this.list.forEach((item) => {
        item.active = false;
        if (item.id == id) {
          item.active = true;
        }
      });
      bus.$emit("getEchoData", id);
    },
    handleAddSelect() {
      this.addActive = true;
      this.list.forEach((item) => {
        item.active = false;
      });
      bus.$emit("initData");
    },
    // onLoad() {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1);
    //     }

    //     // 加载状态结束
    //     this.loading = false;

    //     // 数据全部加载完成
    //     if (this.list.length >= 10) {
    //       this.finished = true;
    //     }
    //   }, 1000);
    // },
  },
};
</script>

<style lang="scss" scoped>
.select-selectInfo-container {
  padding: 0 px(24);
  min-height: 100vh;
  background: $page-bg-color;
  text-align: center;
  .basic-info {
    padding: px(80) 0 0;
    .user-phone-style {
      font-size: px(56);
      font-weight: bold;
    }
    .tips-style {
      margin-top: px(24);
      font-size: px(32);
      line-height: px(52);
      color: $disable-color;
    }
  }
  .list-box {
    margin: px(120) 0 0;
    padding: 0 0 px(120);
    .add-box {
      padding: px(24);
      margin-bottom: px(24);
      background: $btn-card-bg-color;
      border-radius: px(16);
      &.active {
        border: px(2) solid $primary-color;
      }
      .card-style {
        width: px(100);
        height: px(135);
        border: px(1) solid $border-color;
        .add-img-style {
          width: px(32);
          height: px(32);
        }
      }
      .btn-label-style {
        margin-left: px(22);
        font-size: px(40);
        font-weight: bold;
      }
      .selected-icon-style {
        width: px(40);
        height: px(40);
      }
    }

    .van-list-style {
      .user-info-row-style {
        margin-bottom: px(24);
      }
    }
  }

  .footer-style {
    padding: px(24);
    box-sizing: border-box;
    height: px(120);
    background: #fff;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    .footer-btn-style {
      width: px(339);
      height: px(88);
    }
  }
}
</style>
