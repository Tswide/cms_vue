<template>
  <form class="hidden lg:block">
    <Disclosure as="div" v-for="section in filters" :key="section.id" class="border-b border-gray-200 py-6" v-slot="{ open }">
      <h3 class="-my-3 flow-root">
        <DisclosureButton class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
          <span class="font-medium text-gray-900">{{ section.name }}</span>
          <span class="ml-6 flex items-center">
            <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
            <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
          </span>
        </DisclosureButton>
      </h3>
      <DisclosurePanel class="pt-6">
        <div class="space-y-4" v-if="section.id === 'color'">
          <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
            <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" type="checkbox" :checked="option.checked" class="h-4 w-4 rounded border-gray-300 text-[#6A9156] focus:ring-[#6A9156]" @change="selectColor(option.value)" />
            <label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-600">{{ option.label }}</label>
          </div>
        </div>
        <div class="space-y-4" v-else>
          <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
            <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" type="checkbox" :checked="option.checked" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" @change="selectCategory(option.value)" />
            <label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-600">{{ option.label }}</label>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </form>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { PlusIcon, MinusIcon } from '@heroicons/vue/20/solid'
import { getCurrentInstance } from 'vue'

const props = defineProps({
  filters: {
    type: Array,
    required: true
  }
})

const instance = getCurrentInstance();

const selectCategory = (category) => {
  // Émettre un événement avec la catégorie sélectionnée
  instance.emit('categorySelected', category);
}

const selectColor = (color) => {
  // Émettre un événement avec la couleur sélectionnée
  instance.emit('colorSelected', color);
}
</script>
