/**
 * 登录模块接口
 */

export default {
  // 短信登录
  userAuthPhone: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/user/auth/phone`,
  // 短信发送
  userAuthSend: `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_PREFIX_STR}/user/auth/send`,
}
