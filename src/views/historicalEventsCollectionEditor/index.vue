<template>
  <div class="historical-events-collection-editor-container">
    <ul class="list-style">
      <!-- 活动主题 -->
      <li class="item-style">
        <p class="title-style">活动主题</p>
        <Card class="card-style">
          <van-field
            v-model="form.nameTheActivityTheme"
            rows="2"
            autosize
            type="textarea"
            placeholder="请输入活动的主题名称"
            show-word-limit
            :border="false"
          />

          <div class="label-management-box flex">
            <p class="label-management-title">标签管理</p>

            <div
              class="label-management-new-tag-box flex-end"
              @click="showLabelManagement = true"
            >
              <p>添加标签</p>
              <van-image
                class="label-management-new-tag-icon"
                :src="require('@/assets/icon/arrow_right_blue_icon.png')"
              />
            </div>
          </div>
        </Card>
        <MultiSelector :show.sync="showLabelManagement" />
      </li>
      <!-- 举办单位 -->
      <li class="item-style">
        <p class="title-style">举办单位</p>
        <Card class="card-style">
          <van-field
            v-model="form.hostUnits"
            placeholder="请输入举办单位单位全称"
            :border="false"
          />
        </Card>
      </li>
      <!-- 活动时间 -->
      <li class="item-style">
        <p class="title-style">活动时间</p>
        <Card class="card-style">
          <div class="flex">
            <van-field
              readonly
              clickable
              name="picker"
              :border="false"
              :value="form.activityTime"
              placeholder="请选择活动开始时间"
              @click="showActivityTime = true"
            />
            <van-image
              class="field-icon-style"
              :src="require('@/assets/icon/arrow_right_disable_icon.png')"
            />
          </div>

          <ChoiceActivityTime :show.sync="showActivityTime" />
        </Card>
      </li>
      <!-- 活动地点 -->
      <li class="item-style">
        <p class="title-style">活动地点</p>
        <Card class="card-style">
          <div class="flex">
            <van-field
              readonly
              clickable
              name="picker"
              :border="false"
              :value="form.activitySite"
              placeholder="请选择活动地点"
              @click="showActivitySite = true"
            />
            <van-image
              class="field-icon-style"
              :src="require('@/assets/icon/arrow_right_disable_icon.png')"
            />
          </div>
          <VenueSelector :show.sync="showActivitySite" />
        </Card>
      </li>
      <!-- 学员人数(人) -->
      <li class="item-style">
        <p class="title-style">学员人数</p>
        <Card class="card-style">
          <van-field
            v-model="form.numberStudents"
            type="number"
            placeholder="请输入学员人数"
            :border="false"
          />
        </Card>
      </li>

      <!-- 发布按钮 -->
      <li class="item-style flex">
        <van-button
          class="submit-btn-style"
          type="primary"
          color="#0077FF"
          block
          round
          >完成</van-button
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {
    Card: () => import("@/components/Card"),
    MultiSelector: () => import("@/components/MultiSelector"),
    ChoiceActivityTime: () => import("@/components/ChoiceActivityTime"),
    VenueSelector: () => import("@/components/VenueSelector"),
  },
  data() {
    return {
      // 表单数据
      form: {
        // 请输入活动的主题名称
        nameTheActivityTheme: "",
        // 举办单位
        hostUnits: "",
        // 活动时间
        activityTime: "",
        // 活动地点
        activitySite: "",
        // 学员人数
        numberStudents: "",
      },
      // 是否显示"标签管理"弹窗
      showLabelManagement: false,
      // 是否显示活动时间选择框
      showActivityTime: false,
      // 是否显示活动地点选择框
      showActivitySite: false,
    };
  },
  methods: {
    onConfirm() {},
    async lectureCreateAssociationAPI() {
      const aid = this.$store.getters.associationInfo.id;
      const data = { aid };
      const res = await this.$request("lecture.lectureCreateAssociation", data);
      console.log("res :>> ", res);
    },
  },
};
</script>

<style lang="scss" scoped>
.historical-events-collection-editor-container {
  padding: px(32) px(24);
  .list-style {
    .item-style {
      margin: 0 0 px(32) 0;
      .title-style {
        font-size: px(36);
        font-weight: bold;
      }
      .card-style {
        padding: px(24);
        margin: px(16) 0 0 0;
        .label-management-box {
          padding: px(24) 0;
          border-top: 1px dashed #ccc;
          .label-management-title {
            font-size: px(26);
          }
          .label-management-new-tag-box {
            font-size: px(26);
            color: #0077ff;
          }
          .label-management-new-tag-icon {
            margin-left: px(8);
            width: px(32);
            height: px(32);
          }
        }
        .field-icon-style {
          width: px(32);
          height: px(32);
        }
      }
      .submit-btn-style {
        margin: 0 auto;
        width: px(469);
        height: px(120);
      }
    }
  }
}
</style>
