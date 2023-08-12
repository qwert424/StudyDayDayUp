<template>
  <div class="ContactAll-container">
    <template v-if="data">
      <Contact
        type="github"
        :text="data.githubName"
        ClassStyle="Size"
      ></Contact>
      <Contact type="mail" :text="data.mail" ClassStyle="Size"></Contact>
      <div class="item">
        <Contact type="qq" :text="data.qq" ClassStyle="Size"></Contact>
        <div class="code">
          <img :src="data.qqQrCode" alt="" />
        </div>
      </div>
      <div class="item">
        <Contact
          type="weixin"
          :text="data.weixin"
          ClassStyle="wxSize"
        ></Contact>
        <div class="code">
          <img :src="data.weixinQrCode" alt="" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Contact from "@/components/SiteAside/Contact/";
export default {
  computed: {
    ...mapState("Mysetting", ["data"]),
  },
  components: {
    Contact,
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/common.module.less";
@import "~@/Style/color.module.less";
.ContactAll-container {
  .item {
    position: relative;
    width: 100%;
    height: 40px;
    &:hover {
      .code {
        transform: translateX(-50%) scaleY(1);
      }
    }
    .code {
      width: 80%;
      background-color: @white;
      position: absolute;
      left: 50%;
      transform: translateX(-50%) scaleY(0);
      transform-origin: center bottom;
      bottom: 45px;
      border-radius: 5px;
      padding: 8px 0;
      img {
        display: block;
        margin: 0 auto;
        @size: 150px;
        width: @size;
        height: @size;
      }
      &::after {
        content: "";
        @size: 8px;
        width: @size;
        height: @size;
        background-color: @white;
        position: absolute;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        bottom: -(@size / 2);
      }
    }
  }
}
</style>