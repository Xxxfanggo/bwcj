<template>
  <div class="father">
    <h2>父组件</h2>
    <h4>房产：{{ house }}</h4>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

let house = ref(4);
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