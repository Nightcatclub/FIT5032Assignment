<template>
  <div class="register-container">
    <h1 class="text-center">Register</h1>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          id="name"
          v-model="name"
          class="form-control"
          required
        />
        <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          @blur="validateEmail"
          @input="validateEmail"
          class="form-control"
          required
        />
        <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
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

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db, auth } from '../Firebase/init.js'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('student')
const errors = ref({
  name: null,
  email: null,
  password: null,
  confirmPassword: null
})
const router = useRouter()

const validateEmail = () => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value) {
    errors.value.email = 'Email is required'
  } else if (!pattern.test(email.value)) {
    errors.value.email = 'Please enter a valid email address'
  } else {
    errors.value.email = null
  }
}

const validatePassword = () => {
  const minLength = 6
  if (!password.value) {
    errors.value.password = 'Password is required'
  } else if (password.value.length < minLength) {
    errors.value.password = `Password must be at least ${minLength} characters long`
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

const register = () => {
  if (!name.value) {
    errors.value.name = 'Name is required'
    return
  } else {
    errors.value.name = null
  }

  validateEmail()
  validatePassword()
  validateConfirmPassword()

  if (!errors.value.email && !errors.value.password && !errors.value.confirmPassword) {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('Firebase register successful!')

        setDoc(doc(db, 'users', user.uid), {
          name: name.value,
          email: email.value,
          role: role.value
        }).then(() => {
          localStorage.setItem('userRole', role.value)
          localStorage.setItem('username', name.value)
          localStorage.setItem('email', email.value)
          router.push('/home')
        }).catch((error) => {
          console.error('Error writing document: ', error)
        })
      })
      .catch((error) => {
        console.log('Error:', error.message)
      })
  }
}
</script>

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
