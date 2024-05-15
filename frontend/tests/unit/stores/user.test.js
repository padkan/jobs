import { createPinia, setActivePinia } from 'pinia';
import { useUserStore } from '@/stores/user';

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('keeps track of if user is logged in', () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it('stores organisations that the user would like to filter jobs by', () => {
    const store = useUserStore();
    expect(store.selectedOrganisations).toEqual([]);
  });

  it('stores job types that the user like to filter jobs by', () => {
    const store = useUserStore();
    expect(store.selectedJobTypes).toEqual([]);
  });
});

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  //user managment actions
  describe('loginUser', () => {
    it('log the user in', () => {
      const store = useUserStore();
      store.loginUser();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe('logoutUser', () => {
    it('logout the user', () => {
      const store = useUserStore();
      store.isLoggedIn = true;
      store.logoutUser();
      expect(store.isLoggedIn).toBe(false);
    });
  });

  describe('ADD_SELECTED_ORGANIZATIONS', () => {
    it('updates organizations the user has chosen to filter jobs by', () => {
      const store = useUserStore();
      store.ADD_SELECTED_ORGANIZATIONS(['org1', 'org2']);
      expect(store.selectedOrganisations).toEqual(['org1', 'org2']);
    });
  });
  describe('ADD_SELECTED_JOB_TYPES', () => {
    it('updates job type the user has chosen ti filter jobs by ', () => {
      const store = useUserStore();
      store.ADD_SELECTED_JOB_TYPES(['Full-time', 'Part-time']);
      expect(store.selectedJobTypes).toEqual(['Full-time', 'Part-time']);
    });
  });
});
