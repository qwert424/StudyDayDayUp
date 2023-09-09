<template>
  <div class="mySetting-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="110px"
      class="demo-ruleForm"
    >
      <h2 class="title">网址信息</h2>
      <el-form-item label="网站标题" prop="siteTitle" class="item-container">
        <el-input
          v-model="ruleForm.siteTitle"
          :disabled="ifdisabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail" class="item-container">
        <el-input
          v-model="ruleForm.mail"
          :disabled="ifdisabled"
        ></el-input> </el-form-item
      ><el-form-item label="备案号" prop="icp" class="item-container">
        <el-input v-model="ruleForm.icp" :disabled="ifdisabled"></el-input>
      </el-form-item>
      <h2 class="title">网站头像信息</h2>
      <el-form-item label="网站头像" prop="avatar">
        <el-image
          style="width: 100px; height: 100px"
          :src="ruleForm.avatar"
          fit="contain"
          v-show="ifdisabled"
        ></el-image>
        <uploadComp v-model="ruleForm.avatar" v-show="!ifdisabled"></uploadComp>
      </el-form-item>
      <h2 class="title">网站图标信息</h2>
      <el-form-item label="网站图标地址" prop="favicon" class="item-container">
        <el-input v-model="ruleForm.favicon" :disabled="ifdisabled"></el-input>
      </el-form-item>
      <el-form-item label="图标预览图" v-show="ifdisabled">
        <el-image
          style="width: 100px; height: 100px"
          :src="ruleForm.favicon"
          fit="contain"
        ></el-image>
      </el-form-item>
      <h2 class="title">网站Github信息</h2>
      <el-form-item label="Github名称" prop="githubName" class="item-container">
        <el-input
          v-model="ruleForm.githubName"
          :disabled="ifdisabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="Github地址" prop="github" class="item-container">
        <el-input v-model="ruleForm.github" :disabled="ifdisabled"></el-input>
      </el-form-item>
      <h2 class="title">网站QQ信息</h2>
      <el-form-item label="QQ名称" prop="qq" class="item-container">
        <el-input v-model="ruleForm.qq" :disabled="ifdisabled"></el-input>
      </el-form-item>
      <el-form-item label="QQ二维码" class="item-container">
        <el-image
          style="width: 100px; height: 100px"
          :src="ruleForm.qqQrCode"
          fit="contain"
          v-show="ifdisabled"
        ></el-image>
        <uploadComp
          v-model="ruleForm.qqQrCode"
          v-show="!ifdisabled"
        ></uploadComp>
      </el-form-item>
      <h2 class="title">网站微信信息</h2>
      <el-form-item label="微信名称" prop="weixin" class="item-container">
        <el-input v-model="ruleForm.weixin" :disabled="ifdisabled"></el-input>
      </el-form-item>
      <el-form-item label="微信二维码" class="item-container">
        <el-image
          style="width: 100px; height: 100px"
          :src="ruleForm.weixinQrCode"
          fit="contain"
          v-show="ifdisabled"
        ></el-image>
        <uploadComp
          v-model="ruleForm.weixinQrCode"
          v-show="!ifdisabled"
        ></uploadComp>
      </el-form-item>
      <el-form-item v-show="ifdisabled">
        <el-button
          v-show="ifdisabled"
          type="primary"
          @click="handleEditFormClick('ruleForm')"
          >编辑</el-button
        ></el-form-item
      >
      <el-form-item v-show="!ifdisabled">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >保存</el-button
        >
        <el-button @click="resetForm('ruleForm')" v-show="!ifdisabled"
          >重置</el-button
        >
        <el-button @click="backForm" v-show="!ifdisabled">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSetting, setSetting } from "@/api/setting";
// import { baseURL } from "@/basis_URL";
import uploadComp from "@/components/uploadComp";
export default {
  components: {
    uploadComp,
  },
  data() {
    return {
      ifdisabled: true, // 是否禁用
      ruleForm: {
        //验证表单数据
        siteTitle: "", //网站标题
        mail: "", //网站邮箱
        icp: "", //网站备案号
        avatar: "", //网站头像
        favicon: "", //网站图标
        githubName: "", //Github名称
        github: "", //Github地址
        qq: "", //qq
        qqQrCode: "", //qq二维码
        weixin: "", //微信
        weixinQrCode: "", //微信二维码
      },
      rules: {
        siteTitle: [
          { required: true, message: "请输入网站标题", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 1 到 11 个字符", trigger: "blur" },
        ],
        mail: [{ required: true, message: "请输入网站邮箱", trigger: "blur" }],
        icp: [{ required: true, message: "请输入网站备案号", trigger: "blur" }],
        avatar: [
          { required: true, message: "请上传网站头像", trigger: "blur" },
        ],
        favicon: [
          { required: true, message: "请输入网站图标地址", trigger: "blur" },
        ],
        githubName: [
          { required: true, message: "请输入github名称", trigger: "blur" },
        ],
        github: [
          { required: true, message: "请输入github地址", trigger: "blur" },
        ],
        qq: [{ required: true, message: "请输入qq名称", trigger: "blur" }],
        weixin: [
          { required: true, message: "请输入微信名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 获取数据
    async fetchData() {
      const resp = await getSetting();
      // resp.data.initavatar =
      //   resp.data.avatar === "" ? "" : baseURL + resp.data.avatar;
      // resp.data.initweixinQrCode =
      //   resp.data.weixinQrCode === "" ? "" : baseURL + resp.data.weixinQrCode;
      // resp.data.initqqQrCode =
      //   resp.data.qqQrCode === "" ? "" : baseURL + resp.data.qqQrCode;
      this.ruleForm = { ...resp.data };
    },
    // 编辑事件
    handleEditFormClick() {
      this.ifdisabled = !this.ifdisabled;
    },
    // 返回事件
    backForm() {
      this.ifdisabled = !this.ifdisabled;
      this.fetchData();
      this.$message("取消更改!");
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.weixinQrCode = "";
      this.ruleForm.qqQrCode = "";
    },
    // 修改表单
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        console.log(1);
        if (valid) {
          // const resp = await setSetting(this.ruleForm);
          // if (typeof resp !== "string") {
          //   this.$message.success("保存成功!");
          //   this.ifdisabled = !this.ifdisabled;
          //   this.fetchData();
          // } else {
          //   this.$message.error("保存失败!");
          // }
        } else {
          this.$message.error("请将所有必填选项填写上!");
          return false;
        }
      });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
.mySetting-container {
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