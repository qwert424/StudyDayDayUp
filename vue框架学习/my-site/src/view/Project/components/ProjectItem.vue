<template>
  <div class="ProjectItem-container">
    <a
      :href="data.url ? data.url : `javascript:alert('该项目无法通过外网访问')`"
      :target="data.url ? '_blank' : '_self'"
    >
      <img v-lazy:src="data.thumb" class="imgItem" />
    </a>
    <div class="msg">
      <h2 class="title">
        <a
          :href="
            data.url ? data.url : `javascript:alert('该项目无法通过外网访问')`
          "
          :target="data.url ? '_blank' : '_self'"
          >{{ data.name }}
        </a>
        <a
          v-if="data.github"
          class="github"
          :href="
            data.github
              ? data.github
              : `javascript:alert('该项目无法通过外网访问')`
          "
          :target="data.github ? '_blank' : '_self'"
          >github
        </a>
      </h2>
      <p v-for="(item, i) in data.description" :key="i" class="description">
        项目介绍：{{ item }}
      </p>
    </div>
  </div>
</template>

<script>
import lazy from "@/directives/lazy";
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  directives: {
    lazy,
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/color.module.less";
@import "~@/Style/common.module.less";
.ProjectItem-container {
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  gap: 20px;
  margin: 30px 0;
  border-radius: 10px;
  padding: 10px;
  &:hover {
    box-shadow: -1px 1px 5px #000;
    transform: scale(1.01) translate(3px, -3px);
  }
  .imgItem {
    width: 200px;
    height: 200px;
    display: block;
    border-radius: 10px;
    object-fit: cover;
  }

  .msg {
    max-height: 200px;
    overflow-y: auto;
    flex: 1 1 auto;
    line-height: 1.7;
    padding: 10px 0;
    h2 {
      font-size: 20px;
      .text-overflow-ellipsis(1);
      a:hover {
        color: @black;
      }
      a.github {
        color: @primary;
        font-size: 12px;
        margin-right: 5px;
      }
    }
    .description {
      color: @gray;
      font-size: 14px;
      .text-overflow-ellipsis(2);
    }
  }
}
</style>