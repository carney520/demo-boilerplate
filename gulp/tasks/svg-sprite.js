/* 生成 svg sprite  */
var gulp   = require('gulp-help')(require('gulp')),
    cfg    = require('../config'),
    _      = require('../helpers'),
    path   = require('path'),
    svgSprite = require('gulp-svg-sprite');



var spriteConfig = Object.assign({
  mode: {
    symbol: {
      dest: './',
      sprite: path.join(path.dirname(cfg.inputs.images), 'sprite.svg'),
    },
    // css: {
    //   dest: './',
    //   prefix: '.svg-%s',
    //   sprite: path.join(path.dirname(cfg.inputs.images), 'sprite.svg'),
    //   render: {
    //     scss: {
    //       dest: path.join(path.dirname(cfg.inputs.sassVendor), '_svg-sprite.scss'),
    //     },
    //   },
    // },
  },
  shape: {
    transform: ['svgo'],
    dimension: {
      attributes: false,
    },
  },
}, cfg.config.svgSprite);


gulp.task('svg-sprite', _.helps['svg-sprite'], function(){
  gulp.src(_.src.svgSprite)
  .pipe(svgSprite(spriteConfig))
  .pipe(gulp.dest(cfg.client))
});

//sprite watch
gulp.task('svg-sprite:watch', _.helps['svg-sprite:watch'], function(){
  _.logGreen('正在监听svg sprite文件');
  return gulp.watch(_.src.svgSprite, ['svg-sprite']);
});
