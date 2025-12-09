<template>
  <div class="navbar-glass">
    <div class="nav-left">
      <div class="input-group">
        <span class="label-text">物品名</span>
        <Search
          class="custom-search"
          @handleSelect="handleSelect"
          :fetch-cities="fetchCities"
        ></Search>
      </div>
      <div class="input-group">
        <PriceInput @addForSale="handleAddForSale" />
      </div>
    </div>

    <div class="nav-right">
      <div
        class="profit-card"
        :class="{ 'is-positive': totalProfit > 0 }"
        @click="profitShow = !profitShow"
      >
        <div class="profit-label">
          {{ profitShow ? '税前总利润' : '税后总利润' }}
        </div>
        <div class="profit-value">
          <el-icon v-if="totalProfit > 0"><Top /></el-icon>
          <el-icon v-else><Bottom /></el-icon>
          {{
            profitShow
              ? util.numPad(totalProfit)
              : util.numPad(totalProfit * 0.95)
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import util from '@/utils/util.js';
import Search from './components/Search.vue';
import PriceInput from './components/PriceInput.vue';
import { ElMessage } from 'element-plus';
import { Top, Bottom } from '@element-plus/icons-vue';
import { ref } from 'vue';

const variable = ref(null); // 示例变量
</script>

<style scoped lang="scss">
/* --- 1. 导航栏样式 --- */
.navbar-glass {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  .nav-left {
    display: flex;
    align-items: center;
    gap: 25px;
  }

  .input-group {
    display: flex;
    align-items: center;
    gap: 10px;

    .label-text {
      font-weight: 600;
      color: #555;
      font-size: 14px;
    }
  }
}
/* 利润卡片 */
.profit-card {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &.is-positive {
    .profit-value {
      color: #f75e02;
    }
    &:hover {
      border-color: rgba(247, 94, 2, 0.2);
    }
  }

  .profit-label {
    font-size: 12px;
    color: #888;
    margin-bottom: 2px;
  }

  .profit-value {
    font-size: 20px;
    font-weight: 800;
    font-family: 'DIN Alternate', 'Helvetica Neue', sans-serif;
    color: #67c23a; /* Default to green/neutral if negative logic applies */
    display: flex;
    align-items: center;
    gap: 4px;
  }
}
</style>
