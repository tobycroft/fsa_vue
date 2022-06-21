<template>
  <div class="my-activities-container">
    <Card class="card-style">
      <header class="flex">
        <p class="time-style">{{ dateFormat(lecture.start_date) }}</p>
        <CheckDetailsBtn />
      </header>

      <main>
        <p class="title-style">{{ lecture.title }}</p>
        <ul class="tag-list-style flex-start">
          <li
            v-for="(item, index) in lecture.tag_info"
            :key="index"
            class="tag-list-item"
          >
            <Tag :title="item.name" active />
          </li>
        </ul>
        <div class="more-info-box flex">
          <div class="unit-info-style flex-start">
            <p>举办单位:</p>
            <p class="unit-info-value">{{ lecture.host_info.name }}</p>
          </div>
          <p
            class="status-style"
            :style="isSubmit(lecture.start_date) ? '' : 'color:#03C76B;'"
          >
            {{ isSubmit(lecture.start_date) ? "已提交" : "已备案" }}
          </p>
        </div>
      </main>

      <footer class="flex">
        <div class="flex-start">
          <van-image
            class="icon-style"
            :src="require('@/assets/icon/position_icon.png')"
          ></van-image>
          <p class="text-style">
            {{
              `${lecture.province}${lecture.city}${lecture.district}${lecture.street}`
            }}
          </p>
        </div>
        <div class="flex-end">
          <van-image
            class="icon-style"
            :src="require('@/assets/icon/person_num_icon.png')"
          ></van-image>
          <p class="text-style">{{ lecture.visitor }}人</p>
        </div>
      </footer>
    </Card>
  </div>
</template>

<script>
export default {
  props: {
    lecture: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    isSubmit() {
      return (date) => {
        //需要判断时间if start_date < Date.now()就是已备案 >=就是已提交
        if (new Date(date).valueOf > new Date().valueOf) {
          return true;
        } else {
          return false;
        }
      };
    },
    dateFormat() {
      return (date) => {
        return this.$dateFormat(date, "UTC:yyyy年mm月dd日 HH:MM");
      };
    },
  },
  components: {
    Card: () => import("@/components/Card"),
    CheckDetailsBtn: () => import("@/components/CheckDetailsBtn"),
    Tag: () => import("@/components/Tag"),
  },
};
</script>

<style lang="scss" scoped>
.my-activities-container {
  .card-style {
    padding: px(24);
    header {
      padding-bottom: px(24);
      border-bottom: px(1) solid #eeeeee;
      .time-style {
        font-size: px(26);
        color: #666666;
      }
    }

    main {
      margin-top: px(24);
      .title-style {
        font-size: px(36);
        font-weight: bold;
        color: #333333;
      }
      .tag-list-style {
        .tag-list-item {
          margin: px(12) px(8) 0 0;
        }
      }
      .more-info-box {
        margin: px(24) 0 0 0;
        font-size: px(26);

        .unit-info-style {
          color: #666666;
          .unit-info-value {
            margin: 0 0 0 px(10);
          }
        }
        .status-style {
          color: #0077ff;
        }
      }
    }

    footer {
      padding: px(24) 0 0;
      .icon-style {
        width: px(22);
        height: px(27);
      }
      .text-style {
        margin-left: px(8);
        font-size: px(26);
        color: #666666;
      }
    }
  }
}
</style>
