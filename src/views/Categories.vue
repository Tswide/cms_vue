<template>
  <main class="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
    <div class="border-b border-gray-200 pb-10 pt-28">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900">Categories</h1>
    </div>
    <div class="py-10 sm:py-5 xl:mx-auto xl:max-w-7xl">
      <div class="mt-4 flow-root">
        <div class="-my-2">
          <div class="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
            <div class="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
              <a @click.prevent="goToCategory(category.title)" v-for="category in categories" :key="category.title" :href="category.title" class="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto mb-5">
                <span aria-hidden="true" class="absolute inset-0">
                  <img :src="category.image_url" alt="" class="h-full w-full object-cover object-center" />
                </span>
                <span aria-hidden="true" class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50" />
                <span class="relative mt-auto text-center text-xl font-bold text-white">{{ category.title }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import BreadCrumbs from '../components/Parts/BreadCrumbs.vue';

const router = useRouter();
const categories = ref([]);
const isDataLoaded = ref(false);

const fetchCategorie = async () => {
  try {
    const response = await axios.get('/categories.json');
    categories.value = response.data;
    isDataLoaded.value = true;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const goToCategory = (categoryName) => {
  router.push({ name: 'category-page', params: { categoryName } });
};

onMounted(async () => {
  await fetchCategorie();
});
</script>


