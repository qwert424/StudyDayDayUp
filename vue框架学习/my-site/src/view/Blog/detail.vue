<template>
  <div class="detail-container" v-loading="isLoading">
    <Layout>
      <template #main>
        <div class="main" ref="mainContainer">
          <detailBlog :data="data" v-if="data"></detailBlog>
          <detailCommon v-if="!isLoading"></detailCommon>
        </div>
      </template>
      <template #right v-if="data">
        <div class="right" v-if="data.toc.length !== 0">
          <detailTOC :list="data.toc"></detailTOC>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import mainScroll from "@/mixins/mainScroll";
import Layout from "@/components/Layout";
import { getblogdetail } from "@/api/blog";
import detailTOC from "./components/detailTOC";
import detailCommon from "./components/detailCommon";
import detailBlog from "./components/detailBlog";
import { setTitleControl } from "@/utils";

export default {
  mixins: [fetchData(null), mainScroll("mainContainer")],
  components: {
    Layout,
    detailTOC,
    detailCommon,
    detailBlog,
  },
  methods: {
    async fetchData() {
      let resp = await getblogdetail(this.$route.params.id);
      if (!resp) {
        this.$router.push({ path: "/404" });
        return;
      }
      if (resp.title) {
        setTitleControl.setRouterTitleControl(resp.title);
      }
      return resp;
    },
  },
  updated() {
    const hash = this.$route.hash;
    if (!hash) {
      return;
    }
    location.hash = "#";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
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
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
}
</style>