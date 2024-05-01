<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            :to="{
              name: 'JobResult',
              query: {
                page: previousPage
              }
            }"
            >Previous</router-link
          >
          <router-link
            role="link"
            v-if="nextPage"
            :to="{
              name: 'JobResult',
              query: {
                page: nextPage
              }
            }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Next
          </router-link>
        </div>
      </div>
    </div>
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
  computed: {
    currentPage() {
      return Number.parseInt(this.$route.query.page || '1');
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      const firstPage = 1;
      const ShowPrev = previousPage >= firstPage ? previousPage : undefined;
      return ShowPrev;
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      const lastPage = Math.ceil(this.jobs.length / 10);
      const showNext = nextPage <= lastPage ? nextPage : undefined;
      return showNext;
    },
    displayedJobs() {
      const pageNumber = this.currentPage;
      const firstJobIndex = (pageNumber - 1) * 10;
      const lastJobIndex = pageNumber * 10;
      return this.jobs.slice(firstJobIndex, lastJobIndex);
    }
  },
  mounted() {
    // Call the fetchData method when the component is mounted
    this.getData();
  },
  methods: {
    async getData() {
      const baseUrl = import.meta.env.VITE_APP_API_URL;
      const response = await axios.get(`${baseUrl}/jobs`);
      this.jobs = response.data;
    }
  }
};
</script>
