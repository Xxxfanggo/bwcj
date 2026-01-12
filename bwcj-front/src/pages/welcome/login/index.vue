

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { TOKEN_KEY } from '@/const/jwt'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
const env = import.meta.env;

const router = useRouter();
const route = useRoute();

const loginFormRef = ref<FormInstance>()
const isLoginLoading = ref(false)

const loginForm = reactive({
  username: 'admin',
  password: '123456'
})

const loginRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在3到20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在6到20个字符', trigger: 'blur' }
  ]
}

// 处理登录逻辑
const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  const valid = await loginFormRef.value.validate().catch(() => false)
  if (!valid) return

  isLoginLoading.value = true
  try {
    const res = await request.post("/login", loginForm)
    console.log(res);
    
    if (res.data) {
      localStorage.setItem(TOKEN_KEY, res.data)
      ElMessage.success('登录成功')
      router.push('/home')
    }
  } catch (error) {
    console.error('登录失败:', error);
    ElMessage.error('登录失败: ' + (error as Error).message)
  } finally {
    isLoginLoading.value = false
  }
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

const handleRegister = () => {
  router.push('/register')
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
    request.get('/oauth2/github/callback', { params: { code, state } }).then(res => {
      if (res.data && res.data.jwtToken) {
        // 保存token并跳转到首页
        localStorage.setItem('token', res.data.jwtToken)
        ElMessage.success('GitHub登录成功')
        router.push('/home')
      }
    }).catch(error => {
      console.error('GitHub登录失败:', error)
      ElMessage.error('GitHub登录失败')
    })
  } else if (code && state && state === twdHubStoredState) {
    localStorage.removeItem('twd_oauth_state')

    // 发送code到后端服务器换取access_token
    request.get('/oauth2/twd/callback', { params: { code } }).then(res => {
      if (res.data && res.data.jwtToken) {
        // 保存token并跳转到首页
        localStorage.setItem('token', res.data.jwtToken)
        ElMessage.success('TWD登录成功')
        router.push('/home')
      }
    }).catch(error => {
      console.error('twd登录失败:', error)
      ElMessage.error('TWD登录失败')
    })
  } else if (code || state) {
    // state不匹配或者只有其中一个参数，可能是攻击
    console.error('twd OAuth state不匹配或参数不完整')
    ElMessage.error('OAuth state不匹配或参数不完整')
  }
})
</script>

<template>
  <div class="login-container">
    <el-card class="login-form" :shadow="'always'">
      <h2 class="login-title">用户登录</h2>
      
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input 
            v-model="loginForm.username" 
            placeholder="请输入用户名" 
            size="large" 
            @keyup.enter="handleLogin"
            prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input 
            v-model="loginForm.password" 
            placeholder="请输入密码" 
            type="password" 
            size="large"
            @keyup.enter="handleLogin"
            prefix-icon="Lock"
          />
        </el-form-item>
      </el-form>
      
      <el-button 
        type="primary" 
        size="large" 
        @click="handleLogin" 
        class="login-button"
        :loading="isLoginLoading"
      >
        登录
      </el-button>

      <el-button 
        type="default" 
        size="large" 
        @click="handleRegister" 
        class="login-button secondary-button"
      >
        注册
      </el-button>
    
      <div class="social-login">
        <div class="social-title">第三方登录</div>
        <div class="social-icons">
          <svg-icon class="social-icon" @click="handleGithubLogin" name="github" width="20px" height="20px" color="#4E86F1"/>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
/* .login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
} */

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 10px;
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

.login-button {
  width: 100%;
  margin-bottom: 15px;
  height: 45px;
  font-size: 16px;
  font-weight: 500;
}

.secondary-button {
  margin-left: 0;
}

.social-login {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.social-title {
  text-align: center;
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
  position: relative;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-icon {
  cursor: pointer;
}
</style>