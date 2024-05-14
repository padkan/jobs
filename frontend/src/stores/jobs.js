import { defineStore } from 'pinia';

import getJobs from '@/api/getJobs';
import { useUserStore } from '@/stores/user';

export const FETCH_JOBS = 'FETCH_JOBS';
export const UNIQUE_ORGANISATIONS = 'UNIQUE_ORGANISATIONS';
export const FILTER_JOBS_BY_ORGANISATIONS = 'FILTER_JOBS_BY_ORGANISATIONS';
export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: []
  }),
  actions: {
    async [FETCH_JOBS]() {
      const jobs = await getJobs();
      this.jobs = jobs;
    }
  },
  getters: {
    [UNIQUE_ORGANISATIONS](state) {
      const uniqeOrganisations = new Set();
      state.jobs.forEach((job) => uniqeOrganisations.add(job.organization));
      return uniqeOrganisations;
    },
    [FILTER_JOBS_BY_ORGANISATIONS](state) {
      const userStore = useUserStore();
      if (userStore.selectedOrganisations.length === 0) {
        return this.jobs;
      }
      return state.jobs.filter((job) =>
        userStore.selectedOrganisations.includes(job.organization)
      );
    }
  }
});
