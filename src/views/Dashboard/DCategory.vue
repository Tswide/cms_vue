<template>
  <Table :items="categories" :add-category="addCategory" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Table from '../../components/Dashboard/Table.vue';

const categories = ref([]);

const fetchCategories = async () => {
  try {
    const response = await axios.get('/categories.json', { responseType: 'json' });
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const addCategory = async () => {
  try {
    const jsonData = JSON.stringify(categories.value);
    console.log(jsonData, 'test');
    await axios.post('/categories.json', jsonData);
    console.log('Catégories enregistrées avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des catégories :', error);
  }
}

onMounted(() => {
  fetchCategories();
});
</script>
