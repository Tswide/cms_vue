<template>
  <header class="absolute inset-x-0 top-0 z-50">
    <nav class="mx-auto flex max-w-7xl items-center justify-between lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-20 w-auto" :src="logo" alt="" />
        </a>
      </div>
      <FlyoutMenu />
      <div class="lg:flex lg:flex-1 flex-0 lg:justify-end sm: mr-2">
        <a href="/dashboard">
          <UserIcon class="h-6 w-6" aria-hidden="true" />
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { UserIcon } from '@heroicons/vue/24/outline'
import logo from '../../assets/logo/Logo.png'
import FlyoutMenu from './FlyoutMenu.vue';
</script>
