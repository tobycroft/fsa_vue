<template>
  <div class="host-unit-list-container">
    <Card :radius="16" class="card-style flex-start">
      <div>
        <Avatar :imgUrl="avatarUrl" :width="160" :height="215" />
      </div>
      <div class="info-box">
        <div class="flex">
          <p class="username-style">{{ userName }}</p>
          <div v-show="showMore">
            <van-popover
              v-model="showPopover"
              trigger="click"
              placement="bottom-end"
              @select="onSelect"
            >
              <ul class="popover-content-list">
                <li class="popover-content-item flex" @click="onEditor">
                  <van-image
                    class="popover-icon-style"
                    :src="require('@/assets/icon/editor.png')"
                  ></van-image>
                  <p>编辑</p>
                </li>
                <li class="popover-content-item flex" @click="onDelete">
                  <van-image
                    class="popover-icon-style"
                    :src="require('@/assets/icon/delete_icon.png')"
                  ></van-image>
                  <p>删除</p>
                </li>
              </ul>
              <template #reference>
                <van-image
                  class="popover-btn-style"
                  :src="require('@/assets/icon/more_icon.png')"
                ></van-image>
              </template>
            </van-popover>
          </div>
        </div>
        <div class="flex-start">
          <div class="tag-style">
            <p class="tag-value">{{ employee }}</p>
            <p class="tag-label">活动场次</p>
          </div>
          <div class="tag-style">
            <p class="tag-value">{{ student }}</p>
            <p class="tag-label">学员人数</p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: "HostUnitRow",
  components: {
    Card: () => import("@/components/Card"),
    Avatar: () => import("@/components/Avatar"),
  },
  props: {
    // 用户头像
    avatarUrl: {
      type: String,
      required: true,
    },
    // 用户姓名
    userName: {
      type: String,
      required: true,
    },
    // 活动场次
    employee: {
      type: Number,
      required: true,
    },
    // 学员人数
    student: {
      type: Number,
      required: true,
    },
    // 是否显示更多操作
    showMore: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showPopover: false,
    };
  },
  methods: {
    onSelect(action) {
      Toast(action.text);
    },
    onEditor() {
      this.showPopover = false;
      this.$emit("update");
    },
    onDelete() {
      this.showPopover = false;
      this.$emit("delete");
    },
  },
};
</script>

<style lang="scss" scoped>
.host-unit-list-container {
  text-align: left;
  font-weight: bold;
  color: #333333;
  .card-style {
    padding: px(24);

    .info-box {
      margin-left: px(26);
      width: 100%;
      .username-style {
        font-size: px(40);
      }

      .tag-style {
        margin: px(77) px(43) 0px 0;

        .tag-value {
          font-size: px(36);
        }
        .tag-label {
          width: px(100);
          font-size: px(24);
          font-weight: 400;
          color: #cccccc;
        }
      }
    }
  }
}

.popover-content-list {
  .popover-content-item {
    padding: px(32);
    font-size: px(26);
    color: #333333;
    .popover-icon-style {
      margin-right: px(11);
      width: px(22);
      height: px(22);
    }
  }
}
.popover-btn-style {
  width: px(40);
  height: px(40);
}
</style>
