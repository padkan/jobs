import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'vue-router';
vi.mock('vue-router');
import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue';
import type { Mock } from 'vitest';
const useRouterMock = useRouter as Mock;
describe('JobSearchForm', () => {
  describe('When user submit the form', () => {
    it('directs user to job result page with users search parameters', async () => {
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });
      render(JobSearchForm, {
        global: {
          // mocks: {
          //   $router
          // },
          stubs: {
            FontAwesomeIcon: true
          }
        }
      });
      const roleInput = screen.getByRole('textbox', {
        name: /role/i // label input is name here!
      });
      await userEvent.type(roleInput, 'web developer');

      const locationInput = screen.getByRole('textbox', {
        name: /where?/i // label input is name here!
      });
      await userEvent.type(locationInput, 'Munich');

      const submitButton = screen.getByRole('button', {
        name: /search/i
      });
      await userEvent.click(submitButton);
      expect(push).toHaveBeenCalledWith({
        name: 'JobResult',
        query: {
          role: 'web developer',
          location: 'Munich'
        }
      });
    });
  });
});
