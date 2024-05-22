<template>
  <div>job page!</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const curtentJobId = computed(() => route.params.id);
// export default {
//   name: 'JobView',
//   computed: {
//     curtentJobId() {
//       return this.$route.params.id;
//     }
//   }
// };
</script>
