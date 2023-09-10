import AuthService from '@/services/auth.service'
import { defineStore } from 'pinia'

export default defineStore('auth', {
  state: () => {
    return {
      authModalShow: false,
      userLoggedIn: false
    }
  },
  mutations: {
    toggleAuthModal(state) {
      state.authModalShow = !state.authModalShow
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn
    }
  },
  actions: {
    async signin(values) {
      const result = await AuthService.signin(values)
      return result
    },
    async signup(values) {
      const result = await AuthService.signup(values)
      return result
    },
    async get_current_user() {
      const user = await AuthService.currentUser()
      return user
    },
    async signout() {
      await AuthService.signout()
    }
  }
})
