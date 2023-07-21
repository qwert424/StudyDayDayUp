<template>
  <Pager
    :totalItems="totalItems"
    :nowCurrent="current"
    :showLimit="showLimit"
    :showCount="showCount"
    @changeCurrent="changeCurrent"
  ></Pager>
</template>

<script>
import Pager from "./";
export default {
  data() {
    return {
      current: 1,
      totalItems: 333,
      showLimit: 10,
      showCount: 10,
    };
  },
  components: {
    Pager,
  },
  methods: {
    changeCurrent(msg) {
      this.current = msg;
    },
  },
};
</script>

<style lang='less' scoped>
</style>