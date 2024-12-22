<template>
  <div>
    <div class="navbar">
      <span style="margin-right: 1.25rem;font-weight: 600;">物品名:</span>
      <Search style="margin-right: 1rem;" @handleSelect="handleSelect" :fetch-cities="fetchCities"></Search>
      <PriceInput @addForSale="handleAddForSale" />
    </div>
    <div class="containerright">
      <el-table ref="table" :data="sortedTableData" border @row-click="sellTheGoods">
        <el-table-column prop="createdAt" sortable label="买入时间">
          <template #default="scope">
            {{ util.formatDate(scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" show-overflow-tooltip sortable label="名称">
          <template #default="scope">
            <div class="divicon-table">
              <img class="icon-table" v-if="scope.row.iconID"
                :src="`https://icon.jx3box.com/icon/` + scope.row.iconID + `.png`" alt="Icon" />
              <span style="color: rgb(119 2 247);">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="totalValue" sortable label="买入单价">
          <template #default="scope">
            <span style="color: #f75e02;">{{ numPad(unitPrice(scope.row.jin, scope.row.yin, scope.row.tong)) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ress" sortable label="买入数量">
          <template #default="scope">
            <span style="color: rgb(123 141 64);">{{ scope.row.ress }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalValue" sortable label="总成本">
          <template #default="scope">
            <span style="color: #f75e02;">{{ numPad(scope.row.totalValue) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stock" sortable label="剩余库存">
          <template #default="scope">
            <span style="color: rgb(123 141 64);">{{ scope.row.stock }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="profits" label="总利润(5%手续费)">
          <template #default="scope">
            <span style="color: #f75e02;">{{ scope.row.profits }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <sell-order :sellPriceprops="scope.row"></sell-order>
            <el-popover :visible="visible" placement="top" :width="160">
              <p>确认删除？</p>
              <div style="text-align: right; margin: 0">
                <el-button @click.prevent="deleteOrder(scope.row.orderId)" size="small" text
                  @click="visible = false">确认</el-button>
              </div>
              <template #reference>
                <el-button @click="visible = true" link type="primary" size="small">
                  删除
                </el-button>
              </template>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup>
import msg from '@/utils/message.js'
import { ref, reactive, onMounted, computed, nextTick } from "vue";
import { post, get, DELETE } from '@/utils/http/httpbook'
import { storeToRefs } from 'pinia';
import { useJx3book } from "@/pinia/useJx3book/useJx3book";
import Search from '@/components/search/Search.vue';
import PriceInput from '@/components/PriceInput/PriceInput.vue';
import util from '@/utils/util.js'
import { ElNotification } from 'element-plus'
import SellOrder from '@/components/sellOrder/sellOrder.vue';


const Jx3Store = useJx3book()
const { tableData } = storeToRefs(Jx3Store);
const selectedCity = ref('')
const tableDatac = ref([])
const addForSaleData = ref({
  sellPricejin: '',
  sellPriceyin: '',
  sellPricetong: '',
  sellPriceress: '',
});


onMounted(() => {
  Jx3Store.orderInquiry()
  tableDatac.value = tableData
})

//时间排序
const sortedTableData = computed(() => {
  return tableData.value.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})


const handleSelect = (city) => {
  selectedCity.value = city;
};


// 添加订单
const handleAddForSale = async (sellPrice) => {
  const userId = util.getCookie('userid')
  if (!selectedCity.value.itemId) {
    return msg.error('请选择物品')
  } else if (!sellPrice.jin && !sellPrice.yin && !sellPrice.tong) {
    return msg.error('请填写价格')
  }
  try {
    Object.assign(sellPrice, { itemId: selectedCity.value.itemId, userId });
    const response = await post('/api/orders', sellPrice);
    if (response.status === 201) {
      ElNotification({
        title: '添加成功',
        message: response.data.message,
        type: 'success',
        duration: 3000,
        position: 'bottom-right',
      })
      Jx3Store.orderInquiry()
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


// 搜索物品列表
const fetchCities = async (query) => {
  try {
    const response = await get('/api/items', { name: query });
    console.log('返回数据:', response.data);
    return response.data.map(item => ({
      name: item.name,
      iconID: item.iconID,
      itemId: item._id
    }));
  } catch (error) {
    console.error('接口调用失败:', error);
    return [];
  }
};
// 删除订单
const deleteOrder = async (id) => {

  try {
    const response = await DELETE('/api/delorders/', { id });
    Jx3Store.orderInquiry()
    ElNotification({
      title: '删除成功',
      message: '删除成功',
      type: 'success',
      duration: 3000,
      position: 'bottom-right',
    })
    return response.data;
  } catch (error) {
    ElNotification({
      title: '删除失败',
      message: '删除失败',
      type: 'error',
      duration: 3000,
      position: 'bottom-right',
    })
    return [];
  }
};

// 定义一个函数，用于将数字转换为砖、金、银、铜的表示
function numPad (amount) {
  const units = ['砖', '金', '银', '铜'];
  const dividers = [100000000, 10000, 100, 1]; // 对应砖、金、银、铜的分隔线

  let result = [];
  for (let i = 0; i < dividers.length; i++) {
    const unitValue = Math.floor(amount / dividers[i]);
    if (unitValue > 0) {
      result.push(`${unitValue}${units[i]}`);
    }
    amount %= dividers[i];
  }
  return result.join('');
}

// 计算总价
function unitPrice (jin, yin, tong) {
  return jin * 10000 + yin * 100 + tong
}
</script>

<style scoped lang="less">
.itemimage {
  display: flex;
  align-items: center;
  width: 15rem;
  border-radius: 0.2rem;
}

.itemimage:hover {
  background-color: #8f58fd;
  box-shadow: rgba(255, 255, 255, 0.25) 0px 1px 1px, rgba(255, 255, 255, 0.13) 0px 0px 1px 1px;

  .item-text {
    color: white;
  }
}

.itembutton {
  margin-left: 10px;
}

.qianimage {
  width: 25px;
  height: 18px;
  margin: 0 3px;
}

.containerright {
  margin-top: 1.25rem;
  background-color: #f8f8f8;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
}

.navbar {
  display: flex;
  align-items: center;
  background-color: #FFF;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.navbar button {
  background-color: #f8f8f8;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.navbar button.active {
  background-color: #4caf50;
  color: white;
  margin-left: 1rem;
}

.navbar input[type="text"] {
  padding: 10px;
  margin-left: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.navbar input[type="text"]::placeholder {
  color: #ccc;
}

.navbar input[type="text"]:focus {
  outline: none;
  border-color: #4caf50;
}

.navbar input[type="text"]+button {
  background: none;
  border: none;
  padding: 0;
  margin: 0 0 0 5px;
  cursor: pointer;
}

.navbar input[type="text"]+button:before {
  content: "🔍";
  font-size: 18px;
}

.container {
  width: 20rem;
  height: 35rem;
  padding: 0 1.25rem;
  background-color: #FFF;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
  overflow: overlay;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
}

.item .icon {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}

.divicon-table {
  display: flex;
  align-items: center;
}

.icon-table {
  width: 1rem;
  height: 1rem;
  margin-right: 5px;
}

.item-text {
  // flex: 1;
  // color: black;
  color: #7c1df1;
}


.item-span {
  font-size: 14px;
  font-weight: bold;
}

.item-actions {
  display: flex;
  align-items: center;
  justify-content: space-evenly
}

:deep(.el-input__inner) {
  color: #f75e02;
}

:deep(.shulianginput .el-input__inner) {
  color: rgb(123, 141, 64);
}

:deep(.navbar .el-input__inner) {
  color: rgb(59, 131, 255);
}

:deep(.nameArticle .el-input__inner) {
  color: #7c1df1;
}
</style>
