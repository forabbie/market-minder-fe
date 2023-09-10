<template>
  <main class="main-grid vh-100">
    <app-header />

    <RouterView />
    <app-footer />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>
