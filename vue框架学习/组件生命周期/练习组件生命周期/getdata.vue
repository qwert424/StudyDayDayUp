<template>
    <div class="Home-container">
      <ul>
        <li v-for="item in datas" :key="item.id">
          <img :src="item.midImg" />
          <h1>{{ item.title }}</h1>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import "@/mock";
  import { getBanner } from "@/api/banner";
  
  export default {
    data() {
      return {
        datas: [],
      };
    },
    async created() {
      this.datas = await getBanner();
    },
  };
  </script>
  
  <style lang="less" scoped>
  .Home-container {
    height: 100%;
    width: 100%;
  }
  </style>