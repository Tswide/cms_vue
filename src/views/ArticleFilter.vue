<template>
  <div class="bg-white">
    <div>
      <main class="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <div class="border-b border-gray-200 pb-10 pt-28">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 mb-5">{{ categoryName }}</h1>
          <BreadCrumbs />
        </div>
        <div class="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <section aria-labelledby="product-heading" class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-4">
            <h2 id="product-heading" class="sr-only">Products</h2>
            <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-4">
              <div
                @click.prevent="goToArticle(product.title)"
                v-for="product in filteredProducts"
                :key="product.id"
                class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <Article :product="product" :onArticleClick="goToArticle" />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import Article from '../components/Articles/Article.vue'
import BreadCrumbs from '../components/Parts/BreadCrumbs.vue'

const route = useRoute()
const router = useRouter()
const categoryName = ref(route.params.categoryName)
const products = ref([])

const filteredProducts = computed(() => {
  return products.value.filter(product => product.category.toLowerCase() === categoryName.value.toLowerCase())
})

const fetchProducts = async () => {
  try {
    const response = await axios.get('/articles.json') // Remplacez par le chemin correct vers votre fichier JSON
    products.value = response.data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const goToArticle = (articleName) => {
  router.push({ name: 'article-page', params: { categoryName: categoryName.value, articleName } });
};

onMounted(async () => {
  await fetchProducts()
})

watch(route, (newRoute) => {
  categoryName.value = newRoute.params.categoryName
})
</script>
