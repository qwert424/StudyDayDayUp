<template>
  <div
    class="carousel-container"
    ref="container"
    @mousemove="handlePos"
    @mouseleave="PosEnd"
  >
    <ImageLoader
      ref="imgItem"
      :style="[handleChange, img]"
      :src="src"
      :placeholder="placeholder"
      @load="show"
    ></ImageLoader>
    <div class="desc" ref="Item">
      <h2 ref="title">{{ title }}</h2>
      <p ref="desc">{{ description }}</p>
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
      descWidth: 0, //简介宽度
      titleWidth: 0, //标题宽度
      containerSize: null, // 容器宽度
      ImgSize: null, //图片宽度
      mousePos: null, //鼠标位置
      img: null,
    };
  },
  computed: {
    getdiffer() {
      if (!this.containerSize || !this.ImgSize) return;
      return {
        difWidth: this.ImgSize.width - this.containerSize.width,
        difHeight: this.ImgSize.height - this.containerSize.height,
      };
    },
    getscale() {
      if (!this.containerSize || !this.getdiffer || !this.mousePos) return;
      return {
        widthScale:
          (this.getdiffer.difWidth * this.mousePos.clientX) /
          this.containerSize.width,
        heightScale:
          (this.getdiffer.difHeight * this.mousePos.clientY) /
          this.containerSize.height,
      };
    },
    handleChange() {
      if (!this.getscale) return;
      return {
        transform: `translate(-${this.getscale.widthScale}px,-${this.getscale.heightScale}px)`,
      };
    },
  },
  components: {
    ImageLoader,
  },
  methods: {
    show() {
      this.$emit("load");
      this.showText();
    },
    showText() {
      this.$refs.Item.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      this.$refs.title.style.width = 0;
      this.$refs.desc.clientHeight; // 导致reflow
      this.$refs.desc.style.width = this.descWidth + "px";
      this.$refs.title.style.width = this.titleWidth + "px";
    },
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.ImgSize = {
        width: this.$refs.imgItem.$el.clientWidth,
        height: this.$refs.imgItem.$el.clientHeight,
      };
    },
    handlePos(e) {
      this.img = null;
      this.mousePos = {
        clientX: e.clientX - this.$refs.container.getBoundingClientRect().left,
        clientY: e.clientY - this.$refs.container.getBoundingClientRect().top,
      };
    },
    PosEnd() {
      this.img = {
        transition: "0.5s",
        transform: `translate(-${this.getdiffer.difWidth / 2}px,-${
          this.getdiffer.difHeight / 2
        }px)`,
      };
    },
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize();
    window.addEventListener("resize", this.setSize);
    this.mousePos = {
      clientX: this.containerSize.width / 2,
      clientY: this.containerSize.height / 2,
    };
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/common.module.less";
@import "~@/Style/color.module.less";
.carousel-container {
  width: 100%;
  height: 100%;
  background: @black;
  position: relative;
  overflow: hidden;
  .ImageLoader-container {
    width: 110%;
    height: 110%;
  }

  &:hover {
    .desc {
      left: 10%;
    }
  }
  .desc {
    position: absolute;
    top: @size;
    transform: translateY(-50%);
    left: 8%;
    color: @white;
    overflow: hidden;
    opacity: 0;
    transition: 3s;
    p,
    h2 {
      transition: 3s;
      overflow: hidden;
      white-space: nowrap;
      height: 40px;
      line-height: 40px;
      font-size: 2em;
      text-shadow: 1px 0 0 @danger, 0 -1px 0 @danger, 0 1px 0 @black,
        -1px 0 0 @black;
    }
    p {
      margin-top: 10px;
      font-size: 1em;
      transition: 3s 1s;
    }
  }
}
</style>