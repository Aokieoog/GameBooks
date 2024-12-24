import { defineStore } from 'pinia'
import {get, post} from '@/utils/http/httpbook'
import util from '@/utils/util';

export const useJx3book = defineStore('tableData', {
  state: () => ({
    userId: util.getCookie('userid'),
    tableData: JSON.parse(localStorage.getItem('jx3')) || [],
  }),
  actions: {
    async orderInquiry() {
      try {
        const response = await get('/api/orderInquiry', { userId: this.userId });
        this.tableData = response.data;
        return response.data;
      } catch (error) {
        console.error('Order inquiry failed:', error);
        throw error;
      }
    },
    async updateOrderTotalSellingPrice(orderId, orderTotalRevenue) {
      try {
        // 等待更新完成
        const response = await post('/api/addOrderTotal', { 
          orderTotalRevenue: orderTotalRevenue, 
          orderId: orderId 
        });
        // 不需要在这里调用 orderInquiry，由调用方决定何时刷新
        return response.data;
      } catch (error) {
        console.error('Add order failed:', error);
        throw error;
      }
    },
  },
})