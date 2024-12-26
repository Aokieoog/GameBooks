<script setup>
import { reactive, ref, computed } from 'vue'
import { useRoute } from 'vue-router';
import logout from '@/components/logout/logout.vue'

const datalist = reactive([
  { sidebar: '交易行', toa: 'js3book', icon: 'icon-dingdan', index: 0 },
  { sidebar: '外观', toa: 'appearance', icon: 'icon-dingdan', index: 1 },
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
      <logout class="logout"></logout>
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
.logout {
  position: absolute;
  bottom: 0;
  right: 5.5rem;
}

</style>
