var gulp       = require('gulp'),
    gulpif     = require('gulp-if'),
    sourcemaps = require('gulp-sourcemaps'),
    sass       = require('gulp-sass'),
    sassLint   =  require('gulp-sass-lint'),
    autoprefixer = require('gulp-autoprefixer'),
    csso   = require('gulp-csso'),
    sprite = require('gulp.spritesmith'),
    jade   = require('gulp-jade'),
    coffee = require('gulp-coffee'),
    coffeeLint = require('gulp-coffeelint'),
    uglify     = require('gulp-uglify'),
    gulpCopy   = require('gulp-copy'),
    util       = require('gulp-util'),
    browserSync = require('browser-sync').create(),
    fs          = require('fs'),
    path        = require('path'), _ = path.join;

var client="./client/",
    dest,              //项目输出目录
    isProduction,      //是否是生产模式
    compress = false;  //是否启用压缩

if(process.env.NODE_ENV==="production"){
  dest = "./production";
  isProduction = true;
}else{
  dest = "./dist";
  isProduction = false;
}

/*
 * 
 * CSS & Images
 *
 */

/*  sass  */
//sass option
var sassOption = {
  outputStyle: "expanded",
};


gulp.task('sass',['sprite'],function(){
  return gulp.src(_(client,"css/*.scss"))
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(gulpif(!isProduction,sourcemaps.init()))
    .pipe(sass().on('error',sass.logError))                  //编译sass
    .pipe(autoprefixer({browsers:['last 2 versions']}))      //添加厂商前缀
    .pipe(gulpif(!isProduction,sourcemaps.write()))          //sourcemap
    .pipe(gulpif(compress,csso()))                           //压缩
    .pipe(gulp.dest(_(dest,"css")))
    .pipe(browserSync.stream());                             //browser-sync 注入
});

//sass watch
gulp.task('sass:watch',function(){
  util.log(util.colors.green('正在监听scss文件'));
  return gulp.watch(_(client,"css/*.scss"),['sass']);
});


/* sprites */
gulp.task('sprite',function(){
  var spriteData =  gulp.src(_(client,"images/sprites/*.png"))
      .pipe(sprite({
        imgName: "sprite.png",
        cssName: "_sprite.scss",
        //imgPath:"css文件中的sprite图片路径",
        padding:10,
      }));
  spriteData.img.pipe(gulp.dest(_(client,"images")));
  spriteData.css.pipe(gulp.dest(_(client,"css")));
});

//sprite watch
gulp.task('sprite:watch',function(){
  util.log(util.colors.green('正在监听sprite文件'));
  return gulp.watch(_(client,"images/sprites/*.png"),["sprite"])
  .on("changed",browserSync.reload);
});

/*
 *
 *
 * Files
 *
 */
/* setup project file organization */
/* copy sources */
//copy images
gulp.task('sync:images',function(){
  gulp.src(_(client,"images/*.*"))
  .pipe(gulp.dest(_(dest,"images")));
});

//copy css
gulp.task('sync:css',function(){
  //copy css
  gulp.src(_(client,"css/vendor/*.*"))
  .pipe(gulp.dest(_(dest,"css")));
  //copy fonts
  gulp.src(_(client,"fonts/*"))
  .pipe(gulp.dest(_(dest,"fonts")));
});

//copy js
gulp.task('sync:js',function(){
  gulp.src(_(client,"js/vendor/*.*"))
  .pipe(gulp.dest(_(dest,"js")));
});

gulp.task('sync',["sync:images","sync:css","sync:js"]);
gulp.task('sync:watch',function(){
  util.log(util.colors.green('正在监听资源文件'));
  gulp.watch(_(client,"images/*.*"),['sync:images']);
  gulp.watch([_(client,"css/vendor/*.*"),_(client,"fonts/*")],['sync:css']);
  gulp.watch(_(client,"js/vendor/*.*"),['sync:js']);
});

/*
 *
 *
 * HTML
 *
 *
 */

gulp.task('template',function(){
  var locals = { //your locals
  }; 
  var separateLocals = require("./.locals.js");

  gulp.src(_(client,"templates/*.jade"))
  .pipe(jade({
    locals: Object.assign(locals,separateLocals),
    pretty:true,
  }))
  .pipe(gulp.dest(_(dest,"pages")));
});

gulp.task('template:client',function(){
  //compile to js
  gulp.src(_(client,"templates/client/*.jade"))
  .pipe(jade({
    client:true
  }))
  .pipe(gulp.dest(_(dest,"js/tmpls")));
});

gulp.task('template:watch',function(){
  util.log(util.colors.green('正在监听模板文件'));
  gulp.watch(_(client,"templates/*.jade"),['template'])
    .on("changed",browserSync.reload);
  gulp.watch(_(client,"templates/client/*.jade"),['template:client'])
    .on("changed",browserSync.reload);
});


/*
 *
 * JS
 *
 */

gulp.task("coffee",function(){
  return gulp.src(_(client,"js/*.coffee"))
  .pipe(gulpif(!isProduction,sourcemaps.init()))
  .pipe(coffeeLint())
  .pipe(coffeeLint.reporter())
  .pipe(coffee())
  .pipe(gulpif(!isProduction,sourcemaps.write()))
  .pipe(gulpif(compress,uglify()))
  .pipe(gulp.dest(_(dest,"js")));
});

gulp.task("coffee:watch",function(){
  util.log(util.colors.green('正在监听coffee文件'));
  return gulp.watch(_(client,"js/*.coffee"),['coffee'])
    .on('changed',browserSync.reload);                    //刷新browser-sync
});


/*
 *
 * Dev server
 *
 */
gulp.task("start",["coffee:watch","template:watch","sprite:watch"],function(){
  if(!isProduction){
    util.log(util.colors.green("正在启用开发服务器"));
    browserSync.init({
      server:{
        baseDir:dest
      }
    });
    gulp.watch(_(client,"css/**/*.scss"),["sass"]);     //监听sass文件
  }else{
    util.log(util.colors.red("只能在开发模式中启用"));
  }
});

/*
 *
 *
 * main
 *
 */

gulp.task('prevexec',function(){
  util.log("production: ",util.colors.red(isProduction));
  util.log("compress: ",util.colors.red(compress));
});

//default task
gulp.task('default',['prevexec','sass','sync','coffee','template','template:client'],function(){
  util.beep();
  util.log(util.colors.green("finished gulp...."));
});

//watch
gulp.task('watch',["sass:watch","sprite:watch","sync:watch","coffee:watch","template:watch"],function(){
  util.log(util.colors.green("侦听文件成功...."));
});

//help message
gulp.task('help',function(){
  fs.readFile("./help","utf8",function(err,data){
    if(!err){
      console.log(data);
    }else{
      throw err;
    }
  });
});
