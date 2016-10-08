/* 生成 svg icon font  */
var gulp   = require('gulp-help')(require('gulp')),
    cfg    = require('../config'),
    _      = require('../helpers'),
    path   = require('path'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css')

var fontName = 'custom'

var iconfontCssConfig = Object.assign({
  // 字体名
  fontName: fontName,
  // css产出目录，相对于gulp dest
  targetPath: path.join('../', path.dirname(cfg.inputs.sassVendor), '_custom-icons.scss'),
  // font-family 路径
  fontPath: '../fonts/',
  // 自定义类名
  cssClass: 'custom-icon',
}, cfg.config.iconfontCss);


gulp.task('iconfont', _.helps['iconfont'], function(){
  gulp.src(_.src.svgSprite)
  .pipe(iconfontCss(iconfontCssConfig))
  .pipe(iconfont({
    fontName: fontName,
  }))
  .pipe(gulp.dest(path.dirname(_.src.fonts)))
});

//sprite watch
gulp.task('iconfont:watch', _.helps['iconfont:watch'], function(){
  return gulp.watch(_.src.svgSprite, ['iconfont']);
});
