import { createPinia, setActivePinia } from 'pinia';
import axios from 'axios';

import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';
vi.mock('axios');

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
      axios.get.mockResolvedValue({ data: ['Job 1', 'Job 2'] });
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
        { organization: 'Google' },
        { organization: 'Amazon' },
        { organization: 'Google' }
      ];
      const result = store.UNIQUE_ORGANISATIONS;
      expect(result).toEqual(new Set(['Google', 'Amazon']));
    });
  });

  describe('UNIQUE_JOB_TYPES', () => {
    it('finds unique  job types from list of jobs', () => {
      const store = useJobsStore();
      store.jobs = [
        { jobType: 'Full-time' },
        { jobType: 'Temporary' },
        { jobType: 'Full-time' }
      ];
      const result = store.UNIQUE_JOB_TYPES;
      expect(result).toEqual(new Set(['Full-time', 'Temporary']));
    });
  });

  describe('INCLUDE_JOB_BY_ORGANISATION', () => {
    describe('when user not selected any organisations', () => {
      it('includes jobs', () => {
        const userStore = useJobsStore();
        userStore.selectedOrganisations = [];
        const jobStore = useJobsStore();
        const job = { organization: 'Google' };
        const result = jobStore.INCLUDE_JOB_BY_ORGANISATION(job);

        expect(result).toBe(true);
      });

      it('identifies if job is associated with given organization', () => {
        const userStore = useJobsStore();
        userStore.selectedOrganisations = ['Google', 'Microsoft'];
        const jobStore = useJobsStore();
        const job = { organization: 'Google' };
        const result = jobStore.INCLUDE_JOB_BY_ORGANISATION(job);

        expect(result).toBe(true);
      });
    });
  });

  describe('INCLUDE_JOB_BY_JOB_TYPE', () => {
    describe('when user not selected any job types', () => {
      it('includes jobs', () => {
        const userStore = useJobsStore();
        userStore.selectedJobTypes = [];
        const jobStore = useJobsStore();
        const job = { jobType: 'Full-time' };
        const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job);

        expect(result).toBe(true);
      });

      it('identifies if job is associated with given job type', () => {
        const userStore = useJobsStore();
        userStore.selectedJobTypes = ['Full-time', 'Part-time'];
        const jobStore = useJobsStore();
        const job = { jobType: 'Full-time' };
        const result = jobStore.INCLUDE_JOB_BY_ORGANISATION(job);

        expect(result).toBe(true);
      });
    });
  });
});
