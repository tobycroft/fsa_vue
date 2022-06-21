<template>
  <div class="select-selectInfo-container">
    <div v-if="historyPhone !== ''" class="basic-info">
      <p class="user-phone-style">{{ handlePhoneHidden(historyPhone) }}</p>
      <div class="tips-style">
        <p>该手机号已有讲师信息录入</p>
        <p>是否选择已有信息填充</p>
      </div>
    </div>

    <div class="list-box">
      <div
        class="add-box flex"
        :class="{ 'add-active-box': active === -1 }"
        @click="active = -1"
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
          v-show="active === -1"
          class="selected-icon-style"
          :src="require('@/assets/icon/selected_icon.png')"
        ></van-image>
      </div>

      <ul v-if="list.length > 0">
        <li v-for="item in list" :key="item.id" @click="onChooseInfo(item)">
          <UserInfoRow
            class="user-info-row-style"
            :key="item.id"
            :imgUrl="item.img"
            :userName="item.name"
            :userPhone="handlePhoneHidden(item.phone)"
            :active="item.id === active"
          />
        </li>
      </ul>
    </div>

    <div class="footer-style flex-center">
      <van-button class="footer-btn-style" type="info" round @click="onNextStep"
        >下一步</van-button
      >
    </div>
  </div>
</template>

<script>
import { handlePhoneHidden } from "@/utils/common";
export default {
  components: {
    Card: () => import("@/components/Card"),
    UserInfoRow: () => import("@/components/UserInfoRow"),
  },
  data() {
    return {
      // 成员信息选项列表
      list: [],
      // 当前选中列表项ID
      active: -1,
      // 当前选中列表项
      activeObj: {},
      // 当前手机号是否在库,有值则为在库(有在其他工会下注册过),无值则不在库(没有注册)
      historyPhone: "",
    };
  },
  created() {
    this.userInfoPhoneAPI();
    this.instructorPhoneMyAPI();
  },
  methods: {
    // 隐藏手机号
    handlePhoneHidden,

    /**
     * 校验手机号是否在库API
     */
    async userInfoPhoneAPI() {
      const res = await this.$request("user.userInfoPhone");
      this.historyPhone = res;
    },

    /**
     * 和我有关的手机号列表API
     */
    async instructorPhoneMyAPI() {
      const res = await this.$request("instructor.instructorPhoneMy");
      console.log("和我有关的手机号列表API_res :>> ", res);
      this.list = res;
    },
    /**
     * 点击下一步按钮
     */
    onNextStep() {
      if (this.active === -1) {
        this.$router.push("/register");
        return;
      }
      this.$store.dispatch("user/setCallBackViewRegisterInfo", this.activeObj);
      this.$router.push({
        path: `/register`,
        query: {
          history: true,
        },
      });
    },

    /**
     * 选择用户历史信息
     */
    onChooseInfo(phoneRow) {
      this.active = phoneRow.id;
      this.activeObj = phoneRow;
    },
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
      // background: $btn-card-bg-color;
      background: #fff;
      border-radius: px(16);
      // border: px(2) solid $primary-color;
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
    .add-active-box {
      background: $btn-card-bg-color;
      border: px(2) solid $primary-color;
    }

    .van-list-style {
      .user-info-row-style {
        margin-bottom: px(24);
      }
    }
  }

  .footer-style {
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
