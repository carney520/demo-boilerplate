/*
 * 配置gulp
 *
 *
 */

var env = process.env.NODE_ENV,
    isProduction = env === "production",
    devDest = "./dist",
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
    sprite:     "images/sprites/*.@(png|jpg|jpeg)",
    images:     "images/*.*",
    cssVendor:  "css/vendor/*",
    fonts:      "fonts/*",
    jsVendor:   "js/vendor/*",
    jade:       ["templates/_*/*.jade","templates/*.jade"],           // 以“_”开始的目录将单独输出，比如 "_page1/test.jade" 在dist中输出为 page1/test.html
    jadeWatch:  ["templates/**/*.jade","!templates/client/*.jade"],
    jadeClient: "templates/client/*.jade",
    coffee:     "js/*.coffee",
    sass:       "css/sass/*.@(scss|sass)",
    sassVendor: "css/sass/vendor/*",
    sassWatch:  "css/sass/**/*"
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
  }
};
