import { render, screen } from '@testing-library/vue';

import MainNav from '@/components/MainNav.vue';

describe('MainNav', () => {
  it('display company name', () => {
    render(MainNav);
    const companyName = screen.getByText('Next Job!');
    expect(companyName).toBeInTheDocument();
  });

  it('display menu items for navigation', () => {
    render(MainNav);
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
});
