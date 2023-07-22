<template>
  <div class="ImageLoader-container">
    <img :src="src" alt="原始图片的路径" @load="loadFinish" />
    <transition name="fade" :duration="duration">
      <img
        :src="placeholder"
        alt="原始图片加载完成前的占位图片"
        v-if="ifShow"
      />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ifShow: true,
    };
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  methods: {
    loadFinish() {
      this.ifShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/common.less";

.ImageLoader-container {
  .container-center();
  @size: 100px;
  width: 3 * @size;
  height: 2 * @size;
  img {
    .full-container();
  }

  .fade-leave-active {
    transition: opacity 10s;
  }

  .fade-leave-to {
    opacity: 0;
  }
}
</style>