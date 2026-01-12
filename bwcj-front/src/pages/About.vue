<template>
  <div class="about">
    <div class="about-box">
      <div class="about-navigate">
        <div>组件通信</div>
        <ul>
          <li>props</li>
          <li>custom-event</li>
          <li>mitt</li>
          <li>v-model</li>
          <li>$attrs</li>
          <router-link to="/about/refsParent">$refs-$parent</router-link>
          <br />
          <router-link to="/about/provideInject">provide-inject</router-link>
          <br />
          <router-link to="/piniaView">pinia</router-link>
          <br />
          <router-link to="/about/slot">slot</router-link>
        </ul>
      </div>
      <router-view name="Communication"></router-view>
    </div>
    <div class="about-box">
      <div class="about-navigate">
        <div>api</div>
        <ul>
          <li>shallowRef: 只处理第一层的响应式数据</li>
          <li>shallowReactive: 只处理第一层的响应式数据</li>
          <li>readOnly和shallowReadOnly: </li>
        </ul>
      </div>
      <router-view name="api"></router-view>
    </div>
  </div>
</template>
<script setup="ts">
</script>
<style scoped>
.about-box {
  display: flex;
  margin: 10px 0;
}

.about-navigate {
  background: linear-gradient(135deg, #a9b4e6 0%, #886ba5 100%);
  box-shadow: 0 4px 6px rgba(190, 18, 18, 0.1);
  border-radius: 10px;
  width: 400px;
  margin-right: 20px;
  padding: 10px;
}
</style>