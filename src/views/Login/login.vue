<template>
  <div class="bgbox">
    <horizontalAnnouncement></horizontalAnnouncement>
    <div class="login">
      <div class="login-form">
        <!-- 注册 -->
        <el-form :rules="rules" ref="rigForm" v-show="data.teileRigShow" :model="form" label-width="auto"
          style="min-width: 300px;padding-top: 2rem;" label-position="left">
          <el-form-item prop="loginAccount" label="账号">
            <el-input name="loginAccount" placeholder="请输入账号" v-model="form.loginAccount" />
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input name="password" placeholder="请输入密码" v-model="form.password" type="password" />
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input name="email" placeholder="请输入邮箱" v-model="form.email" />
          </el-form-item>
          <el-form-item label="">
            <div style="display: flex;justify-content: space-between;width: 100%;">
              <a @click="switchToLogin">登录</a>
              <a @click="switchToForget">忘记密码</a>
            </div>
          </el-form-item>
        </el-form>
        <!-- 登录 -->
        <el-form :rules="rules" ref="lgionForm" v-show="data.teileLogShow" :model="form" label-width="auto"
          style="min-width: 300px;padding-top: 2rem;" label-position="left">
          <el-form-item prop="loginAccount" label="账号">
            <el-input name="loginAccount" placeholder="请输入账号" v-model="form.loginAccount" />
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input name="password" placeholder="请输入密码" v-model="form.password" type="password" />
          </el-form-item>
          <el-form-item label="">
            <div style="display: flex;justify-content: space-between;width: 100%;">
              <a @click="switchToRegister">注册</a>
              <a @click="switchToForget">忘记密码</a>
            </div>
          </el-form-item>
        </el-form>
        <!-- 找回密码 -->
        <el-form :rules="rules" ref="zhForm" v-show="data.teileForgetShow" :model="form" label-width="auto"
          style="min-width: 300px;padding-top: 2rem;" label-position="left">
          <el-form-item prop="email" label="邮箱">
            <el-input name="email" placeholder="请输入邮箱" v-model="form.email" />
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
      <a @click="goNotice" style="margin-top: 2%;">悄悄话～</a>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { post } from '@/utils/http/httpbook'
import Eln from '@/utils/Eln';
import { useRouter } from 'vue-router';
import { Cookiebook } from '@/utils/cookie.js';
import horizontalAnnouncement from "@/components/horizontalAnnouncement/horizontalAnnouncement.vue";
import util from '@/utils/util';

const router = useRouter()

const data = reactive({
  teileReg: 'Registration',
  teileLog: 'Login',
  teileRigShow: false,
  teileLogShow: true,
  teileForgetShow: false
})

const rigForm = ref(null)
const lgionForm = ref(null)
const zhForm = ref(null)
const form = reactive({
  loginAccount: '',
  password: '',
  email: ''
})

onMounted(() => {
  setTimeout(() => {
    onSubmit('login')
  }, 3000);
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
const currentTitle = ref('注册')

// 切换到注册
const switchToRegister = () => {
  data.teileRigShow = true
  data.teileLogShow = false
  data.teileForgetShow = false
  currentTitle.value = '注册'
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

const goNotice = () => {
  // 跳转到公告页
  router.push('/jx3home')
}

// 提交表单
const onSubmit = async (type) => {
  if (type === 'register') {
    rigForm.value.validate(async (valid) => {
      if (valid) {
        const res = await post('/api/users', {
          loginAccount: form.loginAccount,
          password: form.password,
          email: form.email
        });
        if (res.data.code === 200) {
          Eln.success(res.data.message);
          switchToLogin()
        } else {
          Eln.error(res.data.message);
        }
      } else {
        Eln.warning(res.data.message);
      }
    })
  } else if (type === 'login') {
    let token = util.getCookie('access_tokenbook')
    lgionForm.value.validate(async (valid) => {
      if (token) {
        const res = await post('/api/login', {
          token: util.getCookie('access_tokenbook')
        });
        if (res.data.token === token) {
          Eln.success('登录成功');
          router.push('/js3book');
        } 
      } else {
        if (valid) {
          const res = await post('/api/login', {
            loginAccount: form.loginAccount,
            password: form.password,
          });
          if (res.data.code === 200) {
            Eln.success('登录成功');
            Cookiebook('access_tokenbook', res.data.token);
            Cookiebook('userid', res.data.user.uid);
            router.push('/js3book');
          } else {
            Eln.error('账号或密码错误');
          }
        } else {
          return
        }
      }
    })
  } else if (type === 'forget') {
    zhForm.value.validate(async (valid) => {
      if (valid) {
        const res = await post('/api/forget-password', {
          email: form.email
        });
        if (res.data.code === 200) {
          Eln.success('请查收您的邮箱，并点击重置密码的链接');
        } else {
          Eln.error(res.data.message);
        }
      } else {
        Eln.warning('请检查表单输入是否正确');
      }
    })
  }
}


</script>

<style scoped lang='less'>
.bgbox {
  background-image: url('@/assets/bgimage/图14.jpg');
  background-repeat: repeat;
  background-size: cover;
  height: 100vh;
}

.login {
  position: absolute;
  top: 25%;
  left: 10%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
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