<template>
  <div class="article" @click="handleClick">
    <div class="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
      <img :src="product.images[0]" :alt="product.title" class="h-full w-full object-cover object-center sm:h-full sm:w-full" />
    </div>
    <div class="flex flex-1 flex-col space-y-2 p-4">
      <h3 class="text-sm font-medium text-gray-900">
        <a href="#">
          <span aria-hidden="true" class="absolute inset-0" />
          {{ product.title }}
        </a>
      </h3>
      <p class="text-sm text-gray-500">{{ product.description }}</p>
      <div class="flex flex-1 flex-col justify-end">
        <p class="text-base font-medium text-gray-900">{{ product.price }} €</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    product: {
      type: Object,
      required: true
    },
    categoryName: {
      type: String,
      required: true
    },
  },
  methods: {
    handleClick() {
      if (this.categoryName) {
        const route = `${this.product.title.replace(/\s+/g, '-')}`;
        this.$emit('onArticleClick', route);
      } else {
        console.error("Category name is undefined.");
      }
    }
  }
}
</script>
