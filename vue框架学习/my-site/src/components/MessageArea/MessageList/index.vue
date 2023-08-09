<template>
  <div class="MessageList-container">
    <div class="avatar"><img :src="data.avatar" /></div>
    <div class="desc">
      <div class="nickname">{{ data.nickname }}</div>
      <div class="content">{{ data.content }}</div>
    </div>
    <div class="time">{{ formatTime(data.createDate) }}</div>
  </div>
</template>

<script>
import { formatTime } from "@/utils";
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatTime,
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/common.module.less";
@import "~@/Style/color.module.less";
.MessageList-container {
  .flex-container();
  @dis: 15px;
  position: relative;
  gap: @dis;
  padding: @dis;
  border-bottom: 1px solid @gray;
  &:last-child {
    border-bottom: none;
  }
  img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: @size;
  }
  .desc {
    flex: 1 1 auto;
    .nickname {
      color: @success;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .content {
      font-size: @dis;
      .text-overflow-ellipsis(3);
    }
  }
  .time {
    position: absolute;
    top: @dis;
    right: @dis;
    font-size: 12px;
    color: @gray;
  }
}
</style>