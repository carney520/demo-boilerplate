/*
 *
 * babel JS
 *
*/
var gulp       = require('gulp-help')(require('gulp')),
    gulpif     = require('gulp-if'),
    sourcemaps = require('gulp-sourcemaps'),
    babel      = require('gulp-babel'),
    uglify     = require('gulp-uglify'),
    cfg        = require('../config'),
    _          = require('../helpers');


gulp.task("babel", _.helps.js, function(){
  return gulp.src(_.src.js)
  .pipe(gulpif(!cfg.isProduction,sourcemaps.init()))
  .pipe(babel())
  .pipe(gulpif(!cfg.isProduction,sourcemaps.write()))
  .pipe(gulpif(cfg.compress,uglify()))
  .pipe(gulp.dest(_.dest.js));
});

gulp.task("babel:watch", _.helps['js:watch'], function(){
  _.logGreen('正在监听js文件');
  return gulp.watch(_.src.js, ['babel']);
});
