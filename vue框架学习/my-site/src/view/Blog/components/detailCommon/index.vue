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
    <Empty v-if="data.total === 0 && !isLoading" class="Empty"></Empty>
  </div>
</template>

<script>
import { getblogcomment, postblogcomment } from "@/api/blog";
import fetchData from "@/mixins/fetchData";
import message from "@/mixins/message";
import Empty from "@/components/Empty";

export default {
  components: {
    Empty,
  },
  mixins: [fetchData({ total: 0, rows: [] }), message],
  methods: {
    async fetchData() {
      const blogId = this.$route.params.id;
      return await getblogcomment(this.page, this.limit, blogId);
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
  position: relative;
  margin: 20px;
  .loading-container {
    height: 40px;
    position: relative;
    margin-top: 10px;
  }
  .Empty {
    bottom: -210px;
    top: unset;
    transform: translateX(-50%);
  }
}
</style>