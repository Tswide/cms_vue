<template>
  <div class="bg-white">
    <div>
      <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-28">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900">Tout vos meilleurs produits</h1>
          <div class="flex items-center">
            <Sorting :sortOptions="sortOptions" @sort="handleSort" />
          </div>
        </div>
        <section aria-labelledby="products-heading" class="pb-24 pt-6">
          <h2 id="products-heading" class="sr-only">Products</h2>
          <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <Filter :filters="filters" @categorySelected="handleCategorySelected" @colorSelected="handleColorSelected" />
            <div class="lg:col-span-3">
              <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                <div
                  v-for="product in sortedAndFilteredProducts"
                  :key="product.id"
                  class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <Article :product="product" :categoryName="product.title" @onArticleClick="goToArticle" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Article from '../components/Articles/Article.vue'
import Filter from '../components/Product/Filter.vue'
import Sorting from '../components/Product/Sorting.vue'
import { useRouter } from 'vue-router';

const products = ref([])
const filters = ref([])
const router = useRouter();
const selectedCategories = ref([]);
const selectedColors = ref([]);

const fetchProducts = async () => {
  try {
    const response = await axios.get('/articles.json')
    products.value = response.data
    const uniqueColors = new Set(products.value.map(product => product.color));
    const colorOptions = Array.from(uniqueColors).map(color => ({
      value: color,
      label: color,
      checked: false
    }));
    filters.value.push({
      id: 'color',
      name: 'Color',
      options: colorOptions
    });
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const fetchCategories = async () => {
  try {
    const response = await axios.get('/categories.json')
    const categoryOptions = response.data.map(category => ({
      value: category.title,
      label: category.title,
      checked: false
    }))
    filters.value.push({
      id: 'category',
      name: 'Category',
      options: categoryOptions
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

const goToArticle = (product) => {
  console.log(product);
  if (product) {
    const articleName = product.replace(/\s+/g, '-');
    const route = `/articles/${articleName}`;
    router.push(route);
  } else {
    console.error('Product or product title is undefined.');
  }
}

const sortOptions = [
  { name: 'Price: Low to High', value: 'priceAsc', current: false },
  { name: 'Price: High to Low', value: 'priceDesc', current: false },
]

const sortOrder = ref('')

const sortedProducts = computed(() => {
  if (sortOrder.value === 'priceAsc') {
    return [...products.value].sort((a, b) => a.price - b.price)
  } else if (sortOrder.value === 'priceDesc') {
    return [...products.value].sort((a, b) => b.price - a.price)
  }
  return products.value
})

const handleSort = (option) => {
  sortOrder.value = option.value
}

const handleCategorySelected = (category) => {
  const index = selectedCategories.value.indexOf(category);
  if (index === -1) {
    selectedCategories.value.push(category);
  } else {
    selectedCategories.value.splice(index, 1);
  }
}

const handleColorSelected = (color) => {
  if (!selectedColors.value.includes(color)) {
    selectedColors.value.push(color);
  } else {
    selectedColors.value = selectedColors.value.filter(c => c !== color);
  }
}

const sortedAndFilteredProducts = computed(() => {
  let sortedProductsCopy = [...sortedProducts.value];
  if (selectedCategories.value.length > 0) {
    sortedProductsCopy = sortedProductsCopy.filter(product => selectedCategories.value.includes(product.category));
  }
  if (selectedColors.value.length > 0) {
    sortedProductsCopy = sortedProductsCopy.filter(product => selectedColors.value.includes(product.color));
  }
  return sortedProductsCopy;
});

onMounted(async () => {
  await fetchProducts();
  await fetchCategories();
});
</script>
