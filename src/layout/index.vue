<template>
  <div class="layout-container">
    <header>
      <van-nav-bar
        v-show="navbarShow"
        :title="navbarTitle"
        :left-arrow="navbarBackShow"
        @click-left="onClickLeft"
      />
    </header>

    <main :class="{ ['main-top']: navbarShow }">
      <router-view v-if="$route.meta.keepAlive">
        <keep-alive></keep-alive>
      </router-view>
      <router-view v-else></router-view>
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    // 导航栏-是否显示
    navbarShow() {
      return this.$route.meta.navbar;
    },

    // 导航栏-自定义标题
    navbarTitle() {
      return this.$route.meta.title;
    },

    // 是否显示"回到首页"左侧文案
    navGoHomeShow() {
      return false;
    },

    // 是否显示左侧箭头
    navbarBackShow() {
      return this.$route.fullPath !== "/";
    },
  },

  data() {
    return {};
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.main-top {
  height: calc(100vh - 46px);
  position: relative;
}
</style>
