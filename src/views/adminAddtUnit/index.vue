<template>
  <div class="root">
    <input
      class="input"
      placeholder="请输入主办方全称"
      type="text"
      v-model="name"
    />

    <div class="btn-bottom" @click="handleSaveAndBack">保存并返回</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      name: "",
    };
  },

  methods: {
    /**
     *   新增主办方
     */
    async reqAddHost(name) {
      const aid = this.$store.getters.associationInfo.id;
      const data = {
        aid,
        name,
      };
      const res = await this.$request("host.addHost", data);
      console.log("主办方 :>> ", res);
    },
    async handleSaveAndBack() {
      await this.reqAddHost(this.name);
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.root {
  height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: o px(24);
  box-sizing: border-box;

  .input {
    margin-top: px(48);
    border: px(0);
    width: px(702);
    height: px(98);
    background: #f7f7f7;
    border-radius: px(16);
    padding: 0 px(32);
    box-sizing: border-box;
    font-size: px(32);
  }
}

.no-more {
  text-align: center;
  margin-top: 40rpx;
  font-size: px(24);
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #cccccc;
}

.btn-bottom {
  position: fixed;
  bottom: px(48);
  left: px(127);
  width: px(496);
  background: #0077ff;
  border-radius: px(90);
  height: px(120);
  font-size: px(36);
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: bold;
  color: #ffffff;
  line-height: px(120);
  text-align: center;
}
</style>
