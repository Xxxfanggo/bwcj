<template>
  <div class="register-container">
    <el-card class="register-form" :shadow="'always'">
      <h2 class="register-title">用户注册</h2>
      
      <el-form :model="loginForm" :rules="registerRules" ref="registerFormRef">
        <el-form-item prop="username">
          <el-input 
            v-model="loginForm.username" 
            type="text" 
            placeholder="请输入用户名" 
            size="large"
            prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input 
            v-model="loginForm.password" 
            placeholder="请输入密码" 
            type="password" 
            size="large"
            prefix-icon="Lock"
          />
        </el-form-item>
        
        <el-form-item prop="passwordRepeat">
          <el-input 
            v-model="loginForm.passwordRepeat" 
            placeholder="请再次确认密码" 
            type="password" 
            size="large"
            prefix-icon="Lock"
          />
        </el-form-item>
        
        <el-form-item prop="email">
          <el-input 
            v-model="loginForm.email" 
            placeholder="请输入邮箱" 
            type="email" 
            size="large"
            prefix-icon="Message"
          />
        </el-form-item>
        
        <el-form-item prop="code">
          <div class="input-with-button">
            <el-input 
              v-model="loginForm.code" 
              placeholder="请输入验证码" 
              size="large"
              prefix-icon="Key"
            />
            <el-button 
              type="primary" 
              size="large" 
              @click="getVerificationCode"
              :disabled="countdown > 0"
              class="code-button"
            >
              {{ countdown > 0 ? `${countdown}秒后重发` : '获取验证码' }}
            </el-button>
          </div>
        </el-form-item>
        
        <el-button 
          type="primary" 
          size="large" 
          @click="handleRegister" 
          class="register-button"
          :loading="isRegisterLoading"
        >
          立即注册
        </el-button>
      </el-form>
      
      <div class="form-footer">
        <p>已有账户？<a href="/login" class="link">立即登录</a></p>
      </div>
    </el-card>
    
    <div class="form-decoration"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { TOKEN_KEY } from '@/const/jwt'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { onUnmounted } from 'vue'
import { sendEmail } from '@/api/email'

const router = useRouter();
const route = useRoute();

const registerFormRef = ref<FormInstance>()
const countdown = ref(0);
const isRegisterLoading = ref(false);
let countdownTimer: any = null;

const loginForm = reactive({
  username: 'fang',
  password: 'print123',
  passwordRepeat: 'print123',
  email: 'zhongfangyu@wondersgroup.com',
  code: ''
})

const registerRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在3到20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在6到20个字符', trigger: 'blur' }
  ],
  passwordRepeat: [
    { required: true, message: '请再次确认密码', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value !== loginForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      }, 
      trigger: 'blur' 
    }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码为6位数字', trigger: 'blur' }
  ]
}

const getVerificationCode = () => {
  if (countdown.value > 0) return;
  
  if (!loginForm.email) {
    ElMessage.error('请先输入邮箱');
    return;
  }
  
  // 这里可以调用获取验证码的API
  sendEmail(loginForm.email, 'register').then(res => {
    console.log('获取验证码:', res);
  }).catch(error => {
    console.error(error);
  })
  
  // // 模拟发送验证码
  // ElMessage.success('验证码已发送');
  
  // // 模拟倒计时
  countdown.value = 60;
  countdownTimer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(countdownTimer);
    }
  }, 1000);
}

const handleRegister = async () => { 
  if (!registerFormRef.value) return
  
  const valid = await registerFormRef.value.validate().catch(() => false)
  if (!valid) return

  isRegisterLoading.value = true
  try {
    const res = await request.post("/register", loginForm)
    console.log(res);
    
    if (res.data.code === 200) {
      // localStorage.setItem(TOKEN_KEY, res.data)
      ElMessage.success('注册成功')
      router.push('/login')
    }
  } catch (error) {
    console.error('注册失败:', error);
    ElMessage.error('注册失败: ' + (error as Error).message)
  } finally {
    isRegisterLoading.value = false
  }
}

// 清理定时器
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
})
</script>

<style scoped>

.register-form {
  width: 100%;
  max-width: 450px;
  padding: 30px;
  border-radius: 16px;
  text-align: center;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
}

.register-title {
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.form-group {
  margin-bottom: 24px;
  text-align: left;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
  font-size: 14px;
}

.input-with-button {
  display: flex;
  gap: 10px;
}

.code-button {
  flex-shrink: 0;
  min-width: 140px;
}

.register-button {
  width: 100%;
  height: 45px;
  margin-top: 10px;
  letter-spacing: 1px;
  font-size: 16px;
  font-weight: 600;
}

.form-footer {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #eee;
  color: #666;
  font-size: 14px;
}

.form-footer .link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.form-footer .link:hover {
  color: #764ba2;
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .register-container {
    padding: 10px;
  }
  
  .register-form {
    padding: 30px 20px;
    margin: 0 10px;
  }
  
  .input-with-button {
    flex-direction: column;
  }
  
  .code-button {
    min-width: auto;
  }
}

:deep(.el-input__wrapper) {
  padding: 1px 15px;
}
</style>