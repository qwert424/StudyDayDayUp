<!-- 用于编辑项目和发布项目的组件 通过参数mode来区分功能-->
<template>
  <div class="editProjectItem-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 标题 -->
      <el-form-item label="项目名称" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入项目名称"
        ></el-input>
      </el-form-item>
      <!-- 描述 -->
      <el-form-item label="项目描述">
        <el-form-item
          v-for="(domain, index) in ruleForm.description"
          :label="'描述' + (index + 1) + ':'"
          :key="index"
          class="ItemDescription-container"
          label-width="70px"
          :prop="'description.' + index + '.value'"
          :rules="{
            required: true,
            message: '描述不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="domain.value"></el-input
          ><el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
        <el-button @click="addDomain">新增项目描述</el-button>
      </el-form-item>
      <!-- 项目地址url -->
      <el-form-item label="项目地址">
        <el-input
          placeholder="请输入项目网址"
          v-model="ruleForm.webAddress"
          class="input-with-select"
        >
          <el-select
            v-model="ruleForm.protocol"
            slot="prepend"
            placeholder="请选择协议"
            class="select-container"
          >
            <el-option label="http://" value="http://"></el-option>
            <el-option label="https://" value="https://"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <!-- GitHub地址 -->
      <el-form-item label="GitHub">
        <el-input
          v-model="ruleForm.github"
          placeholder="请输入项目Github地址"
        ></el-input>
      </el-form-item>
      <!-- 权重 -->
      <el-form-item label="项目权重" prop="order">
        <el-select
          v-model="ruleForm.order"
          placeholder="项目权重"
          @change="handleChange"
          class="select-container"
        >
          <el-option label="1" :value="1"></el-option>
          <el-option label="2" :value="2"></el-option>
          <el-option label="3" :value="3"></el-option>
          <el-option label="4" :value="4"></el-option>
          <el-option label="5" :value="5"></el-option>
        </el-select>
      </el-form-item>
      <!-- 预览图 -->
      <el-form-item label="预览图" prop="thumb">
        <uploadComp
          v-model="ruleForm.thumb"
          @input="handleInput('ruleForm')"
        ></uploadComp>
      </el-form-item>
      <!-- btn -->
      <div class="btn-container">
        <el-button type="primary" @click="submitForm('ruleForm')">{{
          mode === "add" ? "添加项目" : "修改项目"
        }}</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button v-if="mode === 'edit'" @click="backForm('ruleForm')"
          >返回</el-button
        >
      </div>
    </el-form>
  </div>
</template>
  
  <script>
import uploadComp from "@/components/uploadComp";
import { getProject, addProject, putProject } from "@/api/project";
export default {
  props: ["mode"],
  components: {
    uploadComp,
  },
  data() {
    return {
      ruleForm: {
        //约束表单内容
        name: "", //项目名称
        description: [], //项目描述
        github: "", //项目github地址
        thumb: "", //项目预览图
        order: "", //项目权重
        protocol: "", //协议
        webAddress: "", //网址
        url: "",
      },
      rules: {
        //约束规则
        name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        order: [
          { required: true, message: "请选择项目权重", trigger: "change" },
        ],
        thumb: [
          { required: true, message: "请选择项目预览图", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    // 获取数据
    async fetchData() {
      if (this.mode === "edit") {
        const resp = await getProject(this.$route.params.id);
        const data = resp.data.filter(
          (item) => item.id === this.$route.params.id
        )[0];
        if (typeof resp !== "string" && data) {
          data.description = data.description.map((item) => {
            return {
              value: item,
            };
          });
          data.protocol = data.url === "" ? "" : data.url.split("/")[0] + "//";
          data.webAddress = data.url.split("/")[2];
          this.ruleForm = {
            ...data,
          };
        } else {
          this.$message.error("项目资源获取失败!");
          this.$router.push({
            name: "ProjectList",
            path: "/projectList",
          });
        }
      }
    },
    // 提交表单
    submitForm(formName) {
      if (!this.ruleForm.protocol || !this.ruleForm.webAddress) {
        this.ruleForm.url = "";
      } else {
        this.ruleForm.url = this.ruleForm.protocol + this.ruleForm.webAddress;
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 整合数据
          const newDescription = this.ruleForm.description.map((item) => {
            return item.value;
          });
          let obj = {
            name: this.ruleForm.name,
            description: newDescription,
            url: this.ruleForm.url,
            github: this.ruleForm.github,
            thumb: this.ruleForm.thumb,
            order: this.ruleForm.order,
          };
          if (this.mode === "add") {
            // 添加文章
            const resp = await addProject(obj);
            if (typeof resp !== "string") {
              this.$router.push({
                name: "ProjectList",
                path: "/projectList",
              });
              this.$message.success("添加项目成功!");
            } else {
              this.$message.error("添加项目失败!");
            }
          } else {
            // 修改文章
            this.ruleForm.id = this.$route.params.id;
            const resp = await putProject({
              id: this.ruleForm.id,
              data: obj,
            });
            if (typeof resp !== "string") {
              this.$router.push({
                name: "ProjectList",
                path: "/projectList",
              });
              this.$message.success("修改项目成功!");
            } else {
              this.$message.error("修改项目失败!");
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
      this.ruleForm.github = "";
      this.ruleForm.protocol = "";
      this.ruleForm.webAddress = "";
      this.ruleForm.description = [];
      this.ruleForm.url = "";
      this.$message.success("重置成功");
    },
    // 表单刷新
    handleChange() {
      this.$forceUpdate();
    },
    // 返回列表
    backForm() {
      this.$router.push({
        name: "ProjectList",
        path: "/projectList",
      });
      this.$message("取消项目修改!");
    },
    // 删除项目描述
    removeDomain(item) {
      const index = this.ruleForm.description.indexOf(item);
      if (index !== -1) {
        this.ruleForm.description.splice(index, 1);
      }
    },
    // 添加项目描述
    addDomain() {
      this.ruleForm.description.push({
        value: "",
      });
    },
    // 移除该表单项的校验结果
    handleInput(formName) {
      this.$refs[formName].clearValidate();
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
.ItemDescription-container {
  margin-bottom: 20px;
  .el-input {
    width: 50%;
    margin-right: 10px;
  }
}

.btn-container {
  display: flex;
  width: 500px;
  justify-content: space-evenly;
  margin: 10px auto;
}
</style>