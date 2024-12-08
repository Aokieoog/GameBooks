<template>
  <div class="login">
    <h1>{{ currentTitle }}</h1>
    <div class="login-form">
      <!-- 注册 -->
      <el-form :rules="rules" v-show="data.teileRigShow" :model="form" label-width="auto" style="min-width: 300px;padding-top: 2rem;" label-position="left">
        <el-form-item prop="loginAccount" label="账号">
          <el-input v-model="form.loginAccount" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="">
          <div style="display: flex;justify-content: space-between;width: 100%;">
            <a @click="switchToLogin">登录</a>
            <a @click="switchToForget">忘记密码</a>
          </div>
        </el-form-item>
      </el-form>
      <!-- 登录 -->
      <el-form :rules="rules" v-show="data.teileLogShow" :model="form" label-width="auto" style="min-width: 300px;padding-top: 2rem;" label-position="left">
        <el-form-item prop="loginAccount" label="账号">
          <el-input v-model="form.loginAccount" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item label="">
          <div style="display: flex;justify-content: space-between;width: 100%;">
            <a @click="switchToRegister">注册</a>
            <a @click="switchToForget">忘记密码</a>
          </div>
        </el-form-item>
      </el-form>
      <!-- 找回密码 -->
      <el-form :rules="rules" v-show="data.teileForgetShow" :model="form" label-width="auto" style="min-width: 300px;padding-top: 2rem;" label-position="left">
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="">
          <div style="display: flex;justify-content: space-between;width: 100%;">
            <a @click="switchToRegister">注册</a>
            <a @click="switchToLogin">登录</a>
          </div>
        </el-form-item>
      </el-form>
      <div class="text-center">
        <el-button v-show="data.teileRigShow" type="primary" @click="onSubmit('register')">注册</el-button>
        <el-button v-show="data.teileLogShow" type="primary" @click="onSubmit('login')">登录</el-button>
        <el-button v-show="data.teileForgetShow" type="primary" @click="onSubmit('forget')">找回密码</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import {post} from '@/utils/http/httpbook'
import message from '@/utils/message';

const data = reactive({
  teileReg: 'Registration',
  teileLog: 'Login',
  teileRigShow: true,
  teileLogShow: false,
  teileForgetShow: false
})

const form = reactive({
  loginAccount: '',
  password: '',
  email: ''
})



// 定义校验规则
const rules = {
  loginAccount: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{6,10}$/, message: '账号需为6-10位字母或数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6位', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}

// 当前标题
const currentTitle = ref('Regist')

// 切换到注册
const switchToRegister = () => {
  data.teileRigShow = true
  data.teileLogShow = false
  data.teileForgetShow = false
  currentTitle.value = 'Regist'
}

// 切换到登录
const switchToLogin = () => {
  data.teileRigShow = false
  data.teileLogShow = true
  data.teileForgetShow = false
  currentTitle.value = 'Login'
}

// 切换到找回密码
const switchToForget = () => {
  data.teileRigShow = false
  data.teileLogShow = false
  data.teileForgetShow = true
  currentTitle.value = 'Find password'
}

// 提交表单
const onSubmit = async (type) => {
  console.log(`当前操作：${type}`)
  console.log('表单数据:', form)

  if (type === 'register') {
    try {
      const response = await post('/api/users', {
        loginAccount: form.loginAccount,
        password: form.password,
        email: form.email
      });
      console.log(response);
      message.success('注册成功');
    } catch (error) {
      message.error('注册失败');
    }
  } else if (type === 'login') {
    // 处理登录逻辑
  } else if (type === 'forget') {
    // 处理找回密码逻辑
  }
}


</script>

<style scoped lang='less'>
.login {
  background-image: url('@/assets//png/124644672_p0.png');
  background-repeat: repeat;
  background-size: cover;
}

.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3%;
  width: 25rem;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
}

.text-center button {
  width: 10rem;
  margin-bottom: 2rem;
}
</style>