<template>
  <h1>正在检查登录状态中...</h1>
</template>

<script>
import store from "@/store";
export default {
  // 登录等待页 需要监控用户仓库的登录状态
  created() {
    this.unWatch = this.$watch(
      (status) => store.getters["LoginStore/status"],
      (status) => {
        if (status !== "loading") {
          this.$router
            .push({
              path: this.$route.query.redirect || "/",
            })
            .catch((err) => {});
        }
      },
      { immediate: true }
    );
    // this.unWatch = store.watch(
    //   (status) => store.getters["LoginStore/status"],
    //   (status) => {
    //     console.log(status);
    //     if (status !== "loading") {
    //       this.$router
    //         .push({
    //           path: this.$route.query.redirect || "/",
    //         })
    //         .catch((err) => {});
    //     }
    //   },
    //   { immediate: true }
    // );
  },
  destroyed() {
    // 取消监控
    this.unWatch();
  },
};
</script>

<style>
</style>