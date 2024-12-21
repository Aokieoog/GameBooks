<template>
  <div class="item-actions">
    <span class="item-span">单价：</span>
    <div class="price-field" v-for="(currency, index) in currencies" :key="index">
      <el-input
        :maxlength="currency.maxlength"
        :style="{ width: '70px' }"
        v-model="sellPrice[currency.key]"
        @keyup="formatInput(currency.key)"
      />
      <img :src="getCurrencyImage(currency.key)" class="qianimage" />
    </div>

    <span class="item-span" style="margin-left:1rem;">数量：</span>
    <el-input
      class="shulianginput"
      maxlength="5"
      style="width: 82px"
      v-model="sellPrice.quantity"
      @keyup="formatInput('quantity')"
      @keyup.enter="addForSale"
    />
    <el-button class="itembutton" type="success" @click="addForSale">添加</el-button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  addForSaleData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['addForSale']);

const sellPrice = ref({
  jin: props.addForSaleData.sellPricejin || '',
  yin: props.addForSaleData.sellPriceyin || '',
  tong: props.addForSaleData.sellPricetong || '',
  quantity: props.addForSaleData.sellPriceress || '1',
});

// 货币配置数组
const currencies = [
  { key: 'jin', maxlength: 8 },
  { key: 'yin', maxlength: 2 },
  { key: 'tong', maxlength: 2 },
];

// 动态获取货币图片
const getCurrencyImage = (currencyKey) => {
  const images = {
    jin: new URL('@/assets/png/jin.png', import.meta.url).href,
    yin: new URL('@/assets/png/yin.png', import.meta.url).href,
    tong: new URL('@/assets/png/tong.png', import.meta.url).href,
  };
  return images[currencyKey] || '';
};

// 格式化输入值，限制为数字
const formatInput = (field) => {
  sellPrice.value[field] = sellPrice.value[field].replace(/[\D\s]/g, '');
};

// 添加售卖
const addForSale = () => {
  emit('addForSale', sellPrice.value);
};
</script>

<style scoped>
.item-actions {
  display: flex;
  align-items: center;
}
.item-span {
  margin-right: 5px;
  font-weight: 600;
}
.price-field {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.qianimage {
  margin-left: 5px;
}
.itembutton {
  margin-left: 10px;
}
</style>