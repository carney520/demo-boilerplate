/*
 *
 * Dev server
 *
 */

var gulp        = require('gulp-help')(require('gulp')),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    cfg    = require("../config"),
    _      = require('../helpers');


var serverConfig = Object.assign({
  server:{
    baseDir: cfg.dest
  }
},cfg.config.server);

exports.browserSync = browserSync;
exports.reload      = reload;

gulp.task('sprite:watch:bs',         false,['sprite'], reload);
gulp.task('svg-sprite:watch:bs',     false, ['svg-sprite'], reload);
gulp.task('iconfont:watch:bs',       false, ['iconfont'], reload);

gulp.task('sync:js:watch:bs',        false,['sync:js'],reload);
gulp.task('sync:css:watch:bs',       false,['sync:css'],reload);
gulp.task('sync:images:watch:bs',    false,['sync:images'],reload);
gulp.task('template:watch:bs',       false,['template'],reload);
gulp.task('template:client:watch:bs',false,['template:client'],reload);

gulp.task("coffee:watch:bs",         false, ["coffee"], reload);
gulp.task("babel:watch:bs",          false, ["babel"], reload)

//首先执行任务再侦听任务
gulp.task("start",_.helps.server,["default"],function(){
  if(!cfg.isProduction){
    _.logGreen("正在启用开发服务器");
    browserSync.init(serverConfig);

    gulp.watch(_.src.sass, ['sass']);
    gulp.watch(_.src.sprite,                ["sprite:watch:bs"]);
    // gulp.watch(_.src.svgSprite,             ["svg-sprite:watch:bs"]);
    gulp.watch(_.src.svgSprite,             ["iconfont:watch:bs"]);
    gulp.watch(_.src.images,                ['sync:images:watch:bs']);
    gulp.watch([_.src.cssVendor,_.src.fonts],['sync:css:watch:bs']);
    gulp.watch(_.src.jsVendor,              ['sync:js:watch:bs']);
    gulp.watch(_.src.jadeWatch,             ['template:watch:bs']);
    gulp.watch(_.src.jadeClient,            ['template:client:watch:bs']);
    gulp.watch(_.src.js,                    ['babel:watch:bs']);
    gulp.watch(_.src.coffee,                ['coffee:watch:bs']);
  }else{
    _.logRed("只能在开发模式中启用");
  }
});
