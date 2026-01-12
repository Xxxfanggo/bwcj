<template>
  <div class="home-container">
    <div class="welcome-card">
      <h1 class="welcome-title">欢迎来到首页</h1>
      <p class="welcome-text">这是一个基于Vue3和TypeScript构建的应用程序</p>
      <img src="/resource/img/home.jpg" alt="首页图片" class="home-image" @click="toNews">
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { onMounted } from 'vue';
  import { TOKEN_KEY } from '@/const/jwt';
  import request from '@/utils/request';
  const router = useRouter();
  function toNews() {
    // 跳转到新闻页面
    router.push('/news')
  }
  onMounted(() => {
    let token = localStorage.getItem(TOKEN_KEY)
    token = (token?.substring(7) || null) as string | null
    // request.get('/getTokenInfo', { params: { token } }).then(res => {
    //   console.log(res.data);
    // });

    request.get('/testFilter', {headers: {
      Authorization: token
    }}).then(res => {
      console.log(res.data);
    })
    request.get('/testHasAnyAuthority').then(res => {
      console.log(res.data);
    })
  });
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
}

.welcome-card {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  text-align: center;
  max-width: 600px;
  width: 100%;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.welcome-title {
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.welcome-text {
  color: #555;
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.home-image {
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.home-image:hover {
  transform: scale(1.03);
  cursor: pointer;
}

@media (max-width: 768px) {
  .welcome-card {
    padding: 20px;
  }
  
  .welcome-title {
    font-size: 2rem;
  }
  
  .welcome-text {
    font-size: 1rem;
  }
}
</style>