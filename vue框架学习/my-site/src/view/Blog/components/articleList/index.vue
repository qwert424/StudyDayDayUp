<template>
  <div class="articleList-container" ref="container" v-loading="isLoading">
    <articleItem :articleList="data.rows"></articleItem>
    <Pager
      v-if="data.total"
      :totalItems="data.total"
      :nowCurrent="getData.nowCurrent"
      :showLimit="10"
      :showCount="getData.limit"
      @changeCurrent="changeCurrent"
    ></Pager>
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import fetchData from "@/mixins/fetchData";
import { getblog } from "@/api/blog";
import articleItem from "../articleItem";

export default {
  mixins: [fetchData({})],
  components: {
    Pager,
    articleItem,
  },
  watch: {
    async $route() {
      this.isLoading = true;
      // 滚动高度为0
      this.$refs.container.scrollTop = 0;
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