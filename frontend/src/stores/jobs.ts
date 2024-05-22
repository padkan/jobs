import { defineStore } from 'pinia';

import getJobs from '@/api/getJobs';
import { useUserStore } from '@/stores/user';
import type { Job } from '@/api/types';
export const FETCH_JOBS = 'FETCH_JOBS';
export const UNIQUE_ORGANISATIONS = 'UNIQUE_ORGANISATIONS';
export const UNIQUE_JOB_TYPES = 'UNIQUE_JOB_TYPES';
export const FILTER_JOBS = 'FILTER_JOBS';

export const INCLUDE_JOB_BY_ORGANISATION = 'INCLUDE_JOB_BY_ORGANISATION';
export const INCLUDE_JOB_BY_JOB_TYPE = 'INCLUDE_JOB_BY_JOB_TYPE';
export const INCLUDE_JOB_BY_DEGREE = 'INCLUDE_JOB_BY_DEGREE';

export interface JobState {
  jobs: Job[];
}

export const useJobsStore = defineStore('jobs', {
  state: (): JobState => ({
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
      const uniqeOrganisations = new Set<string>();
      state.jobs.forEach((job) => uniqeOrganisations.add(job.organization));
      return uniqeOrganisations;
    },
    [INCLUDE_JOB_BY_ORGANISATION]: () => (job: Job) => {
      const userStore = useUserStore();
      if (userStore.selectedOrganisations.length === 0) return true;
      return userStore.selectedOrganisations.includes(job.organization);
    },
    [INCLUDE_JOB_BY_JOB_TYPE]: () => (job: Job) => {
      const userStore = useUserStore();
      if (userStore.selectedJobTypes.length === 0) return true;
      return userStore.selectedJobTypes.includes(job.jobType);
    },
    [INCLUDE_JOB_BY_DEGREE]: () => (job: Job) => {
      const userStore = useUserStore();
      if (userStore.selectedDegrees.length === 0) return true;
      return userStore.selectedDegrees.includes(job.degree);
    },
    [UNIQUE_JOB_TYPES](state) {
      const uniqeJobTypes = new Set<string>();
      state.jobs.forEach((job) => uniqeJobTypes.add(job.jobType));
      return uniqeJobTypes;
    },

    [FILTER_JOBS](state): Job[] {
      return state.jobs
        .filter((job) => this.INCLUDE_JOB_BY_ORGANISATION(job))
        .filter((job) => this.INCLUDE_JOB_BY_JOB_TYPE(job))
        .filter((job) => this.INCLUDE_JOB_BY_DEGREE(job));
    }
  }
});
