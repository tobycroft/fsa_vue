/**
 * 页面权限相关路由守卫
 */
import router from "@/router";
import store from "@/store";

import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = [
  "/",
  "/login",
  "/introductionPlatform",
  "/dataBoard",
  "/addPreachCovers",
  "/preachRegionalCoverageNumberRank",
  "/teacherSpeakingRank",
  "/recentUndertakingUnit",
  "/recentAboutDetails",
  "/preachingArea",
  "/activeDynamic",
  "/activeDynamicDetails",
]; // 不需要登录就可以进入的白名单页面

router.beforeEach(async (to, from, next) => {
  console.log("to :>> ", to);
  document.title = "福建省家庭教育研究会数智化管理平台";
  //进度条开始加载
  NProgress.start();

  //如果在白名单中，则直接跳转
  if (whiteList.indexOf(to.path) !== -1) {
    next();
    return;
  }

  // 判断用户是否登录
  const hasToken = getToken();

  if (hasToken) {
    //有token，已登录状态
    if (to.path === "/login") {
      //如果跳转页面是登录页，则直接跳转到首页
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (to.path === "/login") {
      next();
      return;
    }
    next(`/login`);
  }
});

router.afterEach(() => {
  NProgress.done();
});
