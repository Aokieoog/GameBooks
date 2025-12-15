<template>
  <div>
    <el-autocomplete
      v-model="searchText"
      :fetch-suggestions="querySearch"
      @select="handleSelect"
      :trigger-on-focus="false"
      class="autocomplete"
    >
      <template #prefix>
        <img :src="selectedIcon" class="input-icon" alt="icon" />
      </template>
      <template #default="{ item }">
        <div class="item">
          <img
            :src="`https://icon.jx3box.com/icon/` + item.iconID + `.png`"
            alt="city icon"
            class="icon"
          />
          <span>{{ item.name }}</span>
        </div>
      </template>
    </el-autocomplete>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import supabase from '@/utils/supabase/supabase';
const props = defineProps(['fetchCities']);
const emit = defineEmits(['handleSelect']);
const searchText = ref('');
const searchId = ref('');
const selectedIcon = ref('https://icon.jx3box.com/icon/2589.png'); // 默认图标
// const querySearch = async (queryString, cb) => {
//   if (!queryString) {
//     cb([]); // 如果输入为空，返回空结果
//     return;
//   }
//   try {
//     const results = await props.fetchCities(queryString); // 调用父组件传入的方法
//     cb(results); // 将结果传递给 el-autocomplete 的下拉选项
//   } catch (error) {
//     console.error('获取数据失败:', error);
//     cb([]); // 如果出错，返回空数组
//   }
// };
const handleSelect = async (item) => {
  const { data, error } = await supabase
    .from('gamebook_jx3_icon') // 换成你的表名
    .select('*') // 查询全部字段
    .eq('name', handleSelect); // 只查询物品类别

  // 如果有错误，打印出来
  if (error) {
    console.error('查表出错了 >_<: ', error);
    return;
  }
  console.log(data);

  console.log('Selected:', item);
  selectedIcon.value = `https://icon.jx3box.com/icon/` + item.iconID + `.png`; // 更新选中的图标
  searchText.value = item.name; // 更新输入框内容为选中项的名称
  // emit('handleSelect', item);
};
</script>

<style scoped>
.autocomplete {
  width: 300px;
}

.input-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.item {
  display: flex;
  align-items: center;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
