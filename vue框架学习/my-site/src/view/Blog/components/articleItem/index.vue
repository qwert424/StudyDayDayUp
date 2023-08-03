<template>
  <ul class="articleItem-container" ref="container">
    <li v-for="item in articleList" :key="item.id" class="articleItem">
      <img :src="item.thumb" alt="" class="img" v-if="item.thumb" />
      <div class="msg">
        <!-- 文章标题 -->
        <h2 class="title">
          <span>{{ item.title }}</span>
        </h2>
        <div class="details" v-show="ifshowdetails">
          <!-- 文章日期 -->
          <span class="date">日期:{{ item.createDate }}</span>
          <!-- 文章浏览 -->
          <span class="over">浏览:{{ item.scanNumber }}</span>
          <!-- 文章评论 -->
          <span class="comment">评论:{{ item.commentNumber }}</span>
          <!-- 文章标签 -->
          <span class="tag" v-if="+item.category.id !== -1">{{
            item.category.name
          }}</span>
        </div>
        <!-- 文章描述 -->
        <p class="desc">{{ item.description }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    // 文章列表
    articleList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      ifshowdetails: true,
    };
  },
  methods: {
    getContainerWidth() {
      return (this.ifshowdetails =
        +this.$refs.container.clientWidth < 500 ? false : true);
    },
  },
  mounted() {
    this.getContainerWidth();
    window.addEventListener("resize", this.getContainerWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.getContainerWidth);
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/color.module.less";
@import "~@/Style/common.module.less";
.articleItem-container {
  width: @fullsize;
  height: @fullsize;
  @padmar: 10px;
  padding: @padmar;
  overflow-y: scroll;
  scroll-behavior: smooth;
  .articleItem {
    .flex-container();
    margin: @padmar 0;
    padding: @padmar 0;
    border-bottom: 1px solid @gray;
    color: @words;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
      border-color: transparent;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
    .img {
      width: 150px;
      height: 100px;
      object-fit: cover;
      flex: 0 0 auto;
      margin-right: @padmar;
    }
    .msg {
      flex: 1 1 auto;
      .title {
        font-size: 20px;
        .text-overflow-ellipsis(2);
        margin-bottom: 5px;
        span {
          background: linear-gradient(to right, #f2709c, #ff9472) no-repeat left
            bottom;
          background-size: 0 3px;
          transition: 1s;
          &:hover {
            background-size: 100% 3px;
          }
        }
      }
      .details {
        font-size: 12px;
        height: 20px;
        color: @lightWords;
        .flex-container();
        justify-content: flex-start;
        span {
          flex: 0 1 auto;
        }
        gap: @padmar;
      }
      .desc {
        margin-top: 5px;
        font-size: 14px;
        max-height: 150px;
        .text-overflow-ellipsis(3);
      }
    }
  }
  .articleItem:first-child {
    border-top: 1px solid @gray;
  }
}
</style>