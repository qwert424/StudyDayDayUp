<template>
  <div class="addBlog-container">
    <editProjectItem mode="add"></editProjectItem>
  </div>
</template>

<script>
import editProjectItem from "@/components/editProjectItem";
export default {
  components: {
    editProjectItem,
  },
};
</script>

<style lang="scss" scoped>
.addBlog-container {
  padding: 30px;
}
</style>