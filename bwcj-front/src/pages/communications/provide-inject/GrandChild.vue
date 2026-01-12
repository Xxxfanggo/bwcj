<template>
  <div class="grandChild">
    <h3>孙子组件</h3>
    <span>父money：  {{ money }}</span>
    <br/>
    <span>父car：  {{ car.brand }}, price: {{ car.price }}</span>
    <button @click="updateMoney(2)">updateFatherMoney</button>
  </div>
</template>
<script setup lang="ts">
  import { inject } from 'vue';

  let {money, updateMoney} = inject('moneyContext', {money: 0, updateMoney: (param: number) => {}});
  let car = inject<{ brand: string, price: number }>('car', { brand: '', price: 0 });
</script>
<style scoped>
.grandChild {
  width: 100%;
  height: 90px;
  background: linear-gradient(135deg, #f19b90 0%, #f15525 100%);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

</style>