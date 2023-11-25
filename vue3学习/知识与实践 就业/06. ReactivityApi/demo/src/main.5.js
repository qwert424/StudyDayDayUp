import { reactive, ref, watch } from "vue";

const state = reactive({ a: 1, b: 2 });
const count = ref(0);

watch([() => state.a, count], ([newValue, newValue1], [oldValue, oldValue1]) => {
  console.log(newValue, oldValue);
  console.log(newValue1, oldValue1);
});




count.value++;
state.a++;
