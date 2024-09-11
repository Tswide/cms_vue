<template>
  <div class="bg-white" v-if="product">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <span class=""></span>
      <BreadCrumbs />
      <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <!-- Image gallery -->
        <TabGroup as="div" class="flex flex-col-reverse">
          <!-- Image selector -->
          <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
            <TabList class="grid grid-cols-4 gap-6">
              <Tab v-for="(image, index) in product.images" :key="index" class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4" v-slot="{ selected }">
                <span class="sr-only">{{ image }}</span>
                <span class="absolute inset-0 overflow-hidden rounded-md">
                  <img :src="image" alt="" class="h-full w-full object-cover object-center" />
                </span>
                <span :class="[selected ? 'ring-[#6A9156]' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']" aria-hidden="true" />
              </Tab>
            </TabList>
          </div>

          <TabPanels class="aspect-h-1 aspect-w-1 w-full">
            <TabPanel v-for="(image, index) in product.images" :key="index">
              <img :src="image" alt="" class="h-full w-full object-cover object-center sm:rounded-lg" />
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <!-- Product info -->
        <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ product.title }}</h1>

          <div class="mt-3">
            <h2 class="sr-only">Product information</h2>
            <p class="text-3xl tracking-tight text-gray-900">{{ product.price }} €</p>
          </div>

          <!-- Reviews -->
          <div class="mt-3" v-if="product.rating !== undefined">
            <h3 class="sr-only">Reviews</h3>
            <div class="flex items-center">
              <div class="flex items-center">
                <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[product.rating > rating ? 'text-[#6A9156]' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
              </div>
              <p class="sr-only">{{ product.rating }} out of 5 stars</p>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="sr-only">Description</h3>
            <div class="space-y-6 text-base text-gray-700">{{ product.description }}</div>
          </div>

          <form class="mt-6">
            <!-- Colors -->
            <div v-if="product.colors">
              <h3 class="text-sm text-gray-600">Color</h3>
              <RadioGroup v-model="selectedColor" class="mt-2">
                <RadioGroupLabel class="sr-only">Choose a color</RadioGroupLabel>
                <span class="flex items-center space-x-3">
                  <RadioGroupOption as="template" v-for="color in product.colors" :key="color.name" :value="color" v-slot="{ active, checked }">
                    <div :class="[color.selectedColor, active && checked ? 'ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', 'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none']">
                      <RadioGroupLabel as="span" class="sr-only">{{ color.name }}</RadioGroupLabel>
                      <span aria-hidden="true" :class="[color.bgColor, 'h-8 w-8 rounded-full border border-black border-opacity-10']" />
                    </div>
                  </RadioGroupOption>
                </span>
              </RadioGroup>
            </div>

            <div class="mt-10 flex">
              <button type="submit" class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-[#6A9156] px-8 py-3 text-base font-medium text-white hover:bg-[#445e37] focus:outline-none focus:ring-2 focus:ring-[#6A9156] focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">Add to bag</button>
              <button type="button" class="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <HeartIcon class="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                <span class="sr-only">Add to favorites</span>
              </button>
            </div>
          </form>

          <section aria-labelledby="details-heading" class="mt-12">
            <h2 id="details-heading" class="sr-only">Additional details</h2>
            <div class="divide-y divide-gray-200 border-t">
              <Disclosure as="div" v-for="(detail, index) in product.details" :key="index" v-slot="{ open }">
                <h3>
                  <DisclosureButton class="group relative flex w-full items-center justify-between py-6 text-left">
                    <span :class="[open ? 'text-[#6A9156]' : 'text-gray-900', 'text-sm font-medium']">{{ detail.name }}</span>
                    <span class="ml-6 flex items-center">
                      <PlusIcon v-if="!open" class="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                      <MinusIcon v-else class="block h-6 w-6 text-indigo-400 group-hover:text-[#547643]" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel as="div" class="prose prose-sm pb-6">
                  <ul role="list">
                    <li v-for="(item, index) in detail.items" :key="index">{{ item }}</li>
                  </ul>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-16">
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/vue'
import { StarIcon } from '@heroicons/vue/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { useRoute } from 'vue-router'
import axios from 'axios'
import BreadCrumbs from '../components/Parts/BreadCrumbs.vue'

const route = useRoute()
const articleName = ref(route.params.articleName)
const product = ref(null)

const fetchProduct = async () => {
  try {
    const response = await axios.get('/articles.json')
    const articles = response.data
    const foundProduct = articles.find(article => article.title === articleName.value)
    product.value = foundProduct

    console.log(product.value)
  } catch (error) {
    console.error('Error fetching product:', error)
  }
}

onMounted(async () => {
  await fetchProduct()
})
</script>
