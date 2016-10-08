/*
*
* sass  编译
*
*/
var gulp       = require('gulp-help')(require('gulp')),
    gulpif     = require('gulp-if'),
    sourcemaps = require('gulp-sourcemaps'),
    sass       = require('gulp-sass'),
    sassLint   =  require('gulp-sass-lint'),
    autoprefixer = require('gulp-autoprefixer'),
    csso       = require('gulp-csso'),
    bs         = require('./browserSync'),
    cfg        = require('../config'),
    _          = require('../helpers');

//sass option
var sassOption = Object.assign({
  outputStyle: "expanded",
}, cfg.config.sass);



gulp.task('sass',_.helps.sass,function(){
  return gulp.src(_.src.sass)
    // .pipe(sassLint())
    // .pipe(sassLint.format())
    // .pipe(sassLint.failOnError())
    .pipe(gulpif(!cfg.isProduction,sourcemaps.init()))
    .pipe(sass(sassOption).on('error',sass.logError))                  //编译sass
    .pipe(autoprefixer({browsers:['last 2 versions','ie >= 9','and_chr >= 2.3']}))      //添加厂商前缀
    .pipe(gulpif(!cfg.isProduction,sourcemaps.write()))          //sourcemap
    .pipe(gulpif(cfg.compress,csso()))                           //压缩
    .pipe(gulp.dest(_.dest.css))
    .pipe(bs.browserSync.stream());                             //browser-sync 注入
});

//sass watch
gulp.task('sass:watch',_.helps['sass:watch'],function(){
  _.logGreen('正在监听scss文件');
  return gulp.watch(_.src.sass,['sass']);
});
