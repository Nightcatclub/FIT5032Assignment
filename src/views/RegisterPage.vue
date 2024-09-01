<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('student')
const errors = ref({
  username: null,
  password: null,
  confirmPassword: null
})
const router = useRouter()

const validateUsername = () => {
  const pattern = /^[a-zA-Z0-9]*$/
  if (username.value.length < 3) {
    errors.value.username = 'Username must be at least 3 characters'
  } else if (!pattern.test(username.value)) {
    errors.value.username = 'Username can only contain letters and numbers'
  } else {
    errors.value.username = null
  }
}

const validatePassword = () => {
  const minLength = 5
  const hasUppercase = /[A-Z]/.test(password.value)
  const hasLowercase = /[a-z]/.test(password.value)
  const hasNumber = /\d/.test(password.value)
  const pattern = /^[a-zA-Z0-9]*$/

  if (password.value.length < minLength) {
    errors.value.password = `Password must be at least ${minLength} characters long`
  } else if (!pattern.test(password.value)) {
    errors.value.password = 'Password can only contain letters and numbers'
  } else if (!hasUppercase) {
    errors.value.password = 'Password must contain at least one uppercase letter'
  } else if (!hasLowercase) {
    errors.value.password = 'Password must contain at least one lowercase letter'
  } else if (!hasNumber) {
    errors.value.password = 'Password must contain at least one number'
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = () => {
  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Passwords do not match'
  } else {
    errors.value.confirmPassword = null
  }
}

const handleRegister = () => {
  validateUsername()
  validatePassword()
  validateConfirmPassword()

  if (!errors.value.username && !errors.value.password && !errors.value.confirmPassword) {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const CheckuserExists = users.find((user) => user.username === username.value)

    if (CheckuserExists) {
      alert('Username already exists!')
    } else {
      users.push({
        username: username.value,
        password: password.value,
        role: role.value
      })
      localStorage.setItem('users', JSON.stringify(users))
      alert('Registration successful!')
      router.push('/')
    }
  }
}
</script>

<template>
  <div class="register-container">
    <h1 class="text-center">Register</h1>
    <form @submit.prevent="handleRegister">
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
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          @blur="validateConfirmPassword"
          @input="validateConfirmPassword"
          class="form-control"
          required
        />
        <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
      </div>
      <div class="mb-3">
        <label for="role" class="form-label">Role</label>
        <select id="role" v-model="role" class="form-select" required>
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary w-100">Register</button>
    </form>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f8f9fa;
}
</style>
