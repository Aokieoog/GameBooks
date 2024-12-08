<template>
  <div class="login">
    <h1>{{ data.teileReg }}</h1>
    <div class="login-form">
      <!-- 注册 -->
      <el-form v-show="data.teileRigShow" :model="form" label-width="auto" style="min-width: 300px;padding-top: 2rem;" label-position="left">
        <el-form-item label="账号">
          <el-input v-model="form.loginAccount" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="">
          <div style="display: flex;justify-content: space-between;width: 100%;">
            <a>登录</a>
            <a>忘记密码</a>
          </div>
        </el-form-item>
      </el-form>
      <!-- 登录 -->
      <el-form v-show="data.teileLogShow" :model="form" label-width="auto" style="min-width: 300px ;padding-top: 2rem;" label-position="left">
        <el-form-item label="账号">
          <el-input v-model="form.loginAccount" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="">
          <div style="display: flex;justify-content: space-between;width: 100%;">
            <a>注册</a>
            <a>忘记密码</a>
          </div>
        </el-form-item>
      </el-form>
      <!-- 找回密码 -->
      <el-form v-show="data.teileForgetShow" :model="form" label-width="auto" style="min-width: 300px ;padding-top: 2rem;" label-position="left">
        <el-form-item label="邮箱">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="">
          <div style="display: flex;justify-content: space-between;width: 100%;">
            <a>注册</a>
            <a>登录</a>
          </div>
        </el-form-item>
      </el-form>

      <div class="text-center">
        <el-button v-show="data.teileRigShow" type="primary" @click="onSubmit">注册</el-button>
        <el-button v-show="data.teileLogShow" type="primary" @click="onSubmit">登录</el-button>
        <el-button v-show="data.teileForgetShow" type="primary" @click="onSubmit">登录</el-button>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, reactive } from 'vue';

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



</script>

<style scoped lang='less'>
.login {
  background-image: url('@/assets//png/124644672_p0.png');
  background-repeat: repeat;
  /* 平铺 */
  background-size: cover;
  /* 覆盖容器 */
}

.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3%;
  width: 25rem;
  // height: 20.75rem;
  // padding: 3rem 3rem 0 3rem;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
}

.text-center button{
  width: 10rem;
  margin-bottom: 2rem;
}
</style>