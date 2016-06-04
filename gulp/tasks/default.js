var gulp       = require('gulp'),
    util       = require('gulp-util'),
    fs         = require('fs'),
    del        = require('del'),
    path       = require('path'),
    cfg        = require('../config'),
    _          = require('../helpers');

gulp.task('prevexec',function(){
  util.log("production: ",util.colors.red(cfg.isProduction));
  util.log("compress  : ",util.colors.red(cfg.compress));
});

//default task
gulp.task('default',['prevexec','sprite','sass','sync','coffee','template','template:client'],function(){
  util.beep();
  util.log(util.colors.green("finished gulp...."));
});

//help message
gulp.task('help',function(){
  fs.readFile("help","utf8",function(err,data){
    if(!err){
      util.log(data);
    }else{
      throw err;
    }
  });
});

//clean
gulp.task('clean',function(){
  return del([path.join(cfg.dest,"/**/*")]).then(function(paths){
    util.log(util.colors.yellow("cleaning:\n" + paths.join("\n") +"\nend ... "));
  });
});
