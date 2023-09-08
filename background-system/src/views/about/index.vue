<template>
  <div class="about-container">
    <el-form ref="form" :model="formData" label-width="120px">
      <el-form-item label="关于我 URL地址:" class="item-container">
        <div class="input-container">
          <el-input
            v-model="formData.input"
            placeholder="请输入url地址"
            :disabled="ifdisabled"
          >
          </el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleEditClick" v-show="ifdisabled"
          >编辑</el-button
        >
        <el-button
          type="primary"
          @click="handleChangeClick"
          v-show="!ifdisabled"
          >保存</el-button
        >
        <el-button type="primary" @click="handleBackClick" v-show="!ifdisabled"
          >返回</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAbout, setAbout } from "@/api/about";
export default {
  data() {
    return {
      formData: {
        input: "", //关于我地址
      },
      ifdisabled: true, //禁用标志
    };
  },
  methods: {
    // 获取数据
    async fetchData() {
      const resp = await getAbout();
      if (resp.code !== 0 || resp.msg !== "") {
        return;
      }
      this.formData.input = resp.data;
    },
    // 按钮事件
    handleEditClick() {
      this.ifdisabled = !this.ifdisabled;
    },
    handleBackClick() {
      this.ifdisabled = !this.ifdisabled;
      this.fetchData();
      this.$message("取消更改!");
    },
    async handleChangeClick() {
      this.ifdisabled = !this.ifdisabled;
      const resp = await setAbout({ url: this.formData.input });
      if (resp.code !== 0 || resp.msg !== "") {
        return;
      }
      this.$message.success("更改url地址成功!");
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
.about-container {
  padding: 30px;
  .item-container {
    width: 50%;
  }
}
</style>