<template>
  <div>
    <img v-for="(dog, index) in dogList" :key="index" :src="dog"/>
  </div>
</template>
<script setup lang="ts">

import useDog from "@/hooks/useDog";

const { dogList, getDog } = useDog();
</script>

<style scoped>
img {
  height: 200px;
  margin-right: 10px;
}
</style>