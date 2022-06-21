<template>
  <div class="audience-evaluation-container">
    <div class="card-box">
      <p class="card-title-style">听众评价</p>
      <Card class="card-style">
        <ul v-if="list.length > 0" class="comments-list">
          <li
            v-for="item in list"
            :key="item.id"
            class="comments-item flex-start align-start"
          >
            <Logo :imgUrl="item.user_info.wx_img" :size="65" round />
            <div class="comments-info-box">
              <p class="comments-username-style">
                {{
                  item.user_info.wx_name ? item.user_info.wx_name : "未命名用户"
                }}
              </p>
              <p class="comments-content-style">
                {{ handleExtra(item.extra) }}
              </p>
            </div>
          </li>
        </ul>
        <NoRecord v-else />
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Card: () => import("@/components/Card"),
    Logo: () => import("@/components/Logo"),
    NoRecord: () => import("@/components/NoRecord"),
  },
  props: {
    list: {
      type: [Array, Object],
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handleExtra(extra) {
      const newExtra = JSON.parse(extra);
      console.log("newExtra :>> ", newExtra);
      let str = "";
      for (const item of newExtra) {
        str += `${item}; `;
      }
      return str;
    },
  },
};
</script>

<style lang="scss" scoped>
.audience-evaluation-container {
  .card-box {
    margin-top: px(40);
    .card-title-style {
      font-size: px(36);
      font-weight: bold;
    }
    .card-style {
      margin-top: px(12);
      padding: px(24);
      .comments-list {
        .comments-item {
          .comments-info-box {
            padding-bottom: px(32);
            margin: 0 0 px(32) px(16);
            border-bottom: px(1) solid #eeeeee;

            .comments-username-style {
              font-size: px(32);
              font-weight: bold;
              color: #181818;
            }
            .comments-content-style {
              margin-top: px(8);
              font-size: px(28);
            }
          }
        }
      }
    }
  }
}
</style>
