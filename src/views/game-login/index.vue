<template>
  <div class="auth-container">
    <div class="decoration-circle circle-1"></div>
    <div class="decoration-circle circle-2"></div>

    <div class="auth-card-glass">
      <div class="card-header">
        <h2 class="title">
          <transition name="fade" mode="out-in">
            <span :key="currentModule">
              {{
                currentModule === 'login'
                  ? 'Welcome Back'
                  : currentModule === 'register'
                  ? 'Join Us'
                  : 'Reset Password'
              }}
            </span>
          </transition>
        </h2>
        <p class="subtitle">
          <transition name="fade" mode="out-in">
            <span :key="currentModule">
              {{
                currentModule === 'login'
                  ? '请输入您的账号信息以登录'
                  : currentModule === 'register'
                  ? '创建一个新账号开启旅程'
                  : '我们将发送重置链接到您的邮箱'
              }}
            </span>
          </transition>
        </p>
      </div>

      <div class="module-content">
        <transition name="slide-fade" mode="out-in">
          <el-form
            v-if="currentModule === 'login'"
            key="login"
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            class="auth-form"
            size="large"
          >
            <el-form-item prop="email">
              <el-input
                v-model="loginForm.email"
                placeholder="邮箱地址"
                class="glass-input"
              >
                <template #prefix
                  ><el-icon><Message /></el-icon
                ></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="密码"
                show-password
                class="glass-input"
              >
                <template #prefix
                  ><el-icon><Lock /></el-icon
                ></template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="isLoading"
                type="primary"
                class="submit-btn"
                @click="handleLogin(loginFormRef)"
              >
                登 录
              </el-button>
            </el-form-item>
            <div class="module-switch">
              <span class="text-tips"
                >没有账号?
                <a @click="currentModule = 'register'">立即注册</a></span
              >
              <a class="forgot-link" @click="currentModule = 'forgot'"
                >忘记密码?</a
              >
            </div>
          </el-form>

          <el-form
            v-else-if="currentModule === 'register'"
            key="register"
            ref="registerFormRef"
            :model="registerForm"
            :rules="registerRules"
            class="auth-form"
            size="large"
          >
            <el-form-item prop="email">
              <el-input
                v-model="registerForm.email"
                placeholder="输入您的邮箱"
                class="glass-input"
              >
                <template #prefix
                  ><el-icon><Message /></el-icon
                ></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="registerForm.password"
                type="password"
                placeholder="设置密码"
                show-password
                class="glass-input"
              >
                <template #prefix
                  ><el-icon><Lock /></el-icon
                ></template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="isLoading"
                type="success"
                class="submit-btn register-btn"
                @click="handleRegister(registerFormRef)"
              >
                注 册
              </el-button>
            </el-form-item>
            <div class="module-switch center-switch">
              <span class="text-tips"
                >已有账号? <a @click="currentModule = 'login'">去登录</a></span
              >
            </div>
          </el-form>

          <el-form
            v-else-if="currentModule === 'forgot'"
            key="forgot"
            ref="forgotFormRef"
            :model="forgotForm"
            :rules="forgotRules"
            class="auth-form"
            size="large"
          >
            <el-form-item prop="email">
              <el-input
                v-model="forgotForm.email"
                placeholder="注册时的邮箱地址"
                class="glass-input"
              >
                <template #prefix
                  ><el-icon><Message /></el-icon
                ></template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="isLoading"
                type="warning"
                class="submit-btn forgot-btn"
                @click="handleForgot(forgotFormRef)"
              >
                发送重置链接
              </el-button>
            </el-form-item>
            <div class="module-switch center-switch">
              <a @click="currentModule = 'login'">返回登录</a>
            </div>
          </el-form>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { Message, Lock } from '@element-plus/icons-vue'; // 显式导入图标，防止未配置自动导入导致显示空白
import supabase from '@/utils/supabase/supabase';
import router from '@/router';

const currentModule = ref('login');
const isLoading = ref(false); // 添加加载状态，增强交互感

// --- 表单数据 ---
const loginFormRef = ref(null);
const loginForm = reactive({ email: '', password: '' });

const registerFormRef = ref(null);
const registerForm = reactive({ email: '', password: '' });

const forgotFormRef = ref(null);
const forgotForm = reactive({ email: '' });

// --- 验证规则 ---
const emailRule = {
  required: true,
  message: '请输入有效的邮箱',
  trigger: ['blur', 'change'],
  type: 'email',
};
const passwordRule = {
  required: true,
  message: '请输入密码 (6-20位)',
  trigger: 'blur',
  min: 6,
  max: 20,
};

