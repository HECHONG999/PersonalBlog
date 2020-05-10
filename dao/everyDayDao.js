var DButil = require("./DButil.js");

function insertEveryDay(content, time, success) {
    console.log(content, time, '+++')
    var insertSql = "insert into every_day (`content`,`ctime`) values (?,?);";
    var connection = DButil.createConnection();
        connection.connect()
    var params = [content, time]
    connection.query(insertSql, params, function (error, result) {
        if( error == null) {
            success(result)
        }else {
            console.log(error)
        }
    })

    connection.end();
}
function queryEveryDay(success) {
    var querySql = " select * from every_day order by id desc limit 1";
    var connection = DButil.createConnection();
        connection.connect()
    var params = []
    connection.query(querySql, params, function (error, result) {
      
        if( error == null) {
            success(result)
        }else {
            console.log(error)
        }
    })

    connection.end();
}
module.exports = {
    "insertEveryDay": insertEveryDay,
    "queryEveryDay": queryEveryDay
}