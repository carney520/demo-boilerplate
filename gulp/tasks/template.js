/*
 *
 *
 * HTML
 *
 *
 */
var gulp       = require('gulp-help')(require('gulp')),
    gulpif     = require('gulp-if'),
    rename = require('gulp-rename'),
    jade   = require('gulp-jade'),
    cfg    = require('../config'),
    _      = require('../helpers');

/*   配置   */

//渲染变量
var locals = {
};

var jadeConfig = Object.assign({
  normal: {
    locals: Object.assign(locals,_),
    pretty: true,
  },
  client: {
    client:true
  }
},
  cfg.config.jade
);

gulp.task('template',_.helps.template,function(){
  gulp.src(_.src.jade)
  .pipe(rename(function(path){
    // 截断以"_"开始的目录名
    if(path.dirname.startsWith('_')){
      path.dirname =  path.dirname.slice(1);
    }
    return path;
  }))
  .pipe(jade(jadeConfig.normal))
  .on('error',_.log)
  .pipe(gulp.dest(_.dest.html));
});

gulp.task('template:client',_.helps['template:client'],function(){
  //compile to js
  gulp.src(_.src.jadeClient)
  .pipe(jade(jadeConfig.client))
  .pipe(gulp.dest(_.dest.clientTemplate));
});

gulp.task('template:watch',_.helps['template:watch'],function(){
  _.logGreen('正在监听模板文件');
  gulp.watch(_.src.jadeWatch, ['template']);
  gulp.watch(_.src.jadeClient,['template:client']);
});
