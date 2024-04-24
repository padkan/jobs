<template>
  <header class="w-full text-sm">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <!-- h-16 4rem 64px  text-xl 20px-->
      <div
        class="border- mx-auto flex h-full flex-nowrap border-b border-solid border-x-brand-gray-1 px-8"
      >
        <a href="/" class="flex h-full items-center text-xl font-semibold">{{
          company
        }}</a>
      </div>
    </div>
  </header>
</template>

<!-- vue2 ->option api
vue3-> composition api  -->
<script>
export default {
  name: 'mainNav',
  data() {
    return {
      company: 'Next Job!'
    };
  }
};
</script>
