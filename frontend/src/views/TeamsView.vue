<template>
  <header-container>
    <template #title>
      <!-- v-slot:title -->
      <h1 class="font-norm w-full text-4xl">Teams</h1>
    </template>
    <template #subtitle>
      <h2 class="my-4 w-full text-base font-light">
        It 's awsome working here. Why do not you come join us?
      </h2>
    </template>
  </header-container>
</template>
<script lang="ts" setup>
import HeaderContainer from '@/components/Shared/HeaderContainer.vue';
// export default {
//   name: 'TeamsView',
//   components: {
//     HeaderContainer
//   }
// };
</script>
