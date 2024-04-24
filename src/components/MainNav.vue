<template>
  <header class="w-full text-sm">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <!-- h-16 4rem 64px  text-xl 20px-->
      <div
        class="border- mx-auto flex h-full flex-nowrap border-b border-solid border-x-brand-gray-1 px-8"
      >
        <a
          v-bind:href="url"
          class="flex h-full items-center text-xl font-semibold"
          >{{ company }}</a
        >
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="menuItem in menuItems"
              v-bind:key="menuItem"
              class="ml-9 h-full first:ml-0"
            >
              <a href="" class="flex h-full items-center py-2.5">{{
                menuItem
              }}</a>
            </li>
          </ul>
        </nav>
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
      company: 'Next Job!',
      url: 'http://localhost:3000/test',
      menuItems: [
        'Teams',
        'Locations',
        'Life at Next Job',
        'How we hire',
        'Students',
        'Jobs'
      ]
    };
  }
};
</script>
