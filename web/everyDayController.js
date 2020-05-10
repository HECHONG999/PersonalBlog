var connection = require("../dao/everyDayDao.js");
var getNow = require("../utils/getNow.js");
var respUtil = require('../utils/respUtil.js');
var path = new Map()

function editEveryDay(request, response) {
    // 向后台提交数据
    request.on("data", function (data) {
        console.log(data.toString(), " ===== ")
        connection.insertEveryDay( data.toString() , getNow(), function (result) {
           response.writeHead(200);
           response.write(respUtil.writeResult("success", "添加成功", null));
           response.end()
        })
    })
}

path.set("/editEveryDay", editEveryDay)

function queryEveryDay(request, response) {
    connection.queryEveryDay(function (result) {
       response.writeHead(200),
       response.write(JSON.stringify(result));
       response.end()
    })
}

path.set("/queryEveryDay", queryEveryDay)

module.exports = path