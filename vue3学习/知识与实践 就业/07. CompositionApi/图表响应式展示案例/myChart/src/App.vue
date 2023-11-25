<template>
  <h1>2019 GDP Top 5</h1>
  <div class="container">
    <!-- bar1 -->
    <barOne :dataArr="valueData"></barOne>
    <!-- bar2 -->
    <barTwo :dataArr="valueData"></barTwo>
  </div>
  <div class="controls">
    <div class="item" v-for="item in valueData" :key="item.country">
      <label>{{ item.country }}</label>
      <input type="number" step="0.001" min="0" v-model="item.value" />
    </div>
  </div>
</template>

<script>
import { asyncComponent } from "./util/asyncComponents";
import valueData from "./util/fetchData";

const barOne = asyncComponent("../components/barOne/index.vue");
const barTwo = asyncComponent("../components/barTwo/index.vue");

export default {
  name: "App",
  components: { barOne, barTwo },
  setup() {
    return {
      ...valueData,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.controls {
  margin: 1em;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.item {
  margin: 1em;
}
.item label {
  margin: 0 1em;
}
.item input {
  height: 26px;
  font-size: 14px;
}
h1 {
  text-align: center;
}
</style>

