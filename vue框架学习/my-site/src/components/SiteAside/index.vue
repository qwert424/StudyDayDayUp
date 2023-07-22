<template>
  <div class="SiteAside-container">
    <Avatar
      src="https://img1.baidu.com/it/u=3302184040,3713353210&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689958800&t=c5544548483d80e372afb5e9f2ecfefc"
    ></Avatar>
    <Menu></Menu>
    <ContactAll></ContactAll>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar/";
import Menu from "@/components/Menu/";
import ContactAll from "@/components/ContactAll/";
export default {
  components: {
    Avatar,
    Menu,
    ContactAll,
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/color.less";
@import "~@/Style/common.less";
.SiteAside-container {
  @All: 100%;
  @Size: 20px;
  .flex-container(@dir: column);
  align-items: stretch;
  justify-content: flex-start;
  padding-top: 10px;
  gap: @Size;
  height: @All;
  width: @All;
  background-color: @black;
  .Avatar-container {
    align-self: center;
  }
  .ContactAll-container {
    flex-grow: 1;
    margin-top: @Size;
  }
}
</style>