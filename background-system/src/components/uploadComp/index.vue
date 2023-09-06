<template>
  <!-- 上传组件 -->
  <div class="uploadComp-container">
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :headers="headers"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="value" :src="imgURL" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { baseURL } from "@/basis_URL";

export default {
  props: ["value"],
  computed: {
    headers() {
      return {
        Authorization: "Bearer " + localStorage.getItem("adminAuthentication"),
      };
    },
    imgURL() {
      if (this.value) {
        return baseURL + this.value;
      }
    },
  },
  methods: {
    handleAvatarSuccess(resp) {
      if (resp.code !== 0 || resp.data === null) {
        return;
      }
      this.$emit("input", resp.data);
    },
  },
};
</script>

<style lang="scss" scoped>
.uploadComp-container {
  .avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-uploader-icon:hover {
    border-color: #409eff;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>