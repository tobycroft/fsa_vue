/**
 * 标签模块接口
 */

export default {
  // 主题标签
  themeTagList: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/tag/index/list`,
  // 归属标签
  belongTagList: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/tag/dataunit/list`,
  // 对象标签
  roleTagList: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/tag/role/list`,
  // 形式标签
  formTagList: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/tag/form/list`,
};
