<template>
  <h1 class="mb-4">Sign In</h1>
  <div
    class="text-white text-center font-bold p-4 mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ login_alert_msg }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <div class="form-outline mb-4">
      <vee-field
        type="email"
        name="email"
        class="form-control form-control"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-danger" name="email" />
    </div>
    <div class="mb-4">
      <vee-field
        type="password"
        name="password"
        class="form-control form-control"
        placeholder="Password"
      />
      <ErrorMessage class="text-danger" name="password" />
    </div>
    <button type="submit" :disabled="login_in_submission" class="btn btn-primary w-100">
      Login
    </button>
    <div class="text-center text-lg-start mt-4 pt-2">
      <p class="small fw-bold mt-2 pt-1 mb-0">
        Don't have an account? Register
        <router-link class="link-primary" :to="{ name: 'signup' }">here</router-link>.
      </p>
    </div>
  </vee-form>
</template>

<script setup>
import { ref } from 'vue'
import storageService from '@/services/storage.service'
import useAuthStore from '@/stores/auth'

const authStore = useAuthStore()

const loginSchema = {
  email: 'required|email',
  password: 'required'
}
const login_in_submission = ref(false)
const login_show_alert = ref(false)
const login_alert_variant = ref('bg-primary')
const login_alert_msg = ref('Please wait! We are logging you in.')

const login = async (values) => {
  login_show_alert.value = true
  login_in_submission.value = true
  login_alert_variant.value = 'bg-primary'
  login_alert_msg.value = 'Please wait! We are logging you in.'

  try {
    const result = await authStore.signin(values)
    if (result.token === 'not found') {
      login_in_submission.value = false
      login_alert_variant.value = 'bg-danger'
      login_alert_msg.value = 'Login details not found.'
      return
    }
    if (result.token === 'invalid') {
      login_in_submission.value = false
      login_alert_variant.value = 'bg-danger'
      login_alert_msg.value = 'Invalid login details.'
      return
    }

    login_alert_variant.value = 'bg-success'
    login_alert_msg.value = 'Success! You are now logged in.'
    storageService.setLocalStorage('auth', true)
    setTimeout(() => {
      window.location.reload()
    }, 500)
  } catch (error) {
    login_in_submission.value = false
    login_alert_variant.value = 'bg-danger'
    login_alert_msg.value = 'Invalid login details.'
    return
  }
}
</script>
