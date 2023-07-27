<template>
  <div class="pager-container" v-if="AllPager > 1">
    <a
      href=""
      :class="{ disable: nowCurrent === 1 }"
      @click.prevent="changeCurrent(1)"
      >首页</a
    >
    <a
      href=""
      :class="{ disable: nowCurrent === 1 }"
      @click.prevent="changeCurrent(nowCurrent - 1)"
      >上一页</a
    >
    <a
      href=""
      v-for="(n, i) in currentArr()"
      :key="i"
      :class="{ active: n === nowCurrent }"
      @click.prevent="changeCurrent(n)"
      >{{ n }}</a
    >
    <a
      href=""
      :class="{ disable: nowCurrent === AllPager }"
      @click.prevent="changeCurrent(nowCurrent + 1)"
      >下一页</a
    >
    <a
      href=""
      :class="{ disable: nowCurrent === AllPager }"
      @click.prevent="changeCurrent(AllPager)"
      >尾页</a
    >
  </div>
</template>

<script>
export default {
  props: {
    totalItems: {
      //总数
      type: Number,
      default: 0,
    },
    nowCurrent: {
      //当前数
      type: Number,
      default: 1,
    },
    showLimit: {
      //展示数
      type: Number,
      default: 10,
    },
    showCount: {
      //一页展示多少数据
      type: Number,
      default: 20,
    },
  },
  computed: {
    // 总页数
    AllPager() {
      return Math.ceil(this.totalItems / this.showCount);
    },
    // 展示最小数
    MinPager() {
      let min = this.nowCurrent - Math.floor(this.showLimit / 2);
      min > this.AllPager - 9
        ? (min = this.AllPager - 9)
        : min < 1
        ? (min = 1)
        : false;
      return min;
    },
    // 展示最大数
    MaxPager() {
      let max = this.MinPager + this.showLimit - 1;
      if (max > this.AllPager) {
        max = this.AllPager;
      }
      return max;
    },
  },
  methods: {
    currentArr() {
      const arr = [];
      for (let i = this.MinPager; i <= this.MaxPager; i++) {
        arr.push(i);
      }
      return arr;
    },
    changeCurrent(CurrentNew) {
      if (
        (this.nowCurrent === CurrentNew) |
        (CurrentNew < 1) |
        (CurrentNew > this.AllPager)
      ) {
        return;
      }
      this.$emit("changeCurrent", CurrentNew);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/color.module.less";
.pager-container {
  @RadiusSize: 8px;
  width: max-content;
  height: 60px;
  margin: 20px auto;
  display: flex;
  align-items: center;
  border-radius: @RadiusSize;
  background-color: @backColor;
  a {
    @Height: 40px;
    padding: 0 10px;
    height: @Height;
    line-height: @Height;
    text-align: center;
    margin: 0 10px;
    border-radius: @RadiusSize;
    background: @primary;
    color: @white;
    box-shadow: 3px -2px 5px;
    &.active {
      box-shadow: 0 0 0 2px;
      background: none;
      cursor: text;
      transition: all 0.2s;
      background: @success;
      font-weight: bold;
    }
    &.disable {
      background: @gray;
      cursor: not-allowed;
      box-shadow: none;
    }
  }
}
</style>