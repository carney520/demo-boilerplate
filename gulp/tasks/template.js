/*
 *
 *
 * HTML
 *
 *
 */
var gulp       = require('gulp'),
    gulpif     = require('gulp-if'),
    jade   = require('gulp-jade'),
    cfg    = require('../config'),
    _      = require('../helpers');

/*   配置   */

//渲染变量
var locals = { 
}; 

var jadeConfig = cfg.config.jade || {
  normal: {
    locals: Object.assign(locals,_),
    pretty:true,
  },
  client: {
    client:true
  }
};

gulp.task('template',function(){
  gulp.src(_.src.jade)
  .pipe(jade(jadeConfig.normal))
  .on('error',_.log)
  .pipe(gulp.dest(_.dest.html));
});

gulp.task('template:client',function(){
  //compile to js
  gulp.src(_.src.jadeClient)
  .pipe(jade(jadeConfig.client))
  .pipe(gulp.dest(_.dest.clientTemplate));
});

gulp.task('template:watch',function(){
  _.logGreen('正在监听模板文件');
  gulp.watch(_.src.jadeWatch,['template']);
  gulp.watch(_.src.jadeClient,['template:client']);
});

