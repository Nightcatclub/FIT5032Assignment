<template>
  <div class="home-container">
    <h1>Welcome, {{ username }}!!!</h1>
    <p>
      Welcome <strong>{{ userRole }} {{ username }}</strong> to home page.
    </p>
    <p>Your email: {{ email }}</p>
    <button @click="logout" class="btn btn-primary me-2">Logout</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userRole = ref(localStorage.getItem('userRole') || 'Not login in')
const username = ref(localStorage.getItem('username')) 
const email = ref(localStorage.getItem('email')) 
const router = useRouter()

const logout = () => {
  localStorage.removeItem('userRole')
  localStorage.removeItem('username')
  localStorage.removeItem('email')
  router.push('/')
}
</script>

<style scoped>
.home-container {
  text-align: center;
  padding: 2rem;
}
</style>
