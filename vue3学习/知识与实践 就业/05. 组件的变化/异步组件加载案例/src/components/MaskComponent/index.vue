<template>
  <div class="modal">
    Modal
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  left: 0;
  top: 0;
}
</style>