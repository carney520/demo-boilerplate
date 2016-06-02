var path = require("path").posix;
var mime = require("mime");

module.exports = function(root,dest){
  return {
    assets: function(src,from){
      var type = mime.lookup(src),to;
      from = from || path.join(root,dest.html);
      if(type === "application/javascript"){
        to = path.join(root,dest.js);
      }else if(type === "text/css"){
        to = path.join(root,dest.css);
      }else if(/^image/.test(type)){
        to = path.join(root,dest.image);
      }else if(type === "text/html"){
        to = path.join(root,dest.html);
      }else{
        throw "unknown type of source: " + type;
      }
      return path.join(path.relative(from,to),src);
    }
  };
};
