<template>
  <div @click="gobook" class="container">
    <!-- <h1>感谢使用剑侠3记账本</h1> -->
    <h2>公告</h2>
    <p><span style="color: red;">PS：</span>如果在双梦遇到一个叫‘<span style="color: red;">咩气气</span>’的纯阳请给她一串糖葫芦。😊</p>
    <p><span style="color: blue;">下个计划：</span>适配手机端（因博主一个人做时间有限，更新时间待定，先计划着。）😭</p>
    <el-card style="width: 40rem;height: 30rem;">
      <el-divider content-position="left">2024年11月13日</el-divider>
      <p>修复了外观添加失败问题</p>
      <el-divider content-position="left">2024年10月15日</el-divider>
      <p>增加了外观统计页面</p>
      <p>使用了废牛记账本的API，因此与<span style="color: red;">废牛记账本数据互通</span>。</p>
      <el-divider content-position="left">2024年7月23日</el-divider>
      <p>修改收益计算规则,修改后收益扣除交易行<span style="color: red;">5%</span>的手续费</p>
      <p>“剑侠3记账本”是为剑网三做的一个交易行记账功能</p>
      <p>在某一天，逛交易行的时候发现忘记远古时期购买的材料单价，因此有感而发开发了此网站。</p>
      <p>此网站完全使用静态部署，所有的数据信息全部储存在本地浏览器，<span style="color: red;">不会窃取信息</span>。</p>
      <p>同样有弊端，不可以跨设备使用,浏览器缓存清除数据消失（<span style="color: red;">不手动清除不会消失</span>）。</p>
    </el-card>
    <p>使用方法:<el-link class="url" href="http://www.ieoog.com" target="_blank">点我</el-link></p>
  </div>
  <div class="img">
      <img style="width: 6.25rem; height: 6.25rem" src="@/assets/png/miemie.png" />
      <p>糖葫芦🍬😄</p>
  </div>


</template>

<script setup>
import router from '@/router';

const gobook = () => {
  router.push({ path: '/js3book' })
}


</script>

<style scoped lang='less'>
.url {
  color: #409EFF;
  font-size: 18px;
}
.container{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img {
  width: 9.375rem;
  height: 10.75rem;
  position: fixed;
  bottom:1.25rem;
  right: 1.25rem;
  }
</style>