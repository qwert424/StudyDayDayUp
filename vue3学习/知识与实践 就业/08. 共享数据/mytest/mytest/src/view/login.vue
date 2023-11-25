<template>
  <form @submit.prevent="handleLogin">
    <div class="form-item">
      <label>账号：</label>
      <input type="text" v-model="loginId" />
    </div>
    <div class="form-item">
      <label>密码：</label>
      <input type="password" v-model="loginPwd" />
    </div>
    <div class="form-item">
      <label></label>
      <button :disabled="loadingStatus">
        {{ loadingStatus ? "loading..." : "登录" }}
      </button>
    </div>
  </form>
</template>
<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const loginId = ref();
    const loginPwd = ref();
    const user = computed(() => {
      return store.state.userMsg.User;
    });
    const handleLogin = async () => {
      await store.dispatch("userMsg/login", {
        id: loginId.value,
        pwd: loginPwd.value,
      });
      if (user.value) {
        router.push("/");
        return;
      }
      alert("账号密码错误");
    };
    return {
      handleLogin,
      loginId,
      loginPwd,
      loadingStatus: computed(() => {
        return store.state.userMsg.isLoading;
      }),
    };
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
  