<template>
  <Popover class="relative">
    <PopoverButton class="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
      <span>Produits</span>
      <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
    </PopoverButton>

    <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
      <PopoverPanel class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
        <div class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
          <div class="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
            <div v-for="category in categories" :key="category.id" class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
              <div>
                <a @click.prevent="goToCategory(category.title)" class="font-semibold text-gray-900">
                  {{ category.title }}
                  <span class="absolute inset-0" />
                </a>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-8 py-6">
            <div class="flex items-center gap-x-3">
              <a href="/articles">
                <h3 class="text-sm font-semibold leading-6 text-[#6A9156] hover:text-[#547643]">Tout les produits</h3>
              </a>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
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