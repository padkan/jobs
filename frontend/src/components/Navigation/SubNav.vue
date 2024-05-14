<template>
  <div class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobResultPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span
          ><span class="text-brand-green-1">{{
            FILTER_JOBS_BY_ORGANISATIONS.length
          }}</span>
          jobs matched</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useJobsStore, FILTER_JOBS_BY_ORGANISATIONS } from '@/stores/jobs';
export default {
  name: 'SubNav',
  computed: {
    ...mapState(useJobsStore, [FILTER_JOBS_BY_ORGANISATIONS]),
    onJobResultPage() {
      return this.$route.name === 'JobResult';
    }
  }
};
</script>
