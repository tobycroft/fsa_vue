<template>
  <div class="data-board-card-container">
    <Card class="page-box-style" :radius="40">
      <!-- 覆盖 | 宣讲 | 区域 面板信息 -->
      <Card class="header-panel-box">
        <div>
          <Card class="card-dark-style">
            <div class="cover-total-content flex-start">
              <div>
                <IconTitle title="覆盖总人数" />
                <TimeUpdate />
              </div>
              <NumUnit
                class="cover-total-content-right"
                :text="coverTotalNumber"
                unit="人"
              />
            </div>
          </Card>
        </div>

        <div class="flex">
          <Card class="card-dark-style preach-total-style">
            <div>
              <IconTitle title="宣讲总场次" iconColor="#EA5C4C" />
              <NumUnit color="#EA5C4C" :text="preachTotalNumber" unit="场" />
            </div>
          </Card>
          <Card class="card-dark-style area-coverage-style">
            <div>
              <IconTitle title="区域覆盖率" iconColor="#03C76B" />
              <NumUnit color="#03C76B" :text="areaCoverage" unit="%" />
            </div>
          </Card>
        </div>
      </Card>
    </Card>
  </div>
</template>

<script>
export default {
  components: {
    Card: () => import("@/components/Card"),
    IconTitle: () => import("@/components/IconTitle"),
    TimeUpdate: () => import("@/components/TimeUpdate"),
    NumUnit: () => import("@/components/NumUnit"),
  },
  props: {
    // 覆盖总人数
    coverTotalNumber: {
      type: Number,
      default: 0,
    },
    // 宣讲总场次
    preachTotalNumber: {
      type: Number,
      default: 0,
    },
    // 区域覆盖率
    areaCoverage: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.data-board-card-container {
  .page-box-style {
    background: #f3f5f9;
    .header-panel-box {
      padding: px(20);
      height: auto;
      .card-dark-style {
        padding: px(40) px(0) px(30) px(24);
        background: #f7f7f7;
        .cover-total-content {
          .cover-total-content-right {
            margin-left: px(40);
            .cover-total-num {
              font-size: px(48);
              font-weight: 800;
              color: #0077ff;
            }
            .cover-total-unit {
              font-size: px(24);
              color: #cccccc;
            }
          }
        }
      }
      .preach-total-style,
      .area-coverage-style {
        margin-top: px(16);
        width: px(318);
      }
      .area-coverage-style {
        margin-left: px(16);
      }
    }
  }
}
</style>
