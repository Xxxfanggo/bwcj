<template>
  <div class="category">
    <h2>{{title}}</h2>
    <div class="header" v-if="$slots.header">
      <slot name="header" >Conditional Slots default value</slot>
    </div>
    <slot>default value</slot>
    <slot text="greetingMessage" :count="1"></slot>
    <slot name="scoped" game="lol" ></slot>
    <div class="footer">
      <slot name="footer" v-if="$slots.footer">Named Slots default value</slot>
    </div>
  </div>
</template>
<script setup lang="ts">

defineProps(['title'])

</script>
<style scoped>
  .category {
    width: 150px;
    height: 100%;
    background: linear-gradient(135deg, #a1e2b2 0%, #a675d8 100%);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 10px;
  }

  .category:hover {
    background: linear-gradient(135deg, #7ce297 0%, #8a45cf 100%);
    transform: translateY(5px);
    cursor: pointer;
  }

  .footer {
    position:relative;
    top: 40px;
  }

</style>