<script setup>
import { reactive, ref, computed } from 'vue'
import { useRoute } from 'vue-router';

const datalist = reactive([
  { sidebar: '交易行账本', toa: 'js3book', icon: 'icon-dingdan', index: 0 },
  { sidebar: '外观账本', toa: 'appearance', icon: 'icon-dingdan', index: 1 },
]
)
const route = useRoute();
const isCollapse = ref(false)

const toacomputed = computed(() => {
  return route.path.slice(1); // 返回当前路径
})
</script>

<template>
  <div class="sidebar">
    <el-menu router mode="horizontal" background-color="#24292e" text-color="#ffffff" :default-active="toacomputed"
      :collapse="isCollapse" class="sidmenu" @close="handleClose" @open="handleOpen">
      <el-menu-item v-for="(item, i) in datalist" :key="i" :index="item.toa">
        <template #title>{{ item.sidebar }}</template>
      </el-menu-item>
      <el-sub-menu>
        <template #title>
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </template>
        <el-menu-item>修改密码</el-menu-item>
        <el-menu-item>退出</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.sidmenu {
  padding: 0 5%
}

.sidebar {
  position: fixed;
  width: 100vw;
  height: 60px;
  z-index: 99999;
}

.el-menu--horizontal>.el-sub-menu:nth-last-child(1) {
  position: absolute;
  right: 5rem;
  top: .555rem;
}
</style>
