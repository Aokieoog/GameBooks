<template>
  <el-popover placement="left" z-index="99999" :width="700" trigger="click">
    <template #reference>
      <el-button link type="primary" size="small" @click="getSoldOrders">出售</el-button>
    </template>
    <div class="item-actions">
      <PriceInput @addForSale="addSoldOrders"></PriceInput>
    </div>

    <div style="padding: 5px 0;">
      <el-progress :stroke-width="3" :percentage=" (total_quantity/props.call).toFixed(2)*100">
      </el-progress>
    </div>



    <el-table :data="tosellData" border max-height="400">
      <el-table-column property="dateSold" width="180" show-overflow-tooltip label="售出时间">
        <template #default="scope">
          {{ util.formatDate(scope.row.dateSold) }}
        </template></el-table-column>
      <el-table-column property="price" show-overflow-tooltip label="售出单价">
        <template #default="scope">
          <span style="color: #f75e02;">{{ util.numPad(scope.row.price) }}</span>
        </template>
      </el-table-column>
      <el-table-column property="quantity" show-overflow-tooltip label="售出数量" />
      <el-table-column property="totalRevenue" show-overflow-tooltip label="售出总额">
        <template #default="scope">
          <span style="color: #f75e02;">{{ util.numPad(scope.row.totalRevenue) }}</span>
        </template></el-table-column>
      <el-table-column fixed="right" label="状态">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="deleteSoldOrders(scope.row.id, scope.row.quantity)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-popover>
</template>

<script setup>
import { ref, reactive, defineProps,defineEmits, onMounted, computed, nextTick } from "vue";
import PriceInput from '@/components/PriceInput/PriceInput.vue';
import util from '@/utils/util.js'
import { post, get, DELETE } from '@/utils/http/httpbook'
import { ElNotification } from 'element-plus'
import { useJx3book } from "@/pinia/useJx3book/useJx3book";
import msg from '@/utils/message.js'

const Jx3Store = useJx3book()
const tosellData = ref([]);
const total_quantity = ref(0);
const totalSellingPrice = ref(0);
// const emit = defineEmits(['totalSellingPrice']);
const props = defineProps({
  sellPriceprops: {
    type: Number,
    required: true
  },
  call: {
    type: Number,
    required: true
  }
})

// 添加出售数据
const addSoldOrders = async (data) => {
  if (!data.jin && !data.yin && !data.tong) {
    return msg.error('请填写价格')
  }
  const res = await post('/api/order/sell', {
    "orderId": props.sellPriceprops,
    sellPrice: {
      jin: data.jin,
      yin: data.yin,
      tong: data.tong,
      quantity: data.quantity,
    },
  });
  if (res.data.code == 200) {
    getSoldOrders();
    Jx3Store.orderInquiry()
    // Jx3Store.orderId = props.sellPriceprops
    // Jx3Store.updateOrderTotalSellingPrice(props.sellPriceprops)
    ElNotification({
      title: '添加成功',
      message: res.data.message,
      type: 'success',
      duration: 3000,
      position: 'bottom-right',
    });
  } else {
    ElNotification({
      title: '添加失败',
      message: res.data.message,
      type: 'error',
      duration: 3000,
      position: 'bottom-right',
    });
  }
}

// 获取出售数据
const getSoldOrders = async () => {
  const res = await get('/api/order/query', {
    orderId: props.sellPriceprops,
  });
  tosellData.value = res.data;
  total_quantity.value = 0;
  let totalSellingPrice = 0;
  res.data.forEach(item => {
    total_quantity.value += item.quantity
    totalSellingPrice += item.totalRevenue
  });
  Jx3Store.updateOrderTotalSellingPrice(props.sellPriceprops, totalSellingPrice).then(() => {
  Jx3Store.orderInquiry();
});
}

// 删除出售数据
const deleteSoldOrders = async (id,stok) => {
  const res = await DELETE('/api/order/delete', {
    id,
    stock:stok,
  });
  if (res.status === 200) {
    Jx3Store.orderInquiry() // 主表格刷新
    getSoldOrders();
    ElNotification({
      title: '删除成功',
      message: '删除成功',
      type: 'success',
      duration: 3000,
      position: 'bottom-right',
    });
  }
}
</script>

<style scoped lang="less">
.item-actions {
  display: flex;
  justify-content: center;
}
</style>