<template>
  <div class="login-wrapper">
    <div class="login-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.login-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}

.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 100%, #764ba2 0%);

}

</style>