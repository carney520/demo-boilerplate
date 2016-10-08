/*
 * 配置gulp
 *
 *
 */

var env = process.env.NODE_ENV,
    isProduction = env === "production",
    devDest = "./dist",
    path = require('path'),
    prodDest = "./dist";

module.exports = {
  client:   "./client",       //源代码目录
  devDest:  devDest,          //开发环境部署目录
  ProdDest: prodDest,         //生产环境部署目录
  dest:      isProduction ? prodDest : devDest,
  isProduction: isProduction,  //是否是生产环境
  compress: false,            //是否启用压缩

  /*********资源输入*******/
  inputs:{
    // sprite
    sprite:     "images/sprites/*.@(png|jpg|jpeg)",
    svgSprite:  "images/sprites/*.svg",

    // static
    images:     "images/*.*",
    fonts:      "fonts/*",
    jsVendor:   "js/vendor/*.js",
    cssVendor:  "css/vendor/*.css",

    // 以“_”开始的目录将单独输出，比如 "_page1/test.jade" 在dist中输出为 page1/test.html
    jade:       ["templates/_*/*.jade", "templates/*.jade"],          
    jadeWatch:  ["templates/**/*.jade", "!templates/client/*.jade"],
    jadeClient: "templates/client/*.jade",

    // javascript
    coffee:     "js/**/*.coffee",
    js:         [ "js/**/*.js", "!js/vendor/*.js"],

    // scss
    sass:       "css/sass/**/*.@(scss|sass)",
    sassVendor: "css/sass/vendor/*.css",
    sassWatch:  "css/sass/**/*.@(scss|sass)",
  },

  /*********资源输出目录*******/
  outputs: {
    js:    "js",
    css:   "css",
    font:  "fonts",
    image: "images",
    html:  "pages",
    clientTemplate: "js/tmpls"
  },

  /**********插件配置*********/
  config: {
    sass: {
      includePaths: path.dirname(require.resolve('sassbean')),
    },

    svgSprite: {
    },
  },
}
