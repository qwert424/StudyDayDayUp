<template>
  <div class="block">
    <p>the number is</p>
    <h1>{{ $store.state.count }}</h1>
    <p>
      <button @click="handleDecreaseClick">异步减少</button>
      <button @click="handleIncreaseClick">增加</button>
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    handleIncreaseClick() {
      this.$store.commit("increase");
    },
    handleDecreaseClick() {
      this.$store.dispatch("asyncDecrease");
    },
  },
};
</script>
