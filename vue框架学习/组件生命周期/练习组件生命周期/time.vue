<template>
    <div class="Home-container">
      <test v-if="test"></test>
      <button @click="change">click</button>
    </div>
  </template>
  
  <script>
  import test from "./test.vue";
  export default {
    data(){
      return {test:true};
    },
    components: { test },
    methods: {
      change() {
        return (this.test = !this.test);
      },
    },
  };
  </script>
  
  <style lang="less" scoped>
  .Home-container {
    height: 100%;
    width: 100%;
  }
  </style>