<template>
  <div class="ContactAll-container">
    <Contact type="github" text="Fangdaochu" ClassStyle="Size"></Contact>
    <Contact
      type="mail"
      text="fangdaochu@gmail.com"
      ClassStyle="Size"
    ></Contact>
    <Contact type="qq" text="296840095" ClassStyle="Size"></Contact>
    <Contact type="weixin" text="yhssjsjj" ClassStyle="Size"></Contact>
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
</style>