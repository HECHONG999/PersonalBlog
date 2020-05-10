import timeUtil from "../util/getNowTime.js"
var randomTags = new Vue({
    el: "#tags_cloud",
    data: {
        tagList: []
    },
    computed: {
        randomColor: function () {
            return function () {
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return "rgb(" + red + ", " + green + ", " + blue + ")";
            }
        },
        randomSize: function () {
            return function () {
                var size =( Math.random() * 22 + 12 ) + "px"
                return size 
            }
        }
    },
    created: function () {
        axios({
            method: "get",
            url:"/queryTagsAll"
        }).then((res) => {
            console.log(res)
            var resList = res.data.data;
            var result = []
            for(var i = 0; i < resList.length; i ++) {
                result.push({text: resList[i].name, link: "/?tag=" + resList[i].name})
            }
            result.sort( function () {
                return Math.random() > 0.5 ? 1 : -1;
            })
            randomTags.tagList = result
        })
    }
})



var HotBlog = new Vue({
    el:"#hot_blog",
    data: {
        hotBlogList: []
    },
    created () {
        axios({
            method: "get",
            url: "/queryHotBlog"
        }).then( function (res) {
            console.log(res);
            var result = res.data.data;
            var resultList = []
            for(var i = 0; i < result.length; i ++) {
               var temp = {};
               temp.title = result[i].title;
               temp.link = "/blogDetail.html?bid=" + result[i].id;
               resultList.push(temp);
            }
            HotBlog.hotBlogList = resultList;
        })
    }
})

var newComment = new Vue({
    el: "#newComment",
    data: {
        newCommentList: []
    },
    created () {
        axios({
            method: "get",
            url: "/queryNewComment"
        }).then( function (res) {
            var result = []
            for(var i = 0; i < res.data.data.length; i ++) {
                var temp = {}
                temp.content = res.data.data[i].content;
                var date = timeUtil(res.data.data[i].ctime)
                temp.time = date.year + " 年 " + date.months + " 月" + date.day + " 日";
                result.push(temp);
            }
            newComment.newCommentList = result
        })
    }
})