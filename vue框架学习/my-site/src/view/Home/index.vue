<template>
  <div class="Home-container">
    首页
    <div class="test" ref="sss">
      hashdasiuh u
      <button @click="sayhi">click</button>
    </div>
    <div class="test"></div>
  </div>
</template>

<script>
export default {
  methods: {
    sayhi() {
      this.$showMessage({
        content: "hellohellohellohellohellohellohellohellohellohellohellohello",
        type: "error",
        duration: 1000,
        container: this.$refs.sss,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.test {
  width: 100px;
  height: 500px;
  border: 1px solid black;
  background: lightblue;
  margin: 0 auto;
}
</style>