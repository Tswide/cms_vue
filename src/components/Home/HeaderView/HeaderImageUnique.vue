<template>

  <div class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
    <div
      class="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-[#6A9156]/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
      aria-hidden="true" />
    <div class="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
        <h1 class="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">Lorem ipsum dolor</h1>
        <div class="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
          <p class="text-lg leading-8 text-gray-600 break-words">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit, quam ac posuere vehicula, lorem augue elementum elit, at sodales urna ante quis odio. Aenean.
          </p>
          <div class="mt-10 flex items-center gap-x-6">
            <a href="/articles"
              class="rounded-md bg-[#6A9156] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#547643] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#547643]">Get Started</a>
          </div>
        </div>
        <img src="../../../assets/header/Affiches.jpeg" alt=""
          class="mt-5 aspect-[6/5] max-w-xs w-full rounded-2xl object-cover sm:mt-10 lg:mt-10 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-20" />
      </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
  </div>
</template>

<script>
export default {
  props: {
    headerData: {
      type: Object,
      required: true,
    },
  },
};
</script>