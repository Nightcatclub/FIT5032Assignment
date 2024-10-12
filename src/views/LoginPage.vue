<template>
  <div class="login-container">
    <h1 class="text-center">Login</h1>
    <form @submit.prevent="signin">
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
      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
    <div v-if="authError" class="text-danger mt-3 text-center">{{ authError }}</div>

    <p class="text-center mt-3">
      Don't have an account? <router-link to="/register">Register here</router-link>.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../Firebase/init.js'

const email = ref('')
const password = ref('')
const errors = ref({
  email: null,
  password: null
})
const authError = ref(null)
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
  if (!password.value) {
    errors.value.password = 'Password is required'
  } else if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters long'
  } else {
    errors.value.password = null
  }
}

const signin = () => {
  validateEmail()
  validatePassword()

  if (!errors.value.email && !errors.value.password) {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user

        getDoc(doc(db, 'users', user.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data()
            const userRole = userData.role 
            const userName = userData.name
            const userEmail = userData.email
            localStorage.setItem('userRole', userRole)
            localStorage.setItem('username', userName)
            localStorage.setItem('email', userEmail)
            router.push('/home')
          } else {
            console.log('No such document!')
            authError.value = 'No user data found.'
          }
        }).catch((error) => {
          console.log('Error getting document:', error)
          authError.value = 'Error retrieving user data.'
        })
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          authError.value = 'Incorrect password. Please try again.'
        } else if (error.code === 'auth/user-not-found') {
          authError.value = 'No user found with this email.'
        } else {
          authError.value = 'Login failed. Please try again.'
        }
      })
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
