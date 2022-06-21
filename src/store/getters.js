/**
 * store的getters
 */

const getters = {
  // 用户信息相关
  loginInfo: (state) => state.user.loginInfo,
  accountIdInfo: (state) => state.user.accountIdInfo,
  registerUserInfo: (state) => state.user.registerUserInfo,
  // 讲师信息相关
  lecturerInfo: (state) => state.lecturer.lecturerInfo,
  // 礼包相关
  giftActiveList: (state) => state.gift.giftActiveList,
  // 工会相关
  associationInfoCurrent: (state) => state.association.associationInfoCurrent,
  associationInfo: (state) => state.association.associationInfo,
  // 主办方信息相关
  hostMenberMe: (state) => state.host.hostMenberMe,
  hostInfo: (state) => state.host.hostInfo,
};

export default getters;
