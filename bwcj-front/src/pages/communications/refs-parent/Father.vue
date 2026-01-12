<template>
  <div class="father">
    <h2>父组件</h2>
    <button @click="changeToy">修改child1的玩具</button>
    <button @click="addAllchildBook($refs)">获取所有child</button>
    <h4>房产：{{ house }}</h4>
    <Child1 ref="c1"/>
    <Child2 ref="c2"/>
  </div>
</template>
<script setup lang="ts">
import Child1 from './Child1.vue';
import Child2 from './Child2.vue';
import { ref } from 'vue';

let house = ref(4);
let c1 = ref()
function changeToy() {
  c1.value.toy = '葫芦娃';
}
function addAllchildBook(refs: Record<string, any>) {
  for (const key in refs) {
    if (Object.hasOwnProperty.call(refs, key)) {
      const element = refs[key];
      element.book += 1;
    }
  }
}

defineExpose({ house });

</script>
<style scoped>
.father {
  width: 100%;
  height: 60%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

</style>