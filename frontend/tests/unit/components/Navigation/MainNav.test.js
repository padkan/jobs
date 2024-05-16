import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { RouterLinkStub } from '@vue/test-utils';
import { useRoute } from 'vue-router';
vi.mock('vue-router');
import MainNav from '@/components/Navigation/MainNav.vue';
import { createTestingPinia } from '@pinia/testing';
import { useUserStore } from '@/stores/user';

describe('MainNav', () => {
  // const pinia = createTestingPinia({ stubActions: false }); //test real behavior of user store
  //we using original implementation default value is true
  const pinia = createTestingPinia();
  const renderMainNav = () => {
    useRoute.mockReturnValue({ name: 'Home' });
    render(MainNav, {
      global: {
        plugins: [pinia],
        // mocks: {
        //   $route
        // },
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        }
      }
    });
  };

  it('display company name', () => {
    renderMainNav();
    const companyName = screen.getByText('Next Job!');
    expect(companyName).toBeInTheDocument();
  });

  it('display menu items for navigation', () => {
    renderMainNav();
    const navigationMenuItems = screen.getAllByRole('listitem');
    const navigationMenuTexts = navigationMenuItems.map(
      (item) => item.textContent
    );
    expect(navigationMenuTexts).toEqual([
      'Teams',
      'Locations',
      'Life at Next Job',
      'How we hire',
      'Students',
      'Jobs'
    ]);
  });

  describe('when user logs in', () => {
    it('display user profile picture', async () => {
      renderMainNav();
      const userStore = useUserStore();
      //screen.getByRole('img');// if there is not found return null
      let profileImage = screen.queryByRole('img', {
        name: /user profile image/i
      });
      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole('button', {
        name: /sign in/i
      });
      userStore.isLoggedIn = true; // in case of complexity it would be very power full

      await userEvent.click(loginButton);
      profileImage = screen.getByRole('img', {
        name: /user profile image/i
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
