var cfg  = require('./config'),
    util = require('gulp-util'),
    inputs  = cfg.inputs,
    outputs = cfg.outputs,
    path = require('path'),
    join = path.join,
    mime = require("mime");

/**
 * 获取源代码目录的完整路径
 * @param  {String} glob -  path relative to '/client'
 * @return {String}      absoulute path
 */
var NOT_REGX = /^!/
module.exports._client = function(glob){
  var withNot = false
  if (withNot = NOT_REGX.test(glob)) {
    glob = glob.replace(NOT_REGX, '')
  }

  return withNot 
    ? '!' + join(cfg.client, glob)
    : join(cfg.client, glob)
};

/**
 * 获取目标目录的完整路径
 * @param  {String} glob - path relative to '/dist'
 * @return {String}      absoulute path
 */
module.exports._dest = function(glob){
  return join(cfg.dest, glob);
};

/**
 * 生成输入目录
 * @type {Object}
 */
exports.src = (function(){
  var out = {}

  for(var key in inputs){
    var src;
    if(Array.isArray(inputs[key])){
      src = [];
      for(var i = 0; i < inputs[key].length; i++){
        src[i] = exports._client(inputs[key][i]);
      }
    }else{
      src = exports._client(inputs[key]);
    }
    out[key] = src
  }

  return out
})();

/** 
 * 生成输出目录
 */
exports.dest = {};
for(var key in outputs){
  exports.dest[key] = exports._dest(outputs[key]);
}

//help message
exports.helps = require("./help_message");

/**
 * console log
 * @type {[type]}
 */
exports.log = util.log;
exports.logGreen = exports.success = function(message){
  util.log(util.colors.green(message));
};

exports.logRed = exports.error = function(message){
  util.log(util.colors.red(message));
};


/**
 * 获取资源的相对路径
 * @param  {String} src  - 资源文件名， 如 foo.js
 * @param  {String} from - pwd 当前目录
 */
exports.assets = function(src, from){
  var type = mime.lookup(src),to;
  from = from || join(cfg.dest, cfg.outputs.html);

  if(type === "application/javascript"){
    to = join(cfg.dest, cfg.outputs.js);
  }else if(type === "text/css"){
    to = join(cfg.dest, cfg.outputs.css);
  }else if(/^image/.test(type)){
    to = join(cfg.dest, cfg.outputs.image);
  }else if(type === "text/html"){
    to = join(cfg.dest, cfg.outputs.html);
  }else{
    throw "unknown type of source: " + type;
  }
  return join(path.relative(from, to), src);
};