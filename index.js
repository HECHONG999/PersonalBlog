var  express = require("express");
var globalConfig = require("./config.js");
var loader = require("./loader.js")
var app = new express()


app.post("/editEveryDay", loader.get("/editEveryDay"))
app.get("/queryEveryDay", loader.get("/queryEveryDay"));
app.post("/addBlog", loader.get("/addBlog"))

app.get("/queryBlogByPageSize", loader.get("/queryBlogByPageSize"));
app.get("/queryAllBlogCount", loader.get("/queryAllBlogCount"))

app.get("/getBlogDetail", loader.get("/getBlogDetail"));

app.get("/addComment", loader.get("/addComment"))
app.get("/queryRandomCode", loader.get("/queryRandomCode"));
app.get("/queryCommentsByBlogId", loader.get("/queryCommentsByBlogId"))
app.get("/queryCommentCount", loader.get("/queryCommentCount"))

app.get("/queryTagsAll", loader.get("/queryTagsAll"));
app.get("/queryHotBlog", loader.get("/queryHotBlog"));
app.get("/queryNewComment", loader.get("/queryNewComment"))
app.use(express.static("./page/"));

app.listen("12306",  function ( ) {
    console.log("服务已经启动")
})



