<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-item">
      <label>账号：</label>
      <input type="text" autocomplete="off" v-model="loginId" />
    </div>
    <div class="form-item">
      <label>密码：</label>
      <input type="password" autocomplete="new-password" v-model="loginPwd" />
    </div>
    <div class="form-item">
      <label></label>
      <button :disabled="isLoading">
        {{ isLoading ? "Loading..." : "登录" }}
      </button>
    </div>
  </form>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      loginId: "",
      loginPwd: "",
    };
  },
  computed: {
    ...mapState("LoginStore", ["isLoading"]),
  },
  methods: {
    async handleSubmit() {
      const data = {
        LoginId: this.loginId,
        LoginPwd: this.loginPwd,
      };
      if (!data.LoginId || !data.LoginPwd) {
        alert("用户名、密码不能为空，请输入用户名、密码");
        return;
      }
      const resp = await this.AsyncsetLogin(data);
      if (resp) {
        alert("登录成功！");
        const Path = this.$route.query.redirect;
        this.$router.push({ path: Path ?? "/" });
      } else {
        alert("用户名、密码不正确");
        this.loginId = "";
        this.loginPwd = "";
        return;
      }
    },
    ...mapActions("LoginStore", ["AsyncsetLogin"]),
  },
};
</script>
<style scoped>
.form-item {
  margin: 1em auto;
  width: 300px;
  display: flex;
  align-items: center;
}
.form-item input {
  height: 26px;
  font-size: 14px;
  flex: 1 1 auto;
}
.form-item label {
  width: 70px;
}
.form-item button {
  flex: 1 1 auto;
  background: #50936c;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 5px;
  height: 35px;
  font-size: 16px;
}
</style>
