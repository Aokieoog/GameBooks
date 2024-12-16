<template>
  <PriceInput :addForSaleData="addForSaleData" />
</template>

<script setup>
import { ref } from 'vue';
import PriceInput from '@/components/PriceInput/PriceInput.vue';

const addForSaleData = ref({
  sellPricejin: '112',
  sellPriceyin: '9',
  sellPricetong: '12',
  sellPriceress: '10',
});
</script>
