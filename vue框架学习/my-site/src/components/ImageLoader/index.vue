<template>
  <div class="ImageLoader-container">
    <img
      :src="src"
      alt="原始图片的路径"
      @load="loadFinish"
      :style="{ opacity: opacity, transition: `${this.duration}ms` }"
    />
    <img
      :src="placeholder"
      alt="原始图片加载完成前的占位图片"
      v-if="!everyThingDone"
      class="placeholder"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      ifShow: true,
      everyThingDone: false,
    };
  },
  computed: {
    opacity() {
      return this.ifShow ? 0 : 1;
    },
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
      setTimeout(() => {
        this.everyThingDone = !this.everyThingDone;
        this.$emit("load");
      }, this.duration);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/common.less";

.ImageLoader-container {
  @size: 100%;
  width: @size;
  height: @size;
  position: relative;
  overflow: hidden;
  img {
    .full-container();
  }

  .placeholder {
    filter: blur(2vw);
    .container-center();
    @size:110%;
    width:  @size;
    height:  @size;
  }
}
</style>