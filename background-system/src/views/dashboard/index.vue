<template>
  <div class="dashboard-container">
    <div class="dashboard-text">个人博客管理系统</div>
    <div class="dashboard-echarts-container">此处以后放--ECharts图表--</div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: "Dashboard",
  // computed: {
  //   ...mapGetters([
  //     'name'
  //   ])
  // }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    margin-bottom: 10px;
  }
}
</style>
