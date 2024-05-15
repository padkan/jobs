import { defineStore } from 'pinia';

import getJobs from '@/api/getJobs';
import { useUserStore } from '@/stores/user';

export const FETCH_JOBS = 'FETCH_JOBS';
export const UNIQUE_ORGANISATIONS = 'UNIQUE_ORGANISATIONS';
export const UNIQUE_JOB_TYPES = 'UNIQUE_JOB_TYPES';
export const FILTER_JOBS = 'FILTER_JOBS';
export const FILTER_JOBS_BY_ORGANISATIONS = 'FILTER_JOBS_BY_ORGANISATIONS';
export const FILTER_JOBS_BY_JOB_TYPES = 'FILTER_JOBS_BY_JOB_TYPES';
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
    },
    [UNIQUE_JOB_TYPES](state) {
      const uniqeJobTypes = new Set();
      state.jobs.forEach((job) => uniqeJobTypes.add(job.jobType));
      return uniqeJobTypes;
    },
    [FILTER_JOBS_BY_JOB_TYPES](state) {
      const userStore = useUserStore();
      if (userStore.selectedJobTypes.length === 0) {
        return this.jobs;
      }
      return state.jobs.filter((job) =>
        userStore.selectedJobTypes.includes(job.jobType)
      );
    },
    [FILTER_JOBS](state) {
      const userStore = useUserStore();
      const noSelectedOrganisations =
        userStore.selectedOrganisations.length === 0;
      const noSelectedJobTypes = userStore.selectedJobTypes.length === 0;

      return state.jobs
        .filter((job) => {
          if (noSelectedOrganisations) return true;
          return userStore.selectedOrganisations.includes(job.organization);
        })
        .filter((job) => {
          if (noSelectedJobTypes) return true;
          return userStore.selectedJobTypes.includes(job.jobType);
        });
    }
  }
});
