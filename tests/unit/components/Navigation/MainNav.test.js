import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import MainNav from '@/components/Navigation/MainNav.vue';

describe('MainNav', () => {
  const renderMainNav = () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true
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
      //screen.getByRole('img');// if there is not found return null
      let profileImage = screen.queryByRole('img', {
        name: /user profile image/i
      });
      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole('button', {
        name: /sign in/i
      });
      await userEvent.click(loginButton);
      profileImage = screen.getByRole('img', {
        name: /user profile image/i
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
