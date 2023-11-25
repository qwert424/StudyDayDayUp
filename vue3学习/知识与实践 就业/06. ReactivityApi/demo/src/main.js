import { reactive, watchEffect, watch } from "vue";
const state = reactive({
  count: 0,
});
watchEffect(() => {
  console.log("watchEffect", state.count);//1//4//7
});
watch(
  () => state.count,
  (count, oldCount) => {
    console.log("watch", count, oldCount);//5//8
  }
);
console.log("start");//2
setTimeout(() => {
  console.log("time out");//6
  state.count++;
  state.count++;
});
state.count++;
state.count++;

console.log("end");//3
