<template>
  <div class="Menu-container">
    <Contact
      v-for="items in item"
      :class="{ select: isSelected(items) }"
      :key="items.Path"
      :type="items.type"
      :text="items.text"
      :path="items.Path"
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
          Path: "/",
        },
        {
          type: "blog",
          text: "文章",
          Path: "/blog",
          startWith: true, //是否模糊匹配 变量比对
        },
        {
          type: "info",
          text: "关于我",
          Path: "/about",
        },
        {
          type: "code",
          text: "项目&效果",
          Path: "/project",
        },
        {
          type: "chat",
          text: "留言板",
          Path: "/message",
        },
      ],
    };
  },
  methods: {
    isSelected(item) {
      const link = item.Path;
      const pathName = location.pathname;
      if (item.startWith) {
        return pathName.startsWith(link);
      } else {
        return pathName === link;
      }
    },
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