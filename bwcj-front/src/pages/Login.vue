<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-form">
        <h2>用户登录</h2>
        <div class="form-group">
          <input v-model="loginForm.username" placeholder="请输入用户名" class="form-input" @keyup.enter="handleLogin" />
        </div>
        <div class="form-group">
          <input v-model="loginForm.password" placeholder="请输入密码" type="password" class="form-input"
            @keyup.enter="handleLogin" />
        </div>
        <button @click="handleLogin" class="login-button">登录</button>
  
        <!-- 第三方登录 -->
        <div class="social-login">
          <div class="social-title">第三方登录</div>
          <div class="social-icons">
            <button class="social-icon github" @click="handleGithubLogin">
              <span class="icon-text">G</span>
            </button>
            <button class="social-icon wechat" @click="handleTwdLogin">
              <span class="icon-text">T</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { TOKEN_KEY } from '@/const/jwt'
import request from '@/utils/request'

const router = useRouter();
const route = useRoute();

const loginForm = reactive({
  username: 'admin',
  password: '123456'
})

// 处理登录逻辑
const handleLogin = () => {
  request.post("/login", loginForm).then(res => {
    console.log(res);
    
    if (res.data) {
      localStorage.setItem(TOKEN_KEY, res.data)
      router.push('/home')
    }
  }).catch(error => {
    console.error('登录失败:', error);
  })
}

// GitHub登录
const handleGithubLogin = () => {
  const clientId = 'Ov23liaZ5kfjIoXDBJmm'
  const rawRedirectUrl = window.location.origin + '/login';
  const redirectUri = encodeURIComponent(rawRedirectUrl);
  const scope = 'user:email'
  // 防止CSRF攻击的随机字符串
  const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  // 保存state到localStorage，用于后续验证
  localStorage.setItem('github_oauth_state', state)
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`
}

const handleTwdLogin = () => {
  // twd认证中心
  const clientId = 'client_GLECF2zZcKfr2ict'
  const rawRedirectUrl = window.location.origin + '/login';
  const redirectUri = encodeURIComponent(rawRedirectUrl); 
  const scope = 'read:write'
  // 防止CSRF攻击的随机字符串
  const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  // 保存state到localStorage，用于后续验证
  localStorage.setItem('twd_oauth_state', state)
  window.location.href = `http://10.119.1.225:8082/auth/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`
}

// 处理GitHub OAuth回调
onMounted(() => {
  // 检查是否有GitHub OAuth的回调参数
  const code = route.query.code
  const state = route.query.state
  const gitHubStoredState = localStorage.getItem('github_oauth_state')
  const twdHubStoredState = localStorage.getItem('twd_oauth_state')

  // 如果有code参数，说明是GitHub OAuth回调
  if (code && state && state === gitHubStoredState) {
    // 清除存储的state
    localStorage.removeItem('github_oauth_state')

    // 发送code到后端服务器换取access_token
    request.get('/oauth2/github/callback', { params: { code } }).then(res => {
      if (res.data && res.data.jwtToken) {
        // 保存token并跳转到首页
        localStorage.setItem('token', res.data.jwtToken)
        router.push('/home')
      }
    }).catch(error => {
      console.error('GitHub登录失败:', error)
    })
  } else if (code && state && state === twdHubStoredState) {
    localStorage.removeItem('twd_oauth_state')

    // 发送code到后端服务器换取access_token
    request.get('/oauth2/twd/callback', { params: { code } }).then(res => {
      if (res.data && res.data.jwtToken) {
        // 保存token并跳转到首页
        localStorage.setItem('token', res.data.jwtToken)
        router.push('/home')
      }
    }).catch(error => {
      console.error('twd登录失败:', error)
    })
  } else if (code || state) {
    // state不匹配或者只有其中一个参数，可能是攻击
    console.error('twd OAuth state不匹配或参数不完整')
  }
})
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

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  text-align: center;
  box-sizing: border-box;
}

.login-form h2 {
  margin-bottom: 30px;
  color: #333;
  font-size: 28px;
}

.form-group {
  margin-bottom: 20px;
}

.form-input {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.login-button {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-bottom: 20px;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.login-button:active {
  transform: translateY(0);
}

.social-login {
  margin-top: 30px;
}

.social-title {
  font-size: 14px;
  color: #999;
  margin-bottom: 15px;
  position: relative;
}

.social-title::before,
.social-title::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background: #eee;
}

.social-title::before {
  left: 0;
}

.social-title::after {
  right: 0;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  font-weight: bold;
  color: white;
}

.social-icon:hover {
  transform: scale(1.1);
}

.github {
  background: #333;
}

.wechat {
  background: #07c160;
}

.icon-text {
  font-size: 16px;
}
</style>