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
<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
//import { mapActions, mapState } from 'pinia';
import JobListing from '@/components/JobResults/JobListing.vue';
import { useJobsStore } from '@/stores/jobs';
import { useDegreesStore } from '@/stores/degrees';

import usePreviousAndNextPages from '@/components/Composables/usePreviousAndNextPages';

const jobStore = useJobsStore();
const degreesStore = useDegreesStore();

onMounted(jobStore.FETCH_JOBS);
onMounted(degreesStore.FETCH_DEGREES);

const FILTER_JOBS = computed(() => jobStore.FILTER_JOBS);

const route = useRoute();

const currentPage = computed(() =>
  Number.parseInt((route.query.page as string) || '1')
);
const maxPage = computed(() => Math.ceil(FILTER_JOBS.value.length / 10));
const { previousPage, nextPage } = usePreviousAndNextPages(
  currentPage,
  maxPage
);
// const previousPage = computed(() => {
//   const previousPage = currentPage.value - 1;
//   const firstPage = 1;
//   const ShowPrev = previousPage >= firstPage ? previousPage : undefined;
//   return ShowPrev;
// });

// const nextPage = computed(() => {
//   const nextPage = currentPage.value + 1;
//   const lastPage = Math.ceil(FILTER_JOBS.value.length / 10);
//   const showNext = nextPage <= lastPage ? nextPage : undefined;
//   return showNext;
// });

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value;
  const firstJobIndex = (pageNumber - 1) * 10;
  const lastJobIndex = pageNumber * 10;

  return FILTER_JOBS.value.slice(firstJobIndex, lastJobIndex);
});
// export default {
//   name: 'JobListings',
//   components: {
//     JobListing
//   },
//   computed: {
//     currentPage() {
//       return Number.parseInt(this.$route.query.page || '1');
//     },
//     previousPage() {
//       const previousPage = this.currentPage - 1;
//       const firstPage = 1;
//       const ShowPrev = previousPage >= firstPage ? previousPage : undefined;
//       return ShowPrev;
//     },
//     ...mapState(useJobsStore, {
//       //jobs: 'jobs',
//       FILTER_JOBS,
//       nextPage() {
//         const nextPage = this.currentPage + 1;
//         //const lastPage = Math.ceil(this.jobs.length / 10);
//         const lastPage = Math.ceil(this.FILTER_JOBS.length / 10);
//         const showNext = nextPage <= lastPage ? nextPage : undefined;
//         return showNext;
//       },
//       displayedJobs() {
//         const pageNumber = this.currentPage;
//         const firstJobIndex = (pageNumber - 1) * 10;
//         const lastJobIndex = pageNumber * 10;
//         //return this.jobs.slice(firstJobIndex, lastJobIndex);
//         return this.FILTER_JOBS.slice(firstJobIndex, lastJobIndex);
//       }
//     })
//   },
//   mounted() {
//     // Call the fetchData method when the component is mounted
//     this.FETCH_JOBS();
//   },
//   methods: {
//     ...mapActions(useJobsStore, [FETCH_JOBS])
//   }
// };
</script>
useDegreesStore,
