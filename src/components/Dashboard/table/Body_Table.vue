<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="relative">
            <div v-if="selectedItems.length > 0" class="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
              <button type="button" class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">Delete all</button>
            </div>
            <table class="min-w-full table-fixed divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" class="relative px-7 sm:w-12 sm:px-6">
                    <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-[#6A9156] focus:ring-[#6A9156]" :checked="indeterminate || selectedItems.length === items.length" :indeterminate="indeterminate" @change="toggleAll($event)" />
                  </th>
                  <th v-for="(header, index) in titleHeaderTab" :key="index" scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    {{ header }}
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="item in props.items" :key="item.id" :class="[selectedItems.includes(item.id) && 'bg-gray-50']">
                  <td class="relative px-7 sm:w-12 sm:px-6">
                    <div v-if="selectedItems.includes(item.id)" class="absolute inset-y-0 left-0 w-0.5 bg-[#6A9156]"></div>
                    <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-[#6A9156] focus:ring-[#6A9156]" :value="item.id" v-model="selectedItems" />
                  </td>
                  <td :class="['whitespace-nowrap py-4 px-3 text-sm font-medium', selectedItems.includes(item.id) ? 'text-[#6A9156]' : 'text-gray-900']">
                    {{ item.id }}
                  </td>
                  <td v-if="isDashboardArticle" class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <img :src="item.images[0]" alt="Image" class="h-10 w-10 object-cover">
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ item.title }}
                  </td>
                  <td v-if="isDashboardArticle" class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ item.description }}
                  </td>
                  <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                    <a href="#" class="text-[#6A9156] hover:text-indigo-900">
                      Edit<span class="sr-only">, {{ item.id }}</span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';

const selectedItems = ref([]);
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  isDashboardArticle: {
    type: Boolean,
    required: true
  }
});

const titleHeaderTab = computed(() => {
  return props.isDashboardArticle
    ? ['ID', 'Photo', 'Title', 'Description']
    : ['ID', 'Title'];
});

const indeterminate = computed(() => selectedItems.value.length > 0 && selectedItems.value.length < (props.items ? props.items.length : 0));

const toggleAll = (event) => {
  selectedItems.value = event.target.checked ? (props.items ? props.items.map(item => item.id) : []) : [];
};
</script>
