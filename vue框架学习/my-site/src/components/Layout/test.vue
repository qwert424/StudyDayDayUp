<template>
    <div class="test-container">
      <Layout>
        <template #main>
          主区域，宽度占满剩余空间，溢出隐藏主区域，宽度占满剩余空间，溢出隐藏主区域，宽度占满剩余空间，溢出隐藏主区域，宽度占满剩余空间，溢出隐藏主区域，宽度占满剩余空间，溢出隐藏主区域，宽度占满剩余空间，溢出隐藏主区域，宽度占满剩余空间，溢出隐藏主区域，宽度占满剩余空间，溢出隐藏主区域，宽度占满剩余空间，溢出隐藏主区域，宽度占满剩余空间，溢出隐藏主区域，宽度占满剩余空间，溢出隐藏主区域，宽度占满剩余空间，溢出隐藏主区域，宽度占满剩余空间，溢出隐藏
        </template>
        <template #right> 右边栏区域，宽度适应内容，溢出隐藏 </template>
      </Layout>
    </div>
  </template>
  
  <script>
  import Layout from "@/components/Layout";
  export default {
    components: {
      Layout,
    },
  };
  </script>
  
  <style scoped>
  .test-container {
    width: 60%;
    height: 600px;
    border: 2px solid;
    margin: 0 auto;
    /* white-space: nowrap; */
  }
  </style>
  