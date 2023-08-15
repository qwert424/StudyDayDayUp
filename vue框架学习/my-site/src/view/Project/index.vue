<template>
  <div class="Project-container" v-loading="isLoading" ref="mainContainer">
    <ProjectItem v-for="item in data" :key="item.id" :data="item"></ProjectItem>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProjectItem from "./components/ProjectItem";
import mainScroll from "@/mixins/mainScroll";
export default {
  mixins: [mainScroll("mainContainer")],
  components: {
    ProjectItem,
  },
  computed: {
    ...mapState("project", ["isLoading", "data"]),
  },
  created() {
    this.$store.dispatch("project/asyncGetProject");
  },
};
</script>

<style lang="less" scoped>
.Project-container {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 30px;
  overflow-y: auto;
  scroll-behavior: smooth;
}
</style>