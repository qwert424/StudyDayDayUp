<template>
  <div class="Menu-container">
    <Contact
      v-for="items in item"
      :key="items.Path"
      :type="items.type"
      :text="items.text"
      :path="{ name: items.Name }"
      :exact="items.exact"
    ></Contact>
  </div>
</template>

<script>
import Contact from "@/components/SiteAside/Contact/";
export default {
  components: {
    Contact,
  },
  data() {
    return {
      item: [
        {
          type: "home",
          text: "首页",
          Name: "Home",
        },
        {
          type: "blog",
          text: "文章",
          Name: "Blog",
          exact: false, //是否精确匹配 变量比对
        },
        {
          type: "info",
          text: "关于我",
          Name: "About",
        },
        {
          type: "code",
          text: "项目&效果",
          Name: "Project",
        },
        {
          type: "chat",
          text: "留言板",
          Name: "Message",
        },
      ],
    };
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