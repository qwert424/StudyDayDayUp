<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/other">About</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

