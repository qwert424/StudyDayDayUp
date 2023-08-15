<template>
  <div class="Empty-container">
    <Icon type="empty" class="bg-img"></Icon>
    <span>{{ text }}</span>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
      default: "无数据",
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/color.module.less";
@import "~@/Style/common.module.less";
.Empty-container {
  .container-center();
  @size: 200px;
  width: @size;
  height: @size;
  color: @gray;
  .flex-container(column);
  .bg-img {
    font-size: 150px;
    flex-grow: 1;
  }
}
</style>