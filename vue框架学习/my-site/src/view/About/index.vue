<template>
  <div class="About-container" v-loading="isLoading || isIframeLoading">
    <iframe
      :src="data"
      frameborder="0"
      class="about-content"
      @load="handleLoad"
    ></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return { isIframeLoading: true };
  },
  computed: {
    ...mapState("about", ["isLoading", "data"]),
  },
  created() {
    this.$store.dispatch("about/asyncGetAbout");
  },
  methods: {
    handleLoad() {
      this.isIframeLoading = false;
    },
  },
};
</script>

<style lang="less" scoped>
@size: 100%;
.About-container {
  width: @size;
  height: @size;
  position: relative;
  overflow: hidden;
  .about-content {
    width: @size;
    height: @size;
    display: block;
  }
}
</style>