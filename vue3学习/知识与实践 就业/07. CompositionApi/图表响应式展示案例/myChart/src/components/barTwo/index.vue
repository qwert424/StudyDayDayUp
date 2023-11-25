<template>
  <div class="bar2">
    <div class="item" v-for="item in newData" :key="item.country">
      <label>{{ item.country }} {{ item.value }}</label>
      <div
        class="bar"
        :style="{ background: item.color, width: item.width + 'px' }"
      ></div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { getComputedData } from "../../util/getComputedData";
export default {
  props: ["dataArr"],
  setup(props) {
    const dataArr = computed(() => props.dataArr);
    const newData = getComputedData(dataArr, 600);
    return {
      newData,
    };
  },
};
</script>

<style scoped>
.bar2 {
  width: 600px;
  box-sizing: border-box;
  margin: 3em;
  position: relative;
}
.bar2::before {
  content: "";
  display: block;
  width: 1px;
  height: 100%;
  position: absolute;
  background: #666;
  left: 50%;
}
.item {
  display: flex;
  height: 35px;
  line-height: 35px;
  margin: 1em 0;
  position: relative;
  justify-content: center;
  color: #fff;
}
.bar {
  width: 100px;
  height: 100%;
  margin-right: 1em;
  flex: 0 0 auto;
}
.item label {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}
</style>