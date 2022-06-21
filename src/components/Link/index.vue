<template>
  <div class="link-container" @click="goToUrl">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    // 跳转的链接地址
    linkUrl: {
      type: String,
      required: true,
    },
  },

  methods: {
    goToUrl() {
      window.open(this.linkUrl);
    },
  },
};
</script>

<style lang="scss" scoped>
.link-container {
  display: inline-block;
  color: $primary-color;
  text-decoration: underline;
}
</style>
