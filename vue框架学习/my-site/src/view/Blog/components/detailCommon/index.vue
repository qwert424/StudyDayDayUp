<template>
  <div class="detailCommon-container">
    <MessageArea
      title="评论列表"
      :subTitle="data.total + ''"
      :list="data.rows"
      @submit="handleSubmit"
    ></MessageArea>
    <div
      class="loading-container"
      v-show="isLoading"
      v-loading="isLoading"
    ></div>
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import { getblogcomment, postblogcomment } from "@/api/blog";
import fetchData from "@/mixins/fetchData";

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
  mixins: [fetchData({ total: 0, rows: [] })],
  methods: {
    async fetchData() {
      return await getblogcomment(this.page, this.limit, this.blogid);
    },
    async handleSubmit(data, callback) {
      const blogId = this.$route.params.id;
      const comment = await postblogcomment({ ...data, blogId });
      this.data.rows.unshift(comment);
      this.data.total++;
      callback({ content: "提交成功", type: "success" });
    },
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
};
</script>

<style lang="less" scoped>
.detailCommon-container {
  margin: 20px;
  .loading-container {
    height: 40px;
    position: relative;
  }
}
</style>