<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">{{ Title }}</h1>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          @click="$emit('open-modal')"
          type="button"
          class="block rounded-md bg-[#6A9156] px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#547643] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#547643]"
        >Add {{ Title }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';
const props = defineProps({

  isDashboardArticle: {
    type: Boolean,
    required: true
  }
});
const Title = computed(() => {
  return props.isDashboardArticle ? 'Articles' : 'Categories';
});
</script>