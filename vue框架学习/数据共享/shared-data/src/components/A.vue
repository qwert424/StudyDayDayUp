<template>
  <div class="block">
    <p>the number is</p>
    <h1>{{ $store.state.count }}</h1>
    <p>
      <button @click="handleDecreaseClick">减少</button>
      <button @click="handleAsyncIncreaseClick">异步增加</button>
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    handleDecreaseClick() {
      this.$store.commit("decrease");
    },
    handleAsyncIncreaseClick() {
      this.$store.dispatch("asyncIncrease");
    },
  },
};
</script>
