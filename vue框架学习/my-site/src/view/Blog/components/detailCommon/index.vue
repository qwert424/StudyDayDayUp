<template>
  <div class="detailCommon-container">
    <MessageArea
      title="评论列表"
      :subTitle="data.total + ''"
      :list="data.rows"
      @submit="handleSubmit"
    ></MessageArea>
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
  },
};
</script>

<style lang="less" scoped>
.detailCommon-container {
  margin: 20px;
}
</style>