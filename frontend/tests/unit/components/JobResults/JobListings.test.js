import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import JobListings from '@/components/JobResults/JobListings.vue';
import { useJobsStore } from '@/stores/jobs';
import { useRoute } from 'vue-router';
vi.mock('vue-router');

describe('JobListings', () => {
  // const createRoute = (queryParams = {}) => ({
  //   query: {
  //     page: '5',
  //     ...queryParams
  //   }
  // });

  const renderJobListings = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    jobsStore.jobs = Array(15).fill({});
    render(JobListings, {
      global: {
        plugins: [pinia],
        // mocks: {
        //   $route
        // },
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });
    return { jobsStore };
  };

  it('fetchs jobs', () => {
    useRoute.mockReturnValue({ query: {} });
    const { jobsStore } = renderJobListings();
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it('creates a job listing for every job', async () => {
    //axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    //const $route = createRoute({ page: '1' });
    useRoute.mockReturnValue({ query: { page: '1' } });
    const { jobsStore } = renderJobListings();

    const jobListings = await screen.findAllByRole('listitem'); // find -> async & get->sync
    expect(jobListings).toHaveLength(10);
  });

  describe('when params exclude page number', () => {
    it('it dispalyes page number 1', () => {
      //const $route = createRoute({ page: undefined });
      useRoute.mockReturnValue({ query: { page: undefined } });
      renderJobListings();
      expect(screen.getByText('Page 1')).toBeInTheDocument();
    });
  });

  describe('when params include page number', () => {
    it('it dispalyes page number', () => {
      //const $route = createRoute({ page: '3' });
      useRoute.mockReturnValue({ query: { page: '3' } });
      renderJobListings();
      expect(screen.getByText('Page 3')).toBeInTheDocument();
    });
  });

  describe('when user is on page 1 ', () => {
    it('does not show link to previous page', async () => {
      //axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      //const $route = createRoute({ page: '1' });
      useRoute.mockReturnValue({ query: { page: '1' } });
      const { jobsStore } = renderJobListings();

      await screen.findAllByRole('listitem');
      const previosLink = screen.queryByRole('link', { name: /previous/i });
      expect(previosLink).not.toBeInTheDocument();
    });

    it('shows link to next page', async () => {
      //axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      //const $route = createRoute({ page: '1' });
      useRoute.mockReturnValue({ query: { page: '1' } });
      const { jobsStore } = renderJobListings();

      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe('when user is in last page', () => {
    it('does not show link to next page', async () => {
      //axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      //const $route = createRoute({ page: '2' });
      useRoute.mockReturnValue({ query: { page: '2' } });
      const { jobsStore } = renderJobListings();

      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });
    it('does show link to previous page', async () => {
      //axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      //const $route = createRoute({ page: '2' });
      useRoute.mockReturnValue({ query: { page: '2' } });
      const { jobsStore } = renderJobListings();

      await screen.findAllByRole('listitem');
      const previousLink = screen.queryByRole('link', { name: /previous/i });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
