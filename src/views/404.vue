<template>
  <div class="error-container">
    <div class="error-content">
      <h1 class="error-title">404</h1>
      <p class="error-message">页面未找到</p>
      <router-link to="/" class="home-link">返回登录</router-link>
    </div>
  </div>
</template>

<script setup>
// 这里可以添加额外的逻辑或事件
</script>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #24292e;
  font-family: 'Arial', sans-serif;
}

.error-content {
  text-align: center;
  background-color: #343d46;
  padding: 40px 60px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.error-title {
  font-size: 120px;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
}

.error-message {
  font-size: 18px;
  color: #e0e4e8;
  margin-top: 10px;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 25px;
  background-color: #57606f;
  color: #ffffff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.home-link:hover {
  background-color: #718192;
}
</style>