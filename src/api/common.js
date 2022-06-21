/**
 * 全局公用API
 */

export default {
  // 覆盖列表
  coverList: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/index/cover_list`,
  // 讲座模块-获取列表(活动列表)
  listLecture: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/info/list`,
  // 讲座模块-获取搜索列表(活动列表)
  lectureInfoSearch: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/info/search`,
};
