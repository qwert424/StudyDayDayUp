<template>
  <div class="Blog-container">
    <Layout>
      <!--主区域 -->
      <template #main>
        <div class="main">
          <articleList></articleList>
        </div>
      </template>
      <!-- 右侧列表 -->
      <template #right>
        <div class="right">
          <categroyList></categroyList>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "@/components/Layout/";
import categroyList from "./components/categoryList";
import articleList from "./components/articleList";

export default {
  components: {
    categroyList,
    Layout,
    articleList,
  },
  methods: {
    changeCurrent(msg) {
      this.current = msg;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/color.module.less";
.Blog-container {
  width: 100%;
  height: 100%;
  .right {
    width: 300px;
    height: 100%;
  }
  .main {
    width: 100%;
    height: 100%;
  }
}
</style>