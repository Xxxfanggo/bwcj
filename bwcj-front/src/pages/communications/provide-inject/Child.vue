<template>
  <div class="child">
    <h3>子组件1</h3>
    <GrandChild />
  </div>
</template>
<script setup lang="ts">
  import GrandChild from './GrandChild.vue';
</script>
<style scoped>
.child {
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, #eaec70 0%, #ecd611 100%);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

</style>