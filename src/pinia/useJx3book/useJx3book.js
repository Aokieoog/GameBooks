import { defineStore } from 'pinia'
import {get, post} from '@/utils/http/httpbook'
import util from '@/utils/util';

export const useJx3book = defineStore('tableData', {
  state: () => ({
    userId: util.getCookie('userid'),
    tableData: JSON.parse(localStorage.getItem('jx3')) || [],
  }),
  getters: {
    totalProfit: (state) => {
      return state.tableData.reduce((sum, item) => {
        const profit = item.orderTotalRevenue - item.totalValue;
        return sum + profit;
      }, 0);
    }
  },
  actions: {
    async orderInquiry() {
      try {
        const response = await get('/api/orderInquiry', { userId: this.userId });
        this.tableData = response.data;
        localStorage.setItem('jx3', JSON.stringify(response.data));
        return response.data;
      } catch (error) {
        console.error('Order inquiry failed:', error);
        throw error;
      }
    },
    async updateOrderTotalSellingPrice(orderId, orderTotalRevenue) {
      try {
        const response = await post('/api/addOrderTotal', { 
          orderTotalRevenue: orderTotalRevenue, 
          orderId: orderId 
        });
        return response.data;
      } catch (error) {
        console.error('Add order failed:', error);
        throw error;
      }
    },
  },
})