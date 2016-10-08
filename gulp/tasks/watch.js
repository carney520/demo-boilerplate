var gulp       = require('gulp-help')(require('gulp')),
    _          = require('../helpers'),
    util       = require('gulp-util');

//watch
gulp.task('watch', _.helps.watch, [
  "sass:watch",
  "sprite:watch",
  // "svg-sprite:watch",
  'iconfont:watch',
  "sync:watch",
  "js:watch",
  "template:watch"],
  function(){
    util.log(util.colors.green("侦听文件成功...."));
  }
);
