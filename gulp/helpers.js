var cfg  = require('./config'),
    util = require('gulp-util'),
    inputs  = cfg.inputs,
    outputs = cfg.outputs,
    path = require('path'),
    join = path.join,
    mime = require("mime");

//获取源代码目录的完整路径
var _client = function(glob){
  return join(cfg.client,glob);
};

//获取目标目录的完整路径
var _dest = function(glob){
  return join(cfg.dest,glob);
};

module.exports._client = _client;
module.exports._dest   = _dest;

//输入输出目录
//inputs
exports.src = {};
for(var key in inputs){
  exports.src[key] = _client(inputs[key]);
}

//outputs
exports.dest = {};
for(var key in outputs){
  exports.dest[key] = _dest(outputs[key]);
}

exports.log = util.log;
exports.logGreen = function(message){
  util.log(util.colors.green(message));
};

exports.logRed = function(message){
  util.log(util.colors.red(message));
};


//用于自动处理资源的相对路径
exports.assets = function(src,from){
  var type = mime.lookup(src),to;
  from = from || join(cfg.dest,cfg.outputs.html);
  if(type === "application/javascript"){
    to = join(cfg.dest,cfg.outputs.js);
  }else if(type === "text/css"){
    to = join(cfg.dest,cfg.outputs.css);
  }else if(/^image/.test(type)){
    to = join(cfg.dest,cfg.outputs.image);
  }else if(type === "text/html"){
    to = join(cfg.dest,cfg.outputs.html);
  }else{
    throw "unknown type of source: " + type;
  }
  return join(path.relative(from,to),src);
};
