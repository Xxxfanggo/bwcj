<template>
  <div class="father">
    <h3>父组件</h3>
    <div class="content">
      <Category title="子组件1">
        <template #header>
          Conditional slot header
        </template>
        <span>slot</span>
        <!-- 两种写法 -->
        <!-- <template v-slot:footer>
                <div>
                  named slot
                </div>
              </template> -->
        <template #footer>
          <div>
            named slot footer
          </div>
        </template>
      </Category>
      <Category title="子组件2">
        <template v-slot:[dynamicSlotName]>
          dynamicSlotName
        </template>
        <!-- 缩写为 -->
        <!-- <template #[dynamicSlotName]>
              ...
            </template> -->
      </Category>
      <Category title="子组件3">
        <template v-slot="scopedSlot">
          {{ scopedSlot.text }}
          {{ scopedSlot.count }}
        </template>
      </Category>
      <!-- 可解构 -->
      <!-- <Category title="子组件3" v-slot="{text, count}">
          {{ text }} 
          {{ count }}
        </Category> -->
      <Category title="子组件4">
        <template v-slot:scoped="scopedSlot">
          {{ scopedSlot.game }}
        </template>
      </Category>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Category from './Category.vue'

let dynamicSlotName = ref('footer');

</script>
<style scoped>
.father {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #7a8ee6 0%, #8263a1 100%);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.content {
  display: flex;
  justify-content: space-around;
  height: 60%;
}
</style>