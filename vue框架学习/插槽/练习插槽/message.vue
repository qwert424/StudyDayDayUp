<template>
  <div class="message-container">
    <slot></slot>
    <button>确认</button>
    <button>取消</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.message-container{
    background: red;
    height: 100px;
    width: 100px;

}
</style>