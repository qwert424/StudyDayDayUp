<template>
  <div class="App-container">
    <Layout>
      <template #left><SiteAside></SiteAside></template>
      <template #main><router-view></router-view></template>
    </Layout>
    <toTop v-show="isShow" @click="handleClick"></toTop>
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import SiteAside from "@/components/SiteAside";
import toTop from "@/components/toTop";
export default {
  components: {
    Layout,
    SiteAside,
    toTop,
  },
  data() {
    return {
      // 是否显示返回顶部按钮
      isShow: false,
    };
  },
  methods: {
    handleClick() {
      this.$bus.$emit("setScrollToTop", 0);
    },
    ifShowTop(data) {
      if (!data) {
        this.isShow = false;
        return;
      }
      const top = data.scrollTop;
      this.isShow = top > 500;
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.ifShowTop);
  },
  destroyed() {
    this.$bus.$emit("setScrollToTop");
    this.$bus.$off("mainScroll", this.ifShowTop);
  },
};
</script>

<style lang="less" scoped>
.App-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  .SiteAside-container {
    width: 250px;
  }
}
</style>