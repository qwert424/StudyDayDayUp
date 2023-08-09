<template>
  <div class="detail-container" v-loading="isLoading">
    <Layout>
      <template #main>
        <div class="main" v-if="data">
          <detailBlog :data="data"></detailBlog>
          <detailCommon v-if="!isLoading"></detailCommon>
        </div>
      </template>
      <template #right>
        <div class="right" v-if="data">
          <detailTOC :list="data.toc"></detailTOC>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import Layout from "@/components/Layout";
import { getblogdetail } from "@/api/blog";
import detailTOC from "./components/detailTOC";
import detailCommon from "./components/detailCommon";
import detailBlog from "./components/detailBlog";

export default {
  mixins: [fetchData(null)],
  components: {
    Layout,
    detailTOC,
    detailCommon,
    detailBlog,
  },
  methods: {
    async fetchData() {
      return await getblogdetail(this.$route.params.id);
    },
  },
};
</script>

<style lang="less" scoped>
.detail-container {
  width: 100%;
  height: 100%;
  position: relative;

  .right {
    width: 300px;
    height: 100%;
  }
  .main {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
}
</style>