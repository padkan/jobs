<template>
  <div class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobResultPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span
          ><span class="text-brand-green-1">{{ FILTER_JOBS.length }}</span> jobs
          matched</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
//import { mapState } from 'pinia';
import { useJobsStore } from '@/stores/jobs';

const route = useRoute();
const onJobResultPage = computed(() => route.name === 'JobResult');
const jobStore = useJobsStore();
const FILTER_JOBS = computed(() => jobStore.FILTER_JOBS);

// export default {
//   name: 'SubNav',
//   computed: {
//     ...mapState(useJobsStore, [FILTER_JOBS]),
//     onJobResultPage() {
//       return this.$route.name === 'JobResult';
//     }
//   }
// };
</script>
