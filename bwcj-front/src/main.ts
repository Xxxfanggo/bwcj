import { createApp } from "vue";

import App from './App.vue'
import router from './router'
// 引入pinia
import { createPinia } from 'pinia'
// 引入 element-plus
import  ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// svg插件需要配置代码
import 'virtual:svg-icons-register'

// 引入自定义插件对象：注册整个项目全局组件
import gloablComponent from '@/components'

const app = createApp(App)
// 创建pinia
const pinia = createPinia()
// 安装pinia
app.use(pinia)
app.use(router)
app.use(ElementPlus)
// 安装自定义插件
app.use(gloablComponent)
app.mount('#app')