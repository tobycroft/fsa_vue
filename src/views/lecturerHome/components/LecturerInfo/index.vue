<template>
  <div class="lecturer-info-container flex-start align-start">
    <!-- <Avatar
      :imgUrl="require('@/assets/mock/avatar_test.png')"
      :width="160"
      :height="215"
    /> -->
    <Avatar
      :imgUrl="lecturerInfo.img ? lecturerInfo.img : ''"
      :width="160"
      :height="215"
    />
    <div class="lecturer-info-right">
      <div class="flex">
        <div class="flex-start">
          <p class="lecturer-info-username">{{ lecturerInfo.name }}</p>
          <div v-if="mtidsName" class="identity-tag-style flex-center">
            <van-image
              class="identity-tag-icon-style"
              :src="require('@/assets/icon/identity_tag_icon.png')"
            ></van-image>
            <p class="identity-tag-name-style">{{ mtidsName }}</p>
          </div>
        </div>
        <van-button
          @click.native="$router.push('/speakerInformationChanges')"
          class="editor-btn-style"
          size="small"
          round
        >
          <van-image
            class="btn-icon-style"
            :src="require('@/assets/icon/editor.png')"
          ></van-image>
          编辑资料
        </van-button>
      </div>

      <ul class="lecturer-data-list flex-start">
        <li class="lecturer-data-item">
          <p class="item-value">{{ lecturerInfo.area_count }}</p>
          <p class="item-label">巡讲区县</p>
        </li>
        <li class="lecturer-data-item">
          <p class="item-value">{{ lecturerInfo.lecture_count }}</p>
          <p class="item-label">活动场次</p>
        </li>
        <li class="lecturer-data-item">
          <p class="item-value">{{ lecturerInfo.sum_visitor }}</p>
          <p class="item-label">学员人数</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Avatar: () => import("@/components/Avatar"),
  },
  data() {
    return {
      // 讲师信息
      instructorInfoGet: null,
      // 身份标签文字
      mtidsName: "",
    };
  },
  computed: {
    lecturerInfo() {
      return this.$store.state.lecturer.lecturerInfo;
    },
  },
  async created() {
    const iid = this.$store.getters.accountIdInfo.iid;
    const aid = this.$store.getters.associationInfo.id;
    this.instructorInfoGet = await this.instructorInfoGetAPI(aid, iid);
    const instructorInfoGetMtid = this.instructorInfoGet.mtid;
    console.log("instructorInfoGetMtid :>> ", instructorInfoGetMtid);
    if (instructorInfoGetMtid) {
      this.instructorTitleGetAPI(`${instructorInfoGetMtid}`);
    }
  },
  methods: {
    /**
     * 通过讲师ID查询职称ID
     * @param {String} aid 机构ID
     * @param {String} iid 导师ID
     * @returns {Object} 讲师数据对象
     */
    async instructorInfoGetAPI(aid, iid) {
      const data = {
        aid,
        id: iid,
      };
      return await this.$request("instructor.instructorInfoGet", data);
    },

    /**
     * 通过ids获取职称
     * @param {Array} mtid 身份标签ID
     */
    async instructorTitleGetAPI(mtid) {
      const data = {
        mtid,
      };
      const res = await this.$request("instructor.instructorTitleGet", data);
      console.log("res :>> ", res);
      this.mtidsName = res.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.lecturer-info-container {
  .lecturer-info-right {
    margin-left: px(30);
    .lecturer-info-username {
      width: px(160);
      font-size: px(40);
      font-weight: bold;
      @include text-ellipsis(1);
    }
    .identity-tag-style {
      margin-left: px(4);
      padding: px(4) px(8);
      background: #0077ff;
      border-radius: px(17);
      border: px(1) solid #0077ff;

      .identity-tag-icon-style {
        width: px(25);
        height: px(25);
      }
      .identity-tag-name-style {
        margin-left: px(4);
        font-size: px(20);
        color: #ffffff;
      }
    }
    .editor-btn-style {
      padding: px(12) px(24);
      font-size: px(26);
      .btn-icon-style {
        margin-right: px(8);
        width: px(20);
        height: px(20);
      }
    }

    .lecturer-data-list {
      margin-top: px(70);
      .lecturer-data-item {
        margin-right: px(75);
        .item-label {
          width: px(100);
          font-size: px(24);
          color: #cccccc;
        }
        .item-value {
          font-size: px(36);
          font-weight: bold;
        }
      }
    }
  }
}
</style>
