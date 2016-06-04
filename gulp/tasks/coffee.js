/*
 *
 * JS
 *
 */

var gulp       = require('gulp'),
    gulpif     = require('gulp-if'),
    sourcemaps = require('gulp-sourcemaps'),
    coffee     = require('gulp-coffee'),
    coffeeLint = require('gulp-coffeelint'),
    uglify     = require('gulp-uglify'),
    cfg        = require('../config'),
    _          = require('../helpers');

var coffeeConfig = {};

gulp.task("coffee",function(){
  return gulp.src(_.src.coffee)
  .pipe(gulpif(!cfg.isProduction,sourcemaps.init()))
  .pipe(coffeeLint())
  .pipe(coffeeLint.reporter())
  .pipe(coffee(coffeeConfig).on('error', _.log))
  .pipe(gulpif(!cfg.isProduction,sourcemaps.write()))
  .pipe(gulpif(cfg.compress,uglify()))
  .pipe(gulp.dest(_.dest.js));
});

gulp.task("coffee:watch",function(){
  _.logGreen('正在监听coffee文件');
  return gulp.watch(_.src.coffee,['coffee']);
});

