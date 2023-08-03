<template>
  <RightList :list="data" title="文章分类"></RightList>
</template>

<script>
import RightList from "./components/RightList";
export default {
  components: {
    RightList,
  },
  methods: {
    async fetchData() {
      return await blogApi.getblogtype();
    },
  },
};
</script>

<style>
</style>