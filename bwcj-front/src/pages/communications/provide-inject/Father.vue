<template>
  <div class="father">
    <h3>父组件</h3>
    <span>money:  {{ money }}</span>
    <br/>
    <span>car: brand: {{ car.brand }}, price: {{ car.price }}</span>
    <Child/>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, provide } from 'vue';
import Child from './Child.vue';

let money = ref(1000);
let car = reactive({
  brand: '保时捷',
  price: 1000000
});

// 向后代分别提供money和car
provide('moneyContext', { money, updateMoney });
provide('car', car);

function updateMoney(value: number) {
  money.value -= value;
}

</script>
<style scoped>
.father {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

</style>