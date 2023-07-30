<template>
  <div class="Home-container" ref="container" @wheel="handleWheel">
    <ul
      ref="ItemContainer"
      class="item-container"
      :style="{ top: ItemContainerTop + 'px' }"
      @transitionend="handleWheelEnd"
    >
        <carousel v-for="item in itemsData" :key="item.id"
          :src="item.bigImg"
          :placeholder="item.midImg"
          :title="item.title"
          :description="item.description"
          @load="showControl"
        ></carousel>
    </ul>
    <div v-if="ifshow">
      <Icon
        v-show="index < itemsData.length - 1"
        type="arrowDown"
        class="top-icon icon"
        @click.native="index++"
      ></Icon>
      <Icon
        v-show="index >= 1"
        type="arrowUp"
        class="bottom-icon icon"
        @click.native="index--"
      ></Icon>
      <div class="dots-container" ref="dots">
        <span
          v-for="(item, i) in itemsData"
          :key="item.id"
          :class="['dot', { active: i === index }]"
          @click="changeItem(i)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import { getBanner } from "@/api/banner";
import carousel from "./carousel.vue";
export default {
  data() {
    return {
      itemsData: [], //数据
      ifshow: false, //组件显示
      index: 0, //下标
      containerWidth: 0, //容器宽度
      containerHeight: 0, //容器高度
      ifWheel: false, //是否正在滚动
    };
  },
  async created() {
    this.itemsData = await getBanner();
  },
  components: {
    carousel,
    Icon,
  },
  computed: {
    ItemContainerTop() {
      return -this.containerHeight * this.index;
    },
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    this.containerWidth = this.$refs.container.clientWidth;
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    showControl() {
      this.ifshow = true;
    },
    changeItem(i) {
      this.index = i;
    },
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
      this.containerWidth = this.$refs.container.clientWidth;
    },
    handleWheel(e) {
      if (this.ifWheel) return;
      if (e.deltaY > 50 && this.index < this.itemsData.length - 1) {
        this.ifWheel = true;
        this.index++;
      } else if (e.deltaY < -50 && this.index > 0) {
        this.ifWheel = true;
        this.index--;
      }
    },
    handleWheelEnd() {
      this.ifWheel = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./Home.module.less";
</style>