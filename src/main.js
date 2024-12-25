import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
/* element */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
/* vueRouter */
import router from './router/index.js'
/* 自定义全局css */
import './assets/globals.css'
/* Animate-css动画库 */
import './assets/animate.css'
/* Svg图标全局注册组件 */
import SvgIcon from './components/svgIconFont/svgIcon.vue'
import './assets/svgIconFont/svgIconFont'
/* message */
/* echarts */
import * as echarts from 'echarts'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
/* 需要vue3.3版本否则报错 */


const app = createApp(App)
const pinia = createPinia()

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$echarts = echarts
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.component('SvgIcon', SvgIcon)

router.isReady().then(() => app.mount('#app'))

/* 挂载VUE原型
 * vue3.0取消了Vue.prototype，官方文档推荐使用globalProperties
 */
