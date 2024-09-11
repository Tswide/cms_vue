<template>
  <div v-if="id !== -1">
    <!-- Les headers -->
    <HeaderNoImage v-if="id === 1 && isDataLoaded" :headerData="header" />
    <HeaderImageUnique v-if="id === 0 && isDataLoaded" :headerData="header" />
    <HeaderImageMulti v-if="id === 2 && isDataLoaded" :headerData="header" />
    <!-- Categories -->
    <Categorie />
  </div>
</template>

<script>
import axios from 'axios';
import Categorie from '../components/Home/Categorie.vue';
import HeaderImageMulti from '../components/Home/HeaderView/HeaderImageMulti.vue';
import HeaderImageUnique from '../components/Home/HeaderView/HeaderImageUnique.vue';
import HeaderNoImage from '../components/Home/HeaderView/HeaderNoImage.vue';

export default {
  components: {
    Categorie,
    HeaderImageMulti,
    HeaderImageUnique,
    HeaderNoImage,
  },
  data() {
    return {
      id: -1,
      header: {
        title: '',
        description: '',
        buttonTitle: '',
        urls: [],
      },
      isDataLoaded: false,
    };
  },
  async created() {
    await this.fetchHeader();
  },
  methods: {
    async fetchHeader() {
      try {
        const response = await axios.get('https://thomas-chardome.be/exam-cms/header.json', { responseType: 'json' });
        this.header = response.data.header;
        this.id = response.data.header.id_header;
        this.isDataLoaded = true;
      } catch (error) {
        console.error('Error fetching header:', error);
      }
    },
  },
};
</script>
