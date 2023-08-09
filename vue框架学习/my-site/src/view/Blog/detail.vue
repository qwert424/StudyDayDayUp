<template>
  <div class="detail-container" v-loading="isLoading">
    <Layout>
      <template #main>
        <div class="main" ref="container">
          <detailBlog :data="data" v-if="data"></detailBlog>
          <detailCommon v-if="!isLoading"></detailCommon>
        </div>
      </template>
      <template #right v-if="data">
        <div class="right">
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
import { debounce } from "@/utils";

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
    changeScroll() {
      this.$bus.$emit("mainScroll", this.$refs.container);
    },
    setScroll() {
      this.$refs.container.scrollTop = 0;
    },
  },
  mounted() {
    this.$refs.container.addEventListener(
      "scroll",
      debounce(this.changeScroll, 100)
    );
    this.$bus.$on("setScrollToTop", this.setScroll);
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
  beforeDestroy() {
    this.$bus.$emit("mainScroll");
    this.$refs.container.removeEventListener(
      "scroll",
      debounce(this.changeScroll, 100)
    );
    this.$bus.$off("setScrollToTop", this.setScroll);
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