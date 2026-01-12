<template>
  <div class="news">
    <!-- 导航区  -->
    <ul class="news-title">
      <li v-for="news in newsList" :key="news.id">
        <!-- query 传递参数 -->
        <!-- 写法一 -->
        <!-- <RouterLink :to="`/news/detail?id=${news.id}&title=${news.title}&content=${news.content}`">{{ news.title }}</RouterLink> -->
        <!-- 写法二 -->
        <!-- <RouterLink :to="{path: '/news/detail', query: {id: news.id, title: news.title, content: news.content}}">{{ news.title }}</RouterLink> -->
        <!-- 写法三 -->
         <RouterLink :to="{name: 'detail', query: {id: news.id, title: news.title, content: news.content}}" :class="{ active: news.id === activeNewsId }">{{ news.title }}</RouterLink>
         <!-- params 传递参数 -->
          <!-- 
            {
              name: 'xinwen',
              path: '/news',
              component: News,
              children: [
                {
                  name: 'detail',
                  path: 'detail/:id/:title/:content', !!! 占位符 :content? 加问号表示可传可不传
                  component: Detail,
                }
              ]
            }
          -->
          <!-- <RouterLink to="/news/detail/haha/nihao/xixi">{{ news.title }}</RouterLink> -->
           <!-- path 不能和 params 一起使用 ！！params不能传数组和对象-->
         <!-- <RouterLink :to="{name: 'detail', params: {id: news.id, title: news.title, content: news.content}}">{{ news.title }}</RouterLink> -->
      </li>
    </ul>
    <!-- 展示区 -->
    <div class="news-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface NewsItem {
  id: string;
  title: string;
  content: string;
}

const router = useRouter();
const activeNewsId = ref('');

const newsList: NewsItem[] = [
  { id: 'asdfasd01', title: '科技巨头发布全新AI模型', content: '该模型在自然语言处理方面取得重大突破，能够更准确地理解和生成人类语言。' },
  { id: 'asdfasd02', title: '新能源汽车市场持续增长', content: '随着环保意识提升和技术进步，新能源汽车销量再创新高，预计未来几年仍将保持强劲增长势头。' },
  { id: 'asdfasd03', title: '全球气候峰会达成重要协议', content: '各国代表就减排目标和可再生能源发展达成共识，这是应对气候变化的重要一步。' },
  { id: 'asdfasd04', title: '太空探索迎来新里程碑', content: '最新火星探测器成功着陆并传回珍贵图像数据，为人类深入了解火星提供了宝贵资料。' },
  { id: 'asdfasd05', title: '医疗技术革新助力健康事业', content: '新型基因编辑技术和个性化治疗方案为许多疑难病症带来了新的希望。' }
];

onMounted(() => {
  // 如果当前没有选中的新闻，则默认跳转到第一条新闻
  if (!router.currentRoute.value.query.id) {
    const firstNews = newsList[0];
    router.replace({
      name: 'detail',
      query: {
        id: firstNews.id,
        title: firstNews.title,
        content: firstNews.content
      }
    });
    activeNewsId.value = firstNews.id;
  } else {
    // 设置当前激活的新闻ID
    activeNewsId.value = router.currentRoute.value.query.id as string;
  }
});

// 监听路由变化，更新激活的新闻ID
router.afterEach((to) => {
  if (to.name === 'detail' && to.query.id) {
    activeNewsId.value = to.query.id as string;
  }
});
</script>

<style scoped>
.news {
  display: flex;
  gap: 20px;
  height: 100%;
}

.news-title {
  width: 300px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: calc(100vh - 200px);
}

.news a {
  text-decoration: none;
  color: #9852e9;
  font-weight: bold;
  display: block;
  padding: 12px 15px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.news a:hover {
  background-color: #f0e6ff;
  color: #7e3fc2;
  transform: translateX(5px);
}

.news a.active {
  background-color: #a465ec;
  color: white;
}

.news ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.news li {
  margin-bottom: 10px;
}

.news li:last-child {
  margin-bottom: 0;
}

.news-content {
  flex: 1;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: calc(100vh - 200px);
}

@media (max-width: 768px) {
  .news {
    flex-direction: column;
  }
  
  .news-title {
    width: 100%;
    max-height: 300px;
  }
}
</style>