<template>
  <div class="child">
    <h3>子组件2</h3>
    <span>电脑：{{ pc }}</span>
    <br/>
    <span>书籍：{{ book }}</span>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  let pc = ref(2)
  let book = ref(4)

  defineExpose({ pc, book })
</script>
<style scoped>
.child {
  width: 100%;
  height: 100px;
  background: linear-gradient(135deg, #eaec70 0%, #ecd611 100%);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>