// 分页 混入 公共代码
export default function (DefaultDataVaule = null) {
    return {
        data() {
            return {
                isloading: false, //加载数据中
                data: DefaultDataVaule,
                totalBlog: 0, //总分类数
                currentPage: 1, //当前页
                centerDialogVisible: false, //控制弹框
            }
        },
        computed: {
            AllPageSize() {
                //总页数
                return Math.ceil(+this.totalBlog / this.pageSize);
            },
        },
        methods: {
            // 分页相关操作
            handelSizeChange(pageSize) {
                this.pageSize = parseInt(pageSize);
                this.currentPage = 1;
                this.fetchData();
            },
            handelCurrentChange(pageNum) {
                this.currentPage = parseInt(pageNum);
                this.fetchData();
            },
            handelPrevClick() {
                this.currentPage--;
            },
            handelNextClick() {
                this.currentPage++;
            },
        },
        created() {
            this.fetchData();
        },
    }
}