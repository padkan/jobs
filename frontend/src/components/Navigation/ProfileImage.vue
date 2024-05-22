<template>
  <img
    :src="imageLink"
    class="h-8 w-8 rounded-3xl object-contain"
    alt="User profile image"
  />
  <!-- v-bind : -->
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const imageLink = ref('https://api.dicebear.com/7.x/lorelei/svg');

// export default {
//   name: 'ProfileImage',
//   data() {
//     return {
//       imageLink: 'https://api.dicebear.com/7.x/lorelei/svg'
//     };
//   }
// };
</script>
