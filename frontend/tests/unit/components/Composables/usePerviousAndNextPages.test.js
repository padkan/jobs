import usePreviousAndNextPages from '@/components/Composables/usePreviousAndNextPages';

describe('usePreviousAndNextPages', () => {
  it('calculate page before current one', () => {
    const currentPage = { value: 8 };
    const maxPage = { value: 10 };
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(previousPage.value).toBe(7);
  });
  describe('when current page is the first page', () => {
    it('does not provide previous page', () => {
      const currentPage = { value: 1 };
      const maxPage = { value: 1 };
      const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(previousPage.value).toBeUndefined();
    });
  });
  it('calculate the page after current page onw', () => {
    const currentPage = { value: 8 };
    const maxPage = { value: 10 };
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(nextPage.value).toBe(9);
  });
  describe('when the current page is last', () => {
    it('does not provide next page', () => {
      const currentPage = { value: 8 };
      const maxPage = { value: 8 };
      const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(nextPage.value).toBeUndefined();
    });
  });
});
