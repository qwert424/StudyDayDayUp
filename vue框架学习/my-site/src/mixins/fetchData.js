// 远程获取数据 混入 公共代码
// 提供fetchData方法即可
export default function (DefaultDataVaule = null) {
    return {
        data() {
            return {
                isLoading: true,
                data: DefaultDataVaule,
            }
        },
        async created() {
            this.data = await this.fetchData();
            this.isLoading = false;
        }
    }
}