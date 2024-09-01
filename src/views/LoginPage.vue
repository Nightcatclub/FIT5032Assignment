<template>
  <div class="login-container">
    <h1 class="text-center">Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          @blur="validateUsername"
          @input="validateUsername"
          class="form-control"
          required
        />
        <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          @blur="validatePassword"
          @input="validatePassword"
          class="form-control"
          required
        />
        <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
      </div>
      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
    <p class="text-center mt-3">
      Don't have an account? <router-link to="/register">Register here</router-link>.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const errors = ref({
  username: null,
  password: null
})
const router = useRouter()

const validateUsername = () => {
  const pattern = /^[a-zA-Z0-9]*$/
  if (!username.value) {
    errors.value.username = 'Username is required'
  } else if (!pattern.test(username.value)) {
    errors.value.username = 'Username can only contain letters and numbers'
  } else {
    errors.value.username = null
  }
}

const validatePassword = () => {
  const pattern = /^[a-zA-Z0-9]*$/
  if (!password.value) {
    errors.value.password = 'Password is required'
  } else if (!pattern.test(password.value)) {
    errors.value.password = 'Password can only contain letters and numbers'
  } else {
    errors.value.password = null
  }
}

const handleLogin = () => {
  validateUsername()
  validatePassword()

  if (!errors.value.username && !errors.value.password) {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(
      (user) => user.username === username.value && user.password === password.value
    )

    if (user) {
      localStorage.setItem('userRole', user.role)
      localStorage.setItem('username', username.value)
      router.push('/home')
    } else {
      alert('Please enter vaild Username and Password')
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f8f9fa;
}
</style>
