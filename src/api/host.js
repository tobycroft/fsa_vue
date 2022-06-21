/**
 * 主办方
 */

export default {
  // 获取主办方列表
  hostList: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/host/index/list`,
  // 新增
  addHost: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/host/index/add`,
  // 获取一条数据
  hostInfoGet: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/host/info/get`,
  // 我的信息
  hostMemberMe: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/host/member/me`,
  // 修改主办方信息
  hostInfoEdit: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/host/info/edit`,
  // 修改主办方经办人信息
  hostMemberEdit: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/host/member/edit`,
  // 获取主办方信息列表
  hostInfoList: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/host/info/list`,
  // 获取主办方信息列表
  hostInfoSearch: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/host/info/search`,
};
