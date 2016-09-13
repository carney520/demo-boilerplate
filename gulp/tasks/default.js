var gulp       = require('gulp-help')(require('gulp')),
    runSequence = require('run-sequence'),
    util       = require('gulp-util'),
    fs         = require('fs'),
    del        = require('del'),
    path       = require('path'),
    cfg        = require('../config'),
    _          = require('../helpers');

gulp.task('info',_.helps.info,function(){
  util.log("production: ",util.colors.red(cfg.isProduction));
  util.log("compress  : ",util.colors.red(cfg.compress));
});

//default task
gulp.task('default',_.helps.default,function(){
  runSequence('info','clean','sprite',
              ['sass','babel','template','template:client'],
              'sync',
              function(){
                util.beep();
                util.log(util.colors.green("finished gulp...."));
              }
             );
});

//clean
gulp.task('clean',_.helps.clean,function(){
  return del([path.join(cfg.dest,"/**/*")]).then(function(paths){
    util.log(util.colors.yellow("cleaning:\n" + paths.join("\n") +"\nend ... "));
  });
});
