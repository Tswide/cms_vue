<template>
  <div class="md:flex md:items-center md:justify-between mb-10">
    <div class="min-w-0 flex-1">
      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Header</h2>
    </div>
    <div class="mt-4 flex md:ml-4 md:mt-0">
      <button type="button" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Hide</button>
      <button @click="publish" type="button" class="ml-3 inline-flex items-center rounded-md bg-[#6A9156] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#445e37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#547643]">Publish</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, watchEffect, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const props = defineProps({
  selectedFileId: Number,
  formData: Object
});
const router = useRouter();
watch(() => props.formData, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    console.log('New formData received in Navbar:', newVal);
  }
}, { deep: true });

watchEffect(() => {
  console.log('formData in Navbar:', props.formData);
});

const publish = async () => {
  try {
    const payload = {
      id_header: props.selectedFileId,
      title: props.formData.title,
      description: props.formData.description,
      buttonTitle: props.formData.buttonTitle,
      urls: props.formData.urls
    };
    console.log('Payload:', payload); // Debug log

    const res = await axios.post('https://thomas-chardome.be/exam-cms/update-header.php', payload);
    console.log(res.data.message);
    router.push({ name: 'home' });
  } catch (error) {
    console.error('Error updating header:', error);
  }
};
</script>
