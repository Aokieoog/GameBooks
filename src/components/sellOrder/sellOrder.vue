<template>
  <el-popover placement="left" z-index="99999" :width="700" trigger="click">
    <template #reference>
      <el-button link type="primary" size="small">出售</el-button>
    </template>
    <div class="item-actions">
      <PriceInput @addForSale="addSoldOrders"></PriceInput>
    </div>
    <el-divider/>
    <el-table :data="tosellData" show-summary :summary-method="getSummaries" max-height="400">
      <el-table-column property="timeToSell" label="售出时间"/>
      <el-table-column property="unitPriceText" label="售出单价"/>
      <el-table-column property="quantitySold" label="售出数量"/>
      <el-table-column property="totalSalesText" label="售出总额"/>
      <el-table-column fixed="right" label="状态">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="scope.$index">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-popover>
</template>

<script setup>
import { ref, reactive,defineProps, onMounted, computed, nextTick } from "vue";
import PriceInput from '@/components/PriceInput/PriceInput.vue';
import util from "@/utils/util";
import { post, get, DELETE } from '@/utils/http/httpbook'
import { ElNotification } from 'element-plus'

const handleAddForSaleData = (data) => {
  console.log('data', data);
}
const props = defineProps({
  sellPriceprops: Object,
});
const orderId = props.sellPriceprops.orderId;

// 添加出售数据
const addSoldOrders = async (data) => {
  // const orderId = props.sellPriceprops.orderId;
  const res = await post('/api/order/sell', {
    orderId,
    sellPrice: {
      jin: data.jin,
      yin: data.yin,
      tong: data.tong,
      quantity: data.quantity,
    },
  });
  if (res.data.code == 200) {
    ElNotification({
      title: '添加成功',
      message: res.data.message,
      type: 'success',
      duration: 3000,
      position: 'bottom-right',
    });
  } else{
    ElNotification({
      title: '添加失败',
      message: res.data.message,
      type: 'error',
      duration: 3000,
      position: 'bottom-right',
    });
  }
}
// 获取出售数据   todo
const getSoldOrders = async () => {
  // const userId = util.getCookie('userid');
  const res = await get('/api/order/query', {
    orderId,
  });
  console.log('res', res);
  
  tosellData.value = res.data;
};

// // 删除出售数据
// const deleteSoldOrders = async (index) => {
//   const userId = util.getCookie('userid');
//   const orderId = tosellData.value[index].orderId;
//   const res = await DELETE('/api/order/sell', {
//     userId,
//     orderId,
//   });
//   if (res.code === 200) {
//     tosellData.value.splice(index, 1);
//   }
// }
</script>

<style scoped lang="less">
.item-actions {
  display: flex;
  justify-content: center;
}
</style>