<template>
  <div class="container">
    <!-- 第一组 -->
    <p class="group-title">普通增加</p>
    <div class="btn-group">
      <button class="btn" @click="decreaseNum">-</button>
      <!-- 这里我们希望这个数据来源于状态仓库 -->
      <div class="num">{{ store.num }}</div>
      <button class="btn" @click="store.increaseNum">+</button>
    </div>

    <!-- 第二组 -->
    <p class="group-title">Getters数据</p>
    <div class="btn-group">
      <button class="btn" @click="decreaseNum">-</button>
      <!-- 这里我们希望这个数据来源于状态仓库 -->
      <div class="num">{{ doubleNum }}</div>
      <button class="btn" @click="store.increaseNum">+</button>
    </div>

    <!-- 第三组 -->
    <p class="group-title">异步的增加</p>
    <div class="btn-group">
      <button class="btn" @click="asyncDecreaseNum">-</button>
      <!-- 这里我们希望这个数据来源于状态仓库 -->
      <div class="num">{{ num }}</div>
      <button class="btn" @click="asyncIncreaseNum">+</button>
    </div>

    <!-- 第四组 -->
    <p class="group-title">store.$reset方法(只有options api可以使用)</p>
    <div class="btn-group">
      <button class="btn" @click="store.$reset">重置</button>
    </div>

    <!-- 第五组 -->
    <p class="group-title">store.$patch方法</p>
    <div class="btn-group">
      <input type="number" class="numInput" v-model="newNum" />
      <button class="btn" @click="handleSet">设置</button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCounterStore } from "../store/useCounterStore";
import { ref } from "vue";
const store = useCounterStore();
// console.log(store, useCounterStore);
const { num, doubleNum } = storeToRefs(store);
const { decreaseNum, asyncIncreaseNum, asyncDecreaseNum } = store;
const newNum = ref("");
function handleSet() {
  store.$patch({
    num: newNum.value,
  });
  newNum.value = "";
}
</script>


<style scoped>
.container > .btn-group {
  /* outline: 1px solid red; */
  width: 280px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.num {
  font-size: 32px;
  font-weight: 300;
}
.btn {
  height: 30px;
  outline: none;
  font-size: 16px;
  font-weight: 100;
  cursor: pointer;
  padding: 0 10px;
}

.numInput {
  width: 200px;
  height: 30px;
  margin-right: 10px;
}

.group-title {
  text-align: center;
  margin-bottom: 0;
  font-weight: 200;
  font-size: 20px;
}
</style>