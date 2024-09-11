<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center space-x-4">
      <li>
        <div>
          <a href="/categorie" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" aria-current="category">Categories</a>
        </div>
      </li>
      <li v-for="(page, index) in pages" :key="index">
        <div class="flex items-center">
          <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          <a :href="page.href" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" :aria-current="page.current ? 'page' : undefined">{{ page.name }}</a>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'

const route = useRoute()
const router = useRouter()

const pages = ref([])

const updateBreadcrumbs = () => {
  const matched = route.matched
  const breadcrumbs = []

  matched.forEach((routeRecord, index) => {
    const breadcrumb = {
      name: typeof routeRecord.meta.breadcrumb === 'function'
        ? routeRecord.meta.breadcrumb(route)
        : routeRecord.meta.breadcrumb || routeRecord.name,
      href: router.resolve({ name: routeRecord.name, params: route.params }).href,
      current: index === matched.length - 1
    }
    breadcrumbs.push(breadcrumb)
  })

  pages.value = breadcrumbs
}

watch(route, updateBreadcrumbs, { immediate: true })

updateBreadcrumbs()
</script>
