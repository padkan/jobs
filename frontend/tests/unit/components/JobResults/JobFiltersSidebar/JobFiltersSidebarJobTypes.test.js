import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import JobFiltersSidebarJobTypes from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue';
import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';

describe('JobFiltersSidebarJobTypes', () => {
  const renderJobFilterSidebarJobTypes = () => {
    const pinia = createTestingPinia();
    const jobStore = useJobsStore();
    const userStore = useUserStore();
    const $router = { push: vi.fn() };
    render(JobFiltersSidebarJobTypes, {
      global: {
        mocks: {
          $router
        },
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    });
    return { jobStore, userStore, $router };
  };

  it('renders unique list of job types from jobs', async () => {
    const { jobStore } = renderJobFilterSidebarJobTypes();
    jobStore.UNIQUE_JOB_TYPES = new Set(['Full-time', 'Part-time']);

    const button = screen.getByRole('button', {
      name: /job types/i
    });
    await userEvent.click(button);
    const jobTypesListItems = screen.getAllByRole('listitem');
    const jobtypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobtypes).toEqual(['Full-time', 'Part-time']);
  });

  describe('When user click on check box', () => {
    it('comunicates that user has selected checkbox for job types', async () => {
      const { jobStore, userStore } = renderJobFilterSidebarJobTypes();

      jobStore.UNIQUE_JOB_TYPES = new Set(['Full-time', 'Part-time']);
      const button = screen.getByRole('button', {
        name: /job types/i
      });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i
      });
      await userEvent.click(fullTimeCheckbox);

      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith([
        'Full-time'
      ]);
    });

    it('navigates user to job result page to see fresh batch of filterd jobs', async () => {
      const { jobStore, $router } = renderJobFilterSidebarJobTypes();

      jobStore.UNIQUE_JOB_TYPES = new Set(['Full-time', 'Part-time']);

      const button = screen.getByRole('button', {
        name: /job types/i
      });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i
      });
      await userEvent.click(fullTimeCheckbox);
      expect($router.push).toHaveBeenCalledWith({ name: 'JobResult' });
    });
  });
});
