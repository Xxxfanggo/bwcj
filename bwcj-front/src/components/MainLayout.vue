<template>
  <div class="app">
    <!-- <Header/> -->
    <!-- 导航区 -->
    <div class="navigate">
      <!-- <router-link to="/home" active-class="active">首页</router-link> 
      <router-link :to="{name: 'xinwen'}" active-class="active">新闻</router-link>
      <router-link :to="{path: '/about'}" active-class="active">关于</router-link> 
      <router-link :to="{path: '/piniaView'}" active-class="active">Pinia</router-link> -->
      <router-link :to="{name: 'analyzeFile'}" active-class="active">文件分析</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.navigate {
  display: flex;
  justify-content: center;
  gap: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.navigate a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.navigate a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.navigate .active {
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.content {
  border: none;
  height: 80vh;
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
</style>