import MessageArea from "@/components/MessageArea";

export default {
    data() {
        return {
            blogid: -1,
            page: 1,
            limit: 10,
        };
    },
    components: {
        MessageArea,
    },
    methods: {
        async moreReady() {
            this.isLoading = true;
            this.page++;
            const resp = await this.fetchData(this.page, this.limit, this.blogid);
            this.data.rows.push(...resp.rows);
            // this.data.rows = this.data.rows.concat(resp.rows);
            this.isLoading = false;
        },
        ifLoadingMore(data) {
            if (!data || this.data.rows.length >= this.data.total || this.isLoading) {
                return;
            }
            const scrollTop = data.scrollTop;
            const clientHeight = data.clientHeight;
            const scrollHeight = data.scrollHeight;
            const isLoadingMore = scrollHeight - clientHeight - scrollTop < 500;
            if (isLoadingMore) {
                this.moreReady();
            }
        },
    },
    created() {
        this.$bus.$on("mainScroll", this.ifLoadingMore);
    },
    destroyed() {
        this.$bus.$off("mainScroll", this.ifLoadingMore);
    },
}