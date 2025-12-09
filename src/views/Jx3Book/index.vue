<template>
  <div class="main-container">
    <div class="decoration-circle circle-1"></div>
    <div class="decoration-circle circle-2"></div>

    <div class="glass-content">
      <Jx3Title></Jx3Title>

      <div class="table-container">
        <el-table
          ref="table"
          :data="sortedmockTableData"
          :height="tableHeight"
          style="width: 100%"
          class="glass-table"
          header-row-class-name="glass-header"
          row-class-name="glass-row"
          @row-click="sellTheGoods"
        >
          <el-table-column
            prop="createdAt"
            label="买入时间"
            width="180"
            sortable
            show-overflow-tooltip
          >
            <template #default="scope">
              <span class="time-text">{{
                util.formatDate(scope.row.createdAt)
              }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="name"
            label="物品名称"
            min-width="150"
            sortable
            show-overflow-tooltip
          >
            <template #default="scope">
              <div class="item-cell">
                <div class="icon-wrapper" v-if="scope.row.iconID">
                  <img
                    :src="`https://icon.jx3box.com/icon/${scope.row.iconID}.png`"
                    alt="icon"
                  />
                </div>
                <span class="item-name">{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="totalValue"
            label="买入单价"
            sortable
            min-width="120"
          >
            <template #default="scope">
              <span class="price-text">{{
                util.numPad(
                  unitPrice(scope.row.jin, scope.row.yin, scope.row.tong),
                )
              }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="ress" label="数量" sortable width="100">
            <template #default="scope">
              <el-tag type="info" effect="plain" round>{{
                scope.row.ress
              }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            prop="totalValue"
            label="总成本"
            sortable
            min-width="120"
          >
            <template #default="scope">
              <span class="cost-text">{{
                util.numPad(scope.row.totalValue)
              }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="stock" label="库存" sortable width="100">
            <template #default="scope">
              <span :class="scope.row.stock > 0 ? 'stock-high' : 'stock-low'">{{
                scope.row.stock
              }}</span>
            </template>
          </el-table-column>

          <el-table-column label="预期利润" min-width="120">
            <template #default="scope">
              <span
                class="profit-text"
                :class="
                  scope.row.orderTotalRevenue - scope.row.totalValue > 0
                    ? 'text-gain'
                    : 'text-loss'
                "
              >
                {{
                  scope.row.orderTotalRevenue - scope.row.totalValue > 0
                    ? '+'
                    : ''
                }}
                {{
                  util.numPad(
                    scope.row.orderTotalRevenue - scope.row.totalValue,
                  )
                }}
              </span>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="160">
            <template #default="scope">
              <div class="action-buttons">
                <sell-order
                  :sellPriceprops="scope.row.orderId"
                  :call="scope.row.ress"
                ></sell-order>
                <el-button
                  class="delete-btn"
                  @click.stop="visibleshow(scope.row.orderId)"
                  link
                  type="danger"
                >
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>

  <el-dialog
    v-model="visible"
    title="确认操作"
    width="320px"
    align-center
    class="glass-dialog"
    :show-close="false"
  >
    <div class="dialog-content">
      <el-icon class="warning-icon"><WarningFilled /></el-icon>
      <p>
        确定要删除这条订单记录吗？<br /><span class="sub-tip"
          >此操作无法撤销。</span
        >
      </p>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false" text bg>取消</el-button>
        <el-button type="danger" @click="deleteOrder(visible)" color="#f56c6c"
          >确认删除</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, computed, onBeforeUnmount } from 'vue';
import Search from '@/components/search/Search.vue';
import PriceInput from '@/components/PriceInput/PriceInput.vue';
import util from '@/utils/util.js';
import SellOrder from '@/components/sellOrder/sellOrder.vue';
import { Top, Bottom, Delete, WarningFilled } from '@element-plus/icons-vue'; // 引入图标
import Jx3Title from './components/Jx3Title.vue';

const selectedCity = ref('');
const profitShow = ref(false);

const tableHeight = ref(500); // 初始值
const visible = ref(false);
const orderId = ref('');

//时间排序
// const sortedmockTableData = computed(() => {
//   return mockTableData.value
//     .slice()
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
// });

const handleSelect = (city) => {
  selectedCity.value = city;
};

// 添加订单
const handleAddForSale = util.throttle(async (sellPrice) => {
  const userId = util.getCookie('userid');
  if (!selectedCity.value.itemId) {
    return ElMessage.error('请选择物品');
  } else if (!sellPrice.jin && !sellPrice.yin && !sellPrice.tong) {
    return ElMessage.error('请填写价格');
  }
  try {
    Object.assign(sellPrice, { itemId: selectedCity.value.itemId, userId });
    const response = await post('/api/orders', sellPrice);
    if (response.data.code === 200) {
      ElMessage.success('添加成功');
      Jx3Store.orderInquiry();
    }
  } catch (error) {
    console.error('Error:', error);
  }
}, 1000);

// 删除订单
const deleteOrder = async () => {
  try {
    const response = await DELETE('/api/delorders/', { id: orderId.value });
    Jx3Store.orderInquiry();
    ElMessage.success('删除成功');
    visible.value = false;
    return response.data;
  } catch (error) {
    ElMessage.error('删除失败');
    return [];
  }
};

const visibleshow = (id) => {
  visible.value = true;
  orderId.value = id;
};

// 计算总价
function unitPrice(jin, yin, tong) {
  return jin * 10000 + yin * 100 + tong;
}

// 添加总利润计算
// const totalProfit = computed(() => {
//   return mockTableData.value.reduce((sum, item) => {
//     const orderProfit = item.orderTotalRevenue - item.totalValue;
//     return sum + orderProfit;
//   }, 0);
// });

// ... 保留你原有的 import ...

// --- 🛠️ 假数据生成工具 (Mock Data) ---

// 1. 模拟表格数据
const mockTableData = [
  {
    orderId: '1001',
    createdAt: new Date().toISOString(), // 刚刚
    name: '沉沙玄晶', // 大铁，贵重物品
    iconID: '2461', // 真实的玄晶图标ID
    jin: 200,
    yin: 0,
    tong: 0, // 200砖
    totalValue: 2000000, // 成本: 200砖
    ress: 1,
    stock: 0, // 已售罄
    orderTotalRevenue: 2200000, // 卖了220砖 (赚了)
  },
  {
    orderId: '1002',
    createdAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(), // 2小时前
    name: '五行石（六级）',
    iconID: '3448',
    jin: 0,
    yin: 750,
    tong: 0, // 750金
    totalValue: 75000,
    ress: 100,
    stock: 24, // 还有库存
    orderTotalRevenue: 8000000, // 总收入 (假设卖了一部分)
  },
  {
    orderId: '1003',
    createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(), // 1天前
    name: '赤兔·飞虹',
    iconID: '6866',
    jin: 50,
    yin: 0,
    tong: 0,
    totalValue: 500000,
    ress: 1,
    stock: 1,
    orderTotalRevenue: 450000, // 只有45砖 (亏损示例)
  },
  {
    orderId: '1004',
    createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(), // 2天前
    name: '甘草',
    iconID: '414',
    jin: 0,
    yin: 5,
    tong: 0,
    totalValue: 500,
    ress: 2000, // 大量材料
    stock: 2000,
    orderTotalRevenue: 0, // 还没卖出
  },
  {
    orderId: '1005',
    createdAt: new Date(Date.now() - 3600 * 1000 * 50).toISOString(),
    name: '天韶绣·衣', // 外观
    iconID: '10643',
    jin: 20,
    yin: 50,
    tong: 0,
    totalValue: 205000,
    ress: 1,
    stock: 0,
    orderTotalRevenue: 250000, // 小赚
  },
  {
    orderId: '1006',
    createdAt: new Date(Date.now() - 3600 * 1000 * 120).toISOString(),
    name: '化极魔简',
    iconID: '1622',
    jin: 1,
    yin: 20,
    tong: 0,
    totalValue: 12000,
    ress: 50,
    stock: 10,
    orderTotalRevenue: 700000,
  },
];

// 2. 模拟搜索下拉结果
const mockSearchResults = [
  { name: '五行石（六级）', iconID: '3448', _id: 'item_001' },
  { name: '五行石（五级）', iconID: '3447', _id: 'item_002' },
  { name: '五行石（四级）', iconID: '3446', _id: 'item_003' },
  { name: '彩·五行石', iconID: '3450', _id: 'item_004' },
];

// --- 🚀 修改 onMounted 注入假数据 ---

onMounted(() => {
  // 原来的逻辑: Jx3Store.orderInquiry()

  // 修改为：直接注入假数据到 Store (或者直接赋值给 computed 所依赖的变量)
  // 假设 storeToRefs 出来的 mockTableData 是可写的，或者我们直接修改 Store
  // 如果不能直接修改 Store，你可以临时创建一个本地 ref 来展示效果

  // 强制覆盖 Store 中的数据用于展示 (模拟 API 返回)
  updateTableHeight();
  window.addEventListener('resize', updateTableHeight);

  ElMessage.success('已加载演示数据'); // 提示一下
});

// --- 🔍 修改搜索函数 fetchCities 使用假数据 ---

const fetchCities = async (query) => {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 简单的模糊匹配
  if (!query) return [];
  const results = mockSearchResults.filter(
    (item) => item.name.includes(query) || '五行石'.includes(query),
  ); // 为了演示，默认返回一些

  return results.map((item) => ({
    name: item.name,
    iconID: item.iconID,
    itemId: item._id,
  }));
};

// ⚠️ 注意：原来的 addForSale 和 deleteOrder 会因为没有真实后端报错
// 建议把它们也改成打印 console.log 即可，例如：
/*
const deleteOrder = async () => {
   visible.value = false;
   // 模拟前端删除
   const index = mockTableData.value.findIndex(item => item.orderId === orderId.value);
   if (index !== -1) mockTableData.value.splice(index, 1);
   ElMessage.success('模拟删除成功');
};
*/
</script>

<style scoped lang="scss">
/* --- 全局布局与背景 --- */
.main-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #e0e5ec;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow: hidden;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

/* 背景浮动装饰 */
.decoration-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0;
  animation: float 10s infinite ease-in-out alternate;
}
.circle-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(142, 114, 247, 0.4) 0%,
    rgba(0, 0, 0, 0) 70%
  );
  top: -100px;
  left: -100px;
}
.circle-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle,
    rgba(247, 94, 2, 0.3) 0%,
    rgba(0, 0, 0, 0) 70%
  );
  bottom: -50px;
  right: -50px;
  animation-delay: -5s;
}
@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(30px, -30px);
  }
}

