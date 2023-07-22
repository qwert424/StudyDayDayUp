<template>
  <div>
    <Icon :type="item" v-for="(item, i) in types" :key="i"></Icon>
  </div>
</template>
  
<script>
import Icon, { types } from "./";
export default {
  components: {
    Icon,
  },
  data() {
    return types;
  },
};
</script>
  
  <style scoped>
.iconfont {
  color: red;
}
</style>