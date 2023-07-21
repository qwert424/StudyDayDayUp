<template>
    <img
      class="Avatar-container"
      :src="src"
      :style="{ width: size + 'px', height: size + 'px' }"
    />
  </template>
  
  <script>
  export default {
    props: {
      src: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        default: 150,
      },
    },
  };
  </script>
  
  <style scoped>
  .Avatar-container {
    border-radius: 50%;
    display: block;
    object-fit: cover;
  }
  </style>
  