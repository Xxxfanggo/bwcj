<template>
  <div class="news-detail">
    <h2 class="title">{{ query.title }}</h2>
    <div class="detail-card">
      <div class="detail-item">
        <span class="value">{{ query.id }}</span>
      </div>
      <div class="detail-item content-item">
        <span class="value">{{ query.content }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const {query} = toRefs(route);

</script>

<style scoped>
.news-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  color: #667eea;
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
}

.detail-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  transition: box-shadow 0.3s ease;
}

.detail-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.detail-item {
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  text-align: center;
}

.detail-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.label {
  font-weight: bold;
  color: #333;
  width: 80px;
  flex-shrink: 0;
}

.value {
  color: #666;
  flex: 1;
}

.content-item .value {
  line-height: 1.6;
}

@media (max-width: 768px) {
  .news-detail {
    padding: 10px;
  }
  
  .detail-card {
    padding: 20px;
  }
  
  .detail-item {
    flex-direction: column;
  }
  
  .label {
    width: auto;
    margin-bottom: 5px;
  }
}
</style>