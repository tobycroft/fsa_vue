/**
 * 导师相关
 */

export default {
  // 导师列表
  mentorList: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/instructor/info/list`,
  // 导师列表-搜索
  instructorInfoSearch: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/instructor/info/search`,
  // 导师信息我的
  instructorMyInfo: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/instructor/info/my`,
  // 根据ID获取讲师信息
  instructorInfoGet: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/instructor/info/get`,
  // 根据ID获取讲师验证详情
  instructorVerifyById: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/instructor/verify/get`,
  // 通过电话获取老师信息
  instructorPhoneList: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/instructor/phone/list`,
  // 导师讲师-通过手机号-和我有关
  instructorPhoneMy: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/instructor/phone/my`,
  // 新增导师
  instructorVerfyAdd: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/instructor/verify/add`,
  // 新增导师(无需审核)
  instructorAssociationAdd: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/instructor/association/add`,
  // 工会功能-更新讲师信息
  updateLecturerInformation: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/instructor/association/edit`,
  // 验证-列表
  instructorVerifyList: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/instructor/verify/list`,
  // 删除
  instructorAssociationDel: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/instructor/association/del`,
  // 修改mtid
  instructorAssociationMtid: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/instructor/association/mtid`,
  // 获取职称列表
  instructorTitleList: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/instructor/title/list`,
  // 获取单条职位职称
  instructorTitleGet: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/instructor/title/get`,
};
