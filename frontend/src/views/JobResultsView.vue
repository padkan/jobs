<template>
  <div class="flex-flex-nowrap flex w-full flex-row">
    <job-filters-sidebar />
    <job-listings />
  </div>
</template>
<script>
import JobFiltersSidebar from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue';
import JobListings from '@/components/JobResults/JobListings.vue';
export default {
  name: 'JobResults',
  components: {
    JobFiltersSidebar,
    JobListings
  }
};
</script>
