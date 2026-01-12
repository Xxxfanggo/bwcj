<template>
  <div class="Preson">
    <!-- <h2>name: {{ name }}</h2>
    <h2>age: {{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button> -->

    <div v-for="item in list" :key="item.id">
      <span>{{ item.name }}</span> - <span>{{ item.age }}</span>
      <br/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, withDefaults, onBeforeMount } from "vue";
import type { Persons } from "@/types/Persons";

const name = ref("zhang san");
    const age = ref(18);

    function showTel() {
      alert("123456789");
    }
    function changeName() {
      name.value = "lisi";
    }
    function changeAge() {
      age.value += 1;
    }

    // defineProps可以不用引入， 属于宏函数
    // 不设置默认值
    // defineProps<{list?:Persons}>();
    // 设置默认值
    let persons = withDefaults(defineProps<{list?:Persons}>(), {list:() => [
      {
        name: "王五",
        age: 33,
        id: 111,
      },
    ]})

    onBeforeMount(() => {
      console.log(persons);
    })
</script>

<style scoped>
.Preson {
  background-color: rgb(75, 128, 177);
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}
</style>