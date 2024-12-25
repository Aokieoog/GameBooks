import { ElNotification } from 'element-plus'
export default {
  /* 提示 */
  info (data) {
    ElNotification({
      title: '提示',
      message: data,
      type: 'info',
      duration: 2000,
      position: 'bottom-right',
    });
  },
  /* 成功 */
  success (data) {
    ElNotification({
      title: '成功',
      message: data,
      type: 'success',
      duration: 2000,
      position: 'bottom-right',
    });
  },
  /* 警告 */
  warning (data) {
    ElNotification({
      title: '警告',
      message: data,
      type: 'warning',
      duration: 2000,
      position: 'bottom-right',
    });
  },
  /* 错误 */
  error (data) {
    ElNotification({
      title: '错误',
      message: data,
      type: 'error',
      duration: 2000,
      position: 'bottom-right',
    });
  }
};