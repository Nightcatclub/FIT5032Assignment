import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import RatingPage from '@/views/RatingPage.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
    meta: { hideHeader: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { hideHeader: true }
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/rating',
    name: 'Rating',
    component: RatingPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('userRole')
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
