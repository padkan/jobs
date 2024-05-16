import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import JobFiltersOrganisations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue';
import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';

import { useRouter } from 'vue-router';
vi.mock('vue-router');

describe('JobFiltersOrganisations', () => {
  const renderJobFilterSidebarOrganisations = () => {
    const pinia = createTestingPinia();
    const jobStore = useJobsStore();
    const userStore = useUserStore();
    //const $router = { push: vi.fn() };
    render(JobFiltersOrganisations, {
      global: {
        // mocks: {
        //   $router
        // },
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    });
    return { jobStore, userStore };
  };

  it('renders unique list of organisations from jobs', async () => {
    const { jobStore } = renderJobFilterSidebarOrganisations();
    jobStore.UNIQUE_ORGANISATIONS = new Set(['Google', 'Amazon']);

    const button = screen.getByRole('button', {
      name: /organizations/i
    });
    await userEvent.click(button);
    const organisationListItems = screen.getAllByRole('listitem');
    const organisations = organisationListItems.map((node) => node.textContent);
    expect(organisations).toEqual(['Google', 'Amazon']);
  });
  describe('When user click on check box', () => {
    it('comunicates that user has selected checkbox for organisation', async () => {
      useRouter.mockReturnValue({ push: vi.fn() });
      const { jobStore, userStore } = renderJobFilterSidebarOrganisations();

      jobStore.UNIQUE_ORGANISATIONS = new Set(['Google', 'Amazon']);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      const googleCheckbox = screen.getByRole('checkbox', { name: /google/i });
      await userEvent.click(googleCheckbox);

      expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith([
        'Google'
      ]);
    });

    it('navigates user to job result page to see fresh batch of filterd jobs', async () => {
      const push = vi.fn();
      useRouter.mockReturnValue({ push });

      const { jobStore } = renderJobFilterSidebarOrganisations();
      jobStore.UNIQUE_ORGANISATIONS = new Set(['Google', 'Amazon']);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      const googleCheckbox = screen.getByRole('checkbox', { name: /google/i });
      await userEvent.click(googleCheckbox);

      expect(push).toHaveBeenCalledWith({ name: 'JobResult' });
    });
  });
});
