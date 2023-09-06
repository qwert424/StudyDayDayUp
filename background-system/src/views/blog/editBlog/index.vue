<template>
  <div class="addBlog-container">
    <editBlogArticle mode="edit"></editBlogArticle>
  </div>
</template>
  
  <script>
import editBlogArticle from "@/components/editBlogArticle";
export default {
  components: {
    editBlogArticle,
  },
};
</script>
  
  <style lang="scss" scoped>
.addBlog-container {
  padding: 30px;
}
</style>