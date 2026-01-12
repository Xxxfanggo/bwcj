<template>
  <div class="Preson">
    <h2>name: {{ name }}</h2>
    <h2>age: {{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Preson",
  setup() {
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

    return { name, age, showTel, changeName, changeAge };
  },
  // data() {
  //   return {
  //     name: "zhang san",
  //     age: 18,
  //     sex: "男",
  //   };
  // },
  // methods: {
  //   showTel() {
  //     alert("123456789");
  //   },
  //   changeName() {
  //     this.name = "lisi";
  //   },
  //   changeAge() {
  //     this.age += 1;
  //   },
  // },
};
</script>

<style scoped>
.Preson {
  background-color: rgb(75, 128, 177);
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}
</style>