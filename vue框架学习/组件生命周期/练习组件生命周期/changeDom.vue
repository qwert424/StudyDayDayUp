<template>
    <div class="Home-container">
      <h1 ref="test">width:{{ width }},height:{{ height }}</h1>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        width: 0,
        height: 0,
      };
    },
    mounted() {
      this.width = this.$refs.test.clientWidth;
      this.height = this.$refs.test.clientHeight;
    },
  };
  </script>
  
  <style lang="less" scoped>
  .Home-container {
    height: 100%;
    width: 100%;
  }
  </style>