<template>
  <div class="SiteAside-container">
    <template v-if="data">
      <Avatar :src="Avatarsrc"></Avatar>
      <h1 class="title">{{ data.siteTitle }}</h1>
      <Menu></Menu>
    </template>
    <ContactAll></ContactAll>
    <p class="footer" v-if="data">{{ data.icp }}</p>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar/";
import Menu from "./Menu/";
import ContactAll from "./ContactAll/";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("Mysetting", ["data"]),
    Avatarsrc() {
      return this.data.avatar ? this.data.avatar : "";
    },
  },
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