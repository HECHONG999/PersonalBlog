var TagsDao = require("../dao/TagsDao.js");
var respUtil = require("../utils/respUtil.js")
var path = new Map()
function queryTagsAll(request, response) {
    TagsDao.queryTagsAll( function (result) {
        result.sort(() => {
            return Math.random() > 0.5 ? 1 : -1;
        })
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryTagsAll", queryTagsAll);

module.exports = path;