<template>
  <ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8 mb-10">
    <li v-for="file in files" :key="file.source" class="relative">
      <div class="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-[#6A9156] focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <img :src="file.source" alt="" class="pointer-events-none object-cover group-hover:opacity-75" />
        <button @click="selectFile(file.id)" type="button" class="absolute inset-0 focus:outline-none">
          <span class="sr-only">View details for {{ file.title }}</span>
        </button>
      </div>
      <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{{ file.title }}</p>
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';
import noImage from '../../../assets/header/noImage.png';
import multiImage from '../../../assets/header/multiImage.png';
import uniqueImage from '../../../assets/header/uniqueImage.png';

const files = [
  {
    id: 0,
    title: "Header no-image",
    source: noImage
  },
  {
    id: 1,
    title: "Header Single Image",
    source: uniqueImage
  },
  {
    id: 2,
    title: "Header Multi Image",
    source: multiImage
  },
];

const emit = defineEmits(['fileSelected']);

const selectFile = (id) => {
  emit('fileSelected', id);
};
</script>
