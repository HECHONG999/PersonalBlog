var DButil = require("./DButil.js");


function queryCommentsByBlogId (blogId, success) {
    var querySql = "select * from comments where blog_id = ?;";
    var connection = DButil.createConnection();
        connection.connect()
    var params = [blogId];
    connection.query(querySql, params, function (error, result) {
        if( error == null) {
            success(result)
        } else {
            console.log(error)
        }
    })
}


function queryCommentCount(success) {
    var querySql = "select count(*) as count from comments ;";
    var connection = DButil.createConnection();
        connection.connect()
    var params = [];
    connection.query(querySql, params, function (error, result) {
        if( error == null) {
            success(result)
        } else {
            console.log(error)
        }
    })
}
function addComment(blogId, parent, userName, email, content, parentName, ctime, utime, success) {
    var insertSql = "insert into comments (`blog_id`,`parent`,`user_name`,`email`,`content`,`parent_name`,`ctime`,`utime`) values (?,?,?,?,?,?,?,?);";
    var connection = DButil.createConnection();
        connection.connect();
    var params = [ blogId, parent, userName, email,content, parentName, ctime, utime];
    connection.query(insertSql, params, function (error, result) {
        if(error) {
            console.log(error)
        }else {
            success(result)
        }
    })

    connection.end()
}

function queryNewComment(size, success) {
    var querySql = "select * from comments order by id desc limit ?;";
    var connection = DButil.createConnection();
        connection.connect()
    var params = [size];
    connection.query(querySql, params, function (error, result) {
        if( error == null) {
            success(result)
        } else {
            console.log(error)
        }
    })
}

module.exports = {
    "queryCommentsByBlogId": queryCommentsByBlogId,
    "queryCommentCount": queryCommentCount,
    "addComment": addComment,
    "queryNewComment": queryNewComment
}
