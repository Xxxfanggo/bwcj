<template>
  <div>
    <!-- 主应用程序布局 -->
    <router-view name="main"></router-view>
    
    <!-- 独立页面将直接在默认router-view中渲染 -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
// import Preson from '@/components/Preson.vue';
// import Dog from '@/components/Dog.vue';
import type { Persons } from "./types/Persons";
// import Header from "./components/Header.vue";

const persons = reactive<Persons>([
  {
    name: "zhangsan",
    age: 18,
    id: 1,
  },
  {
    name: "lisi",
    age: 19,
    id: 2,
  },
]);
</script>

<style scoped>
/* 所有样式已移到 MainLayout.vue */
</style>