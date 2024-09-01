<script setup>
import BHeader from './components/BHeader.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const showHeader = ref(!route.meta.hideHeader)

watch(
  () => route.meta.hideHeader,
  (newValue) => {
    showHeader.value = !newValue
  }
)
</script>

<template>
  <header v-if="showHeader">
    <BHeader />
  </header>

  <main class="main-box">
    <router-view></router-view>
  </main>
</template>

<style scoped>
.main-content {
  padding: 20px;
}

@media (max-width: 576px) {
  .main-content {
    padding: 10px;
    font-size: 14px;
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  .main-content {
    padding: 15px;
    font-size: 16px;
  }
}

@media (min-width: 769px) {
  .main-content {
    padding: 20px;
    font-size: 18px;
  }
}
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #be3a81;
  border-radius: 10px;
}
</style>
