<template>
  <div >
    sum: {{ sum }}
    <button @click="add"> sum + 1</button>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

let sum = shallowRef(0)
function add() {
  sum.value++
}
</script>

<style scoped>
    
</style>