const loginRules = reactive({
  email: [emailRule],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});
const registerRules = reactive({
  email: [emailRule],
  password: [passwordRule],
});
const forgotRules = reactive({ email: [emailRule] });

// --- 监听器 ---
watch(currentModule, () => {
  loginFormRef.value?.resetFields();
  registerFormRef.value?.resetFields();
  forgotFormRef.value?.resetFields();
});

// --- 模拟 API 请求的延时函数 ---
const mockApi = () => new Promise((resolve) => setTimeout(resolve, 1500));

// --- 登录 ---
const handleLogin = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      isLoading.value = true;
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });
      router.push('js3book');
      isLoading.value = false;
      ElMessage.success('欢迎回来！登录成功');
    }
  });
};
// 注册函数
const register = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: registerForm.email,
    password: registerForm.password,
  });
  console.log(data, error);

  if (error) {
    ElMessage.success('注册失败：', error.message);
  } else {
    isLoading.value = false;
    currentModule.value = 'login';
    ElMessage.success('注册成功！');
  }
};
const handleRegister = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      isLoading.value = true;
      await register();
    }
  });
};

const handleForgot = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      isLoading.value = true;
      await mockApi();
      isLoading.value = false;
      ElMessage.success('邮件已发送，请检查您的收件箱');
    }
  });
};
</script>

<style scoped lang="less">
/* 1. 布局与动态背景 */
.auth-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #e0e5ec;
  overflow: hidden;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', Arial, sans-serif;
}

/* 浮动的装饰圆球 */
.decoration-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(2.5rem); /* 高斯模糊实现柔和光晕 */
  z-index: 0;
  animation: float 10s infinite ease-in-out alternate;
}

.circle-1 {
  width: 18.75rem;
  height: 18.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  top: 10%;
  left: 20%;
  opacity: 0.6;
}

.circle-2 {
  width: 15.625rem;
  height: 15.625rem;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  bottom: 15%;
  right: 20%;
  opacity: 0.5;
  animation-duration: 12s; /* 不同的速度增加随机感 */
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
  }
  100% {
    transform: translateY(-2.5rem) translateX(1.875rem);
  }
}

/* 2. 毛玻璃卡片主体 */
.auth-card-glass {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 26.25rem;
  padding: 2.5rem;

  /* Glassmorphism 核心代码 */
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(1.25rem); /* 背景模糊 */
  -webkit-backdrop-filter: blur(1.25rem);
  border: 0.0625rem solid rgba(255, 255, 255, 0.6);
  border-radius: 1.5rem;
  box-shadow: 0 0.5rem 2rem 0 rgba(31, 38, 135, 0.15);
}

/* 标题区域 */
.card-header {
  text-align: center;
  margin-bottom: 1.875rem;
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 0.625rem;
  letter-spacing: 0.0313rem;
}

.subtitle {
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
}

/* 3. 输入框美化 (覆盖 Element Plus 默认样式) */
.glass-input :deep(.el-input__wrapper) {
  background-color: rgba(255, 255, 255, 0.5); /* 半透明背景 */
  box-shadow: none; /* 移除默认边框 */
  border-radius: 0.75rem;
  padding: 0.5rem 0.9375rem;
  border: 0.0625rem solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.glass-input :deep(.el-input__wrapper:hover),
.glass-input :deep(.el-input__wrapper.is-focus) {
  background-color: #fff;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05); /* 聚焦时浮起 */
  border-color: #667eea;
}

/* 4. 按钮美化 */
.submit-btn {
  width: 100%;
  height: 2.75rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.75rem;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: transform 0.2s, box-shadow 0.2s;
}

.submit-btn:hover {
  transform: translateY(-0.125rem); /* 悬停上浮 */
  box-shadow: 0 0.375rem 0.9375rem rgba(118, 75, 162, 0.4);
  opacity: 0.95;
}

.register-btn {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.register-btn:hover {
  box-shadow: 0 0.375rem 0.9375rem rgba(79, 172, 254, 0.4);
}

.forgot-btn {
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
}

/* 5. 底部链接与文字 */
.module-switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.25rem;
  font-size: 0.875rem;
}

.center-switch {
  justify-content: center;
}

.text-tips {
  color: #a0aec0;
}

a {
  color: #667eea;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

a:hover {
  color: #764ba2;
  text-decoration: underline;
}

.forgot-link {
  color: #718096;
  font-weight: 400;
}

/* 6. Vue 动画过渡 Class */
/* 模块切换动画：轻微的位移和淡入淡出 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(1.25rem);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-1.25rem);
}

/* 简单淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
