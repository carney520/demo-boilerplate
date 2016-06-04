var gulp       = require('gulp'),
    cfg    = require('../config'),
    _      = require('../helpers'),
    sprite = require('gulp.spritesmith');


/* 生成 sprite 图片 */

var spriteConfig = {
  imgName: "sprite.png",
  cssName: "_sprite.scss",
  imgPath: _.assets("sprite.png",_.dest.css),
  padding:10,
};

gulp.task('sprite',function(){
  var spriteData =  gulp.src(_.src.sprite)
      .pipe(sprite(spriteConfig));
  spriteData.img.pipe(gulp.dest(_.dest.image));
  spriteData.css.pipe(gulp.dest(_.dest.sass));
});

//sprite watch
gulp.task('sprite:watch',function(){
  _.logGreen('正在监听sprite文件');
  return gulp.watch(_.src.sprite,["sprite"]);
});

