import AnalyzeFile from '@/pages/analyzeFile/index.vue'
import type { RouteRecordRaw } from 'vue-router';

export const constantRouter: RouteRecordRaw[] = [
  {
    name: 'main',
    path: '/',
    // 主布局组件将在App.vue中通过router-view name="main"渲染
    component: () => import('@/components/MainLayout.vue'), // 改为使用component而不是components
    redirect: '/analyzeFile',
    children: [
      // {
      //   name: 'zhuye',
      //   path: '/home',
      //   component: Home,
      // },
      
      // {
      //   name: 'xinwen',
      //   path: '/news',
      //   component: News,
      //   children: [
      //     {
      //       name: 'detail',
      //       path: 'detail',
      //       component: Detail,
      //       // 3种写法 
      //       // 写法一： 路由规则的参数会以props的方式传递给组件 底层 会将参数对象传递给组件的props 子组件 调用 defineProps([ 'id' ]) belike:  <detail :id="id"></detail> 
      //       // props: true 
            
      //       // 写法三： 函数 
      //       // props(route) {
      //       //   return route.query
      //       // }

      //       // 写法二： 对象 自己决定传什么参数
      //       // props: { id: 1 }
      //     }
      //   ]
      // },
      // {
      //   name: 'guanyu',
      //   path: '/about',
      //   component: About,
      //   children: [
      //     {
      //       name: 'refsParent',
      //       path: 'refsParent',
      //       components: {
      //         Communication: RefsParent
      //       },
      //     },
      //     {
      //       name: 'provideInject',
      //       path: 'provideInject',
      //       components: {
      //         Communication: ProvideInject
      //       },
      //     },
      //     {
      //       name: 'slot',
      //       path: 'slot',
      //       components: {
      //         Communication: Slot
      //       },
      //     }
      //   ]
      // },
      // {
      //   name: 'piniaView',
      //   path: '/piniaView',
      //   component: PiniaView,
      // },
      {
        name: 'analyzeFile',
        path: '/analyzeFile',
        component: AnalyzeFile,
      }
    ]
  },
  // 添加独立的重定向路由
  {
    path: '/',
    redirect: '/analyzeFile'
  },
  // 独立的登录路由，不在主布局中显示
  // {
  //   path: '',
  //   redirect: '/login',
  //   component: () => import('@/pages/welcome/index.vue'),
  //   children:  [
  //     {
  //       name: 'login',
  //       path: '/login',
  //       component: () => import('@/pages/welcome/login/index.vue'),
  //     },
  //     {
  //       name: 'register',
  //       path: '/register',
  //       component: () => import('@/pages/welcome/register/index.vue'),
  //     }

  //   ]
  // }
]