<template>
  <div class="Home-container" ref="container">
    <ul ref="ItemContainer" class="item-container">
      <li v-for="item in itemsData" :key="item.id">
        <carousel
          :src="item.bigImg"
          :placeholder="item.midImg"
          :title="item.title"
          :description="item.description"
          @load="showControl"
        ></carousel>
      </li>
    </ul>
    <div v-show="ifshow">
      <Icon
        type="arrowDown"
        class="top-icon icon"
        @click.native="nextImg"
      ></Icon>
      <Icon
        type="arrowUp"
        class="bottom-icon icon"
        @click.native="provImg"
      ></Icon>
      <div class="dots-container" ref="dots">
        <span
          v-for="count in itemsData.length"
          :key="count"
          :class="['dot', { active: ifSelected(count) }]"
          @click="changeItem(count - 1)"
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
      itemsData: [],
      ifshow: false,
      ItemContainerTop: 0,
      count: 0,
      index: 0,
      containerWidth: 0,
      containerHeight: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };
  },
  async created() {
    this.itemsData = await getBanner();
  },
  components: {
    carousel,
    Icon,
  },
  methods: {
    showControl() {
      this.ifshow = true;
      this.count = this.itemsData.length;
    },
    nextImg() {
      const num = -(this.count - 1) * 100;
      if (parseInt(this.ItemContainerTop) <= num) {
        return;
      }
      this.index++;
      this.$refs.ItemContainer.style.top =
        parseInt(this.ItemContainerTop) - 100 + "vh";
      this.ItemContainerTop = this.$refs.ItemContainer.style.top;
      this.changeClass();
    },
    provImg() {
      if (parseInt(this.ItemContainerTop) >= 0) {
        return;
      }
      this.index--;
      this.$refs.ItemContainer.style.top =
        parseInt(this.ItemContainerTop) + 100 + "vh";
      this.ItemContainerTop = this.$refs.ItemContainer.style.top;
      this.changeClass();
    },
    ifSelected(count) {
      const num = parseInt(this.ItemContainerTop) / 100 + 1;
      if (num === count) {
        return true;
      }
      return false;
    },
    changeClass() {
      Array.prototype.slice
        .call(this.$refs.dots.children)
        .forEach((element) => {
          element.classList.remove("active");
        });
      this.$refs.dots.children[this.index].classList.add("active");
    },
    changeItem(count) {
      this.index = count;
      this.changeClass();
      this.$refs.ItemContainer.style.top = -count * 100 + "vh";
      this.ItemContainerTop = this.$refs.ItemContainer.style.top;
    },
    move($event) {
      if ($event.target.nodeName !== "IMG") {
        return;
      }
      if ($event.offsetY < this.top && $event.offsetX < this.left) {
        $event.target.style.transform = "translate(-5%,-5%)";
        return;
      } else if ($event.offsetY < this.top && $event.offsetX > this.right) {
        $event.target.style.transform = "translate(5%,-5%)";
        return;
      } else if ($event.offsetY > this.bottom && $event.offsetX < this.left) {
        $event.target.style.transform = "translate(-5%,5%)";
        return;
      } else if ($event.offsetY > this.bottom && $event.offsetX > this.right) {
        $event.target.style.transform = "translate(5%,5%)";
        return;
      } else if (
        $event.offsetY > this.top &&
        $event.offsetY < this.bottom &&
        $event.offsetX < this.right &&
        $event.offsetX > this.left
      ) {
        $event.target.style.transform = "none";
        return;
      }
      if ($event.offsetY < this.top) {
        $event.target.style.transform = "translateY(-5%)";
      }
      if ($event.offsetY > this.bottom) {
        $event.target.style.transform = "translateY(5%)";
      }
      if ($event.offsetX < this.left) {
        $event.target.style.transform = "translateX(-5%)";
      }
      if ($event.offsetX > this.right) {
        $event.target.style.transform = "translateX(5%)";
      }
    },
  },
  updated() {
    this.containerHeight = parseInt(
      getComputedStyle(this.$refs.container).height
    );
    this.containerWidth = parseInt(
      getComputedStyle(this.$refs.container).width
    );
    this.top = this.containerHeight / 4;
    this.bottom = (this.containerHeight / 4) * 3;
    this.left = this.containerWidth / 4;
    this.right = (this.containerWidth / 4) * 3;
    const container = this.$refs.container;
    container.addEventListener("mousemove", this.move);
    container.addEventListener("mouseout", function ($event) {
      if ($event.target.nodeName !== "IMG") {
        return;
      }
      $event.target.style.transform = "none";
    });
  },
};
</script>

<style lang="less" scoped>
@import "./Home.module.less";
</style>