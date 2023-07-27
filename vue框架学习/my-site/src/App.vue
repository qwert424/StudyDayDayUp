<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside></SiteAside>
        </div>
      </template>
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
@import "~@/Style/common.module.less";
.app-container {
  .full-container(fixed);
  .aside {
    width: 250px;
    height: 100%;
  }
}
</style>