<template>
  <div class="detailTOC-container">
    <h2 class="title">目录</h2>
    <div class="container">
      <RightList
        :list="newlist"
        @changeId="handleChangeId"
        :ifFirstItem="true"
      ></RightList>
    </div>
  </div>
</template>

<script>
import RightList from "../RightList";
export default {
  components: {
    RightList,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // 地址hash值
      anchorHash: "",
      // 锚点dom
      doms: [],
    };
  },
  methods: {
    // 点击事件
    handleChangeId(item) {
      location.hash = item.anchor;
    },
    // 递归调用
    mapTree(item = []) {
      return item.map((item) => {
        return {
          ...item,
          isselect: item.anchor === this.anchorHash,
          // 递归调用
          children: this.mapTree(item.children),
        };
      });
    },
    // 获取锚点链接
    getDoms() {
      let doms = [];
      const getdoms = (data) => {
        for (const item of data) {
          doms.push(document.getElementById(item.anchor));
          if (item.children && item.children.length > 0) {
            getdoms(item.children);
          }
        }
      };
      getdoms(this.newlist);
      return doms;
    },
    // 创建正确的地址hash值
    setHash(scrollDom) {
      // 清空样式
      this.anchorHash = "";
      if (!scrollDom) {
        return;
      }
      const race = 200;
      const handleHash = (data) => {
        for (const item of data) {
          if (!item) {
            return;
          }
          const top = item.getBoundingClientRect().top;
          if (top < race && top > 0) {
            this.anchorHash = item.id;
            return;
          } else if (top > race) {
            continue;
          } else {
            this.anchorHash = item.id;
          }
        }
      };
      handleHash(this.doms);
    },
  },
  computed: {
    // 新数组
    newlist() {
      return this.mapTree(this.list);
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.setHash);
  },
  mounted() {
    this.doms = this.getDoms();
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.setHash);
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/common.module.less";
@import "~@/Style/color.module.less";

.detailTOC-container {
  width: @fullsize;
  height: @fullsize;
  color: @lightWords;
  @liHeight: 40px;

  .title {
    // 标题
    color: @words;
    font-size: 24px;
    height: @liHeight;
    line-height: @liHeight;
    border-bottom: 1px solid @gray;
    .text-overflow-ellipsis();
  }
  .container {
    height: calc(100% - @liHeight);
  }
}
</style>