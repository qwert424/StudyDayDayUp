<template>
  <form
    id="MessageForm-container"
    @submit.prevent="handleSubmit(data)"
    class="MessageForm-container"
    ref="form"
  >
    <div class="Item">
      <input
        type="text"
        maxlength="10"
        placeholder="用户昵称"
        v-model="data.nickname"
      />
      <span class="item inputItem">{{ data.nickname.length }}/10</span>
    </div>
    <div class="error">
      {{ error.nicknameError }}
    </div>
    <div class="Item textareaItem">
      <textarea
        placeholder="输入内容"
        maxlength="300"
        v-model="data.content"
      ></textarea>
      <span class="item">{{ data.content.length }}/300</span>
    </div>
    <div class="error">
      {{ error.contentError }}
    </div>
    <button :disabled="isSubmit">
      {{ isSubmit ? "提交中..." : " 提交" }}
    </button>
  </form>
</template>

<script>
import showMessage from "@/utils/showMessage";
export default {
  data() {
    return {
      data: {
        nickname: "",
        content: "",
      },
      error: {
        nicknameError: "",
        contentError: "",
      },
      isSubmit: false,
    };
  },
  methods: {
    handleSubmit(data) {
      // 验证
      this.error.contentError = data.content ? "" : "请输入内容";
      this.error.nicknameError = data.nickname ? "" : "请输入昵称";
      if (
        this.error.contentError ||
        this.error.nicknameError ||
        this.isSubmit
      ) {
        return;
      }
      this.isSubmit = true;
      this.$emit("submit", data, (data) => {
        showMessage({
          ...data,
          duration: 1000,
          container: this.$refs.form,
          callback: () => {
            this.isSubmit = false;
            this.data.nickname = "";
            this.data.content = "";
          },
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/Style/common.module.less";
@import "~@/Style/color.module.less";
.MessageForm-container {
  width: @fullsize;
  .flex-container(column);
  align-items: flex-start;
  .Item {
    position: relative;
    .item {
      position: absolute;
      bottom: 16px;
      right: 12px;
      width: 40px;
      height: 20px;
      font-size: 12px;
      line-height: 20px;
      text-align: center;

      &.inputItem {
        right: 2px;
        top: 20px;
        transform: translateY(-50%);
      }
    }

    &.textareaItem {
      width: 100%;
    }
  }
  input,
  textarea {
    font-size: 16px;
    border-radius: 5px;
    outline: none;
    border: 2px dotted lighten(@words, 20%);
    position: relative;
    &::placeholder {
      color: @gray;
      font-size: 14px;
    }
    &:hover {
      border-color: @words;
    }
    &:focus {
      border-color: lighten(@primary, -40%);
    }
  }
  input {
    height: 40px;
    line-height: 40px;
    width: 350px;
    padding: 0 40px 0 15px;
  }

  .error {
    color: @danger;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
  }

  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    font-size: 16px;
    resize: none;
  }

  button {
    width: 80px;
    height: 35px;
    background: linear-gradient(to top, lighten(@primary, -40%), @primary);
    color: @white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
      background: @gray;
    }
  }
}
</style>