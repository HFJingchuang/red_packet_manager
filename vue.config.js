// 参照文档：https://cli.vuejs.org/zh/config/#vue-config-js
const moment = require("moment");
process.env.VUE_APP_TIME = moment().format("YYYY.MM.DD HH:mm:ss");
//const path = require("path"); //引入path模块
// function resolve(dir) {
//   return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
// }
module.exports = {
  // 部署生产环境和开发环境下的URL：可对当前环境进行区分，
  // baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath
  // baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  publicPath: "./",

  // 输出文件目录：在npm run build时，生成文件的目录名称
  outputDir: "dist",

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: "assets",

  // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  productionSourceMap: false,

  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  filenameHashing: false,

  // devServer: {
  //   // 自动打开浏览器
  //   open: true,

  //   // host: "localhost",

  //   // port: 8088,

  //   https: false,

  //   // 热加载
  //   hotOnly: true
  // },

  devServer: {
    // 自动打开浏览器
    open: true,

    // host: "localhost",

    // port: 8088,

    https: false,

    // 热加载
    hotOnly: true,
    // 使用代理
    // proxy: process.env.VUE_APP_SERVE_URL,
    proxy: {
      "/api": {
        // 目标代理服务器地址
        target: process.env.VUE_APP_SERVE_URL,
        // 开启代理，本地创建一个虚拟服务器 允许跨域
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  },

  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      if (process.env.NODE_ENV === "production") {
        args[0].minify.removeComments = false;
      }
      return args;
    });
  },

  pluginOptions: {
    i18n: {
      locale: "zh",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};
