<template>
  <div class="profile-menu" ref="menuWrapper">
    <div class="avatar" @click="toggleMenu">
      <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="头像" />
    </div>
    <transition name="fade">
      <ul v-if="menuVisible" class="menu">
        <li @click="changePassword">修改密码</li>
        <li @click="logout">退出登录</li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import util from '@/utils/util.js';
import router from '@/router';
import Eln from '@/utils/Eln';
const menuVisible = ref(false);
const menuWrapper = ref(null);

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

// 点击空白处关闭菜单
const handleClickOutside = (event) => {
  if (menuWrapper.value && !menuWrapper.value.contains(event.target)) {
    menuVisible.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const logout = () => {
  Eln.success("退出成功");
  setTimeout(() => {
    util.removeCookie("access_tokenbook");
    util.removeCookie("userid");
    router.push('/');
  }, 1000);
};

const changePassword = () => {
  alert("跳转到修改密码页面！");
  // 添加修改密码逻辑
};
</script>

<style scoped>
.profile-menu {
  position: relative;
  display: inline-block;
}

.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.avatar img:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.menu {
  position: absolute;
  top: 50px; /* 根据头像大小调整 */
  right: 0;
  background: #24292e; /* 主背景色 */
  border-radius: 8px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  list-style: none;
  padding: 8px 0;
  width: 130px;
  text-align: center;
  animation: slide-down 0.3s ease forwards;
  opacity: 0;
  transform: translateY(-10px);
}

.menu li {
  padding: 8px 12px;
  color: #fff; /* 字体颜色 */
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s;
}

.menu li:hover {
  background: rgba(255, 255, 255, 0.1); /* 悬浮时的背景色 */
  transform: scale(1.05);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes slide-down {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>