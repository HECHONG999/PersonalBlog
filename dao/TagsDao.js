var DButil = require("./DButil.js");


function insertTags(name, ctime, utime ,success) {
    var insertSql = "insert into tags (`name`,`ctime`,`utime`) values (?,?,?)"
    var connection = DButil.createConnection();
        connection.connect();
    var params = [name, ctime, utime];
    connection.query(insertSql, params, function (error, result)  {
       if(error == null) {
            success(result);
       } else {
            console.log(error)
       }
    })
    connection.end()
}


// 根据name查询标签
function queryTags(name, success) {
    var insertSql ="select * from tags where name = ?;";
    var connection = DButil.createConnection();
        connection.connect();
    var params = [name];
    connection.query(insertSql, params, function (error, result)  {
       if( error == null) {
        success(result);
       } else {
           console.log(error)
       }
    });
    connection.end()
}

function queryTagsAll(success) {
    var insertSql ="select * from tags where id;";
    var connection = DButil.createConnection();
        connection.connect();
    var params = [];
    connection.query(insertSql, params, function (error, result)  {
       if( error == null) {
         success(result);
       } else {
           console.log(error)
       }
    })
    connection.end()
}



module.exports = {
    "insertTags": insertTags,
    "queryTags": queryTags,
    "queryTagsAll": queryTagsAll
}