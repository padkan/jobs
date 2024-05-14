import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import JobFiltersOrganisations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue';
import { useJobsStore, UNIQUE_ORGANIZATIONS } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';

describe('JobFiltersOrganisations', () => {
  const renderJobFilterSidebarOrganisations = () => {
    const pinia = createTestingPinia();
    const jobStore = useJobsStore();
    const userStore = useUserStore();
    render(JobFiltersOrganisations, {
      global: {
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

    const button = screen.getByRole('button');
    await userEvent.click(button);
    const organisationListItems = screen.getAllByRole('listitem');
    const organisations = organisationListItems.map((node) => node.textContent);
    expect(organisations).toEqual(['Google', 'Amazon']);
  });

  it('comunicates that user has selected checkbox for organisation', async () => {
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
});
