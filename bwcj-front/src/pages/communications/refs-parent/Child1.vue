<template>
  <div class="child">
    <h3>子组件1</h3>
    <span>玩具：{{ toy }}</span>
     <br/>
    <span>书籍：{{ book }}</span>
    <br/>
    <button @click="minusHouse($parent)">减去父组件house</button>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  let toy = ref('奥特曼')
  let book = ref(5)

  function minusHouse(parent: any) {
    parent.house--
  }
  // 把数据暴露出去
  defineExpose({ toy, book })
</script>
<style scoped>
.child {
  width: 100%;
  height: 40%;
  background: linear-gradient(135deg, #eaec70 0%, #ecd611 100%);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

</style>