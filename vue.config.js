const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      "/api": {
        // 匹配所有以 '/api1'开头的请求路径
        target: "http://gmall-h5-api.atguigu.cn", // 代理目标的基础路径
        //   changeOrigin: true,
        //   // pathRewrite 重写路径
        //   pathRewrite: { "^/api": "" },
      },
    },
  },
});
