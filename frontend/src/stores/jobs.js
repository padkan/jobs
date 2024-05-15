import { defineStore } from 'pinia';

import getJobs from '@/api/getJobs';
import { useUserStore } from '@/stores/user';

export const FETCH_JOBS = 'FETCH_JOBS';
export const UNIQUE_ORGANISATIONS = 'UNIQUE_ORGANISATIONS';
export const UNIQUE_JOB_TYPES = 'UNIQUE_JOB_TYPES';
export const FILTER_JOBS = 'FILTER_JOBS';

export const INCLUDE_JOB_BY_ORGANISATION = 'INCLUDE_JOB_BY_ORGANISATION';
export const INCLUDE_JOB_BY_JOB_TYPE = 'INCLUDE_JOB_BY_JOB_TYPE';

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
    [INCLUDE_JOB_BY_ORGANISATION]: () => (job) => {
      const userStore = useUserStore();
      if (userStore.selectedOrganisations.length === 0) return true;
      return userStore.selectedOrganisations.includes(job.organization);
    },
    [INCLUDE_JOB_BY_JOB_TYPE]: () => (job) => {
      const userStore = useUserStore();
      if (userStore.selectedJobTypes.length === 0) return true;
      return userStore.selectedJobTypes.includes(job.jobType);
    },

    [UNIQUE_JOB_TYPES](state) {
      const uniqeJobTypes = new Set();
      state.jobs.forEach((job) => uniqeJobTypes.add(job.jobType));
      return uniqeJobTypes;
    },

    [FILTER_JOBS](state) {
      return state.jobs
        .filter((job) => this.INCLUDE_JOB_BY_ORGANISATION(job))
        .filter((job) => this.INCLUDE_JOB_BY_JOB_TYPE(job));
    }
  }
});
