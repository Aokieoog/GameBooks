<template>
  <div class="announcement-page" @click="Login">
    <div class="announcement-header">
      <h2 class="announcement-title">公告</h2>
      <p class="announcement-intro">
        <span class="highlight-red">PS：</span>如果在双梦遇到一个叫‘
        <span class="highlight-red">咩气气</span>’的纯阳，请给她一串糖葫芦。😊
      </p>
    </div>

    <div class="announcement-timeline">
      <div v-for="(item, index) in announcements" :key="index" class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <p class="timeline-date">{{ item.date }}</p>
          <p v-html="item.content"></p>
        </div>
      </div>
    </div>

    <!-- 糖葫芦图片 -->
    <div class="img-container">
      <!-- <img src="@/assets/png/miemie.png" alt="糖葫芦" /> -->
      <p>糖葫芦🍬😄</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const announcements = ref([
  { date: '2025年1月8日', content: '优化UI中', isDeleted: false },
  { date: '2024年12月26日', content: '升级中', isDeleted: false },
  { date: '2024年12月21日', content: '数据云端储存，移除本地储存逻辑。<br>优化登录页面，公告页面 UI 更改。<br>重做交易行新增订单逻辑。', isDeleted: false },
  { date: '2024年11月13日', content: '修复了外观添加失败问题', isDeleted: false },
  { date: '2024年10月15日', content: '增加了外观统计页面，使用了废牛记账本的API，因此与废牛记账本数据互通。', isDeleted: false },
  { date: '2024年7月23日', content: '修改收益计算规则，修改后收益扣除交易行5%的手续费。', isDeleted: false },
  { date: '2024年5月10日', content: '新增支持导出数据功能，方便用户备份。', isDeleted: true },  // 例子：已删除的公告
  { date: '2024年4月5日', content: '修复了登录页面闪退的Bug，改善了用户体验。', isDeleted: false },
  // 更多公告项
]);
const Login = () => {
  router.push({ name: 'Login' });
}
</script>

<style scoped lang="less">
/* 页面整体背景色 */
.announcement-page {
  background-color: #f9fafb;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  overflow-y: auto; /* 确保内容较多时能滚动 */
}

/* 公告标题部分 */
.announcement-header {
  text-align: center;
  margin-bottom: 30px;
}

.announcement-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15px;
}

.announcement-intro {
  font-size: 1.1rem;
  color: #7f8c8d;
  margin-top: 3rem;
}

/* 高亮色 */
.highlight-red {
  color: red;
}

.highlight-blue {
  color: #3498db;
}

/* 时间线样式 */
.announcement-timeline {
  width: 100%;
  max-width: 600px;
  margin-top: 30px;
  position: relative;
  padding-bottom: 50px; /* 留出空间避免底部被覆盖 */
}

.timeline-item {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-left: 30px;
  position: relative;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  background-color: #3498db;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 5px;
  z-index: 1;
}

.timeline-content {
  padding-left: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 80%;
}

.timeline-date {
  font-size: 1rem;
  font-weight: bold;
  color: #34495e;
  margin-bottom: 5px;
}

/* 删除线样式 */
.strikethrough {
  text-decoration: line-through;
  color: #7f8c8d;
}

/* 糖葫芦图片样式 */
.img-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  text-align: center;
  z-index: 10;
}

.img-container img {
  width: 4.5rem; /* 缩小图片尺寸 */
  height: 4.5rem; /* 缩小图片尺寸 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.img-container p {
  font-size: 1rem;
  margin-top: 5px;
  color: #2c3e50;
}

/* 响应式设计：适配手机端 */
@media (max-width: 768px) {
  .announcement-page {
    padding: 15px;
  }

  .announcement-title {
    font-size: 2rem;
  }

  .announcement-intro {
    font-size: 1rem;
  }

  .announcement-timeline {
    width: 100%;
    padding: 0;
  }

  .timeline-item {
    padding-left: 10px;
  }

  .timeline-content {
    padding-left: 15px;
  }

  .img-container {
    bottom: 10px;
    right: 10px;
  }
}
</style>