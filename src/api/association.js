/**
 * 工会相关
 */

export default {
  // 获取某个工会
  obtainTradeUnion: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/association/info/get`,
  // 我的信息
  reqMemberMe: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/association/member/me`,
  // 成员审核-通过
  verifyApprove: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/association/verify/approve`,
  // 成员审核-拒绝
  verifydeny: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/association/verify/deny`,
  // 通过域名获取
  associationInfoDomain: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/association/info/domain`,
  // 获取协会列表
  associationInfoList: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/association/info/list`,
  // 通过讲师ID查询职称ID
  associationMemberIid: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/association/member/iid`,
};
