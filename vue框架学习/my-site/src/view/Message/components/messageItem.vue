<template>
  <div class="messageItem-container">
    <MessageArea
      title="留言板"
      :subTitle="data.total + ''"
      :list="data.rows"
      @submit="handleSubmit"
    ></MessageArea>
    <div
      class="loading-container"
      v-show="isLoading"
      v-loading="isLoading"
    ></div>
    <Empty v-if="data.total === 0 && !isLoading" class="Empty"></Empty>
  </div>
</template>

<script>
import Empty from "@/components/Empty";
import fetchData from "@/mixins/fetchData";
import { getMessage, postMessage } from "@/api/message";
import message from "@/mixins/message";

export default {
  components: {
    Empty,
  },
  mixins: [fetchData({ total: 0, rows: [] }), message],
  methods: {
    async fetchData() {
      return await getMessage(this.page, this.limit);
    },
    async handleSubmit(data, callback) {
      const comment = await postMessage({ ...data });
      this.data.rows.unshift(comment);
      this.data.total++;
      callback({ content: "提交成功", type: "success" });
    },
  },
};
</script>

<style lang="less" scoped>
.messageItem-container {
  width: 100%;
  height: 100%;
  position: relative;

  .MessageArea-container {
    width: 800px;
    margin: 50px auto 0;
  }
  .loading-container {
    height: 40px;
    position: relative;
    margin-top: 10px;
  }
  .Empty {
    bottom: -25%;
    top: unset;
    transform: translateX(-50%);
  }
}
</style>