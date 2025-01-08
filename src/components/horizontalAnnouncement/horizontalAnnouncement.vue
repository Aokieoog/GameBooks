<!--滚动公告-->
<template>
  <div v-if="isVisible" class="scrolling-announcement">
    <div class="announcement-content">
      <span v-for="(item, index) in announcements" :key="'first-' + index" class="announcement-item">
        {{ item }}
      </span>
    </div>
    <!-- 关闭按钮 -->
    <!-- <button class="close-btn" @click="closeAnnouncement">×</button> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
// 响应式数据
const isVisible = ref(true); // 控制公告是否显示
const announcements = ref([
  "1.数据云端储存，移除本地储存逻辑。",
  "2.优化登录页面，公告页面 UI 更改。",
  "3.重做交易行新增订单逻辑。"
]);

// 关闭公告
const closeAnnouncement = () => {
  isVisible.value = false; // 设置为 false 以销毁 DOM
};
</script>

<style scoped>
.scrolling-announcement {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 18px; /* 横幅高度 */
  background-color: none;
  padding: 3px 0; /* 内边距 */
  z-index: 999;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.announcement-content {
  display: flex;
  white-space: nowrap;
  width: 100%; /* 容器宽度 */
  animation: scroll-announcement 20s linear infinite;
}

.announcement-item {
  margin-right: 30px; /* 公告之间的间距 */
  font-size: 12px; /* 字体大小 */
  color: #535455; /* 字体颜色 */
  text-align: center;
}

@keyframes scroll-announcement {
  0% {
    transform: translateX(100%); /* 从右边缘进入 */
  }
  100% {
    transform: translateX(-100%); /* 完全滚动出左边缘 */
  }
}

/* 关闭按钮样式 */
.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #333;
  cursor: pointer;
  padding: 5px 10px;
  margin-right: 10px;
}

.close-btn:hover {
  color: red;
}
</style>