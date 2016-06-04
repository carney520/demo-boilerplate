/*
 *
 * Dev server
 *
 */

var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    cfg    = require("../config"),
    _      = require('../helpers');


var serverConfig = {
  server:{
    baseDir: cfg.dest
  }
};

exports.browserSync = browserSync;
exports.reload      = reload;

gulp.task('sprite:watch:bs',         ['sprite'], reload);

gulp.task('sync:js:watch:bs',        ['sync:js'],reload);
gulp.task('sync:css:watch:bs',       ['sync:css'],reload);
gulp.task('sync:images:watch:bs',    ['sync:images'],reload);
gulp.task('template:watch:bs',       ['template'],reload);
gulp.task('template:client:watch:bs',['template:client'],reload);

gulp.task("coffee:watch:bs",         ["coffee"],reload);

//首先执行任务再侦听任务
gulp.task("start",["default"],function(){
  if(!cfg.isProduction){
    _.logGreen("正在启用开发服务器");
    browserSync.init(serverConfig);

    gulp.watch(_.src.sprite,                ["sprite:watch:bs"]);
    gulp.watch(_.src.images,                ['sync:images:watch:bs']);
    gulp.watch([_.src.cssVendor,_.src.fonts],['sync:css:watch:bs']);
    gulp.watch(_.src.jsVendor,              ['sync:js:watch:bs']);
    gulp.watch(_.src.jadeWatch,             ['template:watch:bs']);
    gulp.watch(_.src.jadeClient,            ['template:client:watch:bs']);
    gulp.watch(_.src.coffee,                ['coffee:watch:bs']);
  }else{
    _.logRed("只能在开发模式中启用");
  }
});

