<template>
  <div class="toTop-container" v-on="$listeners">Top</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~@/Style/color.module.less";
.toTop-container {
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 40px;
  height: 40px;
  background: @primary;
  border-radius: 50%;
  text-align: center;
  color: @white;
  line-height: 40px;
  box-shadow: 0 0 10px 2px @primary;
  cursor: pointer;
  z-index: 1000;
}
</style>