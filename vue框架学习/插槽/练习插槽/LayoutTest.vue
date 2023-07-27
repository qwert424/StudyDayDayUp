<template>
    <div>
      <Layout>
        <template v-slot:footer>sss</template>
        著区域
        <template #header>asf</template>
      </Layout>
    </div>
  </template>
    
    <script>
  import Layout from "@/components/LayoutTest/LayoutRange";
  export default {
    components: {
      Layout,
    },
  };
  </script>
    
    <style lang="less" scoped>
  div {
    width: 250px;
    height: 100vh;
  }
  </style>