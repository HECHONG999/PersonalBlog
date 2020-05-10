var DButil = require("./DButil.js");

function insertBlog(title, content, tags, views, ctime, utime, success) {
    var insertSql = "insert into blog (`title`,`content`,`tags`,`views`,`ctime`,`utime`) values (?,?,?,?,?,?);";
    var connection = DButil.createConnection();
        connection.connect();
    var params = [title, content, tags, views, ctime, utime];
    connection.query(insertSql, params, function (error, result) {
        if(error) {
            console.log(error)
        }else {
            success(result)
        }
    })

    connection.end()
}


function queryBlogByPageSize(size, pageSize,success) {
    var  querySql = "select * from blog order by id desc limit ?,?";
    var connection = DButil.createConnection();
        connection.connect();
        // 设定前端以第一页为起始页 size=1   limit 0, 5 从数据库中查5条数据
    var params = [(size - 1) * pageSize , pageSize];  // size = 0  就从第1条查到第5条
    connection.query(querySql, params, function (error, result) {
        if( error == null ) {
            success(result);
        }else {
            console.log("queryBlogByPageSize 错误", error)
        }
    })
    connection.end()
}


function queryAllBlogCount(success) {
    var  querySql = "select count(1) as count  from blog";
    var connection = DButil.createConnection();
        connection.connect();
    var params = [];
    connection.query(querySql, params, function (error, result) {
        if( error == null ) {
            success(result);
        }else {
            console.log("queryAllBlogCount 错误", error)
        }
    })
    connection.end()
}

function queryBlogById(id, success) {
    var sql = "select * from blog where id = ?;";
    var params = [id];
    var connection = DButil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}


function addViews(blogId, success) {
    var sql = "update blog set views = views + 1  where id = ?;";
    var params = [blogId];
    var connection = DButil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}


function queryHotBlog(size, success) {
    var querySql = "select * from blog order by views desc limit ?;";
    var params = [size];

    var connection = DButil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}



module.exports = {
    "insertBlog": insertBlog,
    "queryBlogByPageSize": queryBlogByPageSize,
    "queryAllBlogCount": queryAllBlogCount,
    "queryBlogById": queryBlogById,
    "addViews": addViews,
    "queryHotBlog": queryHotBlog
}