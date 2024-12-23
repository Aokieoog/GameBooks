import { defineStore } from 'pinia'
import {get, post} from '@/utils/http/httpbook'
import util from '@/utils/util';
export const useJx3book = defineStore('tableData', {
  state: () => ({
    userId: util.getCookie('userid'),
    tableData: JSON.parse(localStorage.getItem('jx3')) || [],
    // orderId: '',
    // totalSellingPrice: 0,
  }),
  actions: {
    async orderInquiry() {
      try {
        const response = await get('/api/orderInquiry', { userId: this.userId });
        // 根据实际情况处理响应数据
        this.tableData = response.data;
        return response.data;
      } catch (error) {
        console.error('Order inquiry failed:', error);
        throw error;
      }
    },
    async updateOrderTotalSellingPrice(orderId,orderTotalRevenue) {
      try {
        const response = await post('/api/addOrderTotal', { orderTotalRevenue: orderTotalRevenue, orderId: orderId });
        await orderInquiry()
        // 根据实际情况处理响应数据
        return response.data;
      } catch (error) {
        console.error('Add order failed:', error);
        throw error;
      }
    },
  },
})