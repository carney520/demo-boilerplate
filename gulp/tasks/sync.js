/*
 *
 *
 * Files
 *
 *
 */
var gulp       = require('gulp-help')(require('gulp')),
    gulpif     = require('gulp-if'),
    imagemin   = require('gulp-imagemin'),
    cfg        = require('../config'),
    _          = require('../helpers');

//copy font
gulp.task('sync:fonts', false, function() {
  gulp.src(_.src.fonts)
  .pipe(gulp.dest(_.dest.font))
})

//copy images
gulp.task('sync:images',false,function(){
  gulp.src(_.src.images)
  .pipe(gulpif(cfg.compress,imagemin()))
  .pipe(gulp.dest(_.dest.image));
});

//copy css
gulp.task('sync:css',false,function(){
  //copy css
  gulp.src(_.src.cssVendor)
  .pipe(gulp.dest(_.dest.css));
});

//copy js
gulp.task('sync:js',false,function(){
  gulp.src(_.src.jsVendor)
  .pipe(gulp.dest(_.dest.js));
});

gulp.task('sync', _.helps.sync, ["sync:images","sync:css","sync:js", "sync:fonts"]);

gulp.task('sync:watch', _.helps['sync:watch'], function(){
  _.logGreen('正在监听资源文件');
  gulp.watch(_.src.fonts, ['sync:fonts'])
  gulp.watch(_.src.images, ['sync:images']);
  gulp.watch(_.src.cssVendor, ['sync:css']);
  gulp.watch(_.src.jsVendor, ['sync:js']);
});
