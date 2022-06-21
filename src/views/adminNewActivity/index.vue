<template>
  <div class="new-activities-container">
    <ul class="list-style">
      <!-- 选择主讲人 -->
      <li class="item-style">
        <p class="title-style">选择主讲人</p>
        <Card class="card-style" v-if="!teacherInfo">
          <div class="mainteacher-box" @click="handleSelectMainTeacher">
            <div class="left">
              <van-image
                class="add-icon"
                :src="require('@/assets/icon/add_icon.png')"
              />
            </div>
            <p class="add-char">点击选择主讲人</p>
          </div>
        </Card>
        <Card class="card-style flex" v-else>
          <div class="mainteacher-box">
            <div class="left">
              <van-image class="img" :src="teacherInfo.img" />
            </div>
            <p class="name-char">{{ teacherInfo.name }}</p>
          </div>
          <p class="se-char" @click="handleSelectMainTeacher">重新选择</p>
        </Card>
        <!-- <MultiSelector :show.sync="showLabelManagement" /> -->
      </li>
      <!-- 活动主题 -->
      <li class="item-style">
        <p class="title-style">活动主题</p>
        <Card class="card-style">
          <van-field
            v-model="form.title"
            rows="1"
            name="title"
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
              @click="showThemeTag = true"
            >
              <p>添加标签</p>
              <van-image
                class="label-management-new-tag-icon"
                :src="require('@/assets/icon/arrow_right_blue_icon.png')"
              />
            </div>
          </div>
          <div>
            <ul class="option-list flex-start flex-wrap">
              <li
                v-for="(item, index) in form.tag_ids"
                :key="index"
                style="margin-right: 10px"
                class="option-item"
              >
                <Tag
                  @click.native="removeThemeTag(index)"
                  :title="item.text"
                  bigSize
                  active
                  close
                />
              </li>
            </ul>
          </div>
        </Card>
        <NewActivitiesTagSelecter
          dataUrl="tag.themeTagList"
          :mulitiple="true"
          cateName="主题标签"
          :selectedItems="form.tag_ids"
          :show.sync="showThemeTag"
          @confirm="setTagIds"
        />
      </li>
      <!-- 举办单位 -->
      <li class="item-style">
        <p class="title-style">举办单位</p>
        <Card class="card-style flex">
          <!-- <van-field
            v-model="form.hostUnits"
            placeholder="请输入举办单位单位全称"
            :border="false"
          /> -->
          <!-- <div v-show="hostName">{{hostName}}</div> -->
          <router-link
            class="link"
            :class="hostName ? 'ac' : ''"
            to="/adminSelectUnit"
            >{{ hostName ? hostName : "请选择举办单位" }}
          </router-link>
          <van-image
            class="field-icon-style"
            :src="require('@/assets/icon/arrow_right_disable_icon.png')"
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
              :value="form.start_date"
              placeholder="请选择活动开始时间"
              @click="showActivityTime = true"
            />
            <van-image
              class="field-icon-style"
              :src="require('@/assets/icon/arrow_right_disable_icon.png')"
            />
          </div>

          <ChoiceActivityTime
            :show.sync="showActivityTime"
            @confirm="setStartDate"
          />
        </Card>
      </li>
      <!-- 活动时长 -->
      <li class="item-style">
        <p class="title-style">活动时长</p>
        <Card class="card-style">
          <div class="flex">
            <van-field
              readonly
              clickable
              name="picker"
              :border="false"
              :value="form.duration.text"
              placeholder="请选择活动时长"
              @click="showActivityTimeLength = true"
            />
            <van-image
              class="field-icon-style"
              :src="require('@/assets/icon/arrow_right_disable_icon.png')"
            />
          </div>
          <HowLongSelector
            :show.sync="showActivityTimeLength"
            @confirm="setDuration"
          />
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
              :value="formatActivityPlace"
              placeholder="请选择活动地点"
              @click="showActivitySite = true"
            />
            <van-image
              class="field-icon-style"
              :src="require('@/assets/icon/arrow_right_disable_icon.png')"
            />
          </div>
          <VenueSelector
            :show.sync="showActivitySite"
            @confirm="setActivityPlace"
          />
        </Card>
      </li>
      <!-- 活动类型 -->
      <li class="item-style">
        <p class="title-style">活动类型</p>
        <Card class="card-style">
          <div class="flex">
            <van-field
              readonly
              clickable
              name="picker"
              :border="false"
              :value="form.type"
              placeholder="请选择活动类型"
              @click="showActivityType = true"
            />
            <van-image
              class="field-icon-style"
              :src="require('@/assets/icon/arrow_right_disable_icon.png')"
            />
          </div>
          <ActivityTypeSelector
            :show.sync="showActivityType"
            @confirm="setActivityType"
          />
        </Card>
      </li>
      <!-- 形式标签 -->
      <li class="item-style">
        <p class="title-style">形式标签</p>
        <Card class="card-style">
          <div class="flex">
            <van-field
              readonly
              clickable
              name="picker"
              :border="false"
              placeholder="请选择形式标签"
              @click="showFormTag = true"
            >
              <template v-if="form.tfid.length" #input>
                <Tag
                  @click.native.stop="form.tfid = []"
                  :title="form.tfid[0].text"
                  bigSize
                  active
                  close
                />
              </template>
            </van-field>
            <van-image
              class="field-icon-style"
              :src="require('@/assets/icon/arrow_right_disable_icon.png')"
            />
          </div>
          <NewActivitiesTagSelecter
            dataUrl="tag.formTagList"
            :mulitiple="false"
            cateName="形式标签"
            :selectedItems="form.tfid"
            :show.sync="showFormTag"
            @confirm="setTfid"
          />
        </Card>
      </li>
      <!-- 对象标签 -->
      <li class="item-style">
        <p class="title-style">对象标签</p>
        <Card class="card-style">
          <div class="flex">
            <van-field
              readonly
              clickable
              name="picker"
              :border="false"
              placeholder="请选择对象标签"
              @click="showRoleTag = true"
            >
              <template v-if="form.trid.length" #input>
                <Tag
                  @click.native.stop="form.trid = []"
                  :title="form.trid[0].text"
                  bigSize
                  active
                  close
                />
              </template>
            </van-field>
            <van-image
              class="field-icon-style"
              :src="require('@/assets/icon/arrow_right_disable_icon.png')"
            />
          </div>
          <NewActivitiesTagSelecter
            dataUrl="tag.roleTagList"
            :mulitiple="false"
            cateName="对象标签"
            :selectedItems="form.trid"
            :show.sync="showRoleTag"
            @confirm="setTrid"
          />
        </Card>
      </li>
      <!-- 上报数据单位 -->
      <li class="item-style">
        <p class="title-style">上报数据单位</p>
        <Card class="card-style">
          <div class="flex">
            <van-field
              readonly
              clickable
              name="picker"
              :border="false"
              placeholder="请添加上报数据单位"
              @click="showBelongTag = true"
            >
              <template v-if="form.dataunits.length" #input>
                <div class="flex-wrap">
                  <Tag
                    style="margin-right: 10px"
                    v-for="(item, index) in form.dataunits"
                    :key="index"
                    @click.native.stop="removeDataUnit(index)"
                    :title="item.text"
                    bigSize
                    active
                    close
                  />
                </div>
              </template>
            </van-field>
            <van-image
              class="field-icon-style"
              :src="require('@/assets/icon/arrow_right_disable_icon.png')"
            />
          </div>
          <NewActivitiesTagSelecter
            dataUrl="tag.belongTagList"
            :mulitiple="true"
            cateName="上报数据单位"
            :selectedItems="form.dataunits"
            :show.sync="showBelongTag"
            @confirm="setDataUnits"
          />
        </Card>
      </li>
      <!-- 参与人数 -->
      <li v-if="supplement" class="item-style">
        <p class="title-style">参与人数</p>
        <Card class="card-style">
          <div class="flex">
            <van-field
              v-model="form.visitor"
              type="digit"
              placeholder="请输入参与人数"
            />
          </div>
        </Card>
      </li>

      <!-- TODO: 是否开启赠送礼包 -->
      <!-- <li class="item-style flex">
        <p class="title-style">是否开启赠送礼包</p>
        <van-switch v-model="giftSwitch" inactive-color="#CCCCCC" />
      </li> -->

      <!-- TODO: 礼包列表 -->
      <!-- <GiftListForm v-show="giftSwitch" :list="giftList" /> -->

      <!-- TODO: 礼包库添加礼包 -->
      <!-- <li
        v-show="giftSwitch"
        class="item-style"
        @click="$router.push('/giftBagLibrary')"
      >
        <Card class="card-style flex-start">
          <van-image
            class="add-gift-bag-icon"
            :src="require('@/assets/icon/new_add_icon.png')"
          />
          <p class="add-gift-bag-text">礼包库添加礼包</p>
        </Card>
      </li> -->

      <!-- 发布按钮 -->
      <li class="item-style flex">
        <van-button
          class="submit-btn-style"
          type="primary"
          color="#0077FF"
          block
          round
          @click.native="doSub"
          >{{ !supplement ? "发布" : "完成" }}</van-button
        >
      </li>
    </ul>
  </div>
