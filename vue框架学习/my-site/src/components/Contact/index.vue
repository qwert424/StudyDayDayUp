<template>
  <div class="Contact-container" @click="Contact">
    <Icon :type="type" :class="ClassStyle"></Icon>
    <span :title="text">{{ text }}</span>
  </div>
</template>

<script>
import Icon from "@/components/Iconfont/";

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    text: {
      type: String | Number,
      required: true,
    },
    path: {
      type: String,
      default: "",
    },
    ClassStyle: {
      type: String,
      default: "",
    },
  },
  components: {
    Icon,
  },
  methods: {
    Contact() {
      if(!this.path){
        return;
      }
      if (this.type === "mail") {
        window.location.href = `mailto:${this.text}`;
      } else if (this.type === "qq") {
        window.location.href = `tencent://message/?Menu=yes&uin=${this.text}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`;
      } else {
        window.location.href = this.path;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/common.less";
@import "~@/Style/color.less";
.Contact-container {
  @size: 10px;
  height: 4 * @size;
  width: 100%;
  .flex-container();
  justify-content: flex-start;
  padding-left: @size;
  gap: @size;
  background-color: transparent;
  font-size: 14px;
  color: @gray;
  cursor: pointer;

  &:hover{
    color:@primary
  }
  .Size{
    font-size:30px
  }
  .wxSize{
    font-size:34px;
    text-indent:-2px;
  }
  span {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>