import { defineStore } from 'pinia'
import {get} from '@/utils/http/httpbook'
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
        // 根据实际情况处理响应数据
        this.tableData = response.data;
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Order inquiry failed:', error);
        throw error;
      }
    },
  },
})