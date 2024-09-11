<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <div class="sm:col-span-2 mb-5">
          <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
          <div class="mt-2">
            <input
              v-model="formData.title"
              type="text"
              name="title"
              id="title"
              autocomplete="off"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6A9156] sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-full">
            <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
            <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div class="text-center">
                <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                <div class="mt-4 flex text-sm leading-6 text-gray-600">
                  <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-[#6A9156] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#6A9156] focus-within:ring-offset-2 hover:text-[#547643]">
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      class="sr-only"
                      @change="handleFileChange"
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-6">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="inline-flex w-full justify-center rounded-md bg-[#6A9156] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#547643] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#547643]"
        >
          <span v-if="!isSubmitting">Submit</span>
          <span v-else>Submitting...</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { PhotoIcon } from '@heroicons/vue/24/solid';
import { ref, defineProps } from 'vue';

const formData = ref({
  title: '',
  pics: null,
});

const isSubmitting = ref(false);

const props = defineProps({
  addCategory:{
    type: Function
  }
});

const submitForm = () => {
  isSubmitting.value = true;

  // Appelez addCategory avec les données du formulaire
  props.addCategory({
    title: formData.value.title,
    pics: formData.value.pics,
  });

  // Réinitialisez le formulaire après la soumission
  formData.value = {
    title: '',
    pics: null,
  };

  isSubmitting.value = false;
};

// modifications du fichier
const handleFileChange = (event) => {
  formData.value.pics = event.target.files[0];
};
</script>