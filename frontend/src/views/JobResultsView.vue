<template>
  <div class="flex-flex-nowrap flex w-full flex-row">
    <job-filter-sidebar />
    <job-listings />
  </div>
</template>
<script>
import JobFilterSidebar from '@/components/JobResults/JobFilterSidebar/JobFilterSidebar.vue';
import JobListings from '@/components/JobResults/JobListings.vue';
export default {
  name: 'JobResults',
  components: {
    JobFilterSidebar,
    JobListings
  }
};
</script>
