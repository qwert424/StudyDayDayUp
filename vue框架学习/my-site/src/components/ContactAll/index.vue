<template>
  <div class="ContactAll-container">
    <Contact type="github" text="Fangdaochu" ClassStyle="Size"></Contact>
    <Contact
      type="mail"
      text="fangdaochu@gmail.com"
      ClassStyle="Size"
    ></Contact>
    <div class="item">
      <Contact type="qq" text="296840095" ClassStyle="Size"></Contact>
      <div class="code">
        <img
          src="https://img1.baidu.com/it/u=3302184040,3713353210&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689958800&t=c5544548483d80e372afb5e9f2ecfefc"
          alt=""
        />
      </div>
    </div>
    <div class="item">
      <Contact type="weixin" text="yhssjsjj" ClassStyle="wxSize"></Contact>
      <div class="code">
        <img
          src="https://img1.baidu.com/it/u=3302184040,3713353210&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689958800&t=c5544548483d80e372afb5e9f2ecfefc"
          alt=""
        />
      </div>
    </div>
    
  </div>
</template>

<script>
import Contact from "@/components/Contact/";
export default {
  components: {
    Contact,
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/common.less";
@import "~@/Style/color.less";
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