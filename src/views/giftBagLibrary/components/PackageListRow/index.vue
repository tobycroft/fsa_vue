<template>
  <div class="package-list-row-container" @click="onChoose">
    <Card v-if="data" class="card-style" :active="active">
      <main class="flex-start">
        <Avatar :width="88" :height="88" :imgUrl="data.img" />
        <div class="main-info-box">
          <p class="main-info-title">{{ data.title }}</p>
          <van-tag color="#03C76B" plain>{{ data.type }}</van-tag>
        </div>
      </main>
      <footer>{{ data.content }}</footer>
      <van-image
        v-show="active"
        class="active-icon-style"
        :src="require('@/assets/icon/selected_icon.png')"
      />
    </Card>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => undefined,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  components: {
    Card: () => import("@/components/Card"),
    Avatar: () => import("@/components/Avatar"),
  },
  methods: {
    onChoose() {
      this.active = !this.active;

      this.active
        ? this.$store.dispatch("gift/addGiftActiveList", this.data)
        : this.$store.dispatch("gift/removeGiftActiveList", this.data);

      this.$emit("choose", this.$store.getters.giftActiveList);
    },
  },
};
</script>

<style lang="scss" scoped>
.package-list-row-container {
  .card-style {
    padding: px(24);
    position: relative;
    main {
      padding: 0 0 px(24) 0;
      border-bottom: px(1) solid #eeeeee;
      .main-info-box {
        margin: 0 0 0 px(16);
        .main-info-title {
          margin: 0 0 px(4) 0;
          font-size: px(32);
          font-weight: bold;
        }
      }
    }
    footer {
      padding: px(24) 0 0 0;
      font-size: px(24);
      color: #999999;
    }
    .active-icon-style {
      width: px(40);
      height: px(40);
      position: absolute;
      right: px(32);
      bottom: px(88);
    }
  }
}
</style>
