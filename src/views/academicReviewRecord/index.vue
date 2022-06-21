<template>
  <div class="academic-review-record-container">
    <ul class="list-style">
      <li v-for="(item, index) in 3" :key="index" class="list-item-style">
        <ListRow />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {
    ListRow: () => import("./components/ListRow"),
  },
};
</script>

<style lang="scss" scoped>
.academic-review-record-container {
  padding: px(24);
  .list-style {
    .list-item-style {
      margin-bottom: px(24);
    }
  }
}
</style>