</template>

<script>
import bus from "@/utils/bus.js";
export default {
  name: "adminNewActivity",
  components: {
    Card: () => import("@/components/Card"),
    NewActivitiesTagSelecter: () =>
      import("./components/NewActivitiesTagSelecter.vue"),
    ActivityTypeSelector: () => import("@/components/ActivityTypeSelector"),
    ChoiceActivityTime: () => import("@/components/ChoiceActivityTime"),
    HowLongSelector: () => import("@/components/HowLongSelector"),
    VenueSelector: () => import("@/components/VenueSelector"),
    HostSelector: () => import("@/components/HostSelector"),
    Tag: () => import("@/components/Tag"),
    GiftListForm: () => import("@/components/GiftListForm"),
  },
  computed: {
    formatActivityPlace() {
      if (
        this.form.province &&
        this.form.city &&
        this.form.district &&
        this.form.street
      ) {
        return `${this.form.province} ${this.form.city} ${this.form.district} ${this.form.street}`;
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      // 是否是补录
      supplement: false,
      // 开启礼包
      giftSwitch: false,
      // 礼包列表
      giftList: [],
      // 表单数据
      form: {
        hid: "",
        title: "",
        tag_ids: [],
        dataunits: [],
        start_date: "",
        can_gift: false,
        gift_ids: "[]",
        visitor: 0,
        poster_img: "",
        file1: "",
        file2: "",
        duration: "",
        province: "",
        city: "",
        iid: 0,
        district: "",
        street: "",
        type: "",
        trid: [],
        tfid: [],
      },
      // 举办单位名称
      hostName: "",
      // 活动时长
      activityTimeLength: "",
      // 活动地点
      activitySite: "",
      // 是否显示"活动类型"弹窗
      showActivityType: false,
      // 是否显示"举办单位"弹窗
      showHostSelector: false,
      // 是否显示"标签管理"弹窗
      showThemeTag: false,
      // 是否显示"上报单位"弹窗
      showBelongTag: false,
      // 是否显示"形式标签"弹窗
      showFormTag: false,
      // 是否显示"对象标签"弹窗
      showRoleTag: false,
      // 是否显示活动时间选择框
      showActivityTime: false,
      // 是否显示活动时间长度选择框
      showActivityTimeLength: false,
      // 是否显示活动地点选择框
      showActivitySite: false,
      // 是否显示上报数据单位选择框
      showReportedDataUnit: false,
      columns: [],
      teacherInfo: null,
      teacherId: 0,
    };
  },

  watch: {
    "$store.getters.giftActiveList": function (newVal) {
      this.giftList = newVal;
      this.setGiftIds();
    },
  },

  created() {
    this.supplement = this.$route.query.supplement;
    console.log("debug :>> ", this.supplement);
  },

  mounted() {
    bus.$on("mainTeacherId", (val) => {
      this.form.iid = val;
      this.reqTeacherInfo(val);
      console.log("mainTeacherId", val);
    });
    bus.$on("hostObj", (val) => {
      this.form.hid = val.id;
      this.hostName = val.name;
    });
    this.giftList = this.$store.getters.giftActiveList;
    this.setGiftIds();
  },

  methods: {
    /**
     * 初始化表单
     */
    initForm() {
      this.form.hid = "";
      this.form.title = "";
      this.form.tag_ids = [];
      this.form.dataunits = [];
      this.form.start_date = "";
      this.form.can_gift = false;
      this.form.gift_ids = "[]";
      this.form.visitor = 0;
      this.form.poster_img = "";
      this.form.file1 = "";
      this.form.file2 = "";
      this.form.duration = "";
      this.form.province = "";
      this.form.city = "";
      this.form.iid = 0;
      this.form.district = "";
      this.form.street = "";
      this.form.type = "";
      this.form.trid = [];
      this.form.tfid = [];
    },
    /**
     * 设置表单中的gift_ids字段数据
     */
    setGiftIds() {
      if (this.giftList.length > 0) {
        const arr = [];
        for (const item of this.giftList) {
          arr.push(item.id);
        }
        this.form.gift_ids = JSON.stringify(arr);
      }
    },
    /**
     * 表单数据校验
     */
    validateForm() {
      // 表单验证，直接写了
      let form = JSON.parse(JSON.stringify(this.form));
      if (!form.title) {
        this.$toast("请输入活动的主题名称");
        return null;
      }
      if (!form.tag_ids.length) {
        this.$toast("请添加活动标签");
        this.showThemeTag = true;
        return null;
      } else {
        form.tag_ids = JSON.stringify(
          form.tag_ids.map((x) => {
            return x.id;
          })
        );
      }
      // if (!form.hid.id) {
      //   this.$toast('请选择举办单位')
      //   this.showHostSelector = true
      //   return null
      // } else {
      //   form.hid = form.hid.id
      // }
      if (!form.start_date) {
        this.$toast("请选择活动开始时间");
        this.showActivityTime = true;
        return null;
      }
      if (!form.duration.value) {
        this.$toast("请选择活动时长");
        this.showActivityTimeLength = true;
        return null;
      } else {
        form.duration = form.duration.value;
      }
      if (!form.province) {
        this.$toast("请选择活动地点");
        this.showActivitySite = true;
        return null;
      }
      if (!form.type) {
        this.$toast("请选择活动类型");
        this.showActivityType = true;
        return null;
      }
      if (!form.tfid.length) {
        this.$toast("请选择形式标签");
        this.showFormTag = true;
        return null;
      } else {
        form.tfid = form.tfid[0].id;
      }
      if (!form.trid.length) {
        this.$toast("请选择对象标签");
        this.showRoleTag = true;
        return null;
      } else {
        form.trid = form.trid[0].id;
      }
      if (!form.dataunits.length) {
        this.$toast("请添加上报数据单位");
        this.showBelongTag = true;
        return null;
      } else {
        form.dataunits = JSON.stringify(
          form.dataunits.map((x) => {
            return x.id;
          })
        );
      }
      return form;
    },
    /**
     * 获取讲师信息
     */
    async reqTeacherInfo(id) {
      const aid = this.$store.getters.associationInfo.id;
      const data = { id, aid };
      const res = await this.$request("instructor.instructorInfoGet", data);
      this.teacherInfo = res;
      console.log("讲师信息API_res :>> ", this.teacherInfo);
    },
    /**
     * 提交表单
     */
    doSub() {
      let subForm = this.validateForm();
      const aid = this.$store.getters.associationInfo.id;
      subForm.aid = aid;

      if (subForm) {
        this.$request("lecture.lectureCreateAssociation", subForm).then(
          (res) => {
            this.$toast("发布成功");
            this.initForm();
            this.$store.commit("gift/initGiftActiveList");
            let activityId = res;
            this.$router.replace("/activityDetail?id=" + activityId);
          }
        );
      }
    },

    setDataUnits(val) {
      this.form.dataunits = val;
    },
    removeDataUnit(idx) {
      this.form.dataunits.splice(idx, 1);
    },
    setTfid(val) {
      this.form.tfid = val;
    },
    setTrid(val) {
      this.form.trid = val;
    },
    setActivityType(val) {
      this.form.type = val;
    },
    setActivityPlace(val) {
      this.form.province = val.province;
      this.form.city = val.city;
      this.form.district = val.district;
      this.form.street = val.street;
    },
    setDuration(val) {
      this.form.duration = val;
    },
    setStartDate(val) {
      this.form.start_date = this.$dateFormat(val, "yyyy-mm-dd HH:MM:ss");
    },
    setHostInfo(val) {
      this.form.hid = val;
    },
    removeThemeTag(idx) {
      this.form.tag_ids.splice(idx, 1);
    },
    setTagIds(tags) {
      this.form.tag_ids = tags || [];
    },
    handleSelectMainTeacher() {
      this.$router.push({
        path: `/adminSelectMainTeacher`,
      });
    },
    onConfirm() {},
  },
};
</script>

<style lang="scss" scoped>
.new-activities-container {
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
        ::v-deep {
          .van-field__control {
            font-size: px(32);
          }
        }
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
      .se-char {
        font-size: px(30);
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #cccccc;
      }
      .mainteacher-box {
        flex: 1;
        padding: px(24) 0;
        // width: 100%;
        height: px(109);
        display: flex;
        align-items: center;
        background: #ffffff;
        border-radius: px(16);
        .left {
          width: px(120);
          height: px(161);
          background: #f7f7f7;
          border-radius: px(16);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: px(24);
          .add-icon {
            width: px(46);
            height: px(46);
          }
          .img {
            width: px(120);
            height: px(161);
            border-radius: px(16);
          }
        }
        .add-char {
          font-size: px(40);
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #cccccc;
        }
        .name-char {
          font-size: px(40);
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
        }
      }
      .submit-btn-style {
        margin: 0 auto;
        width: px(469);
        height: px(120);
      }
      .add-gift-bag-icon {
        width: px(32);
        height: px(32);
      }
      .add-gift-bag-text {
        padding: px(20) 0;
        margin: 0 0 0 px(24);
        font-size: px(30);
        font-weight: bold;
        color: #2374ff;
      }
    }
  }
}
.link {
  margin-left: px(12);
  width: px(500);
  height: px(88);
  line-height: px(88);
  display: block;
  font-size: px(32);
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #cccccc;
  &.ac {
    color: #333333;
  }
}
</style>
