<template>
  <div class="detailBlog-container">
    <h2 class="title">{{ data.title }}</h2>
    <aside class="aside">
      <span class="date">日期：{{ data.createDate }}</span>
      <span class="scanNumber">浏览：{{ data.scanNumber }}</span>
      <a href="#MessageForm-container" class="commentNumber"
        >评论：{{ data.commentNumber }}</a
      >
      <router-link
        :to="{
          name: 'categroyBlog',
          params: {
            categroyId: data.category.id,
          },
          query: {
            page: 1,
            limit: 10,
          },
        }"
        class="category"
        >分类：{{ data.category.id }}</router-link
      >
    </aside>
    <article class="markdown-body" v-html="data.htmlContent"></article>
  </div>
</template>

<script>
import "highlight.js/styles/github.css";
import "@/Style/markdown.css";

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/common.module.less";
@import "~@/Style/color.module.less";

.detailBlog-container {
  width: @fullsize;
  padding: 20px;
  .title {
    margin-bottom: 20px;
  }
  .aside {
    color: @gray;
    .flex-container();
    gap: 10px;
    justify-content: flex-start;
    font-size: 12px;
  }
  .markdown-body {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>