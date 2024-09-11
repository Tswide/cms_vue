<template>
  <div class="bg-white z-50">
    <div class="py-16 sm:py-24 xl:mx-auto xl:max-w-7xl xl:px-8">
      <div class="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Shop by Category</h2>
        <a href="/categorie" class="hidden text-sm font-semibold text-[#6A9156] hover:text-[#547643] sm:block">
          Browse all categories
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>

      <div class="mt-4 flow-root">
        <div class="-my-2">
          <div class="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
            <div class="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
              <a
                v-for="category in categories.slice(0, 5)"
                :key="category.title"
                @click.prevent="goToCategory(category.title)"
                class="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                style="cursor: pointer"
              >
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

      <div class="mt-6 px-4 sm:hidden">
        <a href="/categorie" class="block text-sm font-semibold text-[#6A9156] hover:text-[#547643]">
          Browse all categories
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

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
