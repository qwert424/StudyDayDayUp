<template>
  <div class="userInfo-container">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h2 class="title">用户信息</h2>
      <el-form-item label="用户名" class="item-container">
        <el-input v-model="ruleForm.name" :disabled="ifdisabled"></el-input>
      </el-form-item>
      <el-form-item label="账号" class="item-container">
        <el-input
          v-model="ruleForm.loginIdRecord"
          :disabled="ifdisabled"
        ></el-input>
      </el-form-item>
      <h2 class="title">修改信息</h2>
      <el-form-item label="账号" prop="loginId" class="item-container">
        <el-input v-model="ruleForm.loginId"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="oldLoginPwd" class="item-container">
        <el-input type="password" v-model="ruleForm.oldLoginPwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="loginPwd" class="item-container">
        <el-input type="password" v-model="ruleForm.loginPwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" class="item-container">
        <el-input type="password" v-model="ruleForm.checkPass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交修改</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { setInfoApi } from "@/api/user";
export default {
  data() {
    const checkLoginId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入账户名"));
      }
      callback();
    };
    const validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      }
      callback();
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.loginPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ifdisabled: true, // 是否禁用
      ruleForm: {
        checkPass: "", // 验证密码
        loginId: "", // 登录账号
        loginPwd: "", //密码
        oldLoginPwd: "", //旧密码
        name: "管理员", // 用户名
        loginIdRecord: "", //记录登录账号
      },
      rules: {
        loginPwd: [{ validator: validatePass, trigger: "blur" }],
        oldLoginPwd: [{ validator: validateOldPass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        loginId: [{ validator: checkLoginId, trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    // userInfoName() {
    //   this.userInfo === null ? "" : this.userInfo.name;
    // },
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const resp = await setInfoApi(this.ruleForm);
          if (typeof resp !== "string") {
            this.$message.success("修改成功!请重新登录");
            await this.$store.dispatch("user/logout");
            this.$router.push(`/login?redirect=${this.$route.fullPath}`);
          } else {
            this.$message.error(JSON.parse(resp).msg);
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
    },
  },
  created() {
    this.ruleForm.name = this.userInfo.name;
    this.ruleForm.loginIdRecord = this.userInfo.loginId;
  },
};
</script>

<style lang="scss" scoped>
.userInfo-container {
  padding: 30px;
  .title {
    font-size: 20px;
    color: #999;
    padding: 15px 0;
    border-top: 1px dashed #ccc;
  }
  .item-container {
    width: 60%;
  }
}
</style>