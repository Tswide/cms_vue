<template>
  <Table :items="articles" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Table from '../../components/Dashboard/Table.vue';

const articles = ref([]);

const fetchArticles = async () => {
  try {
    const response = await axios.get('/articles.json', { responseType: 'json' });
    articles.value = response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

onMounted(() => {
  fetchArticles();
});
</script>