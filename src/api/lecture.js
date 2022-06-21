/**
 * 讲座模块接口
 */

export default {
  // 日期覆盖列表
  dateCoverList: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/index/date_list`,
  // 覆盖总人数
  coverTotalNumber: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/index/number`,
  // 区域覆盖率
  areaCoverage: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/index/cover`,
  // 宣讲总场次
  preachTotalNumber: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/index/count`,
  // 近期列表
  recentList: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/index/recent_list`,
  // 授课老师排名列表
  instructorList: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/index/instructor_list`,
  // 讲座模块-获取列表总数量
  listLectureCount: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/info/count`,
  // 讲座模块-某个时间段前的列表(活动列表)
  listBeforeCertainTime: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/info/before`,
  // 讲座模块-某个时间段后的列表(活动列表)
  listAfterCertainPeriodTime: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/info/after`,
  // 讲座模块-获取信息(活动详情)
  eventDetails: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/info/get`,
  // 讲座模块-权限
  lecturePermissions: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/auth/get`,
  // 记录2记录-导师
  lectureRecord2Instructor: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/record2/instructor`,
  // 记录2列表
  lectureRecord2List: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/record2/list`,
  // 发布活动- 管理端
  lectureCreateAssociation: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/create/association`,
  // 发布活动- 讲师端
  lectureCreateInstructor: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/create/instructor`,
  // 删除活动- 讲师端
  lectureDelInstructor: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/del/instructor`,
  // 附件保存 - 讲师端
  lectureFileInstructor: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/file/instructor`,
  // 附件保存 - 主办方
  lectureFileHost: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/file/host`,
  // 讲师讲座信息-获取列表
  lectureInstructorList: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/instructor/list`,
  // 设置导师讲座海报
  lecturePosterInstructor: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/poster/instructor`,
  // 设置主办方讲座海报
  lecturePosterHost: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/poster/host`,
  // 主办方新增活动
  lectureCreateHost: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/create/host`,
  // 删除活动-主办方模块
  lectureDelHost: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/del/host`,
  // 记录2记录-主办方
  lectureRecord2Host: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/record2/host`,
  // 是否有权限修改某讲座信息
  lectureInfoEditable: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/info/editable`,
  // 活动-修改-老师
  lectureEditInstructor: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/edit/instructor`,
  // 活动-修改-主办方
  lectureEditHost: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/lecture/edit/host`,
};
