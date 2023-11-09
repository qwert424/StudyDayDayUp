<template>
  <p>
    <!-- <button @click="handleClick">count:{{ count }}</button> -->
  </p>
</template>

<!-- <script>
import { ref } from "vue";
export default {
  name: "App",
  components: {},
  // vue2的选项式 在代码庞大的时候整体性差
  // data() {
  //   return {
  //     count: 0,
  //   };
  // },
  // methods: {
  //   handleClick() {
  //     console.log(this)
  //     this.count++;
  //   },
  // },
  // vue3的组合式 整体性好
  setup() {
    console.log(this); //undefined
    let count = ref(0);
    console.log(count); //RefImpl {_shallow: false, dep: undefined, __v_isRef: true, _rawValue: 0, _value: ...} 所以需要通过xxx.value来获取值
    function handleClick() {
      count.value++;//此处需要加上value
      // console.log(count, 1);如果这样子写 count是没有被渲染的 因为自定义字段不是响应式 需要通过ref将其符合要求
    }
    return {
      count,
      handleClick,
    };
  },
};
</script> -->

<!-- 也可以将setup内的代码整合、分离出去 -->
<!-- <script>
import { ref } from "vue";
function test() {
  console.log(this); //undefined
  let count = ref(0);
  console.log(count); //RefImpl {_shallow: false, dep: undefined, __v_isRef: true, _rawValue: 0, _value: ...} 所以需要通过xxx.value来获取值
  function handleClick() {
    count.value++; //此处需要加上value
    // console.log(count, 1);如果这样子写 count是没有被渲染的 因为自定义字段不是响应式 需要通过ref将其符合要求
  }
  return {
    count,
    handleClick,
  };
}

export default {
  name: "App",
  components: {},
  setup() {
    const mytest = test();
    return {
      ...mytest,
    };
  },
};
</script>
 -->
