const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.BASE_URL,
  // 当与 Webpack（或 Vue CLI 3）一起使用时，esm 文件默认使用。如果你的项目有一个或目标，你很好，但如果为了向后兼容，你正在编译你的项目，那么这个模块也需要被转译。es6 es2015 es5启用此模块的转译
  transpileDependencies: ["vuex-persist"],
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/styles/scss/index.scss";`,
      },
    },
  },
  // TODO: 当前项目为直连模式,不需要代理
  // devServer: {
  //   proxy: {
  //     "/v1": {
  //       target: process.env.VUE_APP_API_URL_UPLOAD,
  //       ws: true,
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
