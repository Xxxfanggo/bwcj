/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 为Vue 3项目定义JSX类型声明
declare global {
  namespace JSX {
    interface Element {}
    interface ElementClass {
      $props: {};
    }
    interface ElementAttributesProperty {
      $props: {};
    }
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface IntrinsicAttributes {
      [elemName: string]: any;
    }
  }
}

// 添加Vue JSX元素类型扩展
declare namespace JSX {
  interface ElementChildrenAttribute { 
    children: {};
  }
}