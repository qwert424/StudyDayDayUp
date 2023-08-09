<template>
  <div class="MessageArea-container">
    <MessageForm v-on="$listeners"></MessageForm>
    <h3 class="title">
      {{ title }}<span class="subTitle">({{ subTitle }})</span>
    </h3>
    <MessageList v-for="item in list" :key="item.id" :data="item"></MessageList>
  </div>
</template>

<script>
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    MessageList,
    MessageForm,
  },
};
</script>

<style lang="less" scoped>
.MessageArea-container {
  width: 100%;

  .title {
    margin: 20px 0;
    .subTitle {
      margin: 0 5px;
    }
  }
}
</style>