import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import RatingPage from '@/views/RatingPage.vue'
import MentalHealthPage from '@/views/MentalHealthPage.vue'
import MentalHealthTestPage from '@/views/MentalHealthTestPage.vue'
import GeoLocation from '@/views/GeoLocation.vue'
import CommunityBoard from '@/views/CommunityBoard.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

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
  },
  {
    path: '/mentalhealth',
    name: 'Mentalhealth',
    component: MentalHealthPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/mental-health-test',
    name: 'Mentalhealthtest',
    component: MentalHealthTestPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/map',
    name: 'GeoLocation',
    component: GeoLocation,
    meta: { requiresAuth: true }
  },
  {
    path: '/community',
    name: 'CommunityBoard',
    component: CommunityBoard,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = getAuth()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next()
      } else {
        next('/')
      }
    })
  } else {
    next()
  }
})

export default router
