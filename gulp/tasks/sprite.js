var gulp   = require('gulp-help')(require('gulp')),
    cfg    = require('../config'),
    _      = require('../helpers'),
    path   = require('path'),
    sprite = require('gulp.spritesmith');


/* 生成 sprite 图片 */

var spriteConfig = Object.assign({
  imgName: "sprite.png",
  cssName: "_sprite.scss",
  imgPath: _.assets("sprite.png",_.dest.css),
  padding:10,
},cfg.config.sprite);

gulp.task('sprite',_.helps.sprite,function(){
  var spriteData =  gulp.src(_.src.sprite)
      .pipe(sprite(spriteConfig));
  spriteData.img.pipe(gulp.dest(_.dest.image));
  spriteData.css.pipe(gulp.dest(path.dirname(_.src.sassVendor)));
});

//sprite watch
gulp.task('sprite:watch',_.helps['sprite:watch'],function(){
  _.logGreen('正在监听sprite文件');
  return gulp.watch(_.src.sprite,["sprite"]);
});

