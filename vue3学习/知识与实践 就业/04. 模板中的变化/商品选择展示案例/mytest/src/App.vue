<template>
  <div class="container">
    <div class="list">
      <strong>编辑：</strong>
      <checkEdit
        v-for="item in ProductInfo"
        :key="item.id"
        v-model="item.sell"
        v-model:productName.trim="item.title"
      ></checkEdit>
    </div>
    <div class="list">
      <strong>销售中:</strong>
      <template v-for="(item, index) in ProductSell" :key="item.id">
        <span>{{ index }}.</span>
        <strong>{{ item.title }}</strong>
      </template>
    </div>
  </div>
</template>

<script>
import checkEdit from "./components/checkEdit.vue";
import { ref, computed } from "vue";
import { productInformations } from "./util/productMsg.js";
export default {
  name: "App",
  components: {
    checkEdit,
  },
  setup() {
    const ProductInfoRef = ref(productInformations);
    const ProductSellRef = computed(() => {
      return ProductInfoRef.value.filter((item) => item.sell);
    });
    return {
      ProductInfo: ProductInfoRef,
      ProductSell: ProductSellRef,
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
  width: 880px;
  margin: 50px auto;
}
.list {
  display: flex;
  margin: 1em 0;
  align-items: center;
}
strong {
  margin-right: 1em;
}
</style>
