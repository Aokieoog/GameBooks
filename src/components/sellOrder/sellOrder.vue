<template>
  <el-popover placement="left" z-index="99999" :width="700" trigger="click">
    <template #reference>
      <el-button link type="primary" size="small">出售</el-button>
    </template>
    <div class="item-actions">
      <PriceInput :addForSaleData="sellOrderData" @addForSale="handleAddForSaleData"></PriceInput>
    </div>
    <el-divider/>
    <el-table :data="tosellData" show-summary :summary-method="getSummaries" max-height="400">
      <el-table-column width="110" property="timeToSell" label="售出时间"/>
      <el-table-column width="130" property="unitPriceText" label="售出单价"/>
      <el-table-column width="90" property="quantitySold" label="售出数量"/>
      <el-table-column width="160" property="totalSalesText" label="售出总额"/>
      <el-table-column fixed="right" label="状态" width="60">
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
import { ref, reactive, onMounted, computed, nextTick } from "vue";
import PriceInput from '@/components/PriceInput/PriceInput.vue';

const sellOrderData = ref({
  jin: '',
  yin: '',
  tong: '',
  ress: '',
})

const handleAddForSaleData = (data) => {
  sellOrderData.value = data
  console.log('data', data);
  
}
</script>

<style scoped>

</style>