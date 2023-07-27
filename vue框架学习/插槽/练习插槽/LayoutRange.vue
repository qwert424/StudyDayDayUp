<template>
  <div class="Layout-container">
    <header style="background: yellow; height: 100px">
      <slot name="header"></slot>
    </header>
    <main style="background: red; height: 100px">
      <slot></slot>
    </main>
    <footer style="background: blue; height: 100px">
    <slot name="footer"></slot></footer>
  </div>
</template>
  
  <script>
export default {};
</script>
  
  <style>
</style>