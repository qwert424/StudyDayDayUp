<template>
  <div class="categoryList-container" v-loading="isLoading">
    <h2 class="title" v-if="!isLoading">文章分类</h2>
    <div class="container">
      <RightList
        :list="list"
        v-if="!isLoading && list.length !== 1"
        @changeId="handleChange"
      ></RightList>
      <Empty v-if="data.length === 0 && !isLoading"></Empty>
    </div>
  </div>
</template>

<script>
import RightList from "../RightList/";
import fetchData from "@/mixins/fetchData";
import { getblogtype } from "@/api/blog";
import Empty from "@/components/Empty";

export default {
  mixins: [fetchData([])],
  components: {
    Empty,
    RightList,
  },
  computed: {
    getcategoryId() {
      //获取路由信息
      return this.$route.params.categroyId || -1;
    },
    list() {
      //修改数据类型 使其符合组件
      const articleCount = this.data.reduce((a, b) => {
        return a + b.articleCount;
      }, 0);
      const result = [
        { id: -1, name: "全部", articleCount: articleCount, order: 0 },
        ...this.data,
      ];
      return result.map((it) => ({
        ...it,
        isselect: it.id === this.getcategoryId,
      }));
    },
  },
  methods: {
    async fetchData() {
      return await getblogtype();
    },
    handleChange(item) {
      // 两种情况 1|点击全部(即Id为-1 路由信息params没有categroy值) 2|路由信息params 有categroy值)
      if (item.id === this.getcategoryId) {
        return;
      }
      const query = {
        limit: this.$route.query.limit || 10,
        page: 1,
      };
      if (item.id === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "categroyBlog",
          query,
          params: {
            categroyId: item.id,
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
.categoryList-container {
  width: @fullsize;
  height: @fullsize;
  color: @lightWords;
  @liHeight: 40px;
  position: relative;

  .title {
    // 标题
    color: @words;
    font-size: 24px;
    height: @liHeight;
    line-height: @liHeight;
    border-bottom: 1px solid @gray;
    .text-overflow-ellipsis();
  }
  .container {
    height: calc(100% - @liHeight);
    position: relative;
  }
}
</style>