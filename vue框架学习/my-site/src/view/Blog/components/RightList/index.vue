<!-- 递归组件 -->
<template>
  <ul class="RightList-container">
    <li
      v-for="(item, i) in list"
      :key="i"
      class="Item-container"
      @click.stop="handleChangeId(item)"
    >
      <div :class="{ select: item.isselect, firstItem: ifFirstItem, item }">
        {{ item.name
        }}<span v-if="item.articleCount" class="count"
          >{{ item.articleCount }}篇
        </span>
      </div>
      <!-- 递归 -->
      <RightList
        v-if="item.children"
        :list="item.children"
        @changeId="handleChangeId"
      ></RightList>
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightList",
  props: {
    list: {
      //列表数据 样式[{name:xxx,isselect:true},{name:yyy,isselect:false,children:{name:xxx,isselect:false}}]
      type: Array,
      default: () => [],
    },
    ifFirstItem: {
      //一级标题加粗
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleChangeId(item) {
      this.$emit("changeId", item);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/color.module.less";
@import "~@/Style/common.module.less";
.RightList-container {
  width: @fullsize;
  height: @fullsize;
  color: @words;
  @liHeight: 40px;
  overflow-y: auto;
  padding: 10px 15px;
  background-color: lighten(@gray, 20);
  .Item-container {
    //li容器
    width: @fullsize;
    min-height: @liHeight;
    font-size: 14px;
    cursor: pointer;
    margin: 5px 0;
    &:last-child {
      margin-bottom: 0;
    }
    .item {
      padding: 0 5px;
      height: @liHeight;
      line-height: @liHeight;
      letter-spacing: 2px;
      .text-overflow-ellipsis();
      transition: 0.3s;
      &:hover {
        background-color: @gray;
        color: @white;
        .count {
          color: @white;
        }
      }
      .count {
        //篇数
        transition: 0.3s;
        color: @lightWords;
        margin-left: 10px;
        font-size: 12px;
        vertical-align: 1px;
      }
      &.select {
        //选中
        font-size: 16px;
        font-weight: bold;
        color: @warn;
        cursor: text;
        .count {
          color: @warn;
          font-weight: normal;
        }
        &:hover {
          background-color: @white;
        }
      }
      &.firstItem {
        //一级样式
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
}
</style>