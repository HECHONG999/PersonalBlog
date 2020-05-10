/**
 * loader层: 读取config配置参数
 */
// 读web层文件
var fs = require("fs");
var globalConfig = require("./config");


var controllerSet = [];
var map = new Map();
// var path = path.resolve(__dirname, globalConfig["web_path"])
// var path = globalConfig["web_path"]

// var files = fs.readdirSync("./" + globalConfig["web_path"]);

var files = fs.readdirSync("./web")

for( var i = 0; i < files.length; i ++) {
    
    try {
        var file = require("./web" + "/" + files[i])
    } catch (e) {
        console.log(e)
    }

  for( var [key, value] of file) {
      if( map.get(key) == null ) {
          map.set(key, value)
      } else {
          throw Error(" url 异常， url：" + key)
      }
  }
  controllerSet.push(file)
}

module.exports = map;