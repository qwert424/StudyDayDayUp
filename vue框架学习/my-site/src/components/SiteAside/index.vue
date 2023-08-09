<template>
  <div class="SiteAside-container">
    <Avatar
      src="https://img0.baidu.com/it/u=2951898357,371941305&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666"
    ></Avatar>
    <h1 class="title">无敌龙傲天</h1>
    <Menu></Menu>
    <ContactAll></ContactAll>
    <p class="footer">网站备案号</p>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar/";
import Menu from "./Menu/";
import ContactAll from "./ContactAll/";
export default {
  components: {
    Avatar,
    Menu,
    ContactAll,
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/color.module.less";
@import "~@/Style/common.module.less";
.SiteAside-container {
  @All: 100%;
  @Size: 10px;
  .flex-container(@dir: column);
  align-items: stretch;
  justify-content: flex-start;
  padding: @Size 0;
  gap: @Size;
  height: @All;
  width: @All;
  background-color: @black;
  overflow-x: hidden;
  overflow-y: auto;

  .Avatar-container {
    align-self: center;
    flex: 0 0 auto;
  }
  .ContactAll-container {
    flex: 1 0 auto;
    margin-top: @Size;
  }
  .title {
    font-size: 1.2em;
    text-align: center;
    color: @white;
  }
  .footer {
    font-size: 12px;
    text-align: center;
  }
}
</style>