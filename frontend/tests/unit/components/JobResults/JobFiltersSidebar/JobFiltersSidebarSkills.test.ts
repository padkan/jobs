import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import { useUserStore } from '@/stores/user';
import JobFiltersSidebarSkills from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue';

describe('JobFiltersSidebarSkills', () => {
  const jobFiltersSidebarSkills = () => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();
    render(JobFiltersSidebarSkills, {
      global: {
        plugins: [pinia]
      }
    });
    return { userStore };
  };

  it('populate search input from store', async () => {
    const { userStore } = jobFiltersSidebarSkills();
    userStore.skillsSearchTerm = 'Programmer';
    const input = await screen.findByRole<HTMLInputElement>('textbox');
    expect(input.value).toBe('Programmer');
  });

  it('writes user input to store', async () => {
    const { userStore } = jobFiltersSidebarSkills();
    userStore.skillsSearchTerm = '';
    const input = screen.getByRole<HTMLInputElement>('textbox');
    expect(input.value).toBe('');
    await userEvent.type(input, 'V');
    await userEvent.click(document.body);
    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith('V');
  });

  it('removes white space from user input', async () => {
    const { userStore } = jobFiltersSidebarSkills();
    userStore.skillsSearchTerm = '';
    const input = screen.getByRole<HTMLInputElement>('textbox');
    expect(input.value).toBe('');
    await userEvent.type(input, '     Vue Developer      ');
    await userEvent.click(document.body);
    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith(
      'Vue Developer'
    );
  });
});
