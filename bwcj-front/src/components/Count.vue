<template>
  <div class="count">
    <div class="display">
      <h2>当前求和为：<span class="number">{{ sum }}</span></h2>
      <h2>当前求和二倍为：<span class="number">{{ doubleSum }}</span></h2>
    </div>
    <div class="controls">
      <select v-model.number="selectedNumber">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <div class="buttons">
        <button class="btn-add" @click="add">加</button>
        <button class="btn-sub" @click="subtract">减</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCountStore } from '@/store/count'
import { storeToRefs } from 'pinia'

const countStore = useCountStore()
const { sum, doubleSum } = storeToRefs(countStore)


// const sum = ref(0)
const selectedNumber = ref(1)

const add = () => {
  // sum.value += selectedNumber.value
  // 修改方式 1
  // countStore.sum += selectedNumber.value
  // 修改方式 2
  // countStore.$patch({ sum: selectedNumber.value })
  // 修改方式 3
  countStore.increment(selectedNumber.value)
}

const subtract = () => {
  // sum.value -= selectedNumber.value
  countStore.decrement(selectedNumber.value)
}
</script>
<style scoped>
.count {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: 'Arial', sans-serif;
}

.display {
  text-align: center;
  margin-bottom: 20px;
}

.display h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: normal;
}

.number {
  font-weight: bold;
  font-size: 2rem;
  /* display: block; */
  margin-top: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

select {
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: white;
  color: #333;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
  width: 100%;
}

.buttons {
  display: flex;
  gap: 10px;
}

button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

.btn-add {
  background-color: #4caf50;
  color: white;
}

.btn-add:hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.btn-sub {
  background-color: #f44336;
  color: white;
}

.btn-sub:hover {
  background-color: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>