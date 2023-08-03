<template>
  <div class="App-container">
    <Layout>
      <template #left><SiteAside></SiteAside></template>
      <template #main><router-view></router-view></template>
    </Layout>
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import SiteAside from "@/components/SiteAside";
export default {
  components: {
    Layout,
    SiteAside,
  },
};
</script>

<style lang="less" scoped>
.App-container {
  width: 100vw;
  height: 100vh;
  .SiteAside-container {
    width: 250px;
  }
}
</style>