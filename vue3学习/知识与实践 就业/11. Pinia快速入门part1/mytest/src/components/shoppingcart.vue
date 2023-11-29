<template>
  <div class="container">
    <table>
      <!-- 表头 -->
      <thead>
        <th>商品名</th>
        <th>单价</th>
        <th>数量</th>
        <th>小计</th>
        <th>操作</th>
      </thead>
      <!-- 表内容 -->
      <tbody>
        <tr v-for="(it, index) in state.cartData" :key="index">
          <!-- 商品名 -->
          <td class="name">
            <img :src="it.image" alt="" class="img" />
            {{ it.name }}
          </td>
          <!-- 单价	 -->
          <td>{{ it.price }}</td>
          <!-- 数量	 -->
          <td class="td">
            <button @click="decrement(index)">-</button>
            {{ it.count }}
            <button @click="increment(index)">+</button>
          </td>
          <!-- 小计	 -->
          <td class="td">{{ it.price * it.count }}</td>
          <!-- 操作 -->
          <td class="td">
            <button @click="deleteHandle(index)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="totalPrice">总价：{{ allPrice }} 元</p>
  </div>
</template>
  
<script>
import { useShoppingCardStore } from "../store/useShoppingCard";
import { mapState, mapActions } from "pinia";
export default {
  computed: {
    ...mapState(useShoppingCardStore, ["state", "allPrice"]),
  },
  methods: {
    ...mapActions(useShoppingCardStore, [
      "decrement",
      "increment",
      "deleteHandle",
    ]),
  },
};
</script>
  
  <style scoped>
.container {
  width: 900px;
  margin: 20px auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

.img {
  width: 80px;
  vertical-align: middle;
}
tr {
  /* outline: 1px solid; */
  border-bottom: 1px solid #ccc;
  height: 100px;
  line-height: 100px;
}
td {
  line-height: 80px;
  /* text-align: center; */
  padding: 0 5px;
}
td:not(:first-child) {
  text-align: center;
}

.td {
  width: 10%;
}
.totalPrice {
  text-align: right;
  font-size: 18px;
  font-weight: 300;
}
</style>