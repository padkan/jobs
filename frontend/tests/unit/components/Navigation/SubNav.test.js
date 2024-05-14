import { render, screen } from '@testing-library/vue';
import SubNav from '@/components/Navigation/SubNav.vue';
import { createTestingPinia } from '@pinia/testing';
import { useJobsStore } from '@/stores/jobs';

describe('SubNav', () => {
  const renderSubNav = (routName) => {
    const pinia = createTestingPinia();
    const jobStore = useJobsStore();
    render(SubNav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route: {
            name: routName
          }
        },
        stubs: {
          FontAwesomeIcon: true
        }
      }
    });
    return { jobStore };
  };
  describe('when user is on job page', () => {
    it('disply job count', async () => {
      const routName = 'JobResult';
      const { jobStore } = renderSubNav(routName);
      const numberOfJobs = 16;
      jobStore.FILTER_JOBS_BY_ORGANISATIONS = Array(numberOfJobs).fill({});
      const jobCount = await screen.findByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });
  describe('when user is not on job page', () => {
    it('not disply job count', () => {
      const routName = 'Home';
      const { jobStore } = renderSubNav(routName);
      const numberOfJobs = 16;
      jobStore.FILTER_JOBS_BY_ORGANISATIONS = Array(numberOfJobs).fill({});

      const jobCount = screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
