<template>
  <div class="talk-container">
    <div class="header">
      <h2>标题</h2>
      <button @click="getTalk" class="get-talk-btn">获取文章标题</button>
    </div>
    <ul class="talk-list">
      <li v-for="item in talkList" :key="item.id" class="talk-item">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTalkStore } from '@/store/talk'
import { storeToRefs } from 'pinia';
const talkStore = useTalkStore()
const { talkList } = storeToRefs(talkStore)

talkStore.$subscribe((mutate, state) => {
  // 持久化
  localStorage.setItem('talkList', JSON.stringify(state.talkList))
})
function getTalk() {
  talkStore.getTalk()
}

</script>
<style scoped>
.talk-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  font-family: 'Microsoft YaHei', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.header h2 {
  color: white;
  margin: 0;
  font-size: 1.8rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.get-talk-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.get-talk-btn:hover {
  background-color: #ff5252;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.get-talk-btn:active {
  transform: translateY(0);
}

.talk-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.talk-item {
  background-color: rgba(255, 255, 255, 0.9);
  margin-bottom: 12px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in;
  transition: transform 0.2s ease;
}

.talk-item:hover {
  transform: translateX(5px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .talk-container {
    margin: 10px;
    padding: 15px;
  }

  .header {
    flex-direction: column;
    text-align: center;
  }

  .header h2 {
    font-size: 1.5rem;
  }
}
</style>