/* 内容容器 */
.glass-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  gap: 20px;
}

/* --- 2. 表格样式 (深度定制 Element Plus) --- */
.table-container {
  flex: 1;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.03);
  padding: 10px;
}

/* 穿透修改 Element 表格变量 */
:deep(.el-table) {
  --el-table-bg-color: transparent !important;
  --el-table-tr-bg-color: transparent !important;
  --el-table-header-bg-color: rgba(255, 255, 255, 0.5) !important;
  --el-table-row-hover-bg-color: rgba(255, 255, 255, 0.7) !important;
  --el-table-border-color: rgba(0, 0, 0, 0.05);

  background-color: transparent !important;

  th.el-table__cell {
    background-color: rgba(255, 255, 255, 0.5) !important;
    color: #606266;
    font-weight: 600;
  }
}

/* 物品单元格 */
.item-cell {
  display: flex;
  align-items: center;

  .icon-wrapper {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    overflow: hidden;
    margin-right: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .item-name {
    font-weight: 600;
    color: #7c1df1;
  }
}

/* 价格与文字颜色 */
.price-text {
  color: #f75e02;
  font-weight: 500;
  font-family: 'DIN', sans-serif;
}

.cost-text {
  color: #606266;
  font-family: 'DIN', sans-serif;
}

.profit-text {
  font-weight: 700;
  font-family: 'DIN', sans-serif;
}
.text-gain {
  color: #f75e02;
}
.text-loss {
  color: #67c23a;
}

.stock-high {
  color: #67c23a;
}
.stock-low {
  color: #f56c6c;
}

.time-text {
  color: #909399;
  font-size: 13px;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.delete-btn {
  padding: 4px;
  font-size: 16px;

  &:hover {
    background-color: #fee;
    border-radius: 4px;
  }
}

/* --- 3. 弹窗样式 --- */
:deep(.glass-dialog) {
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);

  .el-dialog__header {
    margin-right: 0;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .el-dialog__body {
    padding: 20px;
    text-align: center;
  }
}

.dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  .warning-icon {
    font-size: 40px;
    color: #f56c6c;
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
    color: #303133;
    margin: 0;
  }

  .sub-tip {
    font-size: 12px;
    color: #909399;
  }
}

/* 滚动条美化 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
</style>
