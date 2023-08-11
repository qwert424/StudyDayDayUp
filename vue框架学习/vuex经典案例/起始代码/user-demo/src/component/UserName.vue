<template>
  <div class="user-name">
    <span v-if="status === 'loading'">loading...</span>
    <template v-else-if="status === 'login'">
      <router-link :to="{ name: 'User' }">{{ userData.name }}</router-link>
      <router-link :to="{ name: 'Loading' }" @click.native="handleClick">
        退出
      </router-link>
    </template>
    <router-link :to="{ name: 'Login' }" exact-path v-else>Login</router-link>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("LoginStore", ["status"]),
    ...mapState("LoginStore", ["userData"]),
  },
  methods: {
    async handleClick() {
      await this.AsyncsetLoginOut();
      this.$router.push({ name: "Login" });
    },
    ...mapActions("LoginStore", ["AsyncsetLoginOut"]),
  },
};
</script>

<style scoped>
.user-name {
  display: inline-block;
}
.user-name a,
.user-name span {
  margin-right: 15px;
}
</style>
