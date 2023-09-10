import { createRouter, createWebHistory } from 'vue-router'
import storageService from '@/services/storage.service'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'

const Signin = () =>
  import(/* webpackChunkName: "groupedChunk" */ '@/components/forms/SigninForm.vue')
const Signup = () =>
  import(/* webpackChunkName: "groupedChunk" */ '@/components/forms/SignupForm.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/auth',
    redirect: { name: 'signin' }
  },
  {
    path: '/auth',
    component: AuthView,
    children: [
      {
        path: 'signin',
        name: 'signin',
        component: Signin
      },
      {
        path: 'signup',
        name: 'signup',
        component: Signup
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'signin' }
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = storageService.getLocalStorage('auth')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'signin' })
  } else if (!to.meta.requiresAuth && isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})
export default router
