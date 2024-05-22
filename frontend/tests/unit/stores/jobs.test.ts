import type { Mock } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import axios from 'axios';

import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';

import { createJob } from '../../utils/createJob';
vi.mock('axios');
const axiosGetMock = axios.get as Mock;

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('stores job listings', () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe('action', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('FETCH_JOBS', () => {
    it('makes API request and stores received jobs', async () => {
      axiosGetMock.mockResolvedValue({ data: ['Job 1', 'Job 2'] });
      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(['Job 1', 'Job 2']);
    });
  });
});

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('UNIQUE_ORGANISATIONS', () => {
    it('finds unique organisations from list of jobs', () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ organization: 'Google' }),
        createJob({ organization: 'Amazon' }),
        createJob({ organization: 'Google' })
      ];
      const result = store.UNIQUE_ORGANISATIONS;
      expect(result).toEqual(new Set(['Google', 'Amazon']));
    });
  });

  describe('UNIQUE_JOB_TYPES', () => {
    it('finds unique  job types from list of jobs', () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ jobType: 'Full-time' }),
        createJob({ jobType: 'Temporary' }),
        createJob({ jobType: 'Full-time' })
      ];
      const result = store.UNIQUE_JOB_TYPES;
      expect(result).toEqual(new Set(['Full-time', 'Temporary']));
    });
  });

  describe('INCLUDE_JOB_BY_ORGANISATION', () => {
    describe('when user not selected any organisations', () => {
      it('includes jobs', () => {
        const userStore = useJobsStore();
        // @ts-expect-error
        userStore.selectedOrganisations = [];
        const jobStore = useJobsStore();
        const job = createJob({ organization: 'Google' });
        const result = jobStore.INCLUDE_JOB_BY_ORGANISATION(job);

        expect(result).toBe(true);
      });

      it('identifies if job is associated with given organization', () => {
        const userStore = useJobsStore();
        // @ts-expect-error
        userStore.selectedOrganisations = ['Google', 'Microsoft'];
        const jobStore = useJobsStore();
        const job = createJob({ organization: 'Google' });
        const result = jobStore.INCLUDE_JOB_BY_ORGANISATION(job);

        expect(result).toBe(true);
      });
    });
  });

  describe('INCLUDE_JOB_BY_JOB_TYPE', () => {
    describe('when user not selected any job types', () => {
      it('includes jobs', () => {
        const userStore = useJobsStore();
        // @ts-expect-error
        userStore.selectedJobTypes = [];
        const jobStore = useJobsStore();
        const job = createJob({ jobType: 'Full-time' });
        const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job);

        expect(result).toBe(true);
      });

      it('identifies if job is associated with given job type', () => {
        const userStore = useJobsStore();
        // @ts-expect-error
        userStore.selectedJobTypes = ['Full-time', 'Part-time'];
        const jobStore = useJobsStore();
        const job = createJob({ jobType: 'Full-time' });
        const result = jobStore.INCLUDE_JOB_BY_ORGANISATION(job);

        expect(result).toBe(true);
      });
    });
  });

  describe('INCLUDE_JOB_BY_DEGREE', () => {
    describe('when user not selected any degree', () => {
      it('includes jobs', () => {
        const userStore = useJobsStore();
        // @ts-expect-error
        userStore.selectedDegrees = [];
        const jobStore = useJobsStore();
        const job = createJob();
        const result = jobStore.INCLUDE_JOB_BY_DEGREE(job);

        expect(result).toBe(true);
      });

      it('identifies if job is associated with given degrees', () => {
        const userStore = useJobsStore();
        // @ts-expect-error
        userStore.selectedDegrees = ["Master 's"];
        const jobStore = useJobsStore();
        const job = createJob({ degree: "Master 's" });
        const result = jobStore.INCLUDE_JOB_BY_DEGREE(job);

        expect(result).toBe(true);
      });
    });
  });
});
