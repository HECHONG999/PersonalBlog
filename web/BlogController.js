var  BlogDao = require("../dao/BlogDao.js");
var url = require("url");
var timeUtil = require("../utils/getNow.js")
var respUtil = require("../utils/respUtil.js")
var tagsDao = require("../dao/TagsDao.js");
var BlogTagsMapDao = require("../dao/BlogTagsMappingDao.js")
var path = new Map();

// 查询热门博客数据
function queryHotBlog(request, response) {
    BlogDao.queryHotBlog( 5, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set("/queryHotBlog", queryHotBlog)

// 获取博客详细信息
function getBlogDetail(request, response) {
    var params = url.parse(request.url, true).query;
    BlogDao.queryBlogById(params.bid, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
        

        // 制作访问量的逻辑 -- 在请求当前数据的时候，增加当前数据的views值
        // 每次点击获取详情页的时候让 views 浏览次数递增, 根据blog_id找到对应的博客
        BlogDao.addViews(params.bid, function (resultViews) {
            console.log(resultViews)
            // response.writeHead(200);
            // response.write(respUtil.writeResult("success", "更新成功", resultViews));
            // response.end();
        })

    })
}

path.set("/getBlogDetail", getBlogDetail)


// 编辑添加博客内容
function addBlog(request, response) {
    var params = url.parse( request.url, true).query;
    var tags = params.tags.replace(/ /g, "").replace("，", ",");  // 去除标签的空格,替换英文字符

    // 获取前端用post请求,请求体里的数据
    request.on("data", function (data) {
        BlogDao.insertBlog( params.title, data.toString(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), function (BlogResult) {
            var tagsList = tags.split(",");
          
            for(var i = 0; i < tagsList.length; i ++ ) {
                if( tagsList[i] == "") {
                    continue;  // 结束当前循环
                }
               
                // 查询tag标签
                tagsDao.queryTags(tagsList[i] , function (tagsResult) {
                  if( tagsResult != null &&  tagsResult.length > 0) {
                      // 如果当前tag已经添加了就需要在tagBlogMap形成映射关系 
                      BlogTagsMapDao.insertBlogTagsMapping(tagsResult[0].id, BlogResult.insertId , timeUtil.getNow(), timeUtil.getNow(), function (result) {})
                  } else {
                      // 如果当前的tag没有添加 就先插入标签，再形成映射
                      tagsDao.insertTags(tagsList[0] ,timeUtil.getNow(), timeUtil.getNow(), function (newTagResult) {
                        
                          BlogTagsMapDao.insertBlogTagsMapping(newTagResult.insertId, BlogResult.insertId, timeUtil.getNow(),timeUtil.getNow() ,function (result) {} )
                      })
                  }
              })
            }

            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null));
            response.end();
        } )
    })
}

// 分页查询博客数据
function queryBlogByPageSize(request, response) {
    var params = url.parse(request.url, true).query;
        BlogDao.queryBlogByPageSize(parseInt(params.size), parseInt(params.pageSize), function (result) {
            for(var i = 0; i <= result.length; i ++) {
                for( var prop in result[i] ) {
                    result[i].content = result[i].content.toString().replace(/<img[\w\W]*”>/, "");
                    result[i].content = result[i].content.toString().replace(/<[\w\W]{1, 8}>/g, "");
                    result[i].content = result[i].content.toString().substring(0, 400); // subString 
                }
            }
            response.writeHead(200);
            response.end(respUtil.writeResult("success", "查询成功", result));
        })
}
path.set("/queryBlogByPageSize", queryBlogByPageSize);

// 查询博客数据总条数
function queryAllBlogCount(request, response) {
    BlogDao.queryAllBlogCount( function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end()
    })
   
}
path.set("/queryAllBlogCount", queryAllBlogCount)


function insertTagBlogMapping(tagId, blogId) {
    BlogTagsMapDao.insertBlogTagsMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {})
}
path.set("/addBlog", addBlog);





function queryTag(tag, blogId) {
    tagsDao.queryTags(tag, function (result) {
        console.log(result)
        if (result == null || result.length == 0) {
            insertTag(tag, blogId)
        } else {
            BlogTagsMapDao.insertBlogTagsMapping(result[0].id, blogId,timeUtil.getNow(), timeUtil.getNow(), function (result) {})
        }
    })
}

function insertTag(tag, blogId) {
    tagsDao.insertTags(tag, timeUtil.getNow(), timeUtil.getNow(),  function (result) {
        console.log(result, " ____   22222")
        insertTagBlogMapping(result.insertId,  blogId)
    })
}




module.exports = path;