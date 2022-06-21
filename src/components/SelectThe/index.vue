<template>
  <div class="select-the-container">
    <van-popup
      class="popup-style"
      v-model="show"
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div class="popup-content-style">
        <header class="flex">
          <p class="cancel-btn-style" @click="onCancel">取消</p>
          <p class="title-style">设置身份(单选)</p>
          <p class="save-btn-style" @click="onSave">保存</p>
        </header>

        <article>
          <ul class="list-style">
            <li
              v-for="item of list"
              :key="item.id"
              class="list-item-style flex"
              :class="{ 'active-style': active === item.id }"
              @click="onChange(item)"
            >
              <p class="label-style">{{ item.name }}</p>
              <van-image
                v-show="active === item.id"
                class="select-icon-style"
                :src="require('@/assets/icon/selected_icon.png')"
              ></van-image>
            </li>
          </ul>
        </article>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    // 是否显示弹窗
    show: {
      type: Boolean,
      default: true,
    },
    // 当前选中参数
    active: {
      type: [String, Number],
      default: "0",
    },
    // 选项列表
    list: {
      type: [Array, Object],
      default: () => [],
    },
  },
  methods: {
    /**
     * 改变选项触发
     * @param {Object} 选择的对象
     */
    onChange(row) {
      this.$emit("change", row);
    },
    /**
     * 取消
     */
    onCancel() {
      this.$emit("update:show", false);
    },
    /**
     * 保存
     */
    onSave() {
      this.$emit("save");
    },
  },
};
</script>

<style lang="scss" scoped>
.select-the-container {
  .popup-content-style {
    padding: px(56) px(32) 0;
    font-size: px(32);

    header {
      .cancel-btn-style {
        color: #999999;
      }
      .title-style {
        font-weight: bold;
        color: #333333;
      }
      .save-btn-style {
        font-weight: bold;
        color: #0077ff;
      }
    }

    article {
      margin-top: px(56);
      .list-style {
        .list-item-style {
          padding: 0 px(24);
          margin-bottom: px(32);
          height: px(120);
          background: #ffffff;
          border-radius: px(16);
          line-height: px(120);
          border: px(1) dashed #cccccc;
          .label-style {
            font-weight: bold;
            color: #333333;
          }
        }
        .active-style {
          background: #e5f1ff;
          border: px(1) solid #0077ff;
          .label-style {
            color: #0077ff;
          }
          .select-icon-style {
            width: px(40);
            height: px(40);
          }
        }
      }
    }
  }
}
</style>
