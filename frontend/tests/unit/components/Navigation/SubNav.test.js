import { render, screen } from '@testing-library/vue';
import SubNav from '@/components/Navigation/SubNav.vue';
import { createTestingPinia } from '@pinia/testing';
import { useRoute } from 'vue-router';
vi.mock('vue-router');
import { useJobsStore } from '@/stores/jobs';

describe('SubNav', () => {
  const renderSubNav = () => {
    const pinia = createTestingPinia();
    const jobStore = useJobsStore();
    render(SubNav, {
      global: {
        plugins: [pinia],
        // mocks: {
        //   $route: {
        //     name: routName
        //   }
        // },
        stubs: {
          FontAwesomeIcon: true
        }
      }
    });
    return { jobStore };
  };
  describe('when user is on job page', () => {
    it('disply job count', async () => {
      useRoute.mockReturnValue({ name: 'JobResult' });
      const { jobStore } = renderSubNav();
      const numberOfJobs = 16;
      jobStore.FILTER_JOBS = Array(numberOfJobs).fill({});
      const jobCount = await screen.findByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });
  describe('when user is not on job page', () => {
    it('not disply job count', () => {
      useRoute.mockReturnValue({ name: 'Home' });
      const { jobStore } = renderSubNav();
      const numberOfJobs = 16;
      jobStore.FILTER_JOBS = Array(numberOfJobs).fill({});

      const jobCount = screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
