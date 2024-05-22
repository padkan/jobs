<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot
        :title="spotlight.title"
        :img="spotlight.img"
        :description="spotlight.description"
      >
      </slot>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
interface Spotlight {
  id: number;
  img: string;
  title: string;
  description: string;
}

const spotlights = ref<Spotlight[]>([]);

const getSpotlights = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/spotlights`;
  const response = await axios.get<Spotlight[]>(url);
  spotlights.value = response.data;
};
onMounted(getSpotlights);
// export default {
//   name: 'SpotLight',
//   data() {
//     return {
//       spotlights: []
//     };
//   },
//   async mounted() {
//     const baseUrl = import.meta.env.VITE_APP_API_URL;
//     const url = `${baseUrl}/spotlights`;
//     const response = await axios.get(url);
//     this.spotlights = response.data;
//   }
// };
</script>
