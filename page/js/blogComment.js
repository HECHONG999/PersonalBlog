var blogComments = new Vue({
    el:"#blog_comments",
    data: {
        total: 0,
        comments: [{ user_name:"何冲",options: "我送optios", ctime: "12312321", comments:"djpaodjpsajdaddjpajdpa"}]
    },
    computed: {
        replay: function () {
            return function (commentId, userName) {
                console.log(commentId, userName)
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send_comment"    
            }
        },
    },
    created: function () {
        var searchUrl = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        var  bid=  -10;
        for(var i = 0; i <searchUrl.length; i ++) {
            try {
                bid = searchUrl[i].split("=")[1]; 
            }catch (e) {
                console.log(e)
            }
        }

        axios({
            method: "get",
            url: "/queryCommentCount"
        }).then( function (res)  {
            blogComments.total = res.data.data[0].count;
        })
        
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid=" + bid
        }).then( function (res) {
            
            blogComments.comments = res.data.data;
            console.log(res.data.data,"++++ 9999 )")
            for( var i = 0; i < blogComments.comments.length; i ++) {
                if(blogComments.comments[i].parent > -1) {
                    blogComments.comments[i].options = "回复@"+ blogComments.comments[i].parent_name;
                    console.log("没有执行")
                }

                console.log( blogComments.comments)
            }
        })
       
    }
})



var  blogComment = new Vue({
    el: "#blogComment",
    data: {
        commentList: [],
        vcode:'',
        rightCode: ''
    },
    computed: {
        sendMessage: function () {
            return function () {
                var commentCode = document.getElementById("comment_code").value;
                console.log(commentCode, this.rightCode)
                if( commentCode.toUpperCase() != this.rightCode.toUpperCase()) {
                    alert('验证码输入错误')
                    return;
                }
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var bid = -10;
                for(var i = 0; i < searchUrlParams.length; i ++) {
                    console.log(searchUrlParams[i].split("=")[0])
                   if( searchUrlParams[i].split("=")[0] == "bid") {
                       try {
                           bid = searchUrlParams[i].split("=")[1]; 
                       }catch (e) {
                           console.log(e)
                       }
                   }
                }
                var parent = document.getElementById("comment_reply").value;
                var parent_name = document.getElementById("comment_reply_name").value;
                var name = document.getElementById("comment_name").value;
                var replay_email = document.getElementById("comment_email").value;
                var replay_content = document.getElementById("comment_content").value; 
                axios({
                    method: "get",
                    url: "/addComment?bid="+ bid + "&parent=" + parent + "&userName=" + name + "&email=" + replay_email + "&content=" + replay_content + "&parentName=" + parent_name
                }).then( function (result) {
                    axios({
                        method: "get",
                        url: "/queryCommentsByBlogId?bid=" + bid
                    }).then( function (res) {
                        // 获取到了所有的与当前博客id的留言数据
                        blogComments.comments = res.data.data;
                        for( var i = 0; i < blogComments.comments.length; i ++) {
                            // 过滤掉其他没有被回复的 留言博客 , 选出已经留言的博客数据
                            if(blogComments.comments[i].parent > -1) {
                                blogComments.comments[i].options = "回复@"+ blogComments.comments[i].parent_name;
                            }
                            console.log( blogComments.comments );
                        }
                    })
                    console.log("添加留言成功")
                })
            }
        }
    },
    created: function () {
       axios({
           method: "get",
           url: "/queryRandomCode"
       }).then( function (res) {
           var result = res.data.data;
           blogComment.vcode = result.data;
           blogComment.rightCode = result.text;
       })
    }
})










