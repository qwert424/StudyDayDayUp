<template>
  <div class="test-container">
    <div>当前时间：{{ time }}</div>
  </div>
</template>
    
    <script>
export default {
  data() {
    return {
      timeId: null,
      time: new Date().toLocaleTimeString(),
    };
  },
  created() {
    this.timeId = setInterval(() => {
      this.time = new Date().toLocaleTimeString();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timeId);
  },
};
</script>
    
<style lang="less" scoped>
</style>