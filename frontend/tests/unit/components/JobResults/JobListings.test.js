import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import axios from 'axios';

import JobListings from '@/components/JobResults/JobListings.vue';
vi.mock('axios');
describe('JobListings', () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: '5',
      ...queryParams
    }
  });

  const renderJobListings = ($route) => {
    render(JobListings, {
      global: {
        mocks: {
          $route
        },
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });
  };

  it('fetchs jobs', () => {
    axios.get.mockResolvedValue({ data: [] });
    const $route = createRoute();
    renderJobListings($route);
    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi:3001/jobs');
  });

  it('creates a job listing for every job', async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const $route = createRoute({ page: '1' });
    renderJobListings($route);

    const jobListings = await screen.findAllByRole('listitem'); // find -> async & get->sync
    expect(jobListings).toHaveLength(10);
  });

  describe('when params exclude page number', () => {
    it('it dispalyes page number 1', () => {
      const $route = createRoute({ page: undefined });
      renderJobListings($route);
      expect(screen.getByText('Page 1')).toBeInTheDocument();
    });
  });

  describe('when params include page number', () => {
    it('it dispalyes page number', () => {
      const $route = createRoute({ page: '3' });
      renderJobListings($route);
      expect(screen.getByText('Page 3')).toBeInTheDocument();
    });
  });

  describe('when user is on page 1 ', () => {
    it('does not show link to previous page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const $route = createRoute({ page: '1' });
      renderJobListings($route);
      await screen.findAllByRole('listitem');
      const previosLink = screen.queryByRole('link', { name: /previous/i });
      expect(previosLink).not.toBeInTheDocument();
    });

    it('shows link to next page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const $route = createRoute({ page: '1' });
      renderJobListings($route);
      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe('when user is in last page', () => {
    it('does not show link to next page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const $route = createRoute({ page: '2' });
      renderJobListings($route);
      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });
    it('does show link to previous page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const $route = createRoute({ page: '2' });
      renderJobListings($route);
      await screen.findAllByRole('listitem');
      const previousLink = screen.queryByRole('link', { name: /previous/i });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
