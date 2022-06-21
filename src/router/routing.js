import Layout from "@/layout";

// 不需要登录就可以进入的白名单页面
export const whiteList = [];

export const routing = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/home/index"),
        meta: { navbar: true, title: "首页" },
      },
      {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/index"),
        meta: { navbar: true, title: "登录" },
      },
      {
        path: "/register",
        name: "register",
        component: () => import("@/views/register/index"),
        meta: { navbar: true, title: "注册信息填写" },
      },
      {
        path: "/selectInfo",
        name: "selectInfo",
        component: () => import("@/views/selectInfo/index"),
        meta: { navbar: true, title: "选择信息" },
      },
      {
        path: "/introductionPlatform",
        name: "introductionPlatform",
        component: () => import("@/views/introductionPlatform/index"),
        meta: { navbar: true, title: "平台简介" },
      },
      {
        path: "/dataBoard",
        name: "dataBoard",
        component: () => import("@/views/dataBoard/index"),
        meta: { navbar: true, title: "数据看板" },
      },
      {
        path: "/addPreachCovers",
        name: "addPreachCovers",
        component: () => import("@/views/addPreachCovers/index"),
        meta: { navbar: true, title: "新增宣讲覆盖人数" },
      },
      {
        path: "/preachRegionalCoverageNumberRank",
        name: "preachRegionalCoverageNumberRank",
        component: () =>
          import("@/views/preachRegionalCoverageNumberRank/index"),
        meta: { navbar: true, title: "宣讲区域覆盖人数排名" },
      },
      {
        path: "/teacherSpeakingRank",
        name: "teacherSpeakingRank",
        component: () => import("@/views/teacherSpeakingRank/index"),
        meta: { navbar: true, title: "授课老师宣讲数据排名" },
      },
      {
        path: "/recentUndertakingUnit",
        name: "recentUndertakingUnit",
        component: () => import("@/views/recentUndertakingUnit/index"),
        meta: { navbar: true, title: "近期承办单位列表" },
      },
      {
        path: "/recentAboutDetails",
        name: "recentAboutDetails",
        component: () => import("@/views/recentAboutDetails/index"),
        meta: { navbar: true, title: "近期宣讲详情" },
      },
      {
        path: "/preachingArea",
        name: "preachingArea",
        component: () => import("@/views/preachingArea/index"),
        meta: { navbar: true, title: "近期宣讲区域列表" },
      },
      {
        path: "/activeDynamic",
        name: "activeDynamic",
        component: () => import("@/views/activeDynamic/index"),
        meta: { navbar: true, title: "活动动态" },
      },
      {
        path: "/activeDynamicDetails",
        name: "activeDynamicDetails",
        component: () => import("@/views/activeDynamicDetails/index"),
        meta: { navbar: true, title: "活动动态-详情" },
      },
      {
        path: "/lecturerHome",
        name: "lecturerHome",
        component: () => import("@/views/lecturerHome/index"),
        meta: { navbar: true, title: "讲师首页" },
      },
      {
        path: "/newActivities",
        name: "newActivities",
        component: () => import("@/views/newActivities/index"),
        meta: { navbar: true, title: "新开活动", keepAlive: true },
        beforeEnter: (to, from, next) => {
          to.meta.title = to.query.supplement ? "历史活动补录" : "新开活动";
          next();
        },
      },
      {
        path: "/giftBagLibrary",
        name: "giftBagLibrary",
        component: () => import("@/views/giftBagLibrary/index"),
        meta: { navbar: true, title: "礼包库" },
      },
      {
        path: "/newActivitiesQRCode",
        name: "newActivitiesQRCode",
        component: () => import("@/views/newActivitiesQRCode/index"),
        meta: { navbar: true, title: "新建活动" },
      },
      {
        path: "/activityDetail",
        name: "activityDetail",
        component: () => import("@/views/activityDetail/index"),
        meta: { navbar: true, title: "活动详情" },
      },
      {
        path: "/academicReviewRecord",
        name: "academicReviewRecord",
        component: () => import("@/views/academicReviewRecord/index"),
        meta: { navbar: true, title: "学员复核操作记录" },
      },
      {
        path: "/circleFriendsMarketingEditor",
        name: "circleFriendsMarketingEditor",
        component: () => import("@/views/circleFriendsMarketingEditor/index"),
        meta: { navbar: true, title: "朋友圈营销" },
      },
      {
        path: "/letterCommitment",
        name: "letterCommitment",
        component: () => import("@/views/letterCommitment/index"),
        meta: { navbar: true, title: "承诺书" },
      },
      {
        path: "/historicalEventsCollection",
        name: "historicalEventsCollection",
        component: () => import("@/views/historicalEventsCollection/index"),
        meta: { navbar: true, title: "历史活动补录" },
      },
      {
        path: "/historicalEventsCollectionEditor",
        name: "historicalEventsCollectionEditor",
        component: () =>
          import("@/views/historicalEventsCollectionEditor/index"),
        meta: { navbar: true, title: "历史活动补录编辑" },
      },
      {
        path: "/historicalEventCollectionStatus",
        name: "historicalEventCollectionStatus",
        component: () =>
          import("@/views/historicalEventCollectionStatus/index"),
        meta: { navbar: true, title: "历史活动补录状态" },
      },
      {
        path: "/administratorHomePage",
        name: "administratorHomePage",
        component: () => import("@/views/administratorHomePage/index"),
        meta: { navbar: true, title: "管理员主页" },
      },
      {
        path: "/adminNewActivity",
        name: "adminNewActivity",
        component: () => import("@/views/adminNewActivity/index"),
        meta: { navbar: true, title: "新开活动", keepAlive: true },
        beforeEnter: (to, from, next) => {
          to.meta.title = to.query.supplement ? "历史活动补录" : "新开活动";
          next();
        },
      },
      {
        path: "/adminSelectMainTeacher",
        name: "adminSelectMainTeacher",
        component: () => import("@/views/adminSelectMainTeacher/index"),
        meta: { navbar: true, title: "选择主讲人" },
      },
      {
        path: "/adminAddMainTeacher",
        name: "adminAddMainTeacher",
        component: () => import("@/views/adminAddMainTeacher/index"),
        meta: { navbar: true, title: "新建主讲人" },
      },
      {
        path: "/adminSelectUnit",
        name: "adminSelectUnit",
        component: () => import("@/views/adminSelectUnit/index"),
        meta: { navbar: true, title: "选择举办单位" },
      },
      {
        path: "/adminAddtUnit",
        name: "adminAddtUnit",
        component: () => import("@/views/adminAddtUnit/index"),
        meta: { navbar: true, title: "新建举办单位" },
      },
      {
        path: "/lecturerManagement",
        name: "lecturerManagement",
        component: () => import("@/views/lecturerManagement/index"),
        meta: { navbar: true, title: "主讲人管理" },
      },
      {
        path: "/speakerInformationChanges",
        name: "speakerInformationChanges",
        component: () => import("@/views/speakerInformationChanges/index"),
        meta: { navbar: true, title: "主讲人信息修改" },
      },
      {
        path: "/membersAudit",
        name: "membersAudit",
        component: () => import("@/views/membersAudit/index"),
        meta: { navbar: true, title: "成员审核" },
      },
      {
        path: "/membersAuditDetails",
        name: "membersAuditDetails",
        component: () => import("@/views/membersAuditDetails/index"),
        meta: { navbar: true, title: "成员审核详情" },
      },
      {
        path: "/editPoster",
        name: "editPoster",
        component: () => import("@/views/editPoster/index"),
        meta: { navbar: true, title: "编辑分享海报" },
      },
      {
        path: "/hostHome",
        name: "hostHome",
        component: () => import("@/views/hostHome/index"),
        meta: { navbar: true, title: "学校首页" },
      },
      {
        path: "/hostEdit",
        name: "hostEdit",
        component: () => import("@/views/hostEdit/index"),
        meta: { navbar: true, title: "注册信息填写" },
      },
      {
        path: "/editPhone",
        name: "editPhone",
        component: () => import("@/views/editPhone/index"),
        meta: { navbar: true, title: "修改手机号" },
      },
      {
        path: "/newActivitiesHost",
        name: "newActivitiesHost",
        component: () => import("@/views/newActivitiesHost/index"),
        meta: { navbar: true, title: "新开活动", keepAlive: true },
        beforeEnter: (to, from, next) => {
          to.meta.title = to.query.supplement ? "历史活动补录" : "新开活动";
          next();
        },
      },
      {
        path: "/adminSelectAssociation",
        name: "adminSelectAssociation",
        component: () => import("@/views/adminSelectAssociation/index"),
        meta: { navbar: true, title: "选择机构", keepAlive: true },
      },
      {
        path: "*",
        component: () => import("@/views/404/index"),
        hidden: true,
      },
    ],
  },
];
