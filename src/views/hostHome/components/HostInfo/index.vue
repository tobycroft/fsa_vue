<template>
  <div class="lecturer-info-container flex-start align-start">
    <Avatar
      :imgUrl="hostInfo.icon ? hostInfo.icon : ''"
      :width="160"
      :height="215"
    />
    <div class="lecturer-info-right">
      <div class="flex">
        <p class="lecturer-info-username">
          {{ hostInfo.name }}
          <van-image
            class="btn-icon-style"
            :src="require('@/assets/icon/editor.png')"
            @click.native="$router.push('/hostEdit')"
          ></van-image>
        </p>

        <!-- <van-button class="editor-btn-style" round> 编辑资料 </van-button> -->
      </div>

      <ul class="lecturer-data-list flex-start">
        <li class="lecturer-data-item">
          <p class="item-value">{{ hostInfo.lecture_count }}</p>
          <p class="item-label">活动场次</p>
        </li>
        <li class="lecturer-data-item">
          <p class="item-value">{{ hostInfo.student }}</p>
          <p class="item-label">学员人数</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Avatar: () => import("@/components/Avatar"),
  },
  props: {
    hostInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.lecturer-info-container {
  .lecturer-info-right {
    margin-left: px(30);
    .lecturer-info-username {
      font-size: px(40);
      font-weight: bold;
      .btn-icon-style {
        margin-left: px(8);
        width: px(20);
        height: px(20);
      }
    }

    .lecturer-data-list {
      margin-top: px(70);
      .lecturer-data-item {
        margin-right: px(75);
        .item-label {
          width: px(100);
          font-size: px(24);
          color: #cccccc;
        }
        .item-value {
          font-size: px(36);
          font-weight: bold;
        }
      }
    }
  }
}
</style>
