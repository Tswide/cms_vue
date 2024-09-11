<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/Navbar/Navbar.vue'

const route = useRoute()
const isDashboardRoute = () => route.path.startsWith('/dashboard');
</script>

<template>
  <Navbar v-if="!isDashboardRoute()" />
  <RouterView />
</template>
