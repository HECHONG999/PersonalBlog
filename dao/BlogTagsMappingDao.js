var DButils = require("./DButil.js");

function insertBlogTagsMapping(tagsId, blogId, ctime, utime, success) {
   var insertSql = "insert into blog_tags_mapping (`tag_id`,`blog_id`,`ctime`,`utime`) values(?,?,?,?);";
   var connection = DButils.createConnection();
        connection.connect();
    var params = [tagsId, blogId, ctime, utime];
    connection.query(insertSql, params, function (error, result) {
        if(error == null) {
            success(result);
        }else {
            console.log(error, "mapping错误")
        }
    })
}

module.exports = {
    "insertBlogTagsMapping": insertBlogTagsMapping
}