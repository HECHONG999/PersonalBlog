var fs = require("fs");

var globalConfig = {}

var config = fs.readFileSync("./server.conf").toString().split("\r\n");
for(var i = 0; i < config.length; i ++) {
    globalConfig[ config[i].split("=")[0].trim()] =  config[i].split("=")[1].trim()
}
module.exports = globalConfig;