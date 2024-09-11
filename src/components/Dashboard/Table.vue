<template>
  <HeaderTable @open-modal="openModal" :is-dashboard-article="isDashboardArticle" />
  <Popup :open="open" @close-modal="closeModal">
    <FormCategory :addCategory="props.addCategory" />
  </Popup>
  <BodyTable :items="props.items" :is-dashboard-article="isDashboardArticle" />
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import HeaderTable from './table/Header_Table.vue';
import BodyTable from './table/Body_Table.vue';
import Popup from '../Parts/Popup.vue';
import FormCategory from './category/FormCategory.vue';

const open = ref(false);
const route = useRoute();

const openModal = () => {
  open.value = true;
};

const closeModal = () => {
  open.value = false;
};

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  addCategory: {
    type: Function
  }
});

const isDashboardArticle = computed(() => route.path === '/dashboard-article');

console.log(props.items);
console.log(props.addCategory);
</script>
