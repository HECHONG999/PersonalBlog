var everyDay = new Vue({
    el: "#everyDay",
    data: {
        content: ''
    },
    created() {
        axios({
            method: "get",
            url: "/queryEveryDay"
        }).then(res => {
            everyDay.content = res.data[0].content
        })
    }
})



var blogList = new Vue({
    el: "#blogList",
    data: {
        renderBlog: [],
        nowPage: 1,
        page: 1,
        pageSize: 5,
        allSize: 80,
        articleList: [],
        pageNumList: []
    },

    computed: {
        jumpTo() {
            return function (page) {
                this.getPage(page, this.pageSize);
                this.nowPage = page 
            }
        },
        getPage() {
            return function (page, pageSize) {

                // 查询所有的博客数据
                axios({
                    method: "get",
                    url: "/queryAllBlogCount"
                }).then(function (res) {
                    var totalCount = res.data.data[0].count;
                    blogList.allSize = totalCount;
                    blogList.generatePageTool(blogList.allSize)
                })

                // 按分页查询博客数据条数
                axios({
                    method: "get",
                    url: "/queryBlogByPageSize?size=" + ( page ) + "&pageSize=" + pageSize
                }).then(function (res) {
                    var result = res.data.data;
                    var list = []
                    for (var i = 0; i < result.length; i++) {
                        var temp = {};
                        temp.title = result[i].title;
                        temp.content = result[i].content;
                        temp.id = result[i].id;
                        temp.data = result[i].ctime;
                        temp.tags = result[i].tags;
                        temp.views = result[i].views;
                        temp.link = "/blogDetail.html?bid=" + result[i].id;
                        list.push(temp);
                    }
                    blogList.articleList = list;
                }).catch(function (err) {
                    console.log(err)
                });
            }
        },
        generatePageTool: function () {
            return function () {
                var result = [];
                var totalPage = Math.ceil( (this.allSize + this.page - 1) / this.pageSize );
                result.push({ text: "<<", pagNum: "<<" })
                if (this.nowPage - 2 > 0) {
                    result.push({ text: this.nowPage - 2, pagNum: this.nowPage - 2 })
                }
                if (this.nowPage - 1 > 0) {
                    result.push({ text: this.nowPage - 1, pagNum: this.nowPage - 1 })
                }
                result.push({ text: this.nowPage, pagNum: this.nowPage })
                
                if (this.nowPage + 1 <= totalPage) {
                    result.push({ text: this.nowPage + 1, pagNum: this.nowPage + 1 })
                }
                if (this.nowPage + 2 <= totalPage) {
                    result.push({ text: this.nowPage + 2, pagNum: this.nowPage + 2 })
                }
                result.push({ text: "...", pagNum: "..." })
                result.push({ text: totalPage, pagNum: totalPage })
                result.push({ text: "尾页", pagNum: "尾页" })
                result.push({ text: ">>", pagNum: ">>" })
                this.pageNumList = result
                return result;
            }
        },
    },
    created() {
        this.getPage(this.page, this.pageSize);
    },
})