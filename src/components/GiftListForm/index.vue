<template>
  <div class="gift-list-form-container">
    <ul v-if="list.length > 0" class="list-style">
      <li v-for="item of list" :key="item.id" class="list-item-style">
        <Card class="card-style flex-start">
          <van-image
            class="remove-icon-style"
            :src="require('@/assets/icon/remove_icon.png')"
            @click="onRemove(item)"
          ></van-image>

          <Avatar
            class="avatar-style"
            :imgUrl="item.img"
            :width="88"
            :height="88"
          />

          <div class="info-box-style">
            <p class="gift-name-style">{{ item.title }}</p>
            <van-tag plain type="success" size="medium">{{
              item.type
            }}</van-tag>
          </div>
        </Card>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {
    Card: () => import("@/components/Card"),
    Avatar: () => import("@/components/Avatar"),
  },
  props: {
    list: {
      type: [Array, Object],
      default: () => [],
    },
  },
  methods: {
    onRemove(gift) {
      console.log("onRemove :>> ");
      this.$store.dispatch("gift/removeGiftActiveList", gift);
    },
  },
};
</script>

<style lang="scss" scoped>
.gift-list-form-container {
  .list-style {
    .list-item-style {
      .card-style {
        padding: px(24);
        .remove-icon-style {
          width: px(32);
          height: px(32);
        }
        .avatar-style {
          margin: 0 px(17);
        }
        .info-box-style {
          .gift-name-style {
            margin: 0 0 px(4) 0;
            font-size: px(32);
            font-weight: bold;
            color: #333333;
          }
        }
      }
    }
  }
}
</style>
