<!-- 用于编辑文章和发布文章的组件 通过参数mode来区分功能-->
<template>
  <div class="editBlogArticle-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 标题 -->
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <!-- 编辑 -->
      <el-form-item label="文章编辑">
        <Editor
          ref="toastuiEditor"
          height="400px"
          :initialValue="editorText"
          :options="editorOptions"
        ></Editor>
      </el-form-item>
      <!-- 描述 -->
      <el-form-item label="文章描述" prop="description">
        <el-input
          type="textarea"
          v-model="ruleForm.description"
          resize="none"
          :rows="4"
        ></el-input>
      </el-form-item>
      <!-- 首图 -->
      <el-form-item label="文章首图">
        <uploadComp v-model="ruleForm.thumb"></uploadComp>
      </el-form-item>
      <!-- 分类 -->
      <el-form-item label="文章分类" prop="category">
        <el-select
          v-model="ruleForm.category"
          placeholder="文章分类"
          @change="handleChange"
          class="select-container"
        >
          <el-option
            v-for="item in category"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- btn -->
      <div class="btn-container">
        <el-button type="primary" @click="submitForm('ruleForm')">{{
          mode === "add" ? "添加文章" : "修改文章"
        }}</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import "@toast-ui/editor/dist/i18n/zh-cn.js";
import uploadComp from "@/components/uploadComp";
import {
  addBlogArticle,
  editBlogArticle,
  getBlogType,
  getOneBlogArticle,
} from "@/api/blog";
export default {
  props: ["mode"],
  components: {
    Editor,
    uploadComp,
  },
  data() {
    return {
      editorText: "", //编辑器初始内容
      editorOptions: {
        //编辑器配置
        language: "zh-CN",
      },
      ruleForm: {
        //约束表单内容
        title: "", //文章标题
        description: "", //文章描述
        thumb: "", //文章首图
        category: "", //选择的文章分类
        htmlContent: "", //编辑器html内容
        markdownContent: "", //编辑器mark内容
      },
      category: [], //文章分类
      rules: {
        //约束规则
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        description: [
          { required: true, message: "请输入文章描述", trigger: "blur" },
        ],
        category: [
          { required: true, message: "请选择文章分类", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    // 获取数据
    async fetchData() {
      const resp = await getBlogType();
      this.category = resp.data;
      if (this.mode === "edit") {
        const resp = await getOneBlogArticle(this.$route.params.id);
        if (typeof resp !== "string") {
          this.ruleForm = resp.data;
          this.$refs.toastuiEditor.invoke("setHTML", this.ruleForm.htmlContent);
          this.ruleForm.category === null
            ? (this.ruleForm.category = "")
            : (this.ruleForm.category = resp.data.category.id);
        } else {
          this.$message.error("文章资源获取失败!");
          this.$router.push({
            name: "BlogList",
            path: "/blogList",
          });
        }
      }
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 整合数据
          this.ruleForm.htmlContent =
            this.$refs.toastuiEditor.invoke("getHTML");
          this.ruleForm.markdownContent =
            this.$refs.toastuiEditor.invoke("getMarkdown");
          let obj = {
            title: this.ruleForm.title,
            description: this.ruleForm.description,
            createDate: new Date().getTime(),
            categoryId: this.ruleForm.category,
            toc: [],
            thumb: this.ruleForm.thumb,
            htmlContent: this.ruleForm.htmlContent,
            markdownContent: this.ruleForm.markContent,
          };
          if (this.mode === "add") {
            // 添加文章
            const resp = await addBlogArticle(obj);
            if (typeof resp !== "string") {
              this.$router.push({
                name: "BlogList",
                path: "/blogList",
              });
              this.$message.success("添加文章成功!");
            } else {
              this.$message.error("添加文章失败!");
            }
          } else {
            // 修改文章
            const resp = await editBlogArticle({
              id: this.ruleForm.id,
              data: obj,
            });
            if (typeof resp !== "string") {
              this.$router.push({
                name: "BlogList",
                path: "/blogList",
              });
              this.$message.success("修改文章成功!");
            } else {
              this.$message.error("修改文章失败!");
            }
          }
        } else {
          this.$message.error("请将所有必填选项填写上!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.thumb = "";
      this.ruleForm.select = "";
      this.$refs.toastuiEditor.invoke("setHTML", "");
      this.$message.success("重置成功");
    },
    // 表单刷新
    handleChange() {
      this.$forceUpdate();
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
.select-container {
  width: 120px;
  text-align: center;
}
.btn-container {
  display: flex;
  width: 500px;
  justify-content: space-evenly;
  margin: 10px auto;
}
</style>