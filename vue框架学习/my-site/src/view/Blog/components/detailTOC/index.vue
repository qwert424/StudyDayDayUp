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
  methods: {
    handleChangeId(item) {
      location.hash = item.anchor;
    },
    mapTree(item) {
      const hasChildren = item.children ? true : false;
      return {
        ...item,
        isselect: `#${item.anchor}` === this.$route.hash,
        children: hasChildren ? item.children.map((i) => this.mapTree(i)) : [],
      };
    },
  },
  computed: {
    newlist() {
      return this.list.map((item) => this.mapTree(item));
    },
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