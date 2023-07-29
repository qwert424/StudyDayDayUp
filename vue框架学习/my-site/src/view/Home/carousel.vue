<template>
  <div class="carousel-container">
    <ImageLoader
      :src="src"
      :placeholder="placeholder"
      @load="show"
    ></ImageLoader>
    <div class="desc" v-show="ifshow" ref="desc">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ifshow: false,
      descWidth: 0,
    };
  },
  components: {
    ImageLoader,
  },
  methods: {
    show() {
      this.$emit("load");
      this.ifshow = true;
    },
  },
  updated() {
    // 文本滑动出现
    this.descWidth = getComputedStyle(this.$refs.desc).width;
    this.$refs.desc.style.width = 0;
    this.$refs.desc.clientHeight; // 导致reflow
    this.$refs.desc.style.width = this.descWidth;
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/common.module.less";
@import "~@/Style/color.module.less";
.carousel-container {
  width: @fullsize;
  height: 100vh;
  background: @black;
  position: relative;
  overflow: hidden;
  transition: 0.5s;
  &:hover {
    .desc {
      left: 10%;
    }
  }
  .desc {
    position: absolute;
    top: @size;
    transform-origin: left center;
    transform: translateY(-50%);
    left: 8%;
    color: @white;
    transition: 3s;
    overflow: hidden;
    p,
    h2 {
      overflow: hidden;
      white-space: nowrap;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>