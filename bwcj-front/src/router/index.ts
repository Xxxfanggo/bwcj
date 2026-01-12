// 创建路由器，并暴露
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import {constantRouter} from './routers'


const router = createRouter({
  routes: constantRouter,
  history: createWebHashHistory(),
})

// todo 添加全局路由守卫
// router.beforeEach((to, from, next) => {
//   // console.log(to, from)
//   next()
// })

// 暴露router
export default router;