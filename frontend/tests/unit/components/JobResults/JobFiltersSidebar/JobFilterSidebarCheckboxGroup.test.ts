import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import type { Mock } from 'vitest';
vi.mock('vue-router');
const useRouteMock = useRouter as Mock;

describe('JobFiltersSidebarCheckboxGroup', () => {
  interface JobFiltersSidebarCheckboxGroupProps {
    uniqueValues: Set<string>;
    action: Mock;
  }
  const createProps = (
    props: Partial<JobFiltersSidebarCheckboxGroupProps> = {}
  ): JobFiltersSidebarCheckboxGroupProps => ({
    uniqueValues: new Set(['ValueA', 'ValueB']),
    action: vi.fn(),
    ...props
  });
  const renderJobFilterSidebarCheckboxGroup = (
    props: JobFiltersSidebarCheckboxGroupProps
  ) => {
    const pinia = createTestingPinia({ stubActions: false });
    const userStore = useUserStore();
    //const $router = { push: vi.fn() };
    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props
      },
      global: {
        // mocks: {
        //   $router
        // },
        plugins: [pinia]
        // stubs: {
        //   FontAwesomeIcon: true
        // }
      }
    });
    return { userStore };
  };

  it('renders unique list of values', () => {
    const props = createProps({
      uniqueValues: new Set(['Full-time', 'Part-time'])
    });
    renderJobFilterSidebarCheckboxGroup(props);

    const jobTypesListItems = screen.getAllByRole('listitem');
    const jobtypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobtypes).toEqual(['Full-time', 'Part-time']);
  });

  describe('When user click on check box', () => {
    it('comunicates that user has selected checkbox for value', async () => {
      useRouteMock.mockReturnValue({ push: vi.fn() });
      const action = vi.fn();
      const props = createProps({
        uniqueValues: new Set(['Full-time', 'Part-time']),
        action
      });
      renderJobFilterSidebarCheckboxGroup(props);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i
      });
      await userEvent.click(fullTimeCheckbox);

      expect(action).toHaveBeenCalledWith(['Full-time']);
    });

    it('navigates user to job result page to see fresh batch of filterd jobs', async () => {
      const push = vi.fn();

      useRouteMock.mockReturnValue({ push });
      const props = createProps({
        uniqueValues: new Set(['Full-time'])
      });
      renderJobFilterSidebarCheckboxGroup(props);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i
      });
      await userEvent.click(fullTimeCheckbox);
      expect(push).toHaveBeenCalledWith({ name: 'JobResult' });
    });
  });

  describe('when user clears job filters', () => {
    it('unchecks any checkboxes', async () => {
      useRouteMock.mockReturnValue({ push: vi.fn() });
      const props = createProps({
        uniqueValues: new Set(['Full-time'])
      });
      const { userStore } = renderJobFilterSidebarCheckboxGroup(props);

      const fullTimeCheckboxBeforeAction = screen.getByRole<HTMLInputElement>(
        'checkbox',
        {
          name: /full-time/i
        }
      );
      await userEvent.click(fullTimeCheckboxBeforeAction);
      expect(fullTimeCheckboxBeforeAction.checked).toBe(true);
      userStore.CLEAR_USER_JOB_FILTER_SELECTIONS();
      const fullTimeCheckboxAfterAction =
        await screen.findByRole<HTMLInputElement>('checkbox', {
          name: /full-time/i
        });
      expect(fullTimeCheckboxAfterAction.checked).toBe(false);
    });
  });
});
