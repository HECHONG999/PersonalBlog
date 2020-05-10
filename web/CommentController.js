var CommentDao = require("../dao/commentDao.js");
var respUtil = require("../utils/respUtil.js")
var captcha = require("svg-captcha");
var url = require("url")
var path = new Map();
var timeUtil = require("../utils/getNow")

function queryNewComment(request, response) {
    CommentDao.queryNewComment( 5, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set("/queryNewComment", queryNewComment)

function queryRandomCode(request, response) {
    var img = captcha.create({fontSize:30, width: 80, height: 30});
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "评论成功", img));
    response.end();
}

path.set("/queryRandomCode", queryRandomCode)


function queryCommentsByBlogId(request, response) {
    var params = url.parse(request.url, true).query;

    CommentDao.queryCommentsByBlogId(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    })
}

path.set("/queryCommentsByBlogId", queryCommentsByBlogId);

function queryCommentCount(request, response) {
    CommentDao.queryCommentCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryCommentCount", queryCommentCount);

function addComment(request, response) {
    var params = url.parse(request.url, true).query;
    CommentDao.addComment(params.bid, params.parent, params.userName, params.email, params.content, params.parentName, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
    })
}

path.set("/addComment", addComment)
module.exports = path