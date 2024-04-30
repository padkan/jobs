<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in jobs" :key="job.id" :job="job" />
    </ol>
  </main>
</template>
<script>
import axios from 'axios';
import JobListing from '@/components/JobResults/JobListing.vue';

export default {
  name: 'JobListings',
  components: {
    JobListing
  },
  data() {
    return {
      jobs: []
    };
  },
  mounted() {
    // Call the fetchData method when the component is mounted
    this.getData();
  },
  methods: {
    async getData() {
      const response = await axios.get('http://localhost:3001/jobs');
      this.jobs = response.data;
    }
  }
};
</script>
