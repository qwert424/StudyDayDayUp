<template>
  <div class="articleList-container" ref="mainContainer" v-loading="isLoading">
    <articleItem :articleList="data.rows"></articleItem>
    <Pager
      v-if="data.total"
      :totalItems="data.total"
      :nowCurrent="getData.nowCurrent"
      :showLimit="10"
      :showCount="getData.limit"
      @changeCurrent="changeCurrent"
    ></Pager>
    <Empty v-if="data.rows.length === 0 && !isLoading" class="Empty"></Empty>
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import fetchData from "@/mixins/fetchData";
import { getblog } from "@/api/blog";
import articleItem from "../articleItem";
import mainScroll from "@/mixins/mainScroll";
import Empty from "@/components/Empty";

export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("mainContainer")],
  components: {
    Pager,
    articleItem,
    Empty,
  },
  watch: {
    async $route() {
      this.isLoading = true;
      // 滚动高度为0
      this.$refs.mainContainer.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
  computed: {
    getData() {
      const nowCurrent = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      const categoryid = +this.$route.params.categroyId || -1;
      return { nowCurrent, limit, categoryid };
    },
  },
  methods: {
    async fetchData() {
      return await getblog(
        this.getData.nowCurrent,
        this.getData.limit,
        this.getData.categoryid
      );
    },
    changeCurrent(item) {
      if (this.getData.categoryid === -1) {
        this.$router.push({
          name: "Blog",
          query: {
            page: item,
            limit: this.getData.limit,
          },
        });
      } else {
        this.$router.push({
          name: "categroyBlog",
          query: {
            page: item,
            limit: this.getData.limit,
          },
          params: {
            categroyId: this.getData.categoryid,
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/color.module.less";
@import "~@/Style/common.module.less";
.articleList-container {
  width: @fullsize;
  height: @fullsize;
  overflow-y: auto;
  scroll-behavior: smooth;
  .pager-container {
    height: 10%;
  }
}
</style>