<template>
  <div class="trade-bar-glass">
    <el-form
      :model="formData"
      :rules="rules"
      ref="formRef"
      class="inline-form"
      hide-required-asterisk
    >
      <el-form-item prop="itemName" class="form-item-glass">
        <el-input
          v-model="formData.itemName"
          placeholder="物品名称"
          class="glass-input item-name-input"
        >
          <template #prefix>
            <div class="icon-placeholder">
              <img v-if="itemIconUrl" :src="itemIconUrl" alt="icon" />
              <el-icon v-else><Goods /></el-icon>
            </div>
          </template>
        </el-input>
      </el-form-item>

      <div class="price-group">
        <el-form-item prop="priceGold" class="form-item-no-margin">
          <el-input-number
            v-model="formData.priceGold"
            :min="0"
            :controls="false"
            placeholder="0"
            class="glass-input price-input gold"
          >
            <template #suffix><span class="currency-label">砖</span></template>
          </el-input-number>
        </el-form-item>

        <el-form-item prop="priceSilver" class="form-item-no-margin">
          <el-input-number
            v-model="formData.priceSilver"
            :min="0"
            :controls="false"
            placeholder="0"
            class="glass-input price-input silver"
          >
            <template #suffix><span class="currency-label">金</span></template>
          </el-input-number>
        </el-form-item>

        <el-form-item prop="priceCopper" class="form-item-no-margin">
          <el-input-number
            v-model="formData.priceCopper"
            :min="0"
            :controls="false"
            placeholder="0"
            class="glass-input price-input copper"
          >
            <template #suffix><span class="currency-label">银</span></template>
          </el-input-number>
        </el-form-item>
      </div>

      <el-form-item prop="quantity" class="form-item-glass">
        <el-input-number
          v-model="formData.quantity"
          :min="1"
          :controls="false"
          placeholder="数量"
          class="glass-input quantity-input"
        >
          <template #prefix><span class="qty-prefix">x</span></template>
        </el-input-number>
      </el-form-item>

      <el-form-item class="form-item-no-margin">
        <el-button
          type="primary"
          class="add-btn"
          @click="submitForm(formRef)"
          circle
        >
          <el-icon><Plus /></el-icon>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Goods, Plus } from '@element-plus/icons-vue'; // 引入图标

const formRef = ref<FormInstance>();

// 表单数据
const formData = reactive({
  itemName: '',
  priceCopper: null,
  priceSilver: null,
  priceGold: null,
  quantity: 1,
});

// 模拟图标
const itemIconUrl = '';

const rules = reactive<FormRules>({
  itemName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  quantity: [{ required: true, message: '数量', trigger: 'change' }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      if (
        !formData.priceGold &&
        !formData.priceSilver &&
        !formData.priceCopper
      ) {
        ElMessage.warning('请填写价格');
        return;
      }
      console.log('提交:', formData);
      ElMessage.success('添加成功');
      // 重置逻辑可选
      // formEl.resetFields();
    }
  });
};
</script>

<style scoped lang="scss">
/* --- 容器样式 --- */
.trade-bar-glass {
  display: inline-block;
  padding: 12px 20px;
  border-radius: 16px;

  /* Glassmorphism 背景 */
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.inline-form {
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-item-glass {
  margin-bottom: 0;
  margin-right: 0;
}
.form-item-no-margin {
  margin: 0;
}

/* --- 通用输入框美化 (Glass Input) --- */
:deep(.glass-input .el-input__wrapper) {
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: none !important; /* 去除默认边框 */
  border-radius: 8px;
  padding: 0 10px;
  border: 1px solid transparent;
  transition: all 0.3s ease;
  height: 36px;
}

:deep(.glass-input .el-input__wrapper:hover),
:deep(.glass-input .el-input__wrapper.is-focus) {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
}

/* 去除输入框 focus 时的默认蓝色边框线，改用颜色区分 */
:deep(.glass-input .el-input__wrapper.is-focus) {
  box-shadow: none !important;
  background-color: #fff;
}

/* --- 1. 物品名称输入框 --- */
.item-name-input {
  width: 160px;
}

.icon-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 4px;
  color: #7c1df1; /* 紫色主题 */

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}

/* --- 2. 价格输入组 --- */
.price-group {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.3); /* 轻微的分组背景 */
}

/* 隐藏步进器 */
:deep(.el-input-number .el-input__inner) {
  text-align: left; /* 数字靠左 */
}

.price-input {
  width: 90px;
}

.currency-label {
  font-size: 12px;
  font-weight: 600;
  user-select: none;
}

/* 这里的颜色对应游戏里的货币颜色 */

/* 金/砖 */
.gold :deep(.el-input__inner) {
  color: #f75e02;
  font-weight: bold;
}
.gold :deep(.currency-label) {
  color: #f75e02;
}
.gold :deep(.el-input__wrapper.is-focus) {
  border: 1px solid rgba(247, 94, 2, 0.3);
}

/* 银 */
.silver :deep(.el-input__inner) {
  color: #2c3e50;
  font-weight: bold;
}
.silver :deep(.currency-label) {
  color: #7f8c8d;
}
.silver :deep(.el-input__wrapper.is-focus) {
  border: 1px solid rgba(127, 140, 141, 0.3);
}

/* 铜 */
.copper :deep(.el-input__inner) {
  color: #d35400;
  font-weight: bold;
}
.copper :deep(.currency-label) {
  color: #d35400;
}
.copper :deep(.el-input__wrapper.is-focus) {
  border: 1px solid rgba(211, 84, 0, 0.3);
}

/* --- 3. 数量输入框 --- */
.quantity-input {
  width: 80px;
}
.qty-prefix {
  color: #909399;
  font-size: 12px;
  margin-right: 4px;
}

/* --- 4. 按钮 --- */
.add-btn {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border: none;
  box-shadow: 0 4px 10px rgba(79, 172, 254, 0.4);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05) rotate(90deg); /* 悬停旋转效果 */
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
