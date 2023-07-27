<template>
  <router-link
    :exact="exact"
    :to="path"
    class="Contact-container"
    active-class="selected"
    exact-active-class=""
    v-if="path"
  >
    <Icon :type="type" :class="ClassStyle"></Icon>
    <span :title="text">{{ text }}</span>
  </router-link>
  <div class="Contact-container" @click="Contact" v-else>
    <Icon :type="type" :class="ClassStyle"></Icon>
    <span :title="text">{{ text }}</span>
  </div>
</template>

<script>
import Icon from "@/components/Icon/";

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
      type: Object,
    },
    ClassStyle: {
      type: String,
      default: "",
    },
    exact: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Icon,
  },
  methods: {
    Contact() {
      if (this.type === "mail") {
        window.location.href = `mailto:${this.text}`;
      } else if (this.type === "qq") {
        window.location.href = `tencent://message/?Menu=yes&uin=${this.text}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/common.module.less";
@import "~@/Style/color.module.less";
.Contact-container {
  @size: 10px;
  height: 4 * @size;
  width: 100%;
  .flex-container();
  justify-content: flex-start;
  padding: 0 @size;
  gap: @size;
  background-color: transparent;
  font-size: 14px;
  color: @gray;
  cursor: pointer;

  &:hover {
    color: @primary;
  }
  .Size {
    font-size: 30px;
  }
  .wxSize {
    font-size: 34px;
    text-indent: -2px;
  }
  span {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &.selected {
    background-color: #2d2d2d;
  }
}
</style>