<template>
  <div class="Message-container" ref="mainContainer">
    <messageItem></messageItem>
  </div>
</template>

<script>
import messageItem from "./components/messageItem";
import mainScroll from "@/mixins/mainScroll";

export default {
  mixins: [mainScroll("mainContainer")],
  components: {
    messageItem,
  },
};
</script>

<style lang="less" scoped>
.Message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  scroll-behavior: smooth;
}
</style>