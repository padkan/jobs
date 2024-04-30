import { render, screen } from '@testing-library/vue';
import SubNav from '@/components/Navigation/SubNav.vue';

describe('SubNav', () => {
  const renderSubNav = (routName) => {
    render(SubNav, {
      global: {
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
  };
  describe('when user is on job page', () => {
    it('disply job count', () => {
      const routName = 'JobResult';
      renderSubNav(routName);
      const jobCount = screen.getByText('1653');
      expect(jobCount).toBeInTheDocument();
    });
  });
  describe('when user is not on job page', () => {
    it('not disply job count', () => {
      const routName = 'Home';
      renderSubNav(routName);
      const jobCount = screen.queryByText('1653');
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
