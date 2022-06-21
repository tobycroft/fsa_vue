<template>
  <div class="user-info-row-container flex" :class="active ? 'active' : ''">
    <Card class="card-style flex-start" :radius="16">
      <Avatar :imgUrl="imgUrl" />

      <div class="user-info-box">
        <p class="user-name-style">{{ userName }}</p>
        <p class="user-phone-style">{{ userPhone }}</p>
      </div>
    </Card>
    <van-image v-show="active" class="selected-icon-style" :src="require('@/assets/icon/selected_icon.png')"></van-image>
  </div>
</template>

<script>
export default {
  components: {
    Card: () => import("@/components/Card"),
    Avatar: () => import("@/components/Avatar"),
  },
  props: {
    // 用户头像图片地址
    imgUrl: {
      type: String,
      default: "",
    },
    // 用户名称
    userName: {
      type: String,
      default: "",
    },
    // 用户手机号
    userPhone: {
      type: String,
      default: "",
    },
    // 选中
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info-row-container {
  background: #fff;
  border-radius: px(16);
  padding-right: px(24);
  box-sizing: border-box;
  &.active {
    border: px(2) solid #0077ff;
  }
  .card-style {
    padding: px(24);

    .user-info-box {
      margin-left: px(22);
      text-align: left;

      .user-name-style {
        font-size: px(40);
        font-weight: bold;
        line-height: px(52);
      }

      .user-phone-style {
        margin-top: px(6);
        font-size: px(26);
        color: $disable-color;
      }
    }
  }
  .selected-icon-style {
        width: px(40);
        height: px(40);
      }
}
</style>
