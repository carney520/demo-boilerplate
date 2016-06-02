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
    reload      = browserSync.reload,
    fs          = require('fs'),
    del         = require('del'),
    helpers     = require('./.helpers'),  //帮助方法
    path        = require('path'), _ = path.join;

var client="./client/",
    dest,              //项目输出目录
    isProduction,      //是否是生产模式
    compress = false,  //是否启用压缩
    outputs = {        //输出资源目录
      js: "js",
      css: "css",
      font: "fonts",
      image: "images",
      html: "pages",
      clientTemplate: "js/tmpls"
    };


if(process.env.NODE_ENV==="production"){
  dest = "./production";
  isProduction = true;
}else{
  dest = "./dist";
  isProduction = false;
}

//initial helpers
var $ = helpers(dest,outputs);

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


gulp.task('sass',function(){
  return gulp.src(_(client,"css/*.scss"))
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(gulpif(!isProduction,sourcemaps.init()))
    .pipe(sass().on('error',sass.logError))                  //编译sass
    .pipe(autoprefixer({browsers:['last 4 versions']}))      //添加厂商前缀
    .pipe(gulpif(!isProduction,sourcemaps.write()))          //sourcemap
    .pipe(gulpif(compress,csso()))                           //压缩
    .pipe(gulp.dest(_(dest,outputs.css)))
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
        imgPath: $.assets("sprite.png",_(dest,outputs.css)),
        padding:10,
      }));
  spriteData.img.pipe(gulp.dest(_(dest,outputs.image)));
  spriteData.css.pipe(gulp.dest(_(client,outputs.css)));
});

//sprite watch
gulp.task('sprite:watch',function(){
  util.log(util.colors.green('正在监听sprite文件'));
  return gulp.watch(_(client,"images/sprites/*.png"),["sprite"]);
});

gulp.task('sprite:watch:bs',['sprite'], reload);

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
  .pipe(gulp.dest(_(dest,outputs.image)));
});

//copy css
gulp.task('sync:css',function(){
  //copy css
  gulp.src(_(client,"css/vendor/*.*"))
  .pipe(gulp.dest(_(dest,outputs.css)));
  //copy fonts
  gulp.src(_(client,"fonts/*"))
  .pipe(gulp.dest(_(dest,outputs.font)));
});

//copy js
gulp.task('sync:js',function(){
  gulp.src(_(client,"js/vendor/*.*"))
  .pipe(gulp.dest(_(dest,outputs.js)));
});

gulp.task('sync',["sync:images","sync:css","sync:js"]);
gulp.task('sync:watch',function(){
  util.log(util.colors.green('正在监听资源文件'));
  gulp.watch(_(client,"images/*.*"),['sync:images']);
  gulp.watch([_(client,"css/vendor/*.*"),_(client,"fonts/*")],['sync:css']);
  gulp.watch(_(client,"js/vendor/*.*"),['sync:js']);
});

gulp.task('sync:js:watch:bs',['sync:js'],reload);
gulp.task('sync:css:watch:bs',['sync:css'],reload);
gulp.task('sync:images:watch:bs',['sync:images'],reload);


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

  gulp.src(_(client,"templates/*.jade"))
  .pipe(jade({
    locals: Object.assign(locals,$),
    pretty:true,
  }))
  .on('error',function(err){
    util.log("jade error",err.message);
    this.end();
  })
  .pipe(gulp.dest(_(dest,outputs.html)));
});

gulp.task('template:client',function(){
  //compile to js
  gulp.src(_(client,"templates/client/*.jade"))
  .pipe(jade({
    client:true
  }))
  .pipe(gulp.dest(_(dest,outputs.clientTemplate)));
});

gulp.task('template:watch',function(){
  util.log(util.colors.green('正在监听模板文件'));
  gulp.watch(_(client,"templates/**/*.jade"),['template']);
  gulp.watch(_(client,"templates/client/*.jade"),['template:client']);
});
gulp.task('template:watch:bs',['template'],reload);
gulp.task('template:client:watch:bs',['template:client'],reload);


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
  .pipe(coffee().on('error', util.log))
  .pipe(gulpif(!isProduction,sourcemaps.write()))
  .pipe(gulpif(compress,uglify()))
  .pipe(gulp.dest(_(dest,outputs.js)));
});

gulp.task("coffee:watch",function(){
  util.log(util.colors.green('正在监听coffee文件'));
  return gulp.watch(_(client,"js/*.coffee"),['coffee']);
});
gulp.task("coffee:watch:bs",["coffee"],reload);


/*
 *
 * Dev server
 *
 */
//首先执行任务再侦听任务
gulp.task("start",["default"],function(){
  if(!isProduction){
    util.log(util.colors.green("正在启用开发服务器"));
    browserSync.init({
      server:{
        baseDir:dest
      }
    });
    gulp.watch(_(client,"images/sprites/*.png"),                ["sprite:watch:bs"]);
    gulp.watch(_(client,"images/*.*"),                          ['sync:images:watch:bs']);
    gulp.watch([_(client,"css/vendor/*.*"),_(client,"fonts/*")],['sync:css:watch:bs']);
    gulp.watch(_(client,"js/vendor/*.*"),                       ['sync:js:watch:bs']);
    gulp.watch(_(client,"templates/**/*.jade"),                 ['template:watch:bs']);
    gulp.watch(_(client,"templates/client/*.jade"),             ['template:client:watch:bs']);
    gulp.watch(_(client,"js/*.coffee"),                         ['coffee:watch:bs']);
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
gulp.task('default',['prevexec','sprite','sass','sync','coffee','template','template:client'],function(){
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

//clean
gulp.task('clean',function(){
  return del([_(dest,"/**/*")]).then(function(path){
    util.log(util.colors.yellow("cleaning:\n" + path.join("\n") +"\nend ... "));
  });
});
