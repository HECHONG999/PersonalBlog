var  blogDetail = new Vue({
    el:"#blogDetail",
    data: {
        blogDetailList: [],
        id: null,
        title: '',
        content: '',
        tags: '',
        views: '',
        ctime: null
    }, 
    created () {
        // 获取到当前博客的详情页的博客id, 跟去id查找当前的博客的详情，对当前博客进行留言等功能
        if( location.search.indexOf("?") > -1) {
            var searchList = location.search.split("?")[1].split("&")
        for(var i = 0; i < searchList.length; i ++) {
           var id = searchList[i].split("=")[1];

           axios({
               method: "get",
               url: "/getBlogDetail?bid=" + id
           }).then((result) => {
               var dataList = result.data.data;
               for(var i = 0 ; i < dataList.length; i ++) {
                    blogDetail.id = dataList[i].id;
                    blogDetail.title = dataList[i].title;
                    blogDetail.content = dataList[i].content;
                    blogDetail.tags = dataList[i].tags;
                    blogDetail.views = dataList[i].views;
                    blogDetail.ctime = dataList[i].ctime;
               }
           }).catch((err) => {
               console.log(err)
           });

           
        }
        }
    }
})










