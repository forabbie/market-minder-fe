<template>
  <!-- Registration Form -->
  <h1 class="mb-4">Sign Up</h1>
  <div
    class="text-white text-center font-bold p-4 mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form :validation-schema="schema" @submit="register">
    <!-- Name -->
    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="form-outline">
          <vee-field
            name="fname"
            type="text"
            class="form-control form-control"
            placeholder="Enter Last Name"
          />
          <ErrorMessage class="text-danger" name="fname" />
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="form-outline">
          <vee-field
            name="lname"
            type="text"
            class="form-control form-control"
            placeholder="Enter First Name"
          />
          <ErrorMessage class="text-danger" name="lname" />
        </div>
      </div>
    </div>
    <!-- Email -->
    <div class="mb-4">
      <vee-field
        name="email"
        type="email"
        class="form-control form-control"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-danger" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-4">
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          placeholder="Password"
          class="form-control form-control"
          v-bind="field"
        />
        <div class="text-danger" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-4">
      <vee-field
        name="confirm_password"
        type="password"
        class="form-control form-control"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-danger" name="confirm_password" />
    </div>
    <button
      type="submit"
      class="btn btn-primary btn-block mb-4 w-100"
      :disabled="reg_in_submission"
    >
      Submit
    </button>
    <div class="text-center text-lg-start mt-4 pt-2">
      <p class="small fw-bold mt-2 pt-1 mb-0">
        Already have an account? Log in
        <router-link class="link-primary" :to="{ name: 'signin' }"> here</router-link>.
      </p>
    </div>
  </vee-form>
</template>

<script setup>
import useAuthStore from '@/stores/auth'
import storageService from '@/services/storage.service'
import { ref } from 'vue'

const authStore = useAuthStore()

const schema = {
  email: 'required|min:3|max:100|email',
  password: 'required|min:9|max:100|excluded:password',
  confirm_password: 'password_mismatch:@password'
}
const reg_in_submission = ref(false)
const reg_show_alert = ref(false)
const reg_alert_variant = ref('bg-primary')
const reg_alert_msg = ref('Please wait! Your account is being created.')

const register = async (values) => {
  reg_show_alert.value = true
  reg_in_submission.value = true
  reg_alert_variant.value = 'bg-primary'
  reg_alert_msg.value = 'Please wait! Your account is being created.'

  try {
    await authStore.signup(values)
    reg_alert_variant.value = 'bg-success'
    reg_alert_msg.value = 'Success! Your account has been created.'
    storageService.setLocalStorage('auth', true)
    setTimeout(() => {
      window.location.reload()
    }, 500)
  } catch (error) {
    if (error.response.data.email) {
      reg_in_submission.value = false
      reg_alert_variant.value = 'bg-danger'
      let field = 'Email'
      reg_alert_msg.value = `${field} has already been taken.`
      return
    }
    reg_in_submission.value = false
    reg_alert_variant.value = 'bg-danger'
    reg_alert_msg.value = 'An unexpected error occured. Please try again later.'
    return
  }
}
</script>
