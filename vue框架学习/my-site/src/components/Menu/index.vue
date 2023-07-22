<template>
  <div class="Menu-container">
    <Contact type="home" text="首页" classStyle=""></Contact>
    <Contact type="blog" text="文章" path="/blog" classStyle=""></Contact>
    <Contact type="info" text="关于我" path="/about" classStyle=""></Contact>
    <Contact
      type="code"
      text="项目&效果"
      path="/project"
      classStyle=""
    ></Contact>
    <Contact type="chat" text="留言板" path="/message" classStyle=""></Contact>
  </div>
</template>

<script>
import Contact from "@/components/Contact/";
export default {
  components: {
    Contact,
  },
};
</script>

<style lang="less" scoped>
.Menu-container {

  .Contact-container {
    padding-left: 30px;
  }
}
</style>