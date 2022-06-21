<template>
  <div class="list-row-container">
    <Card class="card-style">
      <div class="top-style flex">
        <p class="username-style">林高龙</p>
        <p class="time-style">2022年4月15日14:40:40</p>
      </div>
      <div class="bottom-style flex-start">
        <p>修改人数为:</p>
        <p class="num-style">500人</p>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  components: {
    Card: () => import("@/components/Card"),
  },
};
</script>

<style lang="scss" scoped>
.list-row-container {
  .card-style {
    padding: px(24);
    .top-style {
      padding-bottom: px(24);
      border: px(1) solid #eeeeee;
      .username-style {
        font-size: px(40);
        font-weight: bold;
      }
      .time-style {
        font-size: px(26);
        color: #999999;
      }
    }

    .bottom-style {
      margin-top: px(24);
      font-size: px(30);
      .num-style {
        margin-left: px(10);
      }
    }
  }
}
</style>
