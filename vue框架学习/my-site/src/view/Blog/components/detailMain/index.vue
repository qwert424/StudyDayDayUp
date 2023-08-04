<template>
  <div class="detailMain-container">
    <h2 class="title">{{ data.title }}</h2>
    <aside class="aside">
      <span class="date">日期：{{ data.createDate }}</span>
      <span class="scanNumber">浏览：{{ data.scanNumber }}</span>
      <a href="" class="commentNumber">评论：{{ data.commentNumber }}</a>
      <router-link
        :to="{
          path: `/blog/cate/${data.category.id}`,
        }"
        class="category"
        >分类：{{ data.category.id }}</router-link
      >
    </aside>
    <article
      class="markdown-body"
      v-html="data.htmlContent"
      ref="container"
    ></article>
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
  //   methods: {
  //     getTop() {
  //       return (this.itemArr = this.$refs.container.querySelectorAll("h2"));
  //     },
  //   },
};
</script>

<style lang="less" scoped>
@import "~@/Style/common.module.less";
@import "~@/Style/color.module.less";

.detailMain-container {
  width: @fullsize;
  height: @fullsize;
  overflow-y: scroll;
  overflow-x: hidden;
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