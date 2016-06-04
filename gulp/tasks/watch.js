var gulp       = require('gulp'),
    util       = require('gulp-util');

//watch
gulp.task('watch',["sass:watch","sprite:watch","sync:watch","coffee:watch","template:watch"],function(){
  util.log(util.colors.green("侦听文件成功...."));
});
