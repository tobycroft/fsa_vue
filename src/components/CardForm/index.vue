<template>
  <div class="card-form-container flex">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card-form-container {
  width: 100%;
  // height: px(98);
  background: $input-bg-color;
  border-radius: px(16);
  ::v-deep .van-field {
    background: transparent;
  }
}
</style>
