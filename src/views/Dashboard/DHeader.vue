<template>
  <Navbar :selectedFileId="selectedFileId" :formData="formData" />
  <Selecteur @fileSelected="handleFileSelected" />
  <Formulaire :selectedId="selectedFileId" @submitForm="handleFormSubmit" />
</template>

<script>
import { watch, nextTick } from 'vue';
import Navbar from '../../components/Dashboard/header/Navbar.vue';
import Selecteur from '../../components/Dashboard/header/Selecteur.vue';
import Formulaire from '../../components/Dashboard/header/Formulaire.vue';

export default {
  components: {
    Navbar,
    Selecteur,
    Formulaire,
  },
  data() {
    return {
      selectedFileId: null,
      formData: {}
    };
  },
  methods: {
    handleFileSelected(id) {
      this.selectedFileId = id;
    },
    handleFormSubmit(data) {
      this.formData = { ...data };
      nextTick(() => {
        console.log('Form Data Received and DOM Updated:', this.formData);
      });
    },
  },
  mounted() {
    watch(() => this.formData, (newData) => {
      console.log('Updated formData in Parent:', newData);
    }, { deep: true });
  }
};
</script>
