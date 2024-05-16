import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';

import { useRouter } from 'vue-router';
vi.mock('vue-router');

describe('JobFiltersSidebarCheckboxGroup', () => {
  const createProps = (props = {}) => ({
    header: 'Some Header',
    uniqueValues: new Set(['ValueA', 'ValueB']),
    action: vi.fn(),
    ...props
  });
  const renderJobFilterSidebarCheckboxGroup = (props) => {
    const pinia = createTestingPinia();
    //const $router = { push: vi.fn() };
    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props
      },
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
  };

  it('renders unique list of values', async () => {
    const props = createProps({
      header: 'Job Types',
      uniqueValues: new Set(['Full-time', 'Part-time'])
    });
    renderJobFilterSidebarCheckboxGroup(props);

    const button = screen.getByRole('button', {
      name: /job types/i
    });
    await userEvent.click(button);
    const jobTypesListItems = screen.getAllByRole('listitem');
    const jobtypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobtypes).toEqual(['Full-time', 'Part-time']);
  });

  describe('When user click on check box', () => {
    it('comunicates that user has selected checkbox for value', async () => {
      useRouter.mockReturnValue({ push: vi.fn() });
      const action = vi.fn();
      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['Full-time', 'Part-time']),
        action
      });
      renderJobFilterSidebarCheckboxGroup(props);
      const button = screen.getByRole('button', {
        name: /job types/i
      });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i
      });
      await userEvent.click(fullTimeCheckbox);

      expect(action).toHaveBeenCalledWith(['Full-time']);
    });

    it('navigates user to job result page to see fresh batch of filterd jobs', async () => {
      const push = vi.fn();

      useRouter.mockReturnValue({ push });
      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['Full-time'])
      });
      renderJobFilterSidebarCheckboxGroup(props);

      const button = screen.getByRole('button', {
        name: /job types/i
      });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i
      });
      await userEvent.click(fullTimeCheckbox);
      expect(push).toHaveBeenCalledWith({ name: 'JobResult' });
    });
  });
